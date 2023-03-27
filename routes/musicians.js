const express = require("express");
const router = express.Router();

const Musicians = require("../db/musicians");

const { AuthMiddleware } = require("../utils/auth");
const { CustomError } = require("../utils/errors");

const { isValidText, isValidYear } = require("../utils/validation");

router.get("", async (req, res, next) => {
  try {
    const musicians = await Musicians.getAllMusicians();
    res.json({ musicians });
  } catch (error) {
    next(new CustomError("Could not fetch data."));
  }
});

router.get("/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const results = await Musicians.getMusician(id);
    if (results.length === 0) {
      return next(
        new CustomError("Could not find any musician with the id " + id, 404)
      );
    }
    res.send(results);
  } catch (error) {
    next(error);
  }
});

router.use(AuthMiddleware);

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const firstName = req.body.name;
  const lastName = req.body.surname;
  const year = req.body.yob;

  let errors = {};

  if (!isValidText(firstName)) {
    errors.firstName = "Invalid first name.";
  }
  if (!isValidText(lastName)) {
    errors.lastName = "Invalid last name.";
  }
  if (!isValidYear(year)) {
    errors.year = "Invalid year.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Updating failed due to validation errors.",
      errors,
    });
  }

  try {
    const results = await Musicians.udpateMusician(
      id,
      firstName,
      lastName,
      year
    );
    res.send({ message: "Details were updated.", value: results });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const id = req.params.id;
  const firstName = req.body.name;
  const lastName = req.body.surname;
  const year = req.body.yob;

  let errors = {};

  if (!isValidText(firstName)) {
    errors.firstName = "Invalid first name.";
  }
  if (!isValidText(lastName)) {
    errors.lastName = "Invalid last name.";
  }
  if (!isValidYear(year)) {
    errors.year = "Invalid year.";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Updating failed due to validation errors.",
      errors,
    });
  }

  try {
    const results = await Musicians.addNewMusician(firstName, lastName, year);
    res.send(results);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    await Musicians.deleteMusician(id);
    res.send(`Musician with the ID ${id} was removed from the database.`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
