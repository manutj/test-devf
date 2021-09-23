const db = require("../db/db");

class TicketDAO {
    async createTicket(description, userticket_id) {
        const [id] = await db("tickets")
            .insert({
                description,
                status: "Abierto",
                userticket_id,
                is_active: true,
            })

            .returning("ticket_id");
        return id;
    }

    async findTickets() {
        const items = await db.select("*").from("tickets");
        return items;
    }

    async findUserTickets() {
        const items = await db
            .select("name")
            .from("users")
            .innerJoin("tickets", "tickets.userticket_id", "users.user_id");
        return items;
    }

    async findOneTicket(id) {
        const [item] = await db
            .select("*")
            .from("tickets")
            .where("ticket_id", id)
            .returning("ticket_id");
        return item;
    }

    async updateTicket(description, status, userticket_id, id) {
        const item = await db
            .update({ description, status, userticket_id })
            .from("tickets")
            .where("ticket_id", id);
        return item;
    }

    async deleteTicket(id, isActive) {
        const item = await db
            .update(isActive)
            .from("tickets")
            .where("ticket_id", id);
        return item;
    }
}

module.exports = new TicketDAO();
