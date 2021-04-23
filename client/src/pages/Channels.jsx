import { useContext, useEffect } from 'react'; 
import { useHistory } from 'react-router-dom'
import { RadioContext } from "../contexts/RadioProvider"; 
import styles from "../css/Channels.module.css"; 
import Pagination from '../components/Pagination';


const Channels = () => {
  const history = useHistory(); 
  const { channels, getAllChannels } = useContext(RadioContext);
  
  //pagination useStates
  // const [currentPage, setCurrentPage] = useState(1); 
  // const [postsPerPage] = useState(10); 


  useEffect(() => {
    getAllChannels();
  })

  const handleClick = (channelId) => {
    console.log(channelId);
    history.push(`/programs/${channelId}`)
  }

  // //pagination
  // const indexOfLastPost = currentPage * postsPerPage; 
  // const indexOfFirstPost = indexOfLastPost - postsPerPage; 
  // const currentPosts = channels.slice(indexOfFirstPost, indexOfLastPost); 
  // //change Page
  // const paginate = (pageNumber) => setCurrentPage(pageNumber); 

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
      
      {/* <Pagination postsPerPage={postsPerPage} totalPosts={channels.length} paginate={paginate} /> */}
      {/* <AllChannels channels={currentPosts} loading={loading} /> */}
    </div>
  );
}

export default Channels;