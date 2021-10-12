const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { celebrate, Joi, Segments } = require("celebrate");
const config = require("../config/config");
const router = express.Router();
const EmployeeService = require("../services/employee");
app.set("key", config.key);
const validationSchema = {
    login: router.post(
        "/login",
        celebrate({
            [Segments.BODY]: Joi.object().keys({
                email: Joi.string().email().required(),
                password: Joi.string().required(),
                role: Joi.string().required(),
            }),
        }),
        async (req, res) => {
            try {
                const { email, password, role } = req.body;
                if ((email, password)) {
                    const user = await EmployeeService.findOneEmployee(
                        email,
                        role
                    );
                    if (!user)
                        res.status(404).json({
                            message: "Fail credentials",
                        });
                    const isMatchPwd = await bcrypt.compare(
                        password,
                        user.password
                    );

                    if (!isMatchPwd)
                        return res
                            .status(404)
                            .json({ message: "Fail credentials" });
                    const payload = {
                        check: true,
                    };
                    const token = jwt.sign(payload, app.get("key"), {
                        expiresIn: 1800,
                    });
                    res.json({
                        response: "Autenticacion exitosa",
                        managerId: user.manager_id,
                        employeeId: user.employee_id,
                        token: token,
                    });
                    res.status(200).send("Logged");
                } else {
                    res.send("Correo o contraseña incorrectos");
                }
            } catch (error) {
                res.status(500).json({ error: error });
            }
        }
    ),

    signup: router.post(
        "/signup",
        celebrate({
            [Segments.BODY]: Joi.object().keys({
                name: Joi.string().required(),
                email: Joi.string().email().required(),
                password: Joi.string().required(),
                role: Joi.string().required(),
            }),
        }),
        async (req, res) => {
            try {
                const { name, email, password, role } = req.body;
                if ((name, email, password, role)) {
                    const user = await EmployeeService.createUser(
                        name,
                        email,
                        password,
                        role
                    );
                    res.status(201).json(
                        role == "admin"
                            ? {
                                  message: `Admin creado con id ${user}`,
                              }
                            : {
                                  message: `Empleado creado con id ${user}`,
                              }
                    );
                }
            } catch (error) {
                res.status(500).json({ error: "Hubo un error" });
            }
        }
    ),

    createTicket: router.post(
        "/new-ticket",
        celebrate({
            [Segments.BODY]: Joi.object().keys({
                description: Joi.string().required(),
                employee_id: Joi.number().required(),
                manager_id: Joi.number().required(),
            }),
        })
    ),

    modifyTicket: router.patch(
        "/update-ticket/:id",
        celebrate({
            [Segments.BODY]: Joi.object().keys({
                description: Joi.string().required(),
            }),
        })
    ),

    modifyTicketStatus: router.patch(
        "/change-ticket-status/:id",
        celebrate({
            [Segments.BODY]: Joi.object().keys({
                status: Joi.string().required(),
            }),
        })
    ),
    deleteTicket: router.delete("/delete-ticket/:id"),
};

module.exports = validationSchema;
