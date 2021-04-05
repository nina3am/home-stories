import React, { Component } from "react";
//import ReactDOM from "react-dom";

export class Login extends Component {
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
        <form>
          <input type='email' name='email'></input>
          <input type='password' name='password'></input>
        </form>
      </div>
    );
  }
}

export default Login;
