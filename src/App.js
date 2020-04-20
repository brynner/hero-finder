import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { routes } from "./utils/RouterUtil";
import './App.css';

// Components
import AppBar from './components/ui/AppBar';
import HomePage from './components/pages/home';
import HeroPage from './components/pages/hero';

class App extends Component {

  /**
   * WhileTyping Component: Buscar após soltar tecla...
   */
  filterData = (name, value) => {

    console.log('filterData');
    
  }
  
  render() {
    return (
      <div className="App">

        <AppBar callback={this.filterData} />

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
}

export default App;