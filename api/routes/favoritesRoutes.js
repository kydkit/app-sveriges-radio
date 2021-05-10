const express = require("express");

const router = express.Router();
const favoritesController = require("../controllers/favoritesController");

// User routes setup goes underneath here...
router.post("/savefavchannel", favoritesController.saveFavChannel);
router.post("/savefavprogram", favoritesController.saveFavProgram);
router.get("/getfavchannel/:userId", favoritesController.getFavChannel);
router.get("/getfavprogram/:userId", favoritesController.getFavProgram);
// router.get("/getfavprogram/:channelId/:userId", favoritesController.getFavProgram);
router.delete("/deletefavchannel/:channelId/:userId", favoritesController.deleteFavChannel)
router.delete("/deletefavprogram/:programId/:userId", favoritesController.deleteFavProgram)

module.exports = router;
