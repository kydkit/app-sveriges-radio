import { useEffect, useContext} from "react";
import styles from '../css/ChannelProgram.module.css'
import { RadioContext } from "../contexts/RadioProvider";

const ChannelProgram = (props) => {
  const { programs, getAllProgramsForChannel } = useContext(RadioContext);
  const  channelId  = props.channelId;

  useEffect(() => {
    getAllProgramsForChannel(channelId);
    // eslint-disable-next-line
  }, []);

  const renderPrograms = () => {
    if (programs) {
      if (programs.length > 0) {
        return programs.map((program) => (
          <div className={styles.card} key={program.id}>
            <img
              src={program.programimagewide}
              alt="program snips"
            />
            <h3 className={styles.programName}>{program.name}</h3>
            <p>{program.broadcastinfo}</p>
            <p className="description">{program.description}</p>
          </div>
        ));
      } else {
        return (
          <div>This channel currently doesn't have any programs running</div>
        );
      }
    }
  };

  return(
    <div className={styles.program}>
      <h2 className={styles.header}>Current Programs</h2>
      <div className={styles.cardContainer}>

      {programs && renderPrograms()}
      </div>
    </div>
  )
}

export default ChannelProgram;