
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './components/Navbar';
import Home from './Home/Home';
import './assets/css/App.css';
import Ruleta from './components/Ruleta';
import Jugador from './components/Jugador';
import Partida from './components/Partida';



class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <Redirect
            from="/"
            to="/home" />
          <Switch>
            <Route
              path="/home"
              component={Home} />
            <Route
              exact
              path="/components/Ruleta"
              component={Ruleta}/>
            <Route
              exact
              path="/components/Jugador"
              component={Jugador}/>    
            <Route
              exact
              path="/components/Partida"
              component={Partida}/>                          
            
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;