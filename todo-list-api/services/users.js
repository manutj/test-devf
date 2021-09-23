const UserDAO = require("../dao/users");

class UserService {
    createUser(userDta) {
        const { name, email } = userDta;

        return UserDAO.createUser(name, email);
    }

    findUsers() {
        return UserDAO.findUsers();
    }

    findOneUser(id) {
        return UserDAO.findOneUser(id);
    }

    updateUser(userDta, id, isActive) {
        const { name, email } = userDta;
        return UserDAO.updateUser(name, email, id, isActive);
    }
}

module.exports = new UserService();
