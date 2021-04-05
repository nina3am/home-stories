import React, { Component } from "react";

import { Link } from "react-router-dom";
import { logout } from "../auth/auth-service";

export class NavBar extends Component {
  killSession = (event) => {
    logout({}).then((response) => {
      this.props.updateUser(null);
      this.props.history.push("/login");
    });
  };

  render() {
    return (
      <div>
        <div>
          <Link to='/'>LOGO</Link>
          {this.props.userInSession ? (
            <button
              onClick={(event) => {
                this.killSession(event);
              }}>
              Logout
            </button>
          ) : (
            <div>
              <Link to='/connexion'>Connexion</Link>
              <Link to='/creation-compte'>Créer un compte</Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default NavBar;
