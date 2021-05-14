import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { RadioContext } from "../contexts/RadioProvider";
import { FavoritesContext } from "../contexts/FavoritesContext";

import styles from "../css/FavLoggedIn.module.css";
import channelStyles from "../css/FavChannelCard.module.css";
import t from "../css/Trash.module.css";

const FavLoggedIn = () => {
  const { user, whoami } = useContext(UserContext);
  const {
    getUserFavChannel,
    userFavChannel,
    getUserFavProgram,
    userFavProgram,
    deleteFavProgram,
    deleteFavChannel,
  } = useContext(FavoritesContext);
  const { channels, getAllChannels, allPrograms } = useContext(RadioContext);
  const userId = user.userId;
  const [filteredFavChannels, setFilteredFavChannels] = useState(null);
  const [filteredFavPrograms, setFilteredFavPrograms] = useState(null);

  useEffect(() => {
    if (user) {
      getUserFavChannel();
      getUserFavProgram();
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    whoami();
    getAllChannels();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (channels && userFavChannel) {
      filterChannels();
    }
    if (allPrograms && userFavProgram) {
      filterPrograms();
    }
    // eslint-disable-next-line
  }, [userFavProgram, userFavChannel]);

  const filterChannels = () => {
    const favChannelIds = userFavChannel.map((fc) => fc.channelId);
    const filteredFavs = channels.filter((channel) =>
      favChannelIds.includes(channel.id)
    );
    // console.log(filteredFavs);
    setFilteredFavChannels(filteredFavs);
  };

  const filterPrograms = () => {
    const favProgramIds = userFavProgram.map((fp) => fp.programId);
    const filteredFavs = allPrograms.filter((program) =>
      favProgramIds.includes(program.id)
    );
    // console.log(filteredFavs);
    setFilteredFavPrograms(filteredFavs);
  };

  const deleteFromFavChannel = (channelId) => {
    deleteFavChannel(channelId, userId);
  };

  const deleteFromFavProgram = (programId) => {
    deleteFavProgram(programId, userId);
  };

  let favChannels = "";
  if (filteredFavChannels) {
    favChannels = (
      <div className={channelStyles.cardcontainer}>
        {channels &&
          filteredFavChannels.map((channel, i) => (
            <div className={channelStyles.card} key={i}>
              <img
              onClick={() => deleteFromFavChannel(channel.id)}
                className={t.channelTrash}
                src="../assets/trash-solid.svg"
                alt="trash icon"
              />
              <div className={channelStyles.logoandname}>
                <img
                  src={channel.image}
                  alt="channel logo"
                  width="25"
                  height="25"
                />
                <span className={channelStyles.name}>{channel.name}</span>
              </div>
            </div>
          ))}
      </div>
    );
  }

  let favPrograms = "";
  if (filteredFavPrograms) {
    favPrograms = (
      <>
        <div className={styles.cardContainer}>
          {filteredFavPrograms.map((program, i) => (
            <div className={styles.card} key={i}>
              <img
                className={styles.image}
                src={program.programimagewide}
                alt="program snips"
              />
              <img
              onClick={() => deleteFromFavProgram(program.id)}
                className={t.trash}
                src="../assets/trash-solid.svg"
                alt="trash icon"
              />
              <h3 className={styles.programName}>{program.name}</h3>
              <p>{program.description.slice(0, 70) + `...`}</p>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <div className={styles.loggedinContainer}>
      {favChannels}
      {favPrograms}
    </div>
  );
};

export default FavLoggedIn;
