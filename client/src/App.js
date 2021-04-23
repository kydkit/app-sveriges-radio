import { BrowserRouter, Route } from 'react-router-dom';

import RadioProvider from "./contexts/RadioProvider"
import Home from './pages/Home';
import Channels from './pages/Channels'; 
import Navbar from './components/Navbar'; 
import AllProgForChannel from './pages/AllProgramsForChannel'; 
import Categories from './pages/Categories'



const App = () => {
  return (
    <div className="App">
      <RadioProvider>
        <BrowserRouter>
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route exact path="/channels" component={Channels} />
          <Route exact path="/programs/:channelId" component={AllProgForChannel} />
          <Route exact path="/categories" component={Categories} />
        </BrowserRouter>
      </RadioProvider>
    </div>
  );
}

export default App;