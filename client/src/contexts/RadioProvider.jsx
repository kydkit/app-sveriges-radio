import { createContext, useState, useEffect } from "react";

export const RadioContext = createContext();

const RadioProvider = (props) => {
  const [channels, setChannels] = useState(null);
  const [programs, setPrograms] = useState(null);
  const [categories, setCategories] = useState(null);
  const [programsForCat, setProgramsForCat] = useState(null);
  const [dateSchedules, setDateSchedules] = useState(null);
  const [channelOnPage, setChannelOnPage] = useState(null);
  const [allPrograms, setAllPrograms] = useState(null); 

  useEffect(() => {
    getAllCategories();
    getScheduleByDate();
    getAllPrograms(); 
  }, []);

  //User story 1 get all channels
  const getAllChannels = async () => {
    let channels = await fetch("/api/v1/channels");
    channels = await channels.json();
    // console.log(channels);
    // console.log(channels.channels);
    setChannels(channels.channels);
  };

  const getAllPrograms = async () => {
    let fetchAllPrograms = await fetch(`/api/v1/programs/getallprograms`);
    fetchAllPrograms = await fetchAllPrograms.json();

    setAllPrograms(fetchAllPrograms.programs);
    // console.log(allPrograms);
  };

  //extra. Get channelById
  const getChannelById = async (channelId) => {
    let channelsId = await fetch(`/api/v1/channels/${channelId}`);
    channelsId = await channelsId.json();
    // console.log(channelsId.channel);
    setChannelOnPage(channelsId.channel);
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
    let programsForCategory = await fetch(
      `/api/v1/programs/category/${categoryid}`
    );
    programsForCategory = await programsForCategory.json();
    // console.log(programsForCategory.programs);
    setProgramsForCat(programsForCategory.programs);
  };

  //  //User story 2 all broadcasts per channel current day
  // const getChannelSchedule = async (channelId) => {
  //   let schedules = await fetch(`/api/v1/channels/schedule/${channelId}`);
  //   // let schedules = await fetch(`/api/v1/channels/schedule/${channelId}`);
  //   schedules = await schedules.json();
  //   // console.log(schedules);
  //   // console.log(schedules.schedule);
  //   setChannelSchedules(schedules.schedule)
  // }

  //User story 2 all broadcasts per channel per day
  const getScheduleByDate = async (channelId, startDate) => {
    let schedulesByDate = await fetch(
      `/api/v1/channels/scheduledate/${channelId}?date=${startDate}`
    );
    schedulesByDate = await schedulesByDate.json();
    // console.log(schedulesByDate.schedule);
    setDateSchedules(schedulesByDate.schedule);
  };

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
    dateSchedules,
    getScheduleByDate,
    getChannelById,
    channelOnPage,
    allPrograms, 
    getAllPrograms
  };

  return (
    <RadioContext.Provider value={values}>
      {props.children}
    </RadioContext.Provider>
  );
};

export default RadioProvider;
