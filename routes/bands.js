const express = require("express");
const router = express.Router();

const Bands = require("../db/bands");

const { AuthMiddleware } = require("../utils/auth");
const { CustomError } = require("../utils/errors");
const { bandToTitleCase } = require("../utils/helper");
const { isValidText } = require("../utils/validation");

router.get("", async (req, res, next) => {
  try {
    const bands = await Bands.getAllBands();
    res.json({ bands });
  } catch (error) {
    next(new CustomError("Could not fetch data."));
  }
});

router.get("/:id", async (req, res, next) => {
  const bandId = req.params.id;
  try {
    const results = await Bands.getBand(bandToTitleCase(bandId));
    if (results.length === 0) {
      next(new CustomError("Invalid band index."));
    }
    res.send(results);
  } catch (error) {
    next(error);
  }
});

router.get("/band/:band", async (req, res) => {
  try {
    const results = await Bands.getLineUp(bandToTitleCase(req.params.band));
    res.send(results);
  } catch (error) {
    next(error);
  }
});

router.use(AuthMiddleware);

router.patch("/band/:id", async (req, res) => {
  const id = req.params.id;
  const results = await Bands.udpateBand(
    id,
    req.body.name,
    req.body.country_of_origin,
    req.body.year_formed
  );
  res.send({ value: results });
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

router.patch("/band/:id/update", async (req, res) => {
  const id = req.params.id;

  await Bands.updateLineUp(id, req.body);
  res.send(`The band ${id} was updated`);
});

module.exports = router;
