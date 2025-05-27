const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  scoringTeam: String,
  chessingTeam: String,
  inning1: {
    runs: Number,
    wickets: Number,
    overs: String,
  },
  inning2: {
    runs: Number,
    wickets: Number,
    overs: String,
  },
  winnerCard3: String,
  maxOver: Number,
  date: String,
});

module.exports = mongoose.model('Score', scoreSchema);
