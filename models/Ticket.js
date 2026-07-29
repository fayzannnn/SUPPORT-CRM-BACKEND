import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    ticketId: {
      type: String,
      unique: true,
      required: true,
    },
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    customerEmail: {
      type: String,
      required: [true, "Customer email is required"],
      trim: true,
      lowercase: true,
    },
    title: {
      type: String,
      required: [true, "Issue title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Closed"],
      default: "Open",
    },
    notes: [
      {
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

// Auto-generate a human readable ticket ID before saving (e.g. TKT-1001)
ticketSchema.pre("validate", async function (next) {
  if (!this.isNew) return next();

  const lastTicket = await mongoose
    .model("Ticket")
    .findOne()
    .sort({ createdAt: -1 });

  let nextNumber = 1001;
  if (lastTicket && lastTicket.ticketId) {
    const lastNumber = parseInt(lastTicket.ticketId.split("-")[1], 10);
    if (!isNaN(lastNumber)) nextNumber = lastNumber + 1;
  }

  this.ticketId = `TKT-${nextNumber}`;
  next();
});

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
