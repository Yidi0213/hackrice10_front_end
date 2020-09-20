import React, { Component } from "react";
import module from "./form.module.css";
import TextField from "@material-ui/core/TextField";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { fire, firedb } from "../../config/Firebase";
import { auth } from "firebase";

const step1 = [
  "Location",
  "Basic Infomation",
  "Prior Disease(Medical Problems) History",
  "Previous contacts with COVID-19 patients",
];

const step2 = [
  "Location",
  "Basic Infomation",
  "Prior Disease(Medical Problems) History",
  "Previous contacts with COVID-19 patients",
  "Symptoms",
];

class BasicInfo extends Component {
  state = {
    activeStep: 0,
    location: {
      zipcode: null,
    },
    basicInfo: {
      age: null,
      gender: null,
      smoking: null,
      preganancy: null,
    },
    priorDisease: {
      pneumonia: false,
      diabetes: false,
      copd: false,
      asthma: false,
      immunosuppression: false,
      hypertension: false,
      cardiovascular: false,
      obesity: false,
      chronicKidneyDisease: false,
      chronicLungDisease: false,
      gastrointestinal: false,
      heartDisease: false,
      otherDiseases: false,
    },
    contact: {
      abroadTravel: false,
      largeGathering: false,
      contactCovid19: false,
      notWearMask: false,
      visitPublicExposedPlaces: false,
      sanitizationFromMarket: false,
      familyExposed: false,
    },
    symptoms: {
      fever: false,
      fatigue: false,
      dryCough: false,
      difficultBreath: false,
      runnyNose: false,
      soreThroat: false,
      headache: false,
    },
    steps: [
      "Location",
      "Basic Infomation",
      "Prior Disease(Medical Problems) History",
      "Previous contacts with COVID-19 patients",
    ],
  };

  handleContact = () => {
    let b = Object.values(this.state.contact).some((val) => val === true);

    if (b) {
      this.setState({ steps: step2 });
    } else {
      this.setState({ steps: step1 });
    }
  };

