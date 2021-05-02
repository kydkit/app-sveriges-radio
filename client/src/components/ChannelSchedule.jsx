import { useEffect, useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ChannelScheduleCard from "../components/ChannelScheduleCard"; 

import { RadioContext } from "../contexts/RadioProvider";
import styles from '../css/ChannelSchedule.module.css'

const ChannelSchedule = (props) => {
  const { getScheduleByDate, dateSchedules} = useContext(RadioContext);
  const channelId = props.channelId;
  const [startDate, setStartDate] = useState(new Date());

  const handleDate = (date) => {
    setStartDate(date);
  };

  useEffect(() => {
    const formattedDate = startDate.toLocaleDateString("sv-SE");
    getScheduleByDate(channelId, formattedDate);
    // console.log(user);
    // eslint-disable-next-line
  }, [startDate])

  return (
    <div className="channelschedule">
      <div className={styles.tocenter}>
      <h2 className={styles.header}>Schedule By Day</h2>
      <DatePicker
        className={styles.datepicker}
        dateFormat="yyyy-MM-dd"
        selected={startDate}
        onChange={(date) => handleDate(date)}
      />
      </div>
      <div className={styles.cardContainer}>
      {dateSchedules && dateSchedules.map((dateSched, i) => (
        <ChannelScheduleCard dateSched={dateSched} key={i} />
      ))}
      </div>
    </div>
  );
}

export default ChannelSchedule;