const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig.development);

function getAllMusicians() {
  return knex("musicians").select();
}

function getMusician(id) {
  return knex("musicians").where("id", id).select();
}

function udpateMusician(id, firstName, lastName, yob) {
  return knex("musicians")
    .where("id", id)
    .update({ first_name: firstName, last_name: lastName, yob });
}

function addNewMusician(firstName, lastName, yob) {
  return knex("musicians").insert([
    { first_name: firstName, last_name: lastName, yob },
  ]);
}

function deleteMusician(id) {
  return knex("musicians").where("id", id).del();
}

module.exports = {
  getAllMusicians,
  getMusician,
  udpateMusician,
  addNewMusician,
  deleteMusician
};
