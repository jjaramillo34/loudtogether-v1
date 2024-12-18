const express = require("express");
const router = express.Router();
const sessionController = require("../controllers/sessionController");

router.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.originalUrl}`);
  next();
});

router.get("/audio-info", sessionController.getAudioInfo);

router.post("/", sessionController.createSession);
router.get("/:sessionId", sessionController.getSession);
router.get("/session/:sessionName", sessionController.getSessionByName);
router.post("/:sessionId/join", sessionController.joinSession);
router.get("/:sessionId/sync", sessionController.getSyncStatus);
router.post("/:sessionId/sync", sessionController.syncAudio);
router.post("/:sessionId/leave", sessionController.leaveSession);

module.exports = router;
