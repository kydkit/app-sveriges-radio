import { useContext, useEffect, useState } from "react";
import styles from "../css/FavLoggedIn.module.css";
import channelStyles from "../css/FavChannelCard.module.css"; 
import { UserContext } from "../contexts/UserContext";
import { RadioContext } from "../contexts/RadioProvider";
import ChannelCard from "../components/ChannelCard";
// import ChannelProgramCard from "../components/ChannelProgramCard";
import { FavoritesContext } from "../contexts/FavoritesContext";

const FavLoggedIn = () => {
  const { user, whoami } = useContext(UserContext);
  const {
    getUserFavChannel,
    userFavChannel,
    getUserFavProgram,
    userFavProgram,
    deleteFavProgram,
    deleteFavChannel
  } = useContext(FavoritesContext);
  const { channels, programs, getAllChannels} = useContext(RadioContext); /*getAllChannels*/
  const userId = user.userId;
  const [filteredFavChannels, setFilteredFavChannels] = useState(null);
  const [filteredFavPrograms, setFilteredFavPrograms] = useState(null);

  useEffect(() => {
    whoami();
    getAllChannels();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (user) {
      // console.log(user);
      getUserFavChannel(userId);
      // getUserFavProgram(userId);
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    // if (programs && userFavProgram) {
    //   filterPrograms();
    // }
    if (channels && userFavChannel) {
      filterChannels();
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
    const filteredFavs = programs.filter((program) =>
      favProgramIds.includes(program.id)
    );
    // console.log(filteredFavs);
    setFilteredFavPrograms(filteredFavs);
  };

  const deleteFromFavChannel = (channelId) => {
    console.log("im clicked");
    deleteFavChannel(channelId, userId);
  };

  const deleteFromFavProgram = (programId) => {
    console.log("im clicked");
    deleteFavProgram(programId, userId);
    // getUserFavProgram(userId);
  };


  let favChannels = ""; 
  if (filteredFavChannels) {
    favChannels = (
      <div className={channelStyles.cardcontainer}>
          {channels &&
            filteredFavChannels.map((channel, i) => (
              <div className={channelStyles.card} key={i}>
                <p className={channelStyles.delete} onClick={() => deleteFromFavChannel(channel.id)}>x</p>
                <div
                  className={channelStyles.logoandname}
                >
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
    )
  }

  let favPrograms = "";
  if (filteredFavPrograms) {
    favPrograms = (
      <>
        <div className={styles.cardContainer}>
          {programs &&
            filteredFavPrograms.map((program, i) => (
              <div className={styles.card} key={i}>
                <p onClick={() => deleteFromFavProgram(program.id)}>X</p>
                <img
                  className={styles.image}
                  src={program.programimagewide}
                  alt="program snips"
                />
                <h3 className={styles.programName}>{program.name}</h3>
                <p>{program.description.slice(0, 70) + `...`}</p>
              </div>
              // <ChannelProgramCard program={program} />
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
