import { useState, useEffect } from "react";

import ChannelProgram from "../components/ChannelProgram";
import ChannelSchedule from "../components/ChannelSchedule";
import ChannelOnPage from "../components/ChannelOnPage";
import styles from '../css/ChannelPage.module.css'; 

const Channel = (props) => {
  const { channelId, channelOnPage } = props.match.params;
  const [showPrograms, setShowPrograms] = useState(false);

  useEffect(() => {
    setShowPrograms(true);
    // eslint-disable-next-line
  }, []);

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
        <p onClick={() => {handleClickSchedule()}}>SCHEDULE</p>
      </div>
    );
  };

  return (
    <div className="allprograms">
      <div className={styles.mininav}>
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
