const { Schema, model, Types } = require("mongoose"); // Добавляем Types

const schema = new Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Comment", schema);
