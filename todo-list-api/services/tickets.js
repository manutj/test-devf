const TicketDAO = require("../dao/tickets");

class TicketService {
    createTicket(ticketDta) {
        const { description, userticket_id } = ticketDta;

        return TicketDAO.createTicket(description, userticket_id);
    }

    findTickets() {
        return TicketDAO.findTickets();
    }

    findUserTickets() {
        return TicketDAO.findUserTickets();
    }

    findOneTicket(id) {
        return TicketDAO.findOneTicket(id);
    }

    updateTicket(ticketDta, id, active) {
        const { description, status, userticket_id } = ticketDta;
        const { is_active } = active;
        return TicketDAO.updateTicket(
            description,
            status,
            userticket_id,
            id,
            is_active
        );
    }
}

module.exports = new TicketService();
