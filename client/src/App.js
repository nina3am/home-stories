import logo from "./logo.svg";
import "./App.css";
import React from "react";

import isnull from "lodash.isnull";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import { loggedin } from "./components/auth/auth-service";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Profile from "./components/profile/Profile";
import Navbar from "./components/nav/NavBar";

class App extends React.Component {
  state = { loggedInUser: null };

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser() {
    if (this.state.loggedInUser === null) {
      loggedin()
        .then((data) => {
          this.setState({ loggedInUser: data });
        })
        .catch((err) => {
          this.setState({ loggedInUser: false });
        });
    }
  }

  updateLoggedInUser = (userObj) => {
    this.setState({
      loggedInUser: userObj,
    });
  };

  render() {
    //if (isnull(this.state.loggedInUser)) return "..loading";

    return (
      <div className='App'>
        <Route>
          <Navbar
            userInSession={this.state.loggedInUser}
            updateUser={this.updateLoggedInUser}
          />
          <Switch>
            <Route
              exact
              path='/connexion'
              render={(props) => (
                <Login
                  userInSession={this.state.loggedInUser}
                  history={props.history}
                  updateUser={this.updateLoggedInUser}
                />
              )}
            />
            <Route
              exact
              path='/creation-compte'
              render={(props) => (
                <Signup
                  userInSession={this.state.loggedInUser}
                  history={props.history}
                  updateUser={this.updateLoggedInUser}
                />
              )}
            />
            <Route
              exact
              path='/profil'
              render={(props) => (
                <Profile
                  userInSession={this.state.loggedInUser}
                  history={props.history}
                  updateUser={this.updateLoggedInUser}
                />
              )}
            />
          </Switch>
        </Route>
      </div>
    );
  }
}

export default App;
