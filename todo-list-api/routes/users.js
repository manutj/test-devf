const express = require("express");
const router = express.Router();

const UserController = require("../controller/users");

router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});

router.post("/new-user", UserController.createUser);
router.get("/all-users", UserController.findUsers);
router.patch("/update-user/:id", UserController.updateUser);
router.delete("/delete-user/:id", UserController.deleteUser);

module.exports = router;
