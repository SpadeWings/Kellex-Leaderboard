import { app } from "./firebase-config.js";
import { getFirestore, doc, setDoc } 
  from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } 
  from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

const db = getFirestore(app);
const auth = getAuth(app);

const loginBox = document.getElementById("loginBox");
const updateForm = document.getElementById("updateForm");

document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, pass);
    alert("Login successful");
  } catch (err) {
    alert("Login failed: " + err.message);
  }
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    loginBox.style.display = "none";
    updateForm.style.display = "block";
  } else {
    loginBox.style.display = "block";
    updateForm.style.display = "none";
  }
});

updateForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const className = document.getElementById("class").value.trim();
  const score = parseInt(document.getElementById("score").value, 10);

  if (!name || !className || isNaN(score)) {
    alert("Please fill all fields correctly.");
    return;
  }

  try {
    await setDoc(doc(db, "learners", name), {
      name: name,
      class: className,
      score: score
    });
    alert("Score updated for " + name);
    updateForm.reset();
  } catch (err) {
    console.error("Error updating: ", err);
    alert("Failed to update.");
  }
});