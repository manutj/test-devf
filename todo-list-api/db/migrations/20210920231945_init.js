exports.up = function (knex) {
    return knex.schema
        .createTable("users", (table) => {
            table.increments("user_id").primary("user_id", {
                constraintName: "users_primary_key",
                deferrable: "deferred",
            });
            table.string("name", 25).notNullable();
            table.string("email", 25).notNullable();
            table.boolean("is_active");
        })

        .createTable("tickets", (table) => {
            table.increments("ticket_id").primary("ticket_id", {
                constraintName: "tickets_primary_key",
                deferrable: "deferred",
            });
            table.string("description", 255).notNullable();
            table.string("status", 20).notNullable();
            table.timestamps(true, true);
            table
                .integer("userticket_id")
                .references("user_id")
                .inTable("users");
            table.boolean("is_active");
        });
};

exports.down = function (knex) {
    return knex.schema.dropTable("users").dropTable("tickets");
};
