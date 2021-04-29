const express = require("express");

const router = express.Router();
const favoritesController = require("../controllers/favoritesController");

// User routes setup goes underneath here...
router.post("/savefavchannel", favoritesController.saveFavChannel);
router.post("/savefavprogram", favoritesController.saveFavProgram);
router.get("/getfavchannel/:userId", favoritesController.getFavChannel);
router.get("/getfavprogram/:userId", favoritesController.getFavProgram);

module.exports = router;
