// BTX.ONE demo auth system using localStorage

const STORAGE_KEY_USERS = "btx_users";
const STORAGE_KEY_CURRENT = "btx_current_user";

// ---------- Common helpers ----------
function loadUsers() {
  const raw = localStorage.getItem(STORAGE_KEY_USERS);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
}

function setCurrentUser(user) {
  localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(user));
}

function getCurrentUser() {
  const raw = localStorage.getItem(STORAGE_KEY_CURRENT);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

function logoutUser() {
  localStorage.removeItem(STORAGE_KEY_CURRENT);
}

// ---------- Page boot ----------
document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  if (page === "register") initRegisterPage();
  if (page === "login") initLoginPage();
  if (page === "dashboard") initDashboardPage();
});

// ---------- Register page ----------
function initRegisterPage() {
  const form = document.getElementById("rnForm");
  if (!form) return;

  // password show/hide
  document.querySelectorAll(".rn-eye").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-target");
      const input = document.getElementById(id);
      if (!input) return;
      const isPass = input.type === "password";
      input.type = isPass ? "text" : "password";
      btn.textContent = isPass ? "HIDE" : "SHOW";
    });
  });

  form.addEventListener("submit", e => {
    e.preventDefault();

    const data = new FormData(form);
    const full_name = (data.get("full_name") || "").trim();
    const usernameRaw = (data.get("username") || "").trim();
    const username = usernameRaw.toLowerCase();
    const email = (data.get("email") || "").trim().toLowerCase();
    const country = data.get("country") || "";
    const mobile = (data.get("mobile") || "").trim();
    const ref_code = (data.get("ref_code") || "").trim();
    const pass1 = data.get("password") || "";
    const pass2 = data.get("password2") || "";

    if (!full_name || !usernameRaw || !email || !country || !mobile) {
      alert("❗ সবগুলো required ফিল্ড পূরণ করুন।");
      return;
    }

    if (pass1.length < 4) {
      alert("🔐 Password কমপক্ষে ৪ অক্ষরের দিন।");
      return;
    }

    if (pass1 !== pass2) {
      alert("❌ Password এবং Re-enter Password মিলছে না।");
      return;
    }

    const users = loadUsers();
    if (users.some(u => u.username === username)) {
      alert("⚠ এই username আগে থেকেই রেজিস্টার করা আছে। অন্যটা চেষ্টা করুন।");
      return;
    }
    if (users.some(u => u.email === email)) {
      alert("⚠ এই email আগে থেকেই রেজিস্টার করা আছে। অন্যটা চেষ্টা করুন।");
      return;
    }

    const newUser = {
      full_name,
      username,
      email,
      country,
      mobile,
      ref_code,
      password: pass1
    };

    users.push(newUser);
    saveUsers(users);

    alert("✅ Demo registration complete! এখন তুমি এই username + password দিয়ে login করতে পারবে।");
    form.reset();
    window.location.href = "login.html";
  });
}

// ---------- Login page ----------
function initLoginPage() {
  const form = document.getElementById("lgForm");
  if (!form) return;

  // show/hide password
  document.querySelectorAll(".lg-eye").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-target");
      const input = document.getElementById(id);
      if (!input) return;
      const isPass = input.type === "password";
      input.type = isPass ? "text" : "password";
      btn.textContent = isPass ? "HIDE" : "SHOW";
    });
  });

  form.addEventListener("submit", e => {
    e.preventDefault();

    const data = new FormData(form);
    const idRaw = (data.get("username") || "").trim();
    const id = idRaw.toLowerCase();
    const password = data.get("password") || "";

    if (!id || !password) {
      alert("❗ Username/Email এবং Password দিন।");
      return;
    }

    const users = loadUsers();
    const user = users.find(
      u =>
        (u.username === id || u.email === id) &&
        u.password === password
    );

    if (!user) {
      alert("❌ Username/Email বা Password ভুল। আবার চেষ্টা করুন।");
      return;
    }

    setCurrentUser(user);
    alert("✅ Demo login success!");
    window.location.href = "dashboard.html";
  });
}

// ---------- Dashboard page ----------
function initDashboardPage() {
  const user = getCurrentUser();

  const titleEl = document.getElementById("dbUserTitle");
  const infoEl = document.getElementById("dbUserInfo");
  const guestEl = document.getElementById("dbGuest");
  const logoutBtn = document.getElementById("logoutBtn");

  if (!user) {
    if (guestEl) guestEl.style.display = "block";
    if (titleEl) titleEl.textContent = "Guest Dashboard (Demo)";
    if (infoEl) {
      infoEl.innerHTML =
        '<div>Welcome, <strong>Guest</strong></div><div>ID: N/A • Rank: Starter</div>';
    }
  } else {
    if (guestEl) guestEl.style.display = "none";
    if (titleEl) titleEl.textContent = user.full_name + " – Dashboard";
    if (infoEl) {
      infoEl.innerHTML =
        <div>Welcome, <strong>${user.username}</strong></div> +
        <div>Country: ${user.country || "N/A"} • Mobile: ${user.mobile || "N/A"}</div>;
    }
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      logoutUser();
      alert("🔓 Logged out (demo).");
      window.location.href = "login.html";
    });
  }

  // demo deposit table
  const body = document.getElementById("dTableBody");
  if (body) {
    const demoDeposits = [
      { member: "btxuser01", pkg: "$100 Pro", amount: 100, roi: "1.3%", date: "2025-11-20" },
      { member: "btxuser02", pkg: "$500 Elite", amount: 500, roi: "1.5%", date: "2025-11-19" },
      { member: "btxuser03", pkg: "$20 Starter", amount: 20, roi: "1.1%", date: "2025-11-19" },
      { member: "btxuser04", pkg: "$100 Pro", amount: 100, roi: "1.2%", date: "2025-11-18" }
    ];
    demoDeposits.forEach(row => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${row.member}</td>
        <td>${row.pkg}</td>
        <td>$${row.amount.toFixed(2)}</td>
        <td>${row.roi}</td>
        <td>${row.date}</td>
      `;
      body.appendChild(tr);
    });
  }
}