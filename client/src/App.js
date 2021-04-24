import { BrowserRouter, Route } from "react-router-dom";

import RadioProvider from "./contexts/RadioProvider";
import UserContext from "./contexts/UserContext";
// import Home from './pages/Home';
import Channels from "./pages/Channels";
import Navbar from "./components/Navbar";
import Channel from "./pages/Channel";
import Categories from "./pages/Categories";
import Login from "./pages/LoginPage";

const App = () => {
  return (
    <div className="App">
      <RadioProvider>
        <UserContext>
          <BrowserRouter>
            <Navbar />
            <Route exact path="/" component={Channels} />
            <Route exact path="/channels" component={Channels} />
            <Route exact path="/programs/:channelId" component={Channel} />
            <Route exact path="/categories" component={Categories} />
            <Route exact path="/login" component={Login} />
          </BrowserRouter>
        </UserContext>
      </RadioProvider>
    </div>
  );
};

export default App;
