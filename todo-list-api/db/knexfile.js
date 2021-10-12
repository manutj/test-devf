const dotenv = require("dotenv");
dotenv.config();
module.exports = {
    development: {
        client: "postgresql",
        connection: {
            searchPath: ["knex", "public"],
            host: "fanny.db.elephantsql.com",
            port: 5432,
            database: "optzkopz",
            user: "optzkopz",
            password: "uidndlfF24A_abzOH6YgefYx5qIpcxHO",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },

    production: {
        client: "postgresql",
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
};
