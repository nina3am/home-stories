import React, { Component } from "react";
import { login } from "./auth-service";

export class Login extends Component {
  state = { email: "", password: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password;

    login(email, password)
      .then((response) => {
        this.setState({ email: response.email, password: response.password });
        this.props.updateUser(response);
        this.props.history.push("/profil");
      })
      .catch((error, response) => {
        console.log(error);
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <h1>
          {`Welcome
          Back 👋 `}
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa officia
          deleniti quod nulla reprehenderit aliquam earum esse cumque repellat
          laudantium consequuntur obcaecati necessitatibus eaque enim quis ullam
          error, explicabo nostrum!
        </p>
        <form onSubmit={this.handleFormSubmit}>
          <label>Email :</label>
          <input
            type='email'
            name='email'
            value={this.state.username}
            onChange={(e) => this.handleChange(e)}></input>
          <label>Mot de passe : </label>
          <input
            type='password'
            name='password'
            value={this.state.password}
            onChange={(e) => this.handleChange(e)}></input>
          <button>OK</button>
        </form>
      </div>
    );
  }
}

export default Login;
