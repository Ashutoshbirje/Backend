const express = require("express");
const router = express.Router();
const liveController = require("../controllers/LiveController");

router.post("/create", liveController.createMatch);
router.get("/count", liveController.countData);
router.get("/latest/id", liveController.getLatestMatchId);

// Use matchId, not MongoDB _id
router.get("/match/:matchId", liveController.getMatchByMatchId);
router.patch("/match/:matchId/update", liveController.updateMatchByMatchId);

module.exports = router;
