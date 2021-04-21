import { createContext, useState, useEffect } from "react"; 

export const RadioContext = createContext(); 

const RadioProvider = (props) => {
  const [channels, setChannels] = useState(null); 

  useEffect(() => {
    getAllChannels(); 
  }, []); 

  const getAllChannels = async () => {
    let channels = await fetch("/api/v1/channels"); 
    channels = await channels.json(); 
    setChannels(channels); 
  }

  const values = {
    channels,
    getAllChannels
  }

  return(
    <RadioContext.Provider value={values}>
      {props.children}
    </RadioContext.Provider>
  )
}

export default RadioProvider; 