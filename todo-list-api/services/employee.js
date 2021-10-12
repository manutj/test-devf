const bcrypt = require("bcrypt");
const saltRounds = 10;
const EmployeeDAO = require("../dao/employee");

class EmployeeService {
    async createUser(name, email, password, role) {
        password = await bcrypt
            .hash(password, saltRounds)
            .then((password) => {
                return EmployeeDAO.createUser(name, email, password, role);
            })
            .catch((err) => err);
    }

    findUsers() {
        return EmployeeDAO.findUsers();
    }

    findOneEmployee(email, role) {
        return EmployeeDAO.findOneEmployee(email, role);
    }

    updateUser(userDta, id, isActive) {
        const { name, email } = userDta;
        return EmployeeDAO.updateUser(name, email, id, isActive);
    }
}

module.exports = new EmployeeService();
