const { errors } = require("celebrate");
const express = require("express");
const app = express();
const cors = require("cors");
const adminRouter = require("./routes/tickets");
const validationSchema = require("./middlewares/middlewares");
const dotenv = require("dotenv");
const path = require("path");
const Pool = require("pg").Pool;

const isProduction = process.env.NODE_ENV === "production";

dotenv.config();

// Declaramos el puerto donde correra el servidor local
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

const connectionString = `postgres://optzkopz:uidndlfF24A_abzOH6YgefYx5qIpcxHO@fanny.db.elephantsql.com/optzkopz`;
const pool = new Pool({
    connectionString: isProduction
        ? process.env.DATABASE_URL
        : connectionString,
    ssl: {
        rechazarUnauthorized: false,
    },
});

app.use("/api", validationSchema.login);
app.use("/api", validationSchema.signup);
app.use("/api/dashboard", adminRouter);

app.use(express.static(path.join(__dirname, "/todo-list-app/build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/todo-list-app/build", "index.html"));
});

app.use(errors());

module.exports = app;
