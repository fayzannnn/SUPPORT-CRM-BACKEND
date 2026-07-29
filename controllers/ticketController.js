import Ticket from "../models/Ticket.js";

// @desc    Create a new ticket
// @route   POST /api/tickets
export const createTicket = async (req, res) => {
  try {
    const { customerName, customerEmail, title, description } = req.body;

    if (!customerName || !customerEmail || !title || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const ticket = await Ticket.create({
      customerName,
      customerEmail,
      title,
      description,
    });

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all tickets (supports search + status filter)
// @route   GET /api/tickets?search=&status=
export const getTickets = async (req, res) => {
  try {
    const { search, status } = req.query;
    const query = {};

    if (status && status !== "All") {
      query.status = status;
    }

    if (search) {
      const regex = new RegExp(search, "i");
      query.$or = [
        { customerName: regex },
        { customerEmail: regex },
        { ticketId: regex },
        { title: regex },
        { description: regex },
      ];
    }

    const tickets = await Ticket.find(query).sort({ createdAt: -1 });
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single ticket by id
// @route   GET /api/tickets/:id
export const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update ticket status / add a note
// @route   PUT /api/tickets/:id
export const updateTicket = async (req, res) => {
  try {
    const { status, note } = req.body;
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    if (status) ticket.status = status;
    if (note && note.trim()) {
      ticket.notes.push({ text: note.trim() });
    }

    await ticket.save();
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
