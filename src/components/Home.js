import React, { Component } from "react";
import Registration from "./auth/Registration";
import Login from "./auth/Login";
import Axios from "axios";

export default class Home extends Component {
  constructor(props) {
    super(props);
  }
  handleSuccessfulAuth = data => {
    this.props.handleLogin(data);
    // console.log(data);
    this.props.history.push("/dashboard");
  };
  handleLogOutCLick = e => {
    Axios.delete("http://localhost:3001/logout", { withCredentials: true })
      .then(res => this.props.handleLogout())
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div>
        <h1>Home</h1>
        <h1>Status: {this.props.loggedInStatus}</h1> 
        <p>Register here:</p>
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
        <br />
        <p>Already have an account, Login here:</p>
        <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
        <button onClick={this.handleLogOutCLick}>Logout</button>
      </div>
    );
  }
}
