import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import styles from '../css/ChannelProgramCard.module.css'

const ChannelProgramCard = ({ program}) => {
  const { id, programimagewide, name, description } = program
  const { user, storeFavProgram } = useContext(UserContext);

  const handleProgramLike = (programId) => {
    console.log(programId);
    let favToSave = {
      programId,
    };
    storeFavProgram(favToSave)
  };

  return (
    
      <div className={styles.card} key={id}>
            <img
              className={styles.image}
              src={programimagewide}
              alt="program snips"
            />
            <img
              className={user ? styles.hearton : styles.heartoff}
              src="../assets/heart-stroke.svg"
              alt="heart icon"
              onClick={() => handleProgramLike(id)}
            />
            <h3 className={styles.programName}>{name}</h3>
            {/* <p>{broadcastinfo}</p> */}
            <p className="description">
              {description.slice(0, 70) + `...`}
            </p>
          </div>
  
  );
}
 
export default ChannelProgramCard;