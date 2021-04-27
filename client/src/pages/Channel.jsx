import { useState, useEffect } from "react";

import ChannelProgram from '../components/ChannelProgram';
import ChannelSchedule from '../components/ChannelSchedule';

const Channel = (props) => {
  const { channelId } = props.match.params;
  const [showPrograms, setShowPrograms] = useState(false);

  useEffect(() => {
    setShowPrograms(true);
    // eslint-disable-next-line
  }, [])

  const channelnav = () => {
    const handleClickPrograms = () => {
      setShowPrograms(true)
    }

    const handleClickSchedule = () => {
      setShowPrograms(false);
    }

    return (
      <div>
        <p onClick={handleClickPrograms}>programs</p>
        <p onClick={() => { handleClickSchedule() }}>schedule</p>
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
