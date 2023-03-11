const express = require("express");
const router = express.Router();
const Bands = require("../db/bands");

const bandToTitleCase = (bandName) => {
  return bandName
    .replace("_", " ")
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

router.get("", async (req, res) => {
  const bands = await Bands.getAllBands();
  res.json({ bands });
});

router.get("/:band", async (req, res) => {
  const bandName = req.params.band;
  const results = await Bands.getBand(bandToTitleCase(bandName));
  console.log(req.params.band);
  res.send(results);
});

router.get("/band/:band", async (req, res) => {
  const results = await Bands.getLineUp(bandToTitleCase(req.params.band));
  console.log(req.params);
  res.send(results);
});

router.post("/band/new", async (req, res) => {
  const results = await Bands.addBand(
    req.body.name,
    req.body.year_formed,
    req.body.country_of_origin
  );
  console.log(req.body);
  res.send(results);
});

router.put("/:band", async (req, res) => {
  const results = await Bands.udpateBand()
})

router.delete("/:band", async (req, res) => {
  const results = await Bands.deleteBand(req.params.band);
  res.send(`The band ${req.params.band} was removed from database`);
});

module.exports = router;