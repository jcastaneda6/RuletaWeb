import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Dashboard from '../pages/Dashboard';
import PageError from './PageError/PageError';
import Page1 from './Page1/Page1';

/* function App(){
return(
  <BrowserRouter>
  <Switch>
    <Route path="/" component={Dashboard}></Route>
  </Switch>
  </BrowserRouter>
);
} 
export default App;
*/

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
              path="/Jugadores"
              render={() => <Page1 name="Jugadores" />} />
            <Route
              exact
              path="/Jugadores"
              render={() => <Page2 />} />
            <Route component={PageError} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
