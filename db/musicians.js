const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig.development);

function getAllMusicians() {
  return knex("musicians").select();
}

module.exports = { getAllMusicians };
