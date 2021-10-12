const db = require("../db/db");

class TicketDAO {
    async createTicket(description, employee_id, manager_id) {
        const [id] = await db("tickets")
            .insert({
                description,
                status: "Abierto",
                employee_id,
                manager_id,
                is_active: true,
            })

            .returning("ticket_id");
        return id;
    }

    async findTickets() {
        const items = await db.select("*").from("tickets");
        return items;
    }

    async dashboardTickets() {
        const items = await db
            .select("email,name")
            .count("ticket_id as num_tickets")
            .from("employee")
            .innerJoin("tickets", "tickets.employee_id", "employee.employee_id")
            .groupBy("name")
            .union(
                db.raw(
                    "SELECT email, name,count(employee_id) - 1 FROM employee WHERE employee_id NOT IN (SELECT employee_id FROM tickets) group by name,employee_id"
                )
            );
        return items;
    }

    async findUserTickets(id) {
        const items = await db
            .select(
                "ticket_id",
                "description",
                "status",
                "created_at",
                "is_active"
            )
            .from("tickets")
            .where("employee_id", id);
        return items;
    }

    async findEmployeeTickets(id) {
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

    async updateTicket(description, status, id) {
        const item = await db
            .update(description ? { description } : { status })
            .from("tickets")
            .where("ticket_id", id);
        return item;
    }

    async deleteTicket(id, isActive) {
        const item = await db.del().from("tickets").where("ticket_id", id);
        return item;
    }
}

module.exports = new TicketDAO();
