import { useEffect, useContext } from 'react'; 

import { RadioContext } from '../contexts/RadioProvider'; 

const AllProgramsForChannel = (props) => {
  const { programs, getAllProgramsForChannel } = useContext(RadioContext); 
  const { channelId } = props.match.params; 

  useEffect(() => {
    getAllProgramsForChannel(channelId);
    // eslint-disable-next-line
  }, []); 

  const handleClick = () => {
    console.log("im being clicked");
  }


  const renderPrograms = () => {
    return programs.map((program) => (
      <div className="card" key={program.id}>
        <img src={program.programimagewide} alt="program snips" width="50" height="50" />
        <span>{program.name}</span>
        <p className="description">{program.description}</p>
      </div>
    ))
  }

  return (
    <div className="allprograms">
      <h1>3. All the programs for one channel</h1>
      <p onClick={() => handleClick()}>tablå</p>
      { programs && renderPrograms()}
    </div>
  );
}

export default AllProgramsForChannel;