import React, { Component } from "react";
import { signup } from "./auth-service.js";

export class Signup extends Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    errorMessage: "",
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const firstname = this.state.firstname;
    const lastname = this.state.lastname;
    const email = this.state.email;
    const password = this.state.password;

    signup(firstname, lastname, email, password)
      .then((response) => {
        this.setState({ firstname: "", lastname: "", email: "", password: "" });
        this.props.updateUser(response);
        this.props.history.push("/profil");
      })
      .catch((error) =>
        // this.setState({ errorMessage: error.response.data.message })
        console.log(error)
      );
  };

  // HERE
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <h1>Création de compte</h1>
        <form onSubmit={this.handleFormSubmit}>
          <label>Prénom *</label>
          <input
            type='text'
            name='firstname'
            value={this.state.firstname}
            onChange={(e) => this.handleChange(e)}
            required></input>
          <label>Nom *</label>
          <input
            type='text'
            name='lastname'
            value={this.state.lastname}
            onChange={(e) => this.handleChange(e)}
            required></input>
          <label>Email *</label>
          <input
            type='email'
            name='email'
            value={this.state.email}
            onChange={(e) => this.handleChange(e)}
            required></input>
          <label>Mot de passe *</label>
          <input
            type='password'
            name='password'
            value={this.state.password}
            onChange={(e) => this.handleChange(e)}
            required></input>
          <button>OK</button>
          {this.state.errorMessage && (
            <h3 className='error'> {this.state.errorMessage} </h3>
          )}
        </form>
      </div>
    );
  }
}

export default Signup;
