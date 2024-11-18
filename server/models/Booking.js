const { Schema, model } = require("mongoose");

const bookingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  status: { type: String, enum: ["booked", "cancelled"], default: "booked" },
});

const Booking = model("Booking", bookingSchema);

module.exports = Booking;
