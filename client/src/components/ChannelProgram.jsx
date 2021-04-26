import { useEffect, useContext} from "react";

import { RadioContext } from "../contexts/RadioProvider";

const ChannelProgram = (props) => {

  const { programs, getChannelSchedule } = useContext(RadioContext);
  const  channelId  = props.channelId;

  useEffect(() => {
    getChannelSchedule(channelId);
    // eslint-disable-next-line
  }, []);

  const renderPrograms = () => {
    if (programs) {
      if (programs.length > 0) {
        return programs.map((program) => (
          <div className="card" key={program.id}>
            <img
              src={program.programimagewide}
              alt="program snips"
              width="50"
              height="50"
            />
            <h3>{program.name}</h3>
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
    <div className="renderprograms">
      <h3>3. All the programs for one channel</h3>
      {programs && renderPrograms()}
    </div>
  )
}

export default ChannelProgram;