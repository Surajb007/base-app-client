import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";
import axios from "axios";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    };
  }
  checkLoginStatus = () => {
    axios
      .get("http://localhost:3001/logged_in", { withCredentials: true })
      .then(res => {
        if (
          res.data.logged_in &&
          this.state.loggedInStatus === "NOT_LOGGED_IN"
        ) {
          this.setState({ loggedInStatus: "LOGGED_IN", user: res.data.user });
        } else if (
          !res.data.logged_in &&
          this.state.loggedInStatus === "LOGGED_IN"
        ) {
          this.setState({ loggedInStatus: "NOT_LOGGED_IN", user: {} });
        }
      })
      .catch(err => console.log(err));
  };
  componentDidMount = () => {
    this.checkLoginStatus();
  };
  handleLogin = data => {
    this.setState({ loggedInStatus: "Logged_In", user: data.user });
  };
  render() {
    return (
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Home
                  {...props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
            <Route
              exact
              path="/dashboard"
              render={props => (
                <Dashboard
                  {...props}
                  user={this.user}
                  loggedInStatus={this.state.loggedInStatus}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
