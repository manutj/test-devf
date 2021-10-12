const express = require("express");
const router = express.Router();
const validationSchema = require("../middlewares/middlewares");
const TicketController = require("../controller/tickets");

router.get("/", TicketController.dashboardTickets);

router.post(
    "/new-ticket",
    validationSchema.createTicket,
    TicketController.createTicket
);
router.get("/user-tickets/:id", TicketController.findUserTickets);
router.patch(
    "/update-ticket/:id",
    validationSchema.modifyTicket,
    TicketController.updateTicket
);
router.patch(
    "/change-ticket-status/:id",
    validationSchema.modifyTicketStatus,
    TicketController.updateTicket
);
router.delete(
    "/delete-ticket/:id",
    validationSchema.deleteTicket,
    TicketController.deleteTicket
);

module.exports = router;
