const {Bank} = require("../models/index");

exports.initMessage = async (sock, receiver, message) => {
  try {
    const textMessage = message.messages[0].message.conversation;
    const responseList = message.messages[0].message.listResponseMessage;
    const responseButton = message.messages[0].message.buttonsResponseMessage;

    if (textMessage) {
      await sock.sendMessage(receiver, { text: "Ini adalah bot" });
    }
  } catch (err) {
    // return res.status(500).json({
    //     success: false,
    //     message: "something went wrong on the server"
    // })
  }
};

exports.bankTest = async (req, res) => {
  try {
    const newBank = await Bank.create({
      code: "bni-1",
      account_no: 1234,
      account_name: "bni-pasteur",
      status: 1,
      type: "tf",
    });

    return res.status(200).json({
      success: true,
      message: "bank created",
      newBank,
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
};
