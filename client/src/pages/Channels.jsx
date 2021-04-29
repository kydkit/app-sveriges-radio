import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { RadioContext } from "../contexts/RadioProvider";
import styles from "../css/Channels.module.css";
import Pagination from '../components/Pagination';
import { UserContext } from '../contexts/UserContext';

const Channels = () => {
  const history = useHistory();
  const { channels, getAllChannels } = useContext(RadioContext);
  const { user } = useContext(UserContext); 
  const [liked, setLiked] = useState(true); 

  // pagination useStates
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);

  useEffect(() => {
    getAllChannels();
    // eslint-disable-next-line
  }, [])

  const handleClick = (channelId) => {
    // console.log(channelId);
    history.push(`/programs/${channelId}`)
  }

  const toggleLike = (channelId) => {
    setLiked(!liked); 
    console.log(liked);
    console.log(channelId);
  }

  //change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  let content = "";
  if (channels) {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = channels.slice(indexOfFirstPost, indexOfLastPost);

    content = (
      <>
        <h1 className={styles.header}>Channels</h1>
        <div className={styles.cardcontainer}>
          {channels &&
            currentPosts.map((channel) => (
              <div className={styles.card} key={channel.id}>
                <div
                  className={styles.logoandname}
                  onClick={() => handleClick(channel.id)}
                >
                  <img
                    src={channel.image}
                    alt="channel logo"
                    width="25"
                    height="25"
                  />
                  <span className={styles.name}>{channel.name}</span>
                </div>

                {/* heart visibility based on log in status */}
                <div>
                  {user ? (
                    <img className={styles.heart} src="../assets/heart-stroke.svg" alt="heart icon" />
                  ) : (
                    ""
                  )}
                </div>

                {/* heart option between liked or not */}
              
              </div>
            ))}
        </div>
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={channels.length}
          paginate={paginate}
        />
      </>
    );
  }

  return <div className={styles.channelsWrapper}>
    {content}
  </div>
}

export default Channels;