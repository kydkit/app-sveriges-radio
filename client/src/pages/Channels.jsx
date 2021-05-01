import { useContext } from "react";
import ChannelCard from "../components/ChannelCard";
import styles from "../css/Channels.module.css";
import { RadioContext } from "../contexts/RadioProvider";

const Channels = () => {
  const { channels } = useContext(RadioContext);
  return (
    <div>
      <h1 className={styles.header}>Channels</h1>
      <ChannelCard channels={channels} />
    </div>
  );
};

export default Channels;
