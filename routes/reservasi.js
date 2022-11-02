const express = require("express")
const router = express()

const reservasiController = require("../controllers/reservasiController")

router.post("/", reservasiController.initMessage)
router.post("/bank", reservasiController.bankTest)

module.exports = router