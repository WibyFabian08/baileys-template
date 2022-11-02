const { join } = require("path");
const fs = require("fs");
const makeWASocket = require("@adiwajshing/baileys");
const pino = require("pino");
const qrcode = require("qrcode-terminal");

const reservasiControler = require("../controllers/reservasiController");

let sessions = new Map();
let retries = new Map();

exports.sessionDirectory = (sessionName = "") => {
  return join(__dirname, "sessions", sessionName ? sessionName : "");
};

exports.isSessionsExists = (sessionName) => {
  return sessions.has(sessionName);
};

exports.getSession = (sessionName) => {
  return sessions.get(sessionName) ?? null;
};

exports.isNumberExist = async (sessionName, receiver, isGroup = false) => {
  try {
    let result;

    if (isGroup) {
      result = await sessionName.groupMetadata(receiver);

      return Boolean(result.id);
    }

    if (sessionName.isMultiple) {
      result = await sessionName.onWhatsApp(receiver);
    } else {
      [result] = await sessionName.onWhatsApp(receiver);
    }

    return result.exists;
  } catch (err) {
    return false;
  }
};

exports.formatPhone = (phoneNumber) => {
  if (phoneNumber.endsWith("@s.whatsapp.net")) {
    return phoneNumber;
  } else {
    let formatted = phoneNumber.replace(/\D/g, "");
    formatted += "@s.whatsapp.net";
    return formatted;
  }
};

exports.createSession = async (sessionName, isMultiple = false, res = null) => {
  const sessionFile =
    (isMultiple ? "legacy_" : "md_") +
    sessionName +
    (isMultiple ? ".json" : "");

  const logger = pino({ level: "warn" });
  const store = makeWASocket.makeInMemoryStore({ logger });

  let state, saveState;

  if (isMultiple) {
    ({ state, saveState } = makeWASocket.useSingleFileLegacyAuthState(
      this.sessionDirectory(sessionFile)
    ));
  } else {
    ({ state, saveCreds: saveState } = await makeWASocket.useMultiFileAuthState(
      this.sessionDirectory(sessionFile)
    ));
  }

  const waConfig = {
    auth: state,
    printQRInterminal: true,
    logger,
    browser: makeWASocket.Browsers.ubuntu("Chrome"),
  };

  const sock = isMultiple
    ? makeWASocket.makeWALegacySocket(waConfig)
    : makeWASocket.default(waConfig);

  if (!isMultiple) {
    store.readFromFile(this.sessionDirectory(`${sessionName}_store.json`));
    store.bind(sock.ev);
  }

  sessions.set(sessionName, { ...sock, store, isMultiple });

  sock.ev.on("creds.update", saveState);

  sock.ev.on("chats.set", ({ chats }) => {
    if (isMultiple) {
      store.chats.insertIfAbsent(...chats);
    }
  });

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    const statusCode = lastDisconnect?.error?.output?.statusCode;

    if (connection === "open") {
      retries.delete(sessionName);
    }

    if (connection === "close") {
      if (
        statusCode === makeWASocket.DisconnectReason.loggedOut ||
        !shouldReconnect(sessionName)
      ) {
        if (res && !res.headersSent) {
          res.status(500).json({
            success: false,
            message: "create session failed",
            data: {},
          });
        }

        return this.deleteSession(sessionName, isMultiple);
      }

      setTimeout(
        () => {
          this.createSession(sessionName, isMultiple, res);
        },
        statusCode === makeWASocket.DisconnectReason.restartRequired
          ? 0
          : parseInt(process.env.RECONNECT_INTERVAL ?? 0)
      );
    }

    if (update.qr) {
      if (res && !res.headersSent) {
        try {
          qrcode.generate(update.qr);

          res.status(200).json({
            success: true,
            message: "qr success created",
          });

          return;
        } catch (err) {
          res.status(500).json({
            success: false,
            message: "qr unsuccess created",
          });
        }
      }

      try {
        await sock.logout();
      } catch {
      } finally {
        this.deleteSession(sessionName, isMultiple);
      }
    }
  });

  sock.ev.on("messages.upsert", (m) => {
    reservasiControler.initMessage(sock, m.messages[0].key.remoteJid, m);
  });
};

exports.init = () => {
  fs.readdir(this.sessionDirectory(), (err, files) => {
    if (err) {
      throw err;
    }

    for (let file of files) {
      if (
        (!file.startsWith("md_") && !file.startsWith("legacy_")) ||
        file.endsWith("_store")
      ) {
        continue;
      }

      const filename = file.replace(".json", "");
      const isMultiple = filename.split("_", 1)[0] !== "md";
      const sessionName = filename.substring(isMultiple ? 7 : 3);

      this.createSession(sessionName, isMultiple);
    }
  });
};

exports.cleanup = () => {
  console.log("Running cleanup before exit.");

  sessions.forEach((session, sessionName) => {
    if (!session.isMultiple) {
      session.store.writeToFile(
        this.sessionDirectory(`${sessionName}_store.json`)
      );
    }
  });
};

exports.deleteSession = (sessionName, isMultiple = false) => {
  const sessionFile =
    (isMultiple ? "legacy_" : "md_") +
    sessionName +
    (isMultiple ? ".json" : "");
  const storeFile = `${sessionName}_store.json`;
  const rmOptions = { force: true, recursive: true };

  fs.rmSync(this.sessionDirectory(sessionFile), rmOptions);
  fs.rmSync(this.sessionDirectory(storeFile), rmOptions);

  sessions.delete(sessionName);
  retries.delete(sessionName);
};

const shouldReconnect = (sessionName) => {
  let maxRetries = parseInt(process.env.MAX_RETRIES ?? 0);
  let attempts = retries.get(sessionName) ?? 0;

  maxRetries = maxRetries < 1 ? 1 : maxRetries;

  if (attempts < maxRetries) {
    ++attempts;

    console.log("Reconnecting...", { attempts, sessionName });
    retries.set(sessionName, attempts);

    console.log(retries);

    return true;
  }

  return false;
};

exports.sendMessage = async (session, receiver, message, delays = 1000) => {
  try {
    await makeWASocket.delay(parseInt(delays));

    return session.sendMessage(receiver, message);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createSession: this.createSession,
  init: this.init,
  cleanup: this.cleanup,
  getSession: this.getSession,
  formatPhone: this.formatPhone,
  sendMessage: this.sendMessage,
  isNumberExist: this.isNumberExist,
};
