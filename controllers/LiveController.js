const Live = require("../models/Live");

// Create new match
exports.createMatch = async (req, res) => {
  try {
    const match = new Live(req.body);
    await match.save();
    res.status(201).json({ message: "Match created", match });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get match by matchId
exports.getMatchByMatchId = async (req, res) => {
  try {
    const matchId = parseInt(req.params.matchId, 10);
    const match = await Live.findOne({ matchId });
    if (!match) return res.status(404).json({ error: "Match not found" });
    res.json(match);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update match by matchId
exports.updateMatchByMatchId = async (req, res) => {
  try {
    const matchId = parseInt(req.params.matchId, 10);
    const match = await Live.findOne({ matchId });
    if (!match) return res.status(404).json({ error: "Match not found" });
    Object.assign(match, req.body);
    await match.save();
    res.json({ message: "Match updated", match });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Count all matches
exports.countData = async (req, res) => {
  try {
    const count = await Live.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: "Failed to count matches." });
  }
};

// Get latest match by creation time
exports.getLatestMatchId = async (req, res) => {
  try {
    const latestMatch = await Live.findOne().sort({ createdAt: -1 });
    if (!latestMatch) {
      return res.status(404).json({ message: "No match found." });
    }
    res.json({ matchId: latestMatch.matchId });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch latest match ID." });
  }
};
