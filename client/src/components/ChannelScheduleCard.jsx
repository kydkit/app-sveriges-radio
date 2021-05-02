import styles from "../css/ChannelScheduleCard.module.css";

const ChannelScheduleCard = ({ dateSched, i }) => {
  const { imageurltemplate, title, starttimeutc, description } = dateSched

  return (
    <div className={styles.card} key={i}>
      <img src={imageurltemplate} alt="schedule display" />
      <h3 className={styles.programName}>{title}</h3>
      <strong>{starttimeutc}</strong>
      <p>{description}</p>
    </div>
  );
};

export default ChannelScheduleCard;
