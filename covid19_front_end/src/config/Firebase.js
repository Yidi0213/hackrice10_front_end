import * as firebase from "firebase";
import * as firebaseui from "firebaseui";

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
  apiKey: "AIzaSyAfzKqCPPwtdP41NIKSJ7hOIrrspGEhA-8",
  authDomain: "covid19-risk-factor.firebaseapp.com",
  databaseURL: "https://covid19-risk-factor.firebaseio.com",
  projectId: "covid19-risk-factor",
  storageBucket: "covid19-risk-factor.appspot.com",
  messagingSenderId: "1098806426578",
  appId: "1:1098806426578:web:48d0b66200b036257b660b",
};

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig);

var ui = new firebaseui.auth.AuthUI(firebase.auth());

const firebaseui_init = () => {
  ui.start("#firebaseui-auth-container", {
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
      },
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID
    ],
    tosUrl: 'https://yidiwang.net'
    // Other config options...
  });
};

export const fire = Firebase;
export const authui_init = firebaseui_init;
