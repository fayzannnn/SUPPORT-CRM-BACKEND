import express from "express";
import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
} from "../controllers/ticketController.js";

const router = express.Router();

router.route("/").post(createTicket).get(getTickets);
router.route("/:id").get(getTicketById).put(updateTicket);

export default router;
