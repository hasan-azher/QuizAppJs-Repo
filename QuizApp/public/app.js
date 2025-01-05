// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdh4vFnejOdiPH7V46zMM1MMhYxRzXYEI",
  authDomain: "jawanpakistanproject.firebaseapp.com",
  projectId: "jawanpakistanproject",
  storageBucket: "jawanpakistanproject.firebasestorage.app",
  messagingSenderId: "983892529119",
  appId: "1:983892529119:web:2e47324d3529b5a760fe6a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

//Login & Register Functions
function register() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  if (!firstName || !lastName || !email || !password) {
    alert("All fields are required!");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("User Registered: " + userCredential.user.email);
      console.log("User details:", userCredential);
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert("Error: " + error.message);
      console.error("Error registering user:", error);
    });
}

function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    alert("Please enter both email and password!");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Login Successful: " + userCredential.user.email);
      window.location.href = "QuizMain.html";
    })
    .catch((error) => {
      alert("Error: " + error.message);
      console.error("Error logging in:", error);
    });
}

//Quiz Implementation
const correctAnswers = {
  q1: "Pakistan",
  q2: "All of the above",
  q3: "Script",
  q4: "false",
  q5: "onclick",
  q6: "false",
};

function submitQuiz() {
  const form = document.getElementById("quizForm");
  const formData = new FormData(form);

  let score = 0;
  const q1Answer = formData.get("q1");
  if (q1Answer === correctAnswers.q1) {
    score++;
  }

  const q2Answer = formData.get("q2");
  if (q2Answer === correctAnswers.q2) {
    score++;
  }

  const q3Answer = formData.get("q3");
  if (q3Answer === correctAnswers.q3) {
    score++;
  }
  const q4Answer = formData.get("q4");
  if (q4Answer === correctAnswers.q4) {
    score++;
  }
  const q5Answer = formData.get("q5");
  if (q5Answer === correctAnswers.q5) {
    score++;
  }

  const q6Answer = formData.get("q6");
  if (q6Answer === correctAnswers.q6) {
    score++;
  }

  const totalQuestions = 6;
  const percentage = (score / totalQuestions) * 100;

  const userEmail = auth.currentUser?.email;

  const result = {
    email: userEmail,
    score: score + "/" + totalQuestions,
    percentage: percentage + "%",
    timestamp: new Date(),
  };

  setDoc(doc(db, "quizResults", userEmail), result)
    .then(() => {
      alert("Quiz Submitted! Your score is " + percentage + "%.");
    })
    .catch((error) => {
      alert("Error saving the result: " + error.message);
    });
}

window.register = register;
window.login = login;
window.submitQuiz = submitQuiz;
