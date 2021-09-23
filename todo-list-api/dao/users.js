const db = require("../db/db");

class UserDAO {
    async createUser(name, email) {
        const [id] = await db("users")
            .insert({
                name,
                email,
                is_active: true,
            })

            .returning("user_id");
        return id;
    }

    async findUsers() {
        const items = await db.select("*").from("users");
        return items;
    }

    async findOneUser(id) {
        const [item] = await db
            .select("*")
            .from("users")
            .where("user_id", id)
            .returning("user_id");
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
