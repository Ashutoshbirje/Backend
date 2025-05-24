// controllers/scoreController.js
const Score = require('../models/Score'); // ✅ This must be at the top

exports.saveScore = async (req, res) => {
  try {
    const score = new Score(req.body);
    await score.save();
    res.status(201).json({ message: 'Score saved successfully' });
  } catch (error) {
    console.error(error); // Optional: for server-side debugging
    res.status(500).json({ error: error.message });
  }
};
