import { useEffect, useContext } from "react";
import { RadioContext } from "../contexts/RadioProvider";
import styles from "../css/ChannelOnPage.module.css";

const ChannelOnPage = (props) => {
  const { channelOnPage, getChannelById } = useContext(RadioContext);
  const channelId = props.channelId;

  useEffect(() => {
    getChannelById(channelId);
  }, []);

  const renderIcon = () => {
    if (channelOnPage) {
      return (
        <div className={styles.icon}>
          <img src={channelOnPage.image} alt="channel icon" />
        </div>
      );
    }
  };

  return <div className="channelOnPage">{renderIcon()}</div>;
};

export default ChannelOnPage;
