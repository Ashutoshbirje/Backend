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

// Delete the match where matchId === total count and hasMatchEnded === false
exports.deleteLatestUnendedMatch = async (req, res) => {
  try {
    // Step 1: Count total matches
    const totalCount = await Live.countDocuments();

    if (totalCount === 0) {
      return res.status(404).json({ message: "No matches found in the database." });
    }

    // Step 2: Find the match with matchId = totalCount
    const latestMatch = await Live.findOne({ matchId: totalCount });

    if (!latestMatch) {
      return res.status(404).json({ message: `No match found with matchId=${totalCount}.` });
    }

    // Step 3: If the match has already ended, do not delete. Just return a success-like message.
    if (latestMatch.hasMatchEnded) {
      return res.status(200).json({
        message: `Match with matchId=${totalCount} has already ended. No deletion performed.`,
        match: latestMatch,
      });
    }

    // Step 4: Delete only if match hasn't ended
    const deletedMatch = await Live.findOneAndDelete({
      matchId: totalCount,
      hasMatchEnded: false,
    });

    return res.status(200).json({
      message: `Match with matchId=${totalCount} deleted successfully.`,
      deletedMatch,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete match.",
      error: error.message,
    });
  }
};


