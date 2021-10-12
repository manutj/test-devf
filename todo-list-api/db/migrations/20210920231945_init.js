exports.up = function (knex) {
    return knex.schema
        .createTable("employee", (table) => {
            table.increments("employee_id").primary("employee_id", {
                constraintName: "employee_primary_key",
                deferrable: "deferred",
            });
            table.string("name", 25).notNullable();
            table.string("email", 25).notNullable();
            table.string("password", 100).notNullable();
            table.boolean("is_active").defaultTo(true);
        })

        .createTable("manager", (table) => {
            table.increments("manager_id").primary("manager_id", {
                constraintName: "manager_primary_key",
                deferrable: "deferred",
            });
            table.string("name", 25).notNullable();
            table.string("email", 25).notNullable();
            table.string("password", 100).notNullable();
            table.boolean("is_active").defaultTo(true);
        })

        .createTable("tickets", (table) => {
            table.increments("ticket_id").primary("ticket_id", {
                constraintName: "tickets_primary_key",
                deferrable: "deferred",
            });
            table.string("description", 255).notNullable();
            table.string("status", 20).notNullable().defaultTo("Abierto");
            table.timestamps(true, true);
            table
                .integer("employee_id")
                .references("employee_id")
                .inTable("employee")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table
                .integer("manager_id")
                .references("manager_id")
                .inTable("manager")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table.boolean("is_active").defaultTo(true);
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTable("employee")
        .dropTable("manager")
        .dropTable("tickets");
};
