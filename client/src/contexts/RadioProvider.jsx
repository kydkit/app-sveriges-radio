import { createContext, useState, useEffect } from "react";

export const RadioContext = createContext();

const RadioProvider = (props) => {
  const [channels, setChannels] = useState(null);
  const [programs, setPrograms] = useState(null);
  const [categories, setCategories] = useState(null);
  const [programsForCat, setProgramsForCat] = useState(null); 
  const [channelSchedules, setChannelSchedules] = useState(null); 
  const [dateSchedules, setDateSchedules] = useState(null);
  

  useEffect(() => {
    // getProgramsForCategory(); take away so that categories dont load themselves
    // getAllChannels();
    getAllCategories();
    getChannelSchedule();
    getScheduleByDate(); 
  }, []);

  //User story 1 get all channels
  const getAllChannels = async () => {
    let channels = await fetch("/api/v1/channels");
    channels = await channels.json();
    // console.log(channels);
    // console.log(channels.channels);
    setChannels(channels.channels);
  };

  //User story 3 all Programs for a channel, 6. Info about program
  const getAllProgramsForChannel = async (channelId) => {
    let allPrograms = await fetch(`/api/v1/programs/${channelId}`);
    allPrograms = await allPrograms.json();
    // console.log(allPrograms);
    // console.log(allPrograms.programs);
    setPrograms(allPrograms.programs);
  };

  //User story 4.List all categories
  const getAllCategories = async () => {
    let allCategories = await fetch("/api/v1/categories");
    allCategories = await allCategories.json();
    // console.log(allCategories.programcategories);
    setCategories(allCategories.programcategories);
  };

  //5.List all programs in a certain category
  const getProgramsForCategory = async (categoryid) => {
    let programsForCategory = await fetch(`/api/v1/programs/category/${categoryid}`);
    programsForCategory = await programsForCategory.json(); 
    // console.log(programsForCategory.programs);
    setProgramsForCat(programsForCategory.programs); 
  }

  
   //User story 2 all broadcasts per channel current day
  const getChannelSchedule = async (channelId) => {
    let schedules = await fetch(`/api/v1/channels/schedule/132`); 
    // let schedules = await fetch(`/api/v1/channels/schedule/${channelId}`); 
    schedules = await schedules.json(); 
    // console.log(schedules.schedule);
    setChannelSchedules(schedules.schedule)
  }

  //210?date=2021-04-22
  //User story 2 all broadcasts per channel per day
  const getScheduleByDate = async (channelId, date) => {
    let schedulesByDate = await fetch(`/api/v1/channels/scheduledate/132?date=2021-04-29`); 
    // let schedulesByDate = await fetch(`/api/v1/channels/scheduledate/${channelId}?date=${date}`); 
    schedulesByDate = await schedulesByDate.json(); 
    // console.log(schedulesByDate.schedule);
    setDateSchedules(schedulesByDate.schedule); 
  }

  const values = {
    channels,
    getAllChannels,
    getAllProgramsForChannel,
    programs,
    setPrograms,
    getAllCategories, 
    categories,
    getProgramsForCategory,
    programsForCat,
    channelSchedules, 
    dateSchedules,
    getChannelSchedule, 
    getScheduleByDate
  };

  return (
    <RadioContext.Provider value={values}>
      {props.children}
    </RadioContext.Provider>
  );
};

export default RadioProvider;
