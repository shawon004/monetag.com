
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

  const snapshot = await getDocs(collection(db, "withdrawRequests"));
  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${data.email}</td>
      <td>${data.amount} টাকা</td>
      <td>${data.status}</td>
      <td>
        <button onclick="approveRequest('${docSnap.id}')">Approve</button>
        <button class="reject-btn" onclick="rejectRequest('${docSnap.id}')">Reject</button>
      </td>
    `;
    table.appendChild(row);
  });
}

window.approveRequest = async (id) => {
  const ref = doc(db, "withdrawRequests", id);
  await updateDoc(ref, { status: "Approved" });
  alert("✅ Approve করা হয়েছে");
  loadRequests();
};

window.rejectRequest = async (id) => {
  const ref = doc(db, "withdrawRequests", id);
  await updateDoc(ref, { status: "Rejected" });
  alert("❌ Reject করা হয়েছে");
  loadRequests();
};

window.onload = loadRequests;
