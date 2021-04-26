import { useState, useEffect, useContext } from "react";

import { RadioContext } from "../contexts/RadioProvider";
import ChannelProgram from  '../components/ChannelProgram'; 
import ChannelSchedule from '../components/ChannelSchedule'; 

const Channel = (props) => {
  const { getChannelById } = useContext(RadioContext); 
  const { channelId, date } = props.match.params;
  const [showPrograms, setShowPrograms] = useState(false); 

  useEffect(() => {
    setShowPrograms(true); 
    // eslint-disable-next-line
  },[])

  const channelnav = () => {
    const handleClickPrograms = () => {
      setShowPrograms(true)
    }

    const handleClickSchedule = () => {
      setShowPrograms(false); 
    }

    return(
      <div>
        <span onClick={handleClickPrograms}>programs</span>
        <span onClick={() => {handleClickSchedule()}}>tabla</span>
      </div>
    )
  }

  return (
    <div className="allprograms">
      {channelnav()}
      {showPrograms ? <ChannelProgram channelId={channelId} /> : <ChannelSchedule channelId={channelId} />}
    </div>
  );
};

export default Channel;
