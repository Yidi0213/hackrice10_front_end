import React from "react";
import Grid from "@material-ui/core/Grid";
import module from "./navigation.module.css";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Link } from "react-router-dom";

let Navigation = () => {
  return (
    <div className={module.nav}>
      <div style={{ height: "100%" }}>
        <Grid container style={{ height: "100%" }}>
          <Grid item xs={4} className={module.c}>
            Covid 19 Risk Factor Score
          </Grid>
          <Grid item xs={2}>
            {/* hello */}
          </Grid>
          <Grid item xs={6} className={module.c}>
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
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Navigation;
