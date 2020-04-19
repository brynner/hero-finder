import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { routes } from "./utils/RouterUtil";
import './App.css';

// Components
import AppBar from './components/ui/AppBar';
import HomePage from './components/pages/home';
import HeroPage from './components/pages/hero';

// Redux
import { connect } from "react-redux";
import editModeAction from "./actions/editModeAction";

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

        {this.props.editing ?
          'Yes'
          :
          'No'
        }

        <button
          onClick={() => this.props.editModeAction(!this.props.editing)}
        >
          Toggle
        </button>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  editModeAction: (payload) => dispatch(editModeAction(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);