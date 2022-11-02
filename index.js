const express = require("express");
const cors = require("cors");
const nodeCleanup = require("node-cleanup")

const app = express();

require("dotenv").config();

const { PORT_NUMBER } = process.env;
const whatsapp = require("./helpers/whatsapp");

const sessionRoute = require("./routes/session")
const reservasiRoute = require("./routes/reservasi")

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/session", sessionRoute)
app.use("/api/reservasi", reservasiRoute)

const listenerCallback = () => {
    whatsapp.init();
}

app.listen(PORT_NUMBER, listenerCallback);

nodeCleanup(whatsapp.cleanup)
