const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig.development);

function addBand(name, country, year) {
  return knex("bands").insert([
    { name: name, country_of_origin: country, year_formed: year },
  ]);
}

// function udpateBand(name, newName, country, year) {
//   return knex("bands")
//     .where({ name: name })
//     .update({ name: name, country_of_origin: country, year_formed: year });
// }
function getAllBands() {
  return knex("bands").select();
}
function getBand(name) {
  return knex("bands")
    .where("name", name)
    .select("name", "year_formed", "country_of_origin");
}

function deleteBand(name) {
  return knex("bands").where("name", name).del();
}

function getLineUp(band) {
  return knex("band_mus_inst")
    .join("bands", "band_mus_inst.band_id", "=", "bands.id")
    .join("musicians", "band_mus_inst.musician_id", "=", "musicians.id")
    .join("instruments", "band_mus_inst.instrument_id", "=", "instruments.id")
    .select(
      "musicians.first_name as First_Name",
      "musicians.last_name as Last_Name",
      "instruments.name as Instrument"
    )
    .where("bands.name", band);
}
module.exports = {
  addBand,
  getAllBands,
  getBand,
  deleteBand,
  getLineUp,
//   udpateBand
};
