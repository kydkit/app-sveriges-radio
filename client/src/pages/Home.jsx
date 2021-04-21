import { useContext } from 'react'; 
import { RadioContext } from "../contexts/RadioProvider"; 


const Home = () => {
  const { channels } = useContext(RadioContext);

  console.log("channels: ", channels);
  
  return (
    <div className="home">
      <h1>Hi from homepage</h1>
    </div>
  );
}
 
export default Home;