import { useEffect, useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { RadioContext } from "../contexts/RadioProvider";

const Channel = (props) => {
  const {
    programs,
    getAllProgramsForChannel,
    getChannelSchedule,
    channelSchedules,
    getScheduleByDate,
  } = useContext(RadioContext);
  const { channelId, date } = props.match.params;
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    getAllProgramsForChannel(channelId);
    getChannelSchedule(channelId);
    getScheduleByDate(channelId, date);
    // console.log(channelId);
    // eslint-disable-next-line
  }, []);

  const handleDate = (date) => {
    setStartDate(date);
    console.log(startDate);
    // startDate.toLocaleDateString();
    // console.log(startDate);
  };

  const renderSchedules = () => {
    if (channelSchedules) {
      return channelSchedules.map((sched) => (
        <div className="card" key={sched.id}>
          <p>{sched.title}</p>
          <em>{sched.starttimeutc}</em>
        </div>
      ));
    }
  };

  const renderPrograms = () => {
    if (programs) {
      if (programs.length > 0) {
        return programs.map((program) => (
          <div className="card" key={program.id}>
            <img
              src={program.programimagewide}
              alt="program snips"
              width="50"
              height="50"
            />
            <h3>{program.name}</h3>
            <p>{program.broadcastinfo}</p>
            <p className="description">{program.description}</p>
          </div>
        ));
      } else {
        return (
          <div>This channel currently doesn't have any programs running</div>
        );
      }
    }
  };

  return (
    <div className="allprograms">
      <h3>2. broadcasts from one channel by day</h3>
      <h3>3. All the programs for one channel</h3>
      <DatePicker
        dateFormat="yyyy/MM/dd"
        selected={startDate}
        // onChange={(date) => setStartDate(date)}
        onChange={(date) => handleDate(date)}
      />
      {/* {console.log(startDate)} */}
      {programs && renderSchedules()}
      {programs && renderPrograms()}
    </div>
  );
};

export default Channel;
