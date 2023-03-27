const express = require("express");
const router = express.Router();

const Bands = require("../db/bands");

const { AuthMiddleware } = require("../utils/auth");
const { CustomError } = require("../utils/errors");
const { bandToTitleCase } = require("../utils/helper");
const { isValidText, isValidYear } = require("../utils/validation");

router.get("", async (req, res, next) => {
  try {
    const bands = await Bands.getAllBands();
    res.json({ bands });
  } catch (error) {
    next(new CustomError("Could not fetch data."));
  }
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const results = await Bands.getBand(bandToTitleCase(id));
    if (results.length === 0) {
      return next(
        new CustomError("Could not find any band with the id " + bandId, 404)
      );
    }
    res.send(results);
  } catch (error) {
    next(error);
  }
});

router.get("/band/:id", async (req, res, next) => {
  const bandId = req.params.id;
  try {
    const results = await Bands.getLineUp(bandToTitleCase(bandId));
    res.send(results);
  } catch (error) {
    next(error);
  }
});

router.use(AuthMiddleware);

router.patch("/band/:id", async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const year = req.body.year_formed;
  const country = req.body.country_of_origin;

  let errors = {};

  if (!isValidText(name)) {
    errors.name = "Invalid band's name.";
  }
  if (!isValidYear(year)) {
    errors.year = "Invalid year.";
  }
  if (!isValidText(country)) {
    errors.country = "Invalid country. If country unknown select 'unknown'.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Updating failed due to validation errors.",
      errors,
    });
  }

  try {
    const results = await Bands.udpateBand(id, name, country, year);
    res.send({ message: "Details were updated.", value: results });
  } catch (error) {
    next(error);
  }
});

router.post("/band/new", async (req, res, next) => {
  const id = req.params.id;
  const name = req.body.name;
  const year = req.body.year_formed;
  const country = req.body.country_of_origin;

  let errors = {};

  if (!isValidText(name)) {
    errors.name = "Invalid band's name.";
  }
  if (!isValidYear(year)) {
    errors.year = "Invalid year.";
  }
  if (!isValidText(country)) {
    errors.country = "Invalid country. If country unknown select 'unknown'.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Adding the band failed due to validation errors.",
      errors,
    });
  }

  try {
    const results = await Bands.addBand(name, country, year);
    res.send(results);
  } catch (error) {
    next(error);
  }
});

router.delete("/band/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await Bands.deleteBand(id);
    res.send(`The band ${id} was removed from database`);
  } catch (error) {
    next(error);
  }
});

router.patch("/band/:id/update", async (req, res) => {
  const id = req.params.id;

  try {
    await Bands.updateLineUp(id, req.body);
    res.send(`The band ${id} was updated`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
