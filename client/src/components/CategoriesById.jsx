import { useContext } from "react";

import { RadioContext } from "../contexts/RadioProvider";
import styles from "../css/CategoriesById.module.css";

const CategoriesById = (props) => {
  const { programsForCat } = useContext(RadioContext);

  const renderProgramsForCategory = () => {
    return programsForCat.map((program) => (
      <div className={styles.card} key={program.id}>
        <img
          src={program.programimagewide}
          alt="program wide"
          width="100"
          height="100"
        />
        <span>{program.name}</span>
        <p className="description">{program.description}</p>
      </div>
    ));
  };

  return (
    <div className="catbyid">
      {programsForCat && renderProgramsForCategory()}
    </div>
  );
};

export default CategoriesById;
