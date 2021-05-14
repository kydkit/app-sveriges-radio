//This model allows us to make front end fetches from backend
const fetch = require("node-fetch"); 
const json = "format=json"; 
const paginationFalse = "pagination=false"; 

//User story 3: get all programs for a particular channel
const getProgramsForChannel = async (req, res) => {
  let programs = await fetch(`http://api.sr.se/api/v2/programs/index?channelid=${req.params.channelId}&${json}&${paginationFalse}`); 
  programs = await programs.json(); 
  res.json(programs); 
}

//User story 5: get all programs in a certain category
const getProgramsForCategory = async(req, res) => {
  let programsForCategory = await fetch(`http://api.sr.se/api/v2/programs/index?programcategoryid=${req.params.categoryid}&${json}&${paginationFalse}`); 
  programsForCategory = await programsForCategory.json(); 
  res.json(programsForCategory); 
}

//User story 6: see information about a program
const infoAboutProgram = async(req, res) => {
  let infoAboutProgram = await fetch(`http://api.sr.se/api/v2/programs/${req.params.programid}?${json}`); 
  infoAboutProgram = await infoAboutProgram.json(); 
  res.json(infoAboutProgram); 
}

//User story 7: get program's broadcast info
const broadcastInfo = async(req, res) => {
  let broadcastInfo = await fetch (`http://api.sr.se/api/v2/programs/${req.params.programid}?${json}`); 
  broadcastInfo = await broadcastInfo.json(); 
  res.json(broadcastInfo.program.broadcastinfo); 
}

const getAllPrograms = async (req, res) => {
  let fetchAllPrograms = await fetch(`http://api.sr.se/api/v2/programs?${json}`); 
  fetchAllPrograms = await fetchAllPrograms.json(); 
  res.json(fetchAllPrograms); 
}

module.exports = {
  getProgramsForChannel,
  getProgramsForCategory,
  infoAboutProgram,
  broadcastInfo,
  getAllPrograms
}