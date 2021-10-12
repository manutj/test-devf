require("dotenv").config();
module.exports = {
    development: {
        client: "postgresql",
        connection: {
            searchPath: ["knex", "public"],
            database: "todo",
            user: "manu",
            password: "123",
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
