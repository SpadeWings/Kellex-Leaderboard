import { app } from "./firebase-config.js";  
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";  
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";  

const db = getFirestore(app);  
const auth = getAuth(app);  

const loginBox = document.getElementById("loginBox");  
const updateForm = document.getElementById("updateForm");  

// Login button
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

// Auth state listener
onAuthStateChanged(auth, (user) => {  
  if (user) {  
    loginBox.style.display = "none";  
    updateForm.style.display = "block";  
  } else {  
    loginBox.style.display = "block";  
    updateForm.style.display = "none";  
  }  
});  

// Update form submission
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
    const learnerRef = doc(db, "learners", name);
    const learnerSnap = await getDoc(learnerRef);

    if (learnerSnap.exists()) {
      const data = learnerSnap.data();

      // Update lastScore before changing score
      await updateDoc(learnerRef, {
        lastScore: data.score || 0,
        score: score,
        class: className
      });

    } else {
      // If learner doesn't exist, create it with lastScore = 0
      await setDoc(learnerRef, {
        name: name,
        class: className,
        score: score,
        lastScore: 0
      });
    }

    alert(`Score updated for ${name} (${score} ⭐)`);  
    updateForm.reset();  
  } catch (err) {  
    console.error("Error updating: ", err);  
    alert("Failed to update.");  
  }  
});
