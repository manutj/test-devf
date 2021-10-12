const Pool = require("pg").Pool;
// Este es el objeto de configuracion para conectarme a la base de datos
const pool = new Pool({
    user: "optzkopz",
    host: "fanny.db.elephantsql.com",
    database: "optzkopz",
    password: "uidndlfF24A_abzOH6YgefYx5qIpcxHO",
    port: 5432,
});

module.exports = pool;
