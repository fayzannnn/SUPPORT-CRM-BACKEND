import express from "express";
import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} from "../controllers/ticketController.js";

const router = express.Router();

router.route("/").post(createTicket).get(getTickets);
router.route("/:id").get(getTicketById).put(updateTicket).delete(deleteTicket);

export default router;