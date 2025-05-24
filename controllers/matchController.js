const Match = require("../models/Match");

// Create new match
exports.createMatch = async (req, res) => {
  try {
    // console.log("Incoming Data from frontend:", req.body);
    const matchData = {
      ...req.body,
    };
    const match = new Match(matchData);
    const savedMatch = await match.save();
    res.status(201).json(savedMatch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all matches
exports.getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find();
    res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update match field(s) by ID
// Toggle 'newmatch' field
// In your matchController.js

exports.toggleNewMatch = async (req, res) => {
  const { matchId } = req.params;
  const { newmatch } = req.body; // get newmatch value from request body
  // console.log("Received matchId:", matchId); // add this
  try {
    const updatedMatch = await Match.findByIdAndUpdate(
      matchId,
      { newmatch }, // update newmatch with sent value
      { new: true } // return updated doc
    );

    // console.log(updatedMatch)

    if (!updatedMatch) {
      return res.status(404).json({ message: "Match not found" });
    }

    res.status(200).json(updatedMatch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

