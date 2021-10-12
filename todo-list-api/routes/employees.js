const express = require("express");
const router = express.Router();

const UserController = require("../controller/employee");
const validationSchema = require("../middlewares/middlewares");

// router.post(
//     "/",
//     celebrate({
//         [Segments.BODY]: Joi.object().keys({
//             user: Joi.string().email().required(),
//             password: Joi.string().required(),
//         }),
//     }),
//     async (req, res) => {
//         try {
//             const { email, password } = req.body;
//             if ((email, password)) {
//                 const user = await EmployeeService.findOneEmployee(email);
//                 res.status(200).json(user);
//                 // const payload = {
//                 //     check: true,
//                 // };
//                 // const token = jwt.sign(payload, app.get("key"), {
//                 //     expiresIn: 1800,
//                 // });
//                 // res.json({
//                 //     response: "Autenticacion exitosa",
//                 //     token: token,
//                 // });
//             } else {
//                 res.send("Correo o contraseña incorrectos");
//             }
//             res.end();
//         } catch (error) {
//             res.json({ error: error });
//         }
//     }
// );

// router.use(validationSchema.login);
// router.post("/new-user", UserController.createUser);
// router.get("/all-users", UserController.findUsers);
// router.patch("/update-user/:id", UserController.updateUser);
// router.delete("/delete-user/:id", UserController.deleteUser);

module.exports = router;
