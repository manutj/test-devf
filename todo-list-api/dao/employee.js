const db = require("../db/db");

class UserDAO {
    async createUser(name, email, password, role) {
        const [id] = await db(role == "admin" ? "manager" : "employee")
            .insert({
                name,
                email,
                password,
                is_active: true,
            })
            .returning(role == "admin" ? "manager_id" : "employee_id");
        return id;
    }

    async findUsers() {
        const items = await db.select("*").from("users");
        return items;
    }

    async findOneEmployee(email, role) {
        const [item] = await db
            .select("*")
            .from(role == "admin" ? "manager" : "employee")
            .where("email", email)
            .returning(role == "admin" ? "manager_id" : "employee_id");
        return item;
    }

    async updateUser(name, email, id) {
        const item = await db
            .update({ email, name })
            .from("users")
            .where("user_id", id);
        return item;
    }

    async deleteUser(id, isActive) {
        const item = await db
            .update(isActive)
            .from("users")
            .where("user_id", id);
        return item;
    }
}

module.exports = new UserDAO();
