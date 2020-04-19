import React from 'react';
import { Route } from 'react-router-dom';
import { routes } from "./utils/RouterUtil";
import './App.css';

// Pages
import HomePage from './components/pages/home';
import HeroPage from './components/pages/hero';

function App() {
  return (
    <div className="App">

      <Route exact
        path={routes.home.path}
        render={(props) => <HomePage {...props} />}
      />

      <Route exact
        path={routes.hero.path}
        render={(props) => <HeroPage {...props} />}
      />

    </div>
  )
}

export default App;