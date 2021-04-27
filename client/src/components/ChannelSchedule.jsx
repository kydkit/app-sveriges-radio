import { useEffect, useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { RadioContext } from "../contexts/RadioProvider";

const ChannelSchedule = (props) => {
  const { getScheduleByDate, dateSchedules } = useContext(RadioContext);
  const channelId = props.channelId;
  const [startDate, setStartDate] = useState(new Date());

  const handleDate = (date) => {
    setStartDate(date);
  };

  useEffect(() => {
    const formattedDate = startDate.toLocaleDateString("sv-SE");
    // console.log(formattedDate);
    getScheduleByDate(channelId, formattedDate);
    // eslint-disable-next-line
  }, [startDate])

  const renderScheduleByDate = () => {
      return dateSchedules.map((dateSched) => (
        <div className="card" key={dateSched.id}>
          <p>{dateSched.title}</p>
          <strong>{dateSched.starttimeutc}</strong>
        </div>
      ))
  }

  return (
    <div className="channelschedule">
      <h3>2. broadcasts from one channel by day</h3>
      <DatePicker
        dateFormat="yyyy-MM-dd"
        selected={startDate}
        onChange={(date) => handleDate(date)}
      />
      {dateSchedules && renderScheduleByDate()}
    </div>
  );
}

export default ChannelSchedule;