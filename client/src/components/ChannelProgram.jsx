import { useEffect, useContext, useState } from "react";
import styles from "../css/ChannelProgram.module.css";
import { RadioContext } from "../contexts/RadioProvider";
import { UserContext } from "../contexts/UserContext";

const ChannelProgram = (props) => {
  const { programs, getAllProgramsForChannel } = useContext(RadioContext);
  const { user, storeFavProgram, whoami } = useContext(UserContext);
  const channelId = props.channelId;
  const [favorite, setFavorite] = useState();

  useEffect(() => {
    whoami(); 
    getAllProgramsForChannel(channelId);
    // eslint-disable-next-line
  }, []);

  const handleProgramLike = (programId) => {
    console.log(programId);
    let favToSave = {
      programId,
    };
    storeFavProgram(favToSave)
  };

  const renderPrograms = () => {
    if (programs) {
      if (programs.length > 0) {
        return programs.map((program) => (
          <div className={styles.card} key={program.id}>
            <img
              className={styles.image}
              src={program.programimagewide}
              alt="program snips"
            />
            <img
              className={user ? styles.hearton : styles.heartoff}
              src="../assets/heart-stroke.svg"
              alt="heart icon"
              onClick={() => handleProgramLike(program.id)}
            />
            <h3 className={styles.programName}>{program.name}</h3>
            {/* <p>{program.broadcastinfo}</p> */}
            <p className="description">
              {program.description.slice(0, 70) + `...`}
            </p>
          </div>
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
