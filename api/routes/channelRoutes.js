const express = require("express"); 

const router = express.Router(); 
const channelController = require("../controllers/channelController"); 

//routes go here
router.get("", channelController.getAllChannels); 
router.get("/:channelId", channelController.getChannelById); 
router.get("/schedule/:channelId", channelController.getChannelSchedule); 

module.exports = router; 