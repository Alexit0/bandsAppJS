const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig.development);

function getInstrumentsList() {
  return knex("instruments").select();
}

module.exports = { getInstrumentsList };
