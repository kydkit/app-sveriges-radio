import { useEffect, useContext, useState } from "react";
import styles from "../css/ChannelProgram.module.css";
import { RadioContext } from "../contexts/RadioProvider";
import { UserContext } from "../contexts/UserContext";
import ChannelProgramCard from "../components/ChannelProgramCard";

const ChannelProgram = (props) => {
  const { programs, getAllProgramsForChannel } = useContext(RadioContext);
  const { user, storeFavProgram, whoami } = useContext(UserContext);
  const channelId = props.channelId;

  useEffect(() => {
    whoami();
    getAllProgramsForChannel(channelId);
    // eslint-disable-next-line
  }, []);

  const renderPrograms = () => {
    if (programs) {
      if (programs.length > 0) {
        return programs.map((program) => (
          <ChannelProgramCard program={program} />
        ));
      } else {
        return (
          <div>This channel currently doesn't have any programs running</div>
        );
      }
    }
  };

  return (
    <div className={styles.program}>
      <h2 className={styles.header}>Current Programs</h2>
      <div className={styles.cardContainer}>{programs && renderPrograms()}</div>
    </div>
  );
};

export default ChannelProgram;
