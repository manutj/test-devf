const { errors } = require("celebrate");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const adminRouter = require("./routes/tickets");
const validationSchema = require("./middlewares/middlewares");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use("/api", validationSchema.login);
app.use("/api", validationSchema.signup);
app.use("/api/dashboard", adminRouter);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get("env") === "development" ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render("error");
// });

app.use(errors());

module.exports = app;
