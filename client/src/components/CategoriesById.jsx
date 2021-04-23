import { useContext, useEffect } from "react";

import { RadioContext } from '../contexts/RadioProvider'; 

const CategoriesById = (props) => {
  const { programsForCat } = useContext(RadioContext); 

  
  const renderProgramsForCategory = () => {
    return programsForCat.map((program) => (
      <div className="card" key={program.id}>
        <img src={program.programimagewide} alt="program wide" width="100" height="100" />
        <span>{program.name}</span>
        <p className="description">{program.description}</p>

      </div>
    ))
  }
  
  return (
    <div className="catbyid">
      <h5>categories by id</h5>
      { programsForCat && renderProgramsForCategory()}
    </div>
  );
}
 
export default CategoriesById;