// =============== DEMO DATA ===============
let demoStats = {
  members: 1324,
  deposit: 25340,
  payout: 11890,
  balance: 1250.5,
  self: 500,
  roi: 7.5,
  sponsor: 320,
  generation: 423,
  team: 87,
  income: 2450
};

const deposits = [
  { member: "Rafi", pkg: "$100 Pro", amount: 100, date: "2025-11-18" },
  { member: "Sumi", pkg: "$20 Starter", amount: 20, date: "2025-11-19" },
  { member: "Habib", pkg: "$500 Elite", amount: 500, date: "2025-11-20" }
];

function sel(id) {
  return document.getElementById(id);
}

// =============== RENDER STATS ===============
function renderStats() {
  if (sel("statMembers"))
    sel("statMembers").textContent = demoStats.members.toLocaleString();
  if (sel("statDeposit"))
    sel("statDeposit").textContent = `$${demoStats.deposit.toLocaleString()}`;
  if (sel("statPayout"))
    sel("statPayout").textContent = `$${demoStats.payout.toLocaleString()}`;

  if (sel("demoBalance"))
    sel("demoBalance").textContent = `$${demoStats.balance.toFixed(2)}`;
  if (sel("demoSelf"))
    sel("demoSelf").textContent = `$${demoStats.self}`;
  if (sel("demoROI"))
    sel("demoROI").textContent = `$${demoStats.roi.toFixed(2)}`;
  if (sel("demoSponsor"))
    sel("demoSponsor").textContent = `$${demoStats.sponsor}`;
  if (sel("demoGen"))
    sel("demoGen").textContent = `$${demoStats.generation}`;

  if (sel("dbBalance"))
    sel("dbBalance").textContent = `$${demoStats.balance.toFixed(2)}`;
  if (sel("dbDeposit"))
    sel("dbDeposit").textContent = `$${demoStats.deposit}`;
  if (sel("dbIncome"))
    sel("dbIncome").textContent = `$${demoStats.income}`;
  if (sel("dbTeam")) sel("dbTeam").textContent = demoStats.team;
}

// =============== TABLE RENDER ===============
function renderTable() {
  const body = sel("dbTableBody");
  if (!body) return;

  body.innerHTML = "";
  deposits.forEach((d) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${d.member}</td>
      <td>${d.pkg}</td>
      <td>$${d.amount}</td>
      <td>${d.date}</td>
    `;
    body.appendChild(tr);
  });
}

// =============== REGISTER FORM DEMO ===============
const regForm = document.getElementById("btxRegisterForm");
const regMsg = document.getElementById("regMessage");

if (regForm && regMsg) {
  regForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(regForm);
    const name = formData.get("full_name");
    const user = formData.get("username");
    const sponsor = formData.get("sponsor_username") || "None";

    regMsg.className = "reg-alert success";
    regMsg.style.display = "block";
    regMsg.innerText =
      `✔ Demo Registration Completed\n\n` +
      `Full Name: ${name}\n` +
      `Username: ${user}\n` +
      `Sponsor: ${sponsor}\n\n` +
      `এই ফর্ম শুধু ফ্রন্টএন্ড ডেমো – কোনো ডাটাবেজে সেভ হচ্ছে না।`;

    regForm.reset();
  });
}

// =============== HERO BUTTONS / NAV ===============
const heroPrimaryBtn = document.querySelector(".hero .btn-primary");
if (heroPrimaryBtn) {
  heroPrimaryBtn.addEventListener("click", () => {
    const regSection = document.getElementById("register");
    if (regSection) {
      regSection.scrollIntoView({ behavior: "smooth" });
    }
  });
}

// package buy demo
document.querySelectorAll(".buy-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const amount = Number(btn.dataset.amount);
    const title = btn.parentElement.querySelector("h3").textContent;

    demoStats.deposit += amount;
    demoStats.balance += amount * 0.3; // demo calculation
    demoStats.income += amount * 0.12;

    deposits.push({
      member: "You",
      pkg: title,
      amount,
      date: new Date().toISOString().slice(0, 10)
    });

    renderStats();
    renderTable();

    alert(
      `Demo Deposit Success!\n\nAmount: $${amount}\nPackage: ${title}\n\nFuture এ এখানে real USDT/Wallet payment connect হবে।`
    );
  });
});

// NAV login demo
const navLoginBtn = document.querySelector(".btn-outline");
if (navLoginBtn) {
  navLoginBtn.addEventListener("click", () => {
    alert("Demo Login Only – later এখানে real Login form / wallet connect হবে।");
  });
}

// =============== INIT ===============
renderStats();
renderTable();
