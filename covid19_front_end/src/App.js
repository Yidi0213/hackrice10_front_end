import React from "react";
import Grid from "@material-ui/core/Grid";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import module from "./App.module.css";
import Navigation from "./components/navigation/navigation";
import Form from "./components/form/form";
import Score from "./components/score/score";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";

function App() {
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
          <Route path="/">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={5} md={4}>
                <Form />
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

export default App;
