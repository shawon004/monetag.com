import { auth, db } from "./firebase.js";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

window.onload = async () => {
  const uid = localStorage.getItem("uid");
  if (!uid) return window.location.href = "index.html";

  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const user = userSnap.data();
    document.getElementById("balance").innerText = user.balance + " টাকা";
    document.getElementById("refLink").value = `${window.location.origin}/?ref=${uid}`;
    if (user.balance >= 1000) {
      document.getElementById("withdrawBtn").disabled = false;
    }
  }
};

window.withdraw = async () => {
  const uid = localStorage.getItem("uid");
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const user = userSnap.data();
    if (user.balance >= 1000) {
      await addDoc(collection(db, "windowrequest"), {
        uid,
        email: user.email,
        amount: user.balance,
        status: "Pending",
        timestamp: serverTimestamp()
      });
      await updateDoc(userRef, { balance: 0 });
      alert("Withdraw Request Sent!");
      document.getElementById("balance").innerText = "0 টাকা";
    } else {
      alert("১০০০ টাকা না হলে উইথড্র সম্ভব না।");
    }
  }
};

window.logout = () => {
  localStorage.removeItem("uid");
  window.location.href = "index.html";
};