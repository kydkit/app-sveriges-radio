import { useContext, useEffect, useState } from "react";
import styles from "../css/FavLoggedIn.module.css";
import { UserContext } from "../contexts/UserContext";
import { RadioContext } from "../contexts/RadioProvider";
import ChannelCard from "../components/ChannelCard";

const FavLoggedIn = () => {
  const { userFavChannel, getUserFavChannel, user, whoami } = useContext(
    UserContext
  );
  const { channels, getAllChannels } = useContext(RadioContext);
  const userId = user.userId;
  const [filteredFavChannels, setFilteredFavChannels] = useState(null);

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
    // eslint-disable-next-line
  }, [user])

  const filterChannels = () => {
    const favChannelIds = userFavChannel.map((fc) => fc.channelId);
    const filteredFavs = channels.filter((channel) =>
      favChannelIds.includes(channel.id)
    );

    setFilteredFavChannels(filteredFavs);
  };

  return (
    <div className={styles.loggedinContainer}>
      <ChannelCard channels={filteredFavChannels} />
    </div>
  );
};

export default FavLoggedIn;
