const express = require("express");
const router = express.Router();

const Bands = require("../db/bands");

const { AuthMiddleware } = require("../utils/auth");
const { bandToTitleCase } = require("../utils/helper");
const { isValidText } = require("../utils/validation");

router.get("", async (req, res) => {
  const bands = await Bands.getAllBands();
  res.json({ bands });
});

router.get("/:id", async (req, res) => {
  const bandId = req.params.id;
  const results = await Bands.getBand(bandToTitleCase(bandId));
  res.send(results);
});

router.get("/band/:band", async (req, res) => {
  const results = await Bands.getLineUp(bandToTitleCase(req.params.band));
  res.send(results);
});

router.use(AuthMiddleware);

router.patch("/band/:id", async (req, res) => {
  const id = req.params.id
  const results = await Bands.udpateBand(
    id,
    req.body.name,
    req.body.country_of_origin,
    req.body.year_formed
  );
  res.send({value: results});
});

router.post("/band/new", async (req, res) => {
  const results = await Bands.addBand(
    req.body.name,
    req.body.country_of_origin,
    req.body.year_formed
  );
  res.send(results);
});

router.delete("/band/:id", async (req, res) => {
  const id = req.params.id;
  await Bands.deleteBand(id);
  res.send(`The band ${id} was removed from database`);
});

module.exports = router;
