const express = require("express");
const router = express.Router();

const Bands = require("../db/bands");

const { bandToTitleCase } = require("../utils/helper");
const { AuthMiddleware } = require("../utils/auth");
const { isValidText } = require("../utils/validation");

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

router.use(AuthMiddleware);

router.post("/band/new", async (req, res) => {
  console.log(req.token);

  const results = await Bands.addBand(
    req.body.name,
    req.body.year_formed,
    req.body.country_of_origin
  );
  console.log(req.body);
  res.send(results);
});

router.put("/:band", async (req, res) => {
  const results = await Bands.udpateBand();
});

router.delete("band/:id", async (req, res) => {
  const results = await Bands.deleteBand(req.params.id);
  res.send(`The band ${req.params.id} was removed from database`);
});

module.exports = router;
