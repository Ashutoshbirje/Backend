// models/live.js
const mongoose = require("mongoose");

const batterSchema = new mongoose.Schema({
  name: String,
  run: Number,
  ball: Number,
  four: Number,
  six: Number,
  strikeRate: Number
});

const bowlerSchema = new mongoose.Schema({
  name: String,
  over: Number,
  maiden: Number,
  run: Number,
  wicket: Number,
  economy: Number
});

const extrasSchema = new mongoose.Schema({
  total: Number,
  wide: Number,
  noBall: Number,
  Lb: Number
});

const recentOverSchema = new mongoose.Schema({
  overNo: Number,
  bowler: String,
  stack: [String],
  runs: Number
});

const inningSchema = new mongoose.Schema({
  runs: Number,
  wickets: Number,
  overs: Number,
  runRate: Number,
  batters: [batterSchema],
  bowlers: [bowlerSchema],
  extras: extrasSchema,
  recentOvers: [recentOverSchema]
});

const liveSchema = new mongoose.Schema({
  matchId: { type: Number, required: true, unique: true },
  // Common Fields
  scoringTeam: String,
  chessingTeam: String,
  inningNo: Number,
  totalRuns: Number,
  wicketCount: Number,
  totalOvers: Number,
  overCount: Number,
  ballCount: Number,
  maxOver: Number,
  hasMatchEnded: Boolean,
  remainingRuns: Number,
  remainingBalls: Number,

  // Innings Data
  inning1: inningSchema,
  inning2: inningSchema,

  // Admin Fields
  admin: { type: Boolean, default: false },
  batter1: batterSchema,
  batter2: batterSchema,
  bowlers: [bowlerSchema],
  extras: extrasSchema,
  recentOvers: [recentOverSchema]
});

module.exports = mongoose.model("Live", liveSchema);
  