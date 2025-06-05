import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "monetag-ec520.firebaseapp.com",
  projectId: "monetag-ec520",
  storageBucket: "monetag-ec520.appspot.com",
  messagingSenderId: "243993316979",
  appId: "1:243993316979:web:ff5b91a352d32856896406"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };