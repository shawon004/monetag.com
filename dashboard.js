import { auth, db } from "./firebase.js";
import { doc, getDoc, updateDoc, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

window.onload = async () => {
  const uid = localStorage.getItem("uid");
  if (!uid) return location.href = "index.html";

  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  const user = snap.data();
  document.getElementById("balance").innerText = user.balance + " টাকা";
  document.getElementById("refLink").value = location.origin + "?ref=" + uid;

  if (user.balance >= 1000) {
    document.getElementById("withdrawBtn").disabled = false;
  }
};

window.withdraw = async () => {
  const uid = localStorage.getItem("uid");
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  const user = snap.data();
  if (user.balance >= 1000) {
    await addDoc(collection(db, "windowrequest"), { email: user.email, amount: user.balance, status: "Pending" });
    await updateDoc(ref, { balance: 0 });
    alert("Withdraw request submitted!");
    document.getElementById("balance").innerText = "0 টাকা";
  } else {
    alert("১০০০ টাকা না হলে উইথড্র সম্ভব না।");
  }
};