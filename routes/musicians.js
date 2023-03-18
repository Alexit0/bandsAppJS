const express = require("express");
const router = express.Router();

const Musicians = require("../db/musicians");

const { AuthMiddleware } = require("../utils/auth");

router.get("", async (req, res) => {
  const musicians = await Musicians.getAllMusicians();
  res.json({ musicians });
});

router.get("/:id", async (req, res) => {
  const musician = await Musicians.getMusician(req.params.id);
  res.send(musician[0]);
});

router.use(AuthMiddleware);

router.patch("/:id", async (req, res) => {
  const data = req.body;
  await Musicians.udpateMusician(
    req.params.id,
    data.name,
    data.surname,
    data.yob
  );
  res.json();
});

router.post("/", async (req, res) => {
  const data = req.body;
  console.log(data);
  await Musicians.addNewMusician(data.name, data.surname, data.yob);
  res.json();
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await Musicians.deleteMusician(id);
  res.send(`Musician with the ID ${id} was removed from the database.`);
});

module.exports = router;
