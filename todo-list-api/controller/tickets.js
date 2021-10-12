// Importamos el personService para pasar la data de la capa controlador a la capa servicios
const TicketService = require("../services/tickets");
const TicketDAO = require("../dao/tickets");
const pool = require("../db/pool");

class TicketController {
    async createTicket(request, response) {
        try {
            const id = await TicketService.createTicket(request.body);
            response.status(201).send(`Ticket creado con id ${id}`);
        } catch (error) {
            response.status(500).json(error);
        }
    }
    async findTickets(request, response) {
        try {
            const items = await TicketService.findTickets();
            response.status(200).json(items);
        } catch (error) {
            response.status(500).json(error);
        }
    }

    async dashboardTickets(request, response) {
        pool.query(
            `select cast(employee.employee_id as varchar), name, count(tickets.is_active) as num_tickets from employee inner join tickets on tickets.employee_id = employee.employee_id group by name, employee.employee_id 
            union
            SELECT cast(employee_id as varchar), name,count(employee_id) - 1
            FROM    employee
            WHERE   employee_id NOT IN (SELECT employee_id FROM tickets) group by name,employee_id `,
            (error, result) => {
                if (error) {
                    throw error;
                }
                response.status(200).json(result.rows);
            }
        );
    }

    async findUserTickets(request, response) {
        const { id } = request.params;
        try {
            const items = await TicketService.findUserTickets(id);
            response.status(200).json(items);
        } catch (error) {
            response.status(500).json(error);
        }
    }

    async updateTicket(request, response) {
        const { description, status } = request.body;
        const { id } = request.params;
        try {
            const updateBody = await TicketService.updateTicket(
                description,
                status,
                id
            );
            response
                .status(200)
                .send(
                    `El ticket con id ${request.params.id} se ha actualizado correctamente`
                )
                .json(updateBody);
        } catch (error) {
            response.status(500).json(error);
        }
    }

    async deleteTicket(request, response) {
        const { id } = request.params;
        try {
            const ticket = await TicketService.findOneTicket(id);
            if (!ticket) {
                response.status(404).json({ message: "Ticket not found" });
            } else {
                await TicketDAO.deleteTicket(id, {
                    is_active: false,
                    status: "Cerrado",
                });
                response
                    .status(204)
                    .send(
                        `El ticket con id ${request.params.id} se ha eliminado correctamente`
                    );
            }
        } catch (error) {
            response.status(500).json(error);
        }
    }
}

module.exports = new TicketController();
