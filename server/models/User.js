const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String },
    admin: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", schema);
