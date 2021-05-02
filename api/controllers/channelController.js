//This model allows us to make front end fetches from my backend
const fetch = require("node-fetch"); 
const json = "format=json"; 
const paginationFalse = "pagination=false"; 

const utils = require("../core/utilities"); 

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
  let channelSchedule = await fetch(`http://api.sr.se/api/v2/scheduledepisodes?${json}&${paginationFalse}&channelId=${req.params.channelId}`); 
  channelSchedule = await channelSchedule.json(); 

  channelSchedule.schedule = channelSchedule.schedule.map(p => {
    return {
      ...p, 
      starttimeutc: utils.convertToDateObject(p.starttimeutc),
      endtimeutc: utils.convertToDateObject(p.endtimeutc),
    }
  })
  res.json(channelSchedule); 
}

const getScheduleByDate = async (req, res) => {
  let schedules = await fetch(`
  http://api.sr.se/api/v2/scheduledepisodes?${json}&${paginationFalse}&channelId=${req.params.channelId}&date=${req.query.date}
  `); 
  schedules = await schedules.json(); 

  schedules.schedule = schedules.schedule.map(p => {
    return {
      ...p, 
      starttimeutc: utils.convertToDateObject(p.starttimeutc),
      endtimeutc: utils.convertToDateObject(p.endtimeutc),
    }
  })
  res.json(schedules)
}

module.exports = {
  getAllChannels, 
  getChannelById,
  getChannelSchedule,
  getScheduleByDate
}