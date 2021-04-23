import { useContext } from 'react'; 
import { useHistory } from 'react-router-dom'
import { RadioContext } from "../contexts/RadioProvider"; 
import styles from "../css/Channels.module.css"

const Channels = () => {
  const history = useHistory(); 
  const { channels, getAllProgramsForChannel } = useContext(RadioContext);

  const handleClick = (channelId) => {
    console.log(channelId);
    // getChannelSchedule(channelId); 
    history.push(`/programs/${channelId}`)
    
  }

  const renderChannels = () => {
    return channels.map((channel) => (
      <div className={styles.card} key={channel.id} onClick={() => handleClick(channel.id)}>
          <img src={channel.image} alt="channel logo" width="25" height="25" /> 
          <span>{channel.name}</span>
      </div>
    ))
  }  

  return (
    <div className={styles.channels}>
      <h1 className={styles.header}>CHANNELS</h1>
      {channels && renderChannels()}
    </div>
  );
}

export default Channels;