const Pool = require("pg").Pool;
// Este es el objeto de configuracion para conectarme a la base de datos
const pool = new Pool({
    user: "manu",
    host: "localhost",
    database: "todo",
    password: "123",
    port: 5432,
});

module.exports = pool;
