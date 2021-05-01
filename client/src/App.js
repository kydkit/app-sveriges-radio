import { BrowserRouter, Route } from "react-router-dom";

import RadioProvider from "./contexts/RadioProvider";
import UserContext from "./contexts/UserContext";
import Channels from "./pages/Channels";
import Navbar from "./components/Navbar";
import Channel from "./pages/Channel";
import Categories from "./pages/Categories";
import Login from "./pages/LoginPage";
import Favorites from "./pages/FavoritesPage";

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
            <Route exact path="/favorites" component={Favorites} />
            <Route exact path="/login" component={Login} />
          </BrowserRouter>
        </UserContext>
      </RadioProvider>
    </div>
  );
};

export default App;
