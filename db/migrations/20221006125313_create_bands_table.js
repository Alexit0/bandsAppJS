
exports.up = function(knex) {
    return knex.schema
        .createTable("bands", function (table) {
            table.increments();
            table.string('name').notNullable();
            table.string('country_of_origin');
            table.integer('year_formed');
            table.timestamps(true, true);
        
        })
        
        .createTable("musicians", function (table) {
            table.increments();
            table.text("first_name");
            table.text("last_name");
            table.integer("yob");
            table.timestamps(true, true)
        })

        .createTable("instruments", function (table) {
            table.increments();
            table.string("name").notNullable();
        })

        .createTable("band_mus_inst", function (table) {
            table.increments();

            table.integer("band_id")
            .unsigned()
            .references("bands.id")
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

            table.integer("musician_id")
            .unsigned()
            .references("musicians.id")
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

            table.integer("instrument_id")
            .unsigned()
            .references("instruments.id")
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        })


        
};

exports.down = function(knex) {
    return knex.schema
    .dropTable("bands")
    .dropTable("musicians")
    .dropTable("instruments")
    .dropTable("band_mus_inst");
  
};
