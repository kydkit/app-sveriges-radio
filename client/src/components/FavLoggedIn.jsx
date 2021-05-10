import { useContext, useEffect, useState } from "react";
import styles from "../css/FavLoggedIn.module.css";
import { UserContext } from "../contexts/UserContext";
import { RadioContext } from "../contexts/RadioProvider";
import ChannelCard from "../components/ChannelCard";
import ChannelProgramCard from "../components/ChannelProgramCard";
import { FavoritesContext } from "../contexts/FavoritesContext";

const FavLoggedIn = () => {
  const { user, whoami } = useContext(UserContext);
  const {
    getUserFavChannel,
    userFavChannel,
    getUserFavProgram,
    userFavProgram,
  } = useContext(FavoritesContext);
  const { channels, getAllChannels, programs } = useContext(RadioContext);
  const userId = user.userId;
  const [filteredFavChannels, setFilteredFavChannels] = useState(null);
  const [filteredFavPrograms, setFilteredFavPrograms] = useState(null);

  useEffect(() => {
    whoami();
    getAllChannels();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getUserFavChannel(userId);
    if (channels && userFavChannel) {
      filterChannels();
    }
    getUserFavProgram(userId);
    if (programs && userFavProgram) {
      filterPrograms();
    }
    // eslint-disable-next-line
  }, [user]);

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
    const filteredFavs = programs.filter((program) =>
      favProgramIds.includes(program.id)
    );
    // console.log(filteredFavs);
    setFilteredFavPrograms(filteredFavs);
  };

  let favPrograms = "";
  if (filteredFavPrograms) {
    favPrograms = (
      <>
        <div className={styles.cardContainer}>
          {filteredFavPrograms &&
            filteredFavPrograms.map((fp) => (
              <div className={styles.card}>
                <img
                  className={styles.image}
                  src={fp.programimagewide}
                  alt="program snips"
                />
                <h3 className={styles.programName}>{fp.name}</h3>
                <p>{fp.description.slice(0, 70) + `...`}</p>
              </div>
            ))}
        </div>
      </>
    );
  }

  return (
    <div className={styles.loggedinContainer}>
      <ChannelCard channels={filteredFavChannels} />
      {favPrograms}
    </div>
  );
};

export default FavLoggedIn;
