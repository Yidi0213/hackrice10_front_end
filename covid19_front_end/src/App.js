import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import module from "./App.module.css";
import Navigation from "./components/navigation/navigation";
import DailyInfo from "./components/form/basicInfo";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import { fire } from "./config/Firebase";
import BasicInfo from "./components/form/basicInfo";
import FootBar from "./components/footBar/footBar";

class App extends Component {
  state = {
    user: {},
  };

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }

  render() {
    return (
      <Router>
        <div className={module.App}>
          <Navigation />
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/basic_info">
              <BasicInfo />
            </Route>
            <Route path="/">
              <DailyInfo />
            </Route>
          </Switch>
          <FootBar />
        </div>
      </Router>
    );
  }
}

export default App;
