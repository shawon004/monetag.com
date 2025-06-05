import { auth, db } from './firebase.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

window.signup = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(db, "users", userCredential.user.uid), { email, balance: 0, role: "User" });
  localStorage.setItem("uid", userCredential.user.uid);
  location.href = "dashboard.html";
};

window.login = async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  localStorage.setItem("uid", userCredential.user.uid);
  location.href = "dashboard.html";
};

window.logout = () => {
  localStorage.removeItem("uid");
  location.href = "index.html";
};