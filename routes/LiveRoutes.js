const express = require("express");
const router = express.Router();
const liveController = require("../controllers/LiveController");

router.post("/create", liveController.createMatch);
router.get("/count", liveController.countData);
router.get("/match/:matchId", liveController.getMatchByMatchId);
router.patch("/match/:matchId/update", liveController.updateMatchByMatchId);
router.delete("/delete/latest-unended", liveController.deleteLatestUnendedMatch);

module.exports = router;
