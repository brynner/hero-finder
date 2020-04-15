import React from 'react';
import { Route } from 'react-router-dom';
import { routes } from "./utils/RouterUtil";

// Sections
import Home from './components/sections/home';

function App() {
  return (
    <div className="App">

      <Route exact
        path={routes.home.path}
        render={(props) => <Home {...props} />}
      />

    </div>
  )
}

export default App;