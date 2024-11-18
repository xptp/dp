const { Schema, model } = require("mongoose");

const schema = new Schema({
  name: String,
  number: Number,
  shortDescription: String,
  description: String,
  type: String,
  places: Number,
  images: Array,
  available: Boolean,
  bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
});

module.exports = model("Room", schema);
