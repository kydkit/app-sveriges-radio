import { useContext, useState } from "react";
import { FavoritesContext } from "../contexts/FavoritesContext";
import { UserContext } from "../contexts/UserContext";
import styles from "../css/ChannelProgramCard.module.css";

const ChannelProgramCard = ({ program, i }) => {
  const { id, programimagewide, name, description } = program;
  const { user } = useContext(UserContext);
  const { storeFavProgram, deleteFavProgram } = useContext(FavoritesContext)
  const [favorite, setFavorite] = useState(false); 

  const handleProgramLike = (programId) => {
    console.log(programId);
    if(!favorite){
      setFavorite(true); 
      let favToSave = {
        programId,
      };
      storeFavProgram(favToSave);
    } else if (favorite) {
      setFavorite(!favorite); 
      deleteFavProgram(programId, user.userId)
    }
  };

  return (
    <div className={styles.card} key={i}>
      <img
        className={styles.image}
        src={programimagewide}
        alt="program snips"
      />
      {!favorite ? <img
        className={user ? styles.hearton : styles.heartoff}
        src="../assets/heart-stroke.svg"
        alt="heart icon"
        onClick={() => handleProgramLike(id)}
      /> : 
      <img
        className={user ? styles.hearton : styles.heartoff}
        src="../assets/heart-solid.svg"
        alt="heart icon"
        onClick={() => handleProgramLike(id)}
      />}
      
      <h3 className={styles.programName}>{name}</h3>
      {/* <p>{broadcastinfo}</p> */}
      <p className="description">{description.slice(0, 70) + `...`}</p>
    </div>
  );
};

export default ChannelProgramCard;
