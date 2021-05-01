import { useState, useEffect, useContext } from "react";

import ChannelProgram from "../components/ChannelProgram";
import ChannelSchedule from "../components/ChannelSchedule";
import ChannelOnPage from "../components/ChannelOnPage";
import styles from "../css/ChannelPage.module.css";
import { UserContext } from "../contexts/UserContext";

const Channel = (props) => {
  const { channelId } = props.match.params;
  const { user, storeFavChannel, deleteFavChannel } = useContext(UserContext);
  const [showPrograms, setShowPrograms] = useState(false);
  const [favorite, setFavorite] = useState(true);

  useEffect(() => {
    setShowPrograms(true);
    // eslint-disable-next-line
  }, []);

  const toggleLike = async (channelId) => {
    console.log(channelId);
    if(favorite){
      setFavorite(!favorite);
    let favToSave = {
      channelId,
    };
    await storeFavChannel(favToSave);
    } 
    else if(!favorite){
      setFavorite(true); 
      // await deleteFavChannel(channelId)
    }
    
  };

  const channelnav = () => {
    const handleClickPrograms = () => {
      setShowPrograms(true);
    };

    const handleClickSchedule = () => {
      setShowPrograms(false);
    };

    return (
      <div className={styles.channel}>
        <p onClick={handleClickPrograms}>PROGRAMS</p>
        <p
          onClick={() => {
            handleClickSchedule();
          }}
        >
          SCHEDULE
        </p>
      </div>
    );
  };

  return (
    <div className="allprograms">
      <div className={styles.mininav}>
        {/* heart visibility based on log in status */}
        <div onClick={() => toggleLike(channelId)} className={styles.heartContainer}>
          <span className={styles.heartText}>Löv it!</span>
          {user ? (
            favorite ? (
              <img
                className={styles.heart}
                src="../assets/heart-stroke.svg"
                alt="heart icon"
              />
            ) : (
              <img
                className={styles.heart}
                src="../assets/heart-solid.svg"
                alt="heart icon"
              />
            )
          ) : (
            ""
          )}
        </div>

        <ChannelOnPage channelId={channelId} />
        {channelnav()}
      </div>

      {showPrograms ? (
        <ChannelProgram channelId={channelId} />
      ) : (
        <ChannelSchedule channelId={channelId} />
      )}
    </div>
  );
};

export default Channel;
