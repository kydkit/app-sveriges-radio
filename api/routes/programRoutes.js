const express = require("express"); 

const router = express.Router(); 
const programController = require("../controllers/programControllers"); 

//Routes go here
router.get("/:channelId", programController.getProgramsForChannel); 
router.get("/category/:categoryid", programController.getProgramsForCategory); 
router.get("/info/:programid", programController.infoAboutProgram);
router.get("/info/broadcastInfo/:programid", programController.broadcastInfo);

module.exports = router; 