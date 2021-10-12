const EmployeeService = require("../services/employee");
const UserDAO = require("../dao/employee");

class EmployeeController {
    async createEmployee(request, response) {
        try {
            const id = await EmployeeService.createUser(request.body);
            response.status(201).json(id);
        } catch (error) {
            console.error(error);
            response.status(500).json(error);
        }
    }
    async findEmployees(request, response) {
        try {
            const items = await EmployeeService.findUsers();
            response.status(200).json(items);
        } catch (error) {
            response.status(500).json(error);
        }
    }

    async updateUser(request, response) {
        try {
            const updateBody = await EmployeeService.updateUser(
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
            const user = await EmployeeService.findOneUser(id);
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

module.exports = new EmployeeController();
