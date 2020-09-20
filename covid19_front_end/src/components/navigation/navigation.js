import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import module from "./navigation.module.css";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Link } from "react-router-dom";
import { fire } from "../../config/Firebase";
import pic from "./logo.png";

let Navigation = () => {
  const [user, setUser] = useState(null);
  const [action, setAction] = useState(null);
  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser({ user });
        setAction(
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="contained primary button group"
          >
            <Button onClick={() => fire.auth().signOut()}>Log out</Button>
          </ButtonGroup>
        );
      } else {
        setUser({ user: null });
        setAction(
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="contained primary button group"
          >
            <Button>
              <Link to="/login">log in</Link>
            </Button>
            <Button>
              <Link to="/signup">sign up</Link>
            </Button>
          </ButtonGroup>
        );
      }
    });
  }, []);

  return (
    <div className={module.nav}>
      <div style={{ height: "100%" }}>
        <Grid container style={{ height: "100%" }}>
          <Grid item xs={2}>
              <img src={pic} style= {{height:"60px",width:"60px"}}></img>
          </Grid>
          <Grid item xs={2} className={module.logo}>
            Covid 19 Risk Factor Score Calculator
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={6} className={module.c}>
            {action}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Navigation;
