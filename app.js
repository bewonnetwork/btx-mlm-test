// Simple demo stats – পরে এগুলো backend থেকে আসবে
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

function renderStats() {
  sel("statMembers").textContent = demoStats.members.toLocaleString();
  sel("statDeposit").textContent = `$${demoStats.deposit.toLocaleString()}`;
  sel("statPayout").textContent = `$${demoStats.payout.toLocaleString()}`;

  sel("demoBalance").textContent = `$${demoStats.balance.toFixed(2)}`;
  sel("demoSelf").textContent = `$${demoStats.self}`;
  sel("demoROI").textContent = `$${demoStats.roi.toFixed(2)}`;
  sel("demoSponsor").textContent = `$${demoStats.sponsor}`;
  sel("demoGen").textContent = `$${demoStats.generation}`;

  sel("dbBalance").textContent = `$${demoStats.balance.toFixed(2)}`;
  sel("dbDeposit").textContent = `$${demoStats.deposit}`;
  sel("dbIncome").textContent = `$${demoStats.income}`;
  sel("dbTeam").textContent = demoStats.team;
}

function renderTable() {
  const body = sel("dbTableBody");
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

// Demo registration
const quickForm = document.getElementById("quickForm");
if (quickForm) {
  quickForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(quickForm);
    const name = formData.get("name");
    const username = formData.get("username");
    const sponsor = formData.get("sponsor") || "None";

    alert(
      `Demo Account Created!\n\nName: ${name}\nUsername: ${username}\nSponsor: ${sponsor}\n\nFuture: এখানে তুমি Real backend connect করে Registration save করবে।`
    );
    quickForm.reset();
  });
}

// Scroll from hero to packages
const btnGetStarted = document.getElementById("btnGetStarted");
if (btnGetStarted) {
  btnGetStarted.addEventListener("click", () => {
    document.getElementById("packages").scrollIntoView({ behavior: "smooth" });
  });
}

// Buy buttons demo – শুধু demo calculation
document.querySelectorAll(".buy-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const amount = Number(btn.dataset.amount);
    demoStats.deposit += amount;
    demoStats.balance += amount * 0.3; // demo only
    demoStats.income += amount * 0.12;

    deposits.push({
      member: "You",
      pkg: `$${amount} Package`,
      amount,
      date: new Date().toISOString().slice(0, 10)
    });

    renderStats();
    renderTable();

    alert(
      `Demo Deposit Success!\n\nAmount: $${amount}\nPackage: ${btn.parentElement.querySelector("h3").textContent}\n\nFuture: এখানে USDT / Wallet Payment connect হবে।`
    );
  });
});

// Nav login demo
const navLogin = document.getElementById("navLogin");
if (navLogin) {
  navLogin.addEventListener("click", () => {
    alert("Demo Login Only – future এ এখানে real Login / OTP / Wallet Connect হবে।");
  });
}

// Initial render
renderStats();
renderTable();
