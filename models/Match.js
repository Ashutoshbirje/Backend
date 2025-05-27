const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  team1: {
    type: String,
    required: true,
  },
  team2: {
    type: String,
    required: true,
  },
  maxOver: {
    type: Number,
    required: true,
  },
  tossWinner: {
    type: String,
    required: true,
  },
  decision: {
    type: String,
    enum: ['bat', 'ball'],
    required: true,
  },
  newmatch: {
    type: Boolean,
    default: false, // Initially false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Match", matchSchema);
