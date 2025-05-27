// routes/scoreRoutes.js
const express = require('express');
const router = express.Router();
const scoreController = require('../controllers/scoreController');
const Score = require("../models/Score");


router.post('/save', scoreController.saveScore);

router.get('/all', async (req, res) => {
  try {
    const scores = await Score.find().sort({ _id: -1 }); // Latest first
    res.status(200).json(scores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/delete/:id', scoreController.deleteScore);

module.exports = router;
