// const mongoose = require("mongoose");
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
});

module.exports = model("Room", schema);
// id: Number,
