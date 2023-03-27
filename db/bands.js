const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig.development);

function getAllBands() {
  return knex("bands").select();
}

function getBand(id) {
  return knex("bands")
    .where("id", id)
    .select("name", "year_formed", "country_of_origin");
}
function getLineUp(id) {
  return knex("band_mus_inst")
    .join("bands", "band_mus_inst.band_id", "=", "bands.id")
    .join("musicians", "band_mus_inst.musician_id", "=", "musicians.id")
    .join("instruments", "band_mus_inst.instrument_id", "=", "instruments.id")
    .select(
      "musicians.id as Musician_Id",
      "musicians.first_name as First_Name",
      "musicians.last_name as Last_Name",
      "instruments.id as Instrument_Id",
      "instruments.name as Instrument",
      "bands.id as Band_Id",
      "bands.name as Band_Name",
      "bands.country_of_origin as Country_Of_Origin",
      "bands.year_formed as Year_Formed"
    )
    .where("bands.id", id);
}
function addBand(name, country, year) {
  return knex("bands").insert([
    { name: name, country_of_origin: country, year_formed: year },
  ]);
}

function udpateBand(id, name, country, year) {
  return knex("bands")
    .where({ id: id })
    .update({ name: name, country_of_origin: country, year_formed: year });
}

function deleteBand(id) {
  return knex("bands").where("id", id).del();
}



async function updateLineUp(bandId, data) {
  try {
    await knex.transaction(async (trx) => {
      await trx("band_mus_inst").where("band_id", bandId).del();
      console.log(`Lineup ${bandId} was removed.`);
      await trx("band_mus_inst").insert([...data]);
    });
  } catch (error) {
    console.error(error);
    console.log(error);
  }
}
module.exports = {
  addBand,
  getAllBands,
  getBand,
  deleteBand,
  getLineUp,
  udpateBand,
  updateLineUp,
};
