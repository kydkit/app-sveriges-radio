import { BrowserRouter, Route } from 'react-router-dom';

import RadioProvider from "./contexts/RadioProvider"
import Home from './pages/Home';



const App = () => {
  return (
    <div className="App">
      <RadioProvider>
        <BrowserRouter>
          <Route exact path="/" component={Home} />
        </BrowserRouter>
      </RadioProvider>
    </div>
  );
}

export default App;