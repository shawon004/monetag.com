import { db } from './firebase.js';
import {
  collection,
  getDocs,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

async function loadRequests() {
  const table = document.getElementById("requestTable");
  table.innerHTML = "";

  const snapshot = await getDocs(collection(db, "windowrequest"));
  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${data.email}</td>
      <td>${data.amount} টাকা</td>
      <td>${data.status}</td>
      <td>
        <button onclick="approveRequest('${docSnap.id}')">Approve</button>
        <button onclick="rejectRequest('${docSnap.id}')">Reject</button>
      </td>
    `;
    table.appendChild(row);
  });
}

window.approveRequest = async (id) => {
  await updateDoc(doc(db, "windowrequest", id), { status: "Approved" });
  alert("Approved!");
  loadRequests();
};

window.rejectRequest = async (id) => {
  await updateDoc(doc(db, "windowrequest", id), { status: "Rejected" });
  alert("Rejected!");
  loadRequests();
};

window.onload = loadRequests;