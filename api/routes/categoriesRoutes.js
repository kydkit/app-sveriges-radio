const express = require("express"); 

const router = express.Router(); 
const categoriesController = require("../controllers/categoriesController"); 

//Routes go here
router.get("", categoriesController.getAllCategories); 

module.exports = router; 