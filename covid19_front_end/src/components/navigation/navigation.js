import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import module from "./navigation.module.css";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Link } from "react-router-dom";
import { fire} from "../../config/Firebase";

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
            <Button>
              <Link to="/basic_info">User Info</Link>
            </Button>
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
          <Grid item xs={4} className={module.c}>
            Covid 19 Risk Factor Score
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
