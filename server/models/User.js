const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String },
    name: { type: String },
    admin: { type: Boolean },
    bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", schema);
