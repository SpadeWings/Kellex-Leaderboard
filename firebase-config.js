// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyBS_oX2uqItfNqd-7G9TSHnP-RUxviNLWc",
  authDomain: "leaderboard-900f1.firebaseapp.com",
  projectId: "leaderboard-900f1",
  storageBucket: "leaderboard-900f1.firebasestorage.app",
  messagingSenderId: "511470946131",
  appId: "1:511470946131:web:96bfb89e797a6bf12f03a6",
  measurementId: "G-WNNMR7PYYD"
};

export const app = initializeApp(firebaseConfig);