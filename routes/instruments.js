const express = require("express");
const router = express.Router();

const Instruments = require("../db/instruments");

router.get("", async (req, res) => {
  const instruments = await Instruments.getInstrumentsList();
  res.json({ instruments });
  console.log('instruments list:: ', instruments)
});

module.exports = router;
