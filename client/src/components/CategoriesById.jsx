import { useContext } from "react";

import { RadioContext } from "../contexts/RadioProvider";
import styles from "../css/CategoriesById.module.css";

const CategoriesById = (props) => {
  const { programsForCat } = useContext(RadioContext);

  const renderProgramsForCategory = () => {
    return programsForCat.map((program) => (
      <div className={styles.card} key={program.id}>
        <img
          src={program.programimagetemplatewide}
          alt="program wide"
        />
        <h3 className={styles.programName}>{program.name}</h3>
        <p className="description">{program.description}</p>
      </div>
    ));
  };

  return (
    <div className={styles.cardContainer}>
      {programsForCat && renderProgramsForCategory()}
    </div>
  );
};

export default CategoriesById;
