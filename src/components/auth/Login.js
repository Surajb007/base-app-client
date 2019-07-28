import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loginErrors: ""
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    console.log("Form Submitted");
    axios
      .post(
        "http://localhost:3001/sessions",
        {
          user: {
            email: email,
            password: password
          }
        },
        { withCredentials: true }
      )
      .then(res => {
        if (res.data.logged_in) {
          console.log(res.data);
          this.props.handleSuccessfulAuth(res.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          {/* <input
            type="password"
            name="password_confirmation"
            placeholder="password_confirmation"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
          /> */}
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}
