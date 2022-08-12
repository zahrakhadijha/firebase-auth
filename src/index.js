import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import {
  getAuth,
  AuthErrorCodes,
  onAuthStateChanged,
  connectAuthEmulator,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD4koinwSZIYkRP3lKzeHufr8QE0aDeok8",
  authDomain: "zahra-auth.firebaseapp.com",
  projectId: "zahra-auth",
  storageBucket: "zahra-auth.appspot.com",
  messagingSenderId: "329871843324",
  appId: "1:329871843324:web:bdcab679ac7d73fbf45c79",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Auth State

onAuthStateChanged(auth, (user) => {
  if (user !== null) {
    console.log("Logged in!");
  } else {
    console.log("User not found!");
  }
});

connectAuthEmulator(auth, "http://localhost:9099");

// DOM Manipulation

const loginBtn = document.querySelector("#loginBtn");
const emailText = document.querySelector("#email-text");
const passwordText = document.querySelector("#password-text");
const loginErrorMsg = document.querySelector("#loginErrorMsg");
const errorMsg = document.querySelector("#errorMsg");

// error handling

const showLoginError = (error) => {
  loginErrorMsg.style.display = "block";
  if (error.code == AuthErrorCodes.INVALID_PASSWORD) {
    errorMsg.innerHTML = "Wrong Password. Try Again!";
  } else {
    errorMsg.innerHTML = `Error: ${error.message}`;
  }
};

// hide error message

const hideLoginError = () => {
  loginErrorMsg.style.display = "none";
  errorMsg.innerHTML = "";
};

const loginEmailPassword = async () => {
  const loginEmail = emailText.value;
  const loginPassword = passwordText.value;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
    console.log(userCredential.user);
  } catch (error) {
    console.log(error);
    showLoginError(error);
  }
};

loginEmailPassword();

loginBtn.addEventListener("click", loginEmailPassword);
