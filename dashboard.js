
document.addEventListener("DOMContentLoaded", () => {
  const uid = localStorage.getItem("uid") || "demoUser123";
  const referred_by = localStorage.getItem("referred_by");

  let adsWatched = 5;
  let referralIncome = referred_by ? 1 : 0;
  let totalEarned = adsWatched + referralIncome;

  document.getElementById("username").textContent = uid.substring(0, 8);
  document.getElementById("adsWatched").textContent = adsWatched;
  document.getElementById("refIncome").textContent = referralIncome + " টাকা";
  document.getElementById("totalEarned").textContent = totalEarned + " টাকা";
  document.getElementById("refLink").textContent = "https://monetag-com.vercel.app/signup.html?ref=" + uid;

  if (totalEarned >= 1000) {
    document.getElementById("withdrawBtn").disabled = false;
  }
});
