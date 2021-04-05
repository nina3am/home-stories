import logo from "./logo.svg";
import "./App.css";
import React from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import Login from "./components/auth/Login";

class App extends React.Component {
  state = { loggedInUser: null, windowWidth: window.innerWidth };

  componentDidMount() {}

  render() {
    //if (isnull(this.state.loggedInUser)) return "..loading";

    return (
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;
