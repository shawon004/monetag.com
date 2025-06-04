
// Firebase config (replace with your actual config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MSG_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Signup function
function signup() {
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      const uid = userCredential.user.uid;
      const refParam = new URLSearchParams(window.location.search).get("ref");
      localStorage.setItem("uid", uid);
      if (refParam) {
        localStorage.setItem("referred_by", refParam);
      }
      alert("সাইন আপ সফল!");
      window.location.href = "dashboard.html";
    })
    .catch(error => alert("ভুল হয়েছে: " + error.message));
}

// Login function
function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      localStorage.setItem("uid", userCredential.user.uid);
      window.location.href = "dashboard.html";
    })
    .catch(error => alert("ভুল হয়েছে: " + error.message));
}

// Logout function
function logout() {
  auth.signOut().then(() => {
    localStorage.clear();
    window.location.href = "login.html";
  });
}
