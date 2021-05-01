import { useEffect, useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { RadioContext } from "../contexts/RadioProvider";
import { UserContext } from "../contexts/UserContext";
import styles from '../css/ChannelSchedule.module.css'

const ChannelSchedule = (props) => {
  const { getScheduleByDate, dateSchedules} = useContext(RadioContext);
  const { user } = useContext(UserContext)
  const channelId = props.channelId;
  const [startDate, setStartDate] = useState(new Date());

  const handleDate = (date) => {
    setStartDate(date);
  };

  useEffect(() => {
    const formattedDate = startDate.toLocaleDateString("sv-SE");
    // console.log(formattedDate);
    getScheduleByDate(channelId, formattedDate);
    // console.log(user);
    // eslint-disable-next-line
  }, [startDate])

  const renderScheduleByDate = () => {
      return dateSchedules.map((dateSched) => (
        <div className={styles.card} key={dateSched.id}>
          <img src={dateSched.imageurltemplate} alt="schedule display" />
          <h3 className={styles.programName}>{dateSched.title}</h3>
          <strong>{dateSched.starttimeutc}</strong>
          <p>{dateSched.description}</p>
        </div>
      ));
  }

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
        {dateSchedules && renderScheduleByDate()}
      </div>
    </div>
  );
}

export default ChannelSchedule;