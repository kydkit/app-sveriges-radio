//This model allows us to make front end fetches from backend
const fetch = require("node-fetch"); 
const json = "format=json"; 
const paginationFalse = "pagination=false"

//User story 4: get all list of all categories
const getAllCategories = async (req, res) => {
  let categories = await fetch(`http://api.sr.se/api/v2/programcategories/?${json}&${paginationFalse}`); 
  categories = await categories.json(); 
  res.json(categories); 
}

module.exports = {
  getAllCategories
}