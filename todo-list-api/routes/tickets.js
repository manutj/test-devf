const express = require("express");
const router = express.Router();

const TicketController = require("../controller/tickets");

router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});

router.post("/new-ticket", TicketController.createTicket);
router.get("/all-tickets", TicketController.findTickets);
router.patch("/update-ticket/:id", TicketController.updateTicket);
router.delete("/delete-ticket/:id", TicketController.deleteTicket);
router.get("/user-tickets", TicketController.findUserTickets);

module.exports = router;
