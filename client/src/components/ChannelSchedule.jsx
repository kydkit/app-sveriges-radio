import { useEffect, useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'

import { RadioContext } from "../contexts/RadioProvider";


const ChannelSchedule = (props) => {
  const { programs, getAllProgramsForChannel, channelSchedules, getScheduleByDate } = useContext(RadioContext);
  const channelId = props.channelId;
  const [startDate, setStartDate] = useState(new Date());

  const handleDate = (date) => {
    console.log(startDate);
    setStartDate(date);
  };
  
  useEffect(() => {
    const formattedDate = startDate.toLocaleDateString("sv-SE"); 
    // const newFormattedDate = moment(formattedDate).format('YYYY-MM-DD'); 
    console.log(formattedDate);
  }, [startDate])

  useEffect(() => {
    getAllProgramsForChannel(channelId);
    getScheduleByDate(channelId/*, date*/);
    // console.log(channelId);
    // eslint-disable-next-line
  }, []);

  

  const renderSchedules = () => {
    if (!channelSchedules) {
      return <h1>Loading...</h1>
    }
    return channelSchedules.map((sched) => (
      <div className="card" key={sched.id}>
        <p>{sched.title}</p>
        <em>{sched.starttimeutc}</em>
      </div>
    ));
  };

  return (
    <div className="channelschedule">
      <h3>2. broadcasts from one channel by day</h3>
      <DatePicker
        // dateFormat="yyyy/MM/dd"
        selected={startDate}
        // onChange={(date) => setStartDate(date)}
        onChange={(date) => handleDate(date)}
      />
      {/* {console.log(startDate)} */}
      {programs && renderSchedules()}
    </div>
  );
}
 
export default ChannelSchedule;