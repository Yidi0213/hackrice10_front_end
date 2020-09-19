import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import module from "./App.module.css";
import Navigation from "./components/navigation/navigation";
import DailyInfo from "./components/form/basicInfo";
import Score from "./components/score/score";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import {fire} from "./config/Firebase";
import  BasicInfo from "./components/form/basicInfo";

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
              <BasicInfo/>
            </Route>
            <Route path="/">
              <Grid container>
                <Grid item xs={12} sm={5} md={4}>
                  <DailyInfo />
                </Grid>
                <Grid item xs={12} sm={7} md={8}>
                  <Score />
                </Grid>
              </Grid>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
