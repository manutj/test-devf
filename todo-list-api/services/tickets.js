const TicketDAO = require("../dao/tickets");

class TicketService {
    createTicket(ticketDta) {
        const { description, employee_id, manager_id } = ticketDta;

        return TicketDAO.createTicket(description, employee_id, manager_id);
    }

    findTickets() {
        return TicketDAO.findTickets();
    }

    async dashboardTickets() {
        return TicketDAO.dashboardTickets();
    }

    findUserTickets(id) {
        return TicketDAO.findUserTickets(id);
    }

    findOneTicket(id) {
        return TicketDAO.findOneTicket(id);
    }

    updateTicket(description, status, id) {
        return TicketDAO.updateTicket(description, status, id);
    }
}

module.exports = new TicketService();
