const express = require("express");
const router = express.Router();

const Musicians = require("../db/musicians");

router.get("", async (req, res) => {
  const musicians = await Musicians.getAllMusicians();
  res.json({ musicians });
});

module.exports = router;
