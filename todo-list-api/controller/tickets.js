// Importamos el personService para pasar la data de la capa controlador a la capa servicios
const TicketService = require("../services/tickets");
const TicketDAO = require("../dao/tickets");

class TicketController {
    async createTicket(request, response) {
        try {
            const id = await TicketService.createTicket(request.body);
            response.status(201).json(id);
        } catch (error) {
            console.error(error);
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

    async findUserTickets(request, response) {
        try {
            const items = await TicketService.findUserTickets();
            response.status(200).json(items);
        } catch (error) {
            response.status(500).json(error);
        }
    }

    async updateTicket(request, response) {
        try {
            const updateBody = await TicketService.updateTicket(
                request.body,
                request.params.id
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
        const id = request.params.id;
        try {
            const ticket = await TicketService.findOneTicket(id);
            if (!ticket) {
                response.status(404).json({ message: "Ticket not found" });
            } else {
                await TicketDAO.updateDeleteTicket(id, {
                    is_active: false,
                });
                response
                    .status(204)
                    .send(
                        `El ticket con id ${request.params.id} se ha eliminado correctamente`
                    )
                    .json();
            }
        } catch (error) {
            response.status(500).json(error);
        }
    }
}

module.exports = new TicketController();
