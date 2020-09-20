import React from "react";
import Grid from "@material-ui/core/Grid";
import module from "./footBar.module.css";

const FootBar = () => {
  return (
    <div className={module.footbar}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
            DISCLAIMER: We do not retain any information that you provide in connection with
            your use of the tool. THE INFORMATION PROVIDED BY THIS TOOL IS NOT MEDICAL
            ADVICE AND CANNOT BE USED TO DIAGNOSE OR TREAT ANY MEDICAL
            CONDITION. 
        </Grid>
        <Grid item xs={4}>
            Made By HackRice X RainBow Team:
            Boyuan,Maki,Lily,Yidi
        </Grid>
      </Grid>
    </div>
  );
};

export default FootBar;
