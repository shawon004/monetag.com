
// firebase.js

// Firebase Import
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyA9oQm1ITCmWz6fGQy6gAFr6ZrhP81BngI",
  authDomain: "monetag-ec520.firebaseapp.com",
  projectId: "monetag-ec520",
  storageBucket: "monetag-ec520.appspot.com",
  messagingSenderId: "243993316979",
  appId: "1:243993316979:web:ff5b91a352d32856896406"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Sign Up Function
window.signup = () => {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const uid = userCredential.user.uid;
      localStorage.setItem("uid", uid);

      // Check for referral
      const urlParams = new URLSearchParams(window.location.search);
      const ref = urlParams.get("ref");

      let balance = 0;

      if (ref) {
        const refDoc = doc(db, "users", ref);
        const refSnap = await getDoc(refDoc);
        if (refSnap.exists()) {
          const currentBal = refSnap.data().balance || 0;
          await setDoc(refDoc, { balance: currentBal + 1 }, { merge: true });
        }
      }

      await setDoc(doc(db, "users", uid), {
        email: email,
        balance: balance
      });

      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert("সাইনআপে সমস্যা হয়েছে: " + error.message);
    });
};

// Login Function
window.login = () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const uid = userCredential.user.uid;
      localStorage.setItem("uid", uid);
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert("লগইনে সমস্যা হয়েছে: " + error.message);
    });
};

// Logout Function
window.logout
