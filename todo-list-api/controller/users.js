const UserService = require("../services/users");
const UserDAO = require("../dao/users");

class UserController {
    async createUser(request, response) {
        try {
            const id = await UserService.createUser(request.body);
            response.status(201).json(id);
        } catch (error) {
            console.error(error);
            response.status(500).json(error);
        }
    }
    async findUsers(request, response) {
        try {
            const items = await UserService.findUsers();
            response.status(200).json(items);
        } catch (error) {
            response.status(500).json(error);
        }
    }

    async updateUser(request, response) {
        try {
            const updateBody = await UserService.updateUser(
                request.body,
                request.params.id
            );
            response
                .status(200)
                .send(
                    `El usuario con id ${request.params.id} se ha actualizado correctamente`
                )
                .json(updateBody);
        } catch (error) {
            response.status(500).json(error);
        }
    }

    async deleteUser(request, response) {
        const id = request.params.id;
        try {
            const user = await UserService.findOneUser(id);
            if (!user) {
                response.status(404).json({ message: "User not found" });
            } else {
                await UserDAO.deleteUser(id, {
                    is_active: false,
                });
                response
                    .status(204)
                    .send(
                        `El usuario con id ${request.params.id} se ha eliminado correctamente`
                    )
                    .json();
            }
        } catch (error) {
            response.status(500).json(error);
        }
    }
}

module.exports = new UserController();
