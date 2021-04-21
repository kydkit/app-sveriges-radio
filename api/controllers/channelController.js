//This model allows us to make front end fetches from my backend
const fetch = require("node-fetch"); 
const json = "format=json"; 
const paginationFalse = "pagination=false"

//user database goes here
// const db = new sqlite3.Database(path.join(__dirname, ".."))

//User story 1: list all channels
const getAllChannels = async (req, res) => {
  let channels = await fetch (`http://api.sr.se/api/v2/channels?${json}&${paginationFalse}`); 
  channels = await channels.json(); 
  res.json(channels); 
}

//get all program for a particular channel
const getChannelById = async (req, res) => {
  let channel = await fetch (`http://api.sr.se/api/v2/channels/${req.params.channelId}?${json}&${paginationFalse}`); 
  channel = await channel.json(); 
  res.json(channel)
}

//User story 2: get all programs from particular channel for particular day (tablå)
const getChannelSchedule = async (req, res) => {
  let channelSchedule = await fetch(`http://api.sr.se/api/v2/scheduledepisodes?${json}&${paginationFalse}&channelId=${req.params.channelId}&date=${req.query.date}`); 
  channelSchedule = await channelSchedule.json(); 
  res.json(channelSchedule); 
}

module.exports = {
  getAllChannels, 
  getChannelById,
  getChannelSchedule,
}