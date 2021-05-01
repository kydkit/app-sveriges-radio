import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { RadioContext } from "../contexts/RadioProvider";
import styles from "../css/ChannelCard.module.css";
import Pagination from "../components/Pagination";

const ChannelCard = ({ channels }) => {
  const history = useHistory();
  const { getAllChannels } = useContext(RadioContext);

  // pagination useStates
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);

  useEffect(() => {
    getAllChannels();
    // eslint-disable-next-line
  }, []);

  const handleClick = (channelId) => {
    // console.log(channelId);
    history.push(`/programs/${channelId}`);
  };

  //change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  let content = "";
  if (channels) {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentChannels = channels.slice(indexOfFirstPost, indexOfLastPost);

    content = (
      <>
        <div className={styles.cardcontainer}>
          {channels &&
            currentChannels.map((channel) => (
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

  return <div className={styles.channelsWrapper}>{content}</div>;
};

export default ChannelCard; 