  componentDidMount() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        var query = firedb
          .collection("basic_info")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              let data = doc.data();
              this.setState((prevState) => {
                prevState.basicInfo = data.basicInfo;
                prevState.contact = data.contact;
                prevState.location = data.location;
                prevState.priorDisease = data.priorDisease;
                prevState.symptoms = data.symptoms;
                prevState.steps = data.steps;
                return prevState;
              });
            }
          });
      } else {
        console.log("user not logged in.");
      }
    });
  }

  createPriorDiseaseCheckBox = (n, label) => (
    <FormControlLabel
      control={
        <Checkbox
          checked={this.state.priorDisease[n]}
          onChange={(event) =>
            this.setState({
              priorDisease: {
                ...this.state.priorDisease,
                [event.target.name]: event.target.checked,
              },
            })
          }
          name={n}
          color="primary"
        />
      }
      label={label}
    />
  );

  createContactCheckBox = (n, label) => (
    <FormControlLabel
      control={
        <Checkbox
          checked={this.state.contact[n]}
          onChange={(event) => {
            let e = event.target;
            this.setState((prevState) => {
              prevState.contact[e.name] = e.checked;
              let b = Object.values(prevState.contact).some(
                (val) => val === true
              );
              if (b) {
                prevState.steps = step2;
              } else {
                prevState.steps = step1;
              }
              return prevState;
            });
          }}
          name={n}
          color="primary"
        />
      }
      label={label}
    />
  );

  createSymptomsCheckBox = (n, label) => (
    <FormControlLabel
      control={
        <Checkbox
          checked={this.state.symptoms[n]}
          onChange={(event) =>
            this.setState({
              symptoms: {
                ...this.state.symptoms,
                [event.target.name]: event.target.checked,
              },
            })
          }
          name={n}
          color="primary"
        />
      }
      label={label}
    />
  );
  getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <TextField
            required
            id="standard-basic"
            label="Zip Code"
            onChange={(val) =>
              this.setState({ location: { zipcode: val.target.value } })
            }
            value={this.state.location.zipcode}
          />
        );
      case 1:
        return (
          <>
            <TextField
              required
              id="standard-basic"
              label="Age"
              onChange={(val) =>
                this.setState({
                  basicInfo: { ...this.state.basicInfo, age: val.target.value },
                })
              }
              value={this.state.basicInfo.age}
            />
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender"
                onChange={(val) =>
                  this.setState({
                    basicInfo: {
                      ...this.state.basicInfo,
                      gender: val.target.value,
                    },
                  })
                }
                value={this.state.basicInfo.gender}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
            <FormControl component="fieldset">
              <FormLabel component="legend">Do you smoke?</FormLabel>
              <RadioGroup
                aria-label="smoke"
                name="smoke"
                onChange={(val) =>
                  this.setState({
                    basicInfo: {
                      ...this.state.basicInfo,
                      smoking: val.target.value,
                    },
                  })
                }
                value={this.state.basicInfo.smoking}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
            <FormControl component="fieldset">
              <FormLabel component="legend">Are you preganant?</FormLabel>
              <RadioGroup
                aria-label="preganant"
                name="preganant"
                onChange={(val) =>
                  this.setState({
                    basicInfo: {
                      ...this.state.basicInfo,
                      preganancy: val.target.value,
                    },
                  })
                }
                value={this.state.basicInfo.preganancy}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </>
        );
      case 2:
        return (
          <>
            <p>Do you have diseases listed below?</p>
            {this.createPriorDiseaseCheckBox("pneumonia", "Pneumonia")}
            {this.createPriorDiseaseCheckBox("asthma", "Asthma")}
            {this.createPriorDiseaseCheckBox(
              "cardiovascular",
              "Cardio Vascular Disease"
            )}
            {this.createPriorDiseaseCheckBox("copd", "COPD")}
            {this.createPriorDiseaseCheckBox("diabetes", "Diabetes")}
            {this.createPriorDiseaseCheckBox("hypertension", "Hypertension")}
            {this.createPriorDiseaseCheckBox(
              "immunosuppression",
              "Immunosuppression"
            )}
            {this.createPriorDiseaseCheckBox(
              "chronicKidneyDisease",
              "Chronic Kidney Disease"
            )}
            {this.createPriorDiseaseCheckBox(
              "chronicLungDisease",
              "Chronic Lunge Disease"
            )}
            {this.createPriorDiseaseCheckBox(
              "gastrointestinal",
              "Gastrointestinal Disease"
            )}
            {this.createPriorDiseaseCheckBox("obesity", "Obesity")}
            {this.createPriorDiseaseCheckBox("heartDisease", "Heart Disease")}
            {this.createPriorDiseaseCheckBox("otherDiseases", "Other Diseases")}
          </>
        );
      case 3:
        return (
          <div>
            {this.createContactCheckBox(
              "abroadTravel",
              "Have you traveled abroad last month?"
            )}
            {this.createContactCheckBox(
              "largeGathering",
              "Have you participated any large gatherings last month?"
            )}
            {this.createContactCheckBox(
              "contactCovid19",
              "Have you directly contacted any COVID19 patients?"
            )}
            {this.createContactCheckBox(
              "notWearMask",
              "Have you NOT wear a mask in a crowded space?"
            )}
            {this.createContactCheckBox(
              "visitPublicExposedPlaces",
              "Have you visitted any public exposed places before?"
            )}
            {this.createContactCheckBox(
              "sanitizationFromMarket",
              "Have you kept sanitizing when you visited public area?"
            )}
            {this.createContactCheckBox(
              "familyExposed",
              "Have your family been exposed to COVID19?"
            )}
          </div>
        );
      case 4:
        return (
          <div>
            <p>Do you have any of the following symptoms:</p>
            {this.createSymptomsCheckBox("fever", "Fever")}
            {this.createSymptomsCheckBox("fatigue", "Fatigue")}
            {this.createSymptomsCheckBox("dryCough", "Dry Cough")}
            {this.createSymptomsCheckBox(
              "difficultBreath",
              "Difficulty in breath"
            )}
            {this.createSymptomsCheckBox("runnyNose", "Runny Nose")}
            {this.createSymptomsCheckBox("soreThroat", "Sore Throat")}
            {this.createSymptomsCheckBox("headache", "Headache")}
          </div>
        );
      default:
        return "Unknown step";
    }
  };

  handleNext = () => {
    this.setState({ activeStep: this.state.activeStep + 1 });
  };

  handleBack = () => {
    this.setState({ activeStep: this.state.activeStep - 1 });
  };

  handleReset = () => {
    this.setState({ activeStep: 0 });
  };

  handleSubmit = () => {
    let data = {
      basicInfo: this.state.basicInfo,
      contact: this.state.contact,
      location: this.state.location,
      priorDisease: this.state.priorDisease,
      symptoms: this.state.symptoms,
      steps: this.state.steps,
      activeStep: 0,
    };
    data.basicInfo.preganancy =
      data.basicInfo.preganancy == "yes" ? true : false;
    data.basicInfo.smoking = data.basicInfo.smoking == "yes" ? true : false;
    data.basicInfo.age = +data.basicInfo.age;
    data.location.zipcode = +data.location.zipcode;
    data.basicInfo.sex = data.basicInfo.sex === "female" ? 0 : 1;
    data["userID"] = fire.auth().currentUser.uid;
    firedb
      .collection("basic_info")
      .doc(fire.auth().currentUser.uid)
      .set(data)
      .then((docRef) => {
        console.log(docRef.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleGetScore = () => {
    fetch("https://10.36.31.66/dynamic_score", {
      method: "POST",
      body: JSON.stringify(this.state),
    }).then((res) => {
      console.log(res);
    });
  };
  render() {
    return (
      <div>
        <Stepper activeStep={this.state.activeStep} orientation="vertical">
          {this.state.steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                {this.getStepContent(index)}
                <div>
                  <div>
                    <Button
                      disabled={this.state.activeStep === 0}
                      onClick={this.handleBack}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                    >
                      {this.state.activeStep === this.state.steps.length - 1
                        ? "Finish"
                        : "Next"}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {this.state.activeStep === this.state.steps.length && (
          <Paper square elevation={0}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={this.handleSubmit}>Submit</Button>
            <Button onClick={this.handleReset}>Reset</Button>
          </Paper>
        )}
        <button onClick={this.handleGetScore}>get somethings</button>
      </div>
    );
  }
}

export default BasicInfo;
