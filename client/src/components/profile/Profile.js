import React, { Component } from "react";
import { getUser } from "../auth/auth-service";
import isnull from "lodash.isnull";

export class Profile extends Component {
  render() {
    return (
      <div>
        {this.props.userInSession ? (
          <div>
            <h1>Profil</h1>
            <p>Prénom : {this.props.userInSession.firstname}</p>
            <p>Nom : {this.props.userInSession.lastname}</p>
            <p>Email : {this.props.userInSession.email}</p>
            <h2>Mes propriétés</h2>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

export default Profile;
