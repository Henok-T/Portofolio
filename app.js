const plans = {
  "Dante Plan": {
    cadence: "Monthly subscription",
    price: "$49 / month",
    lead: "A single, well-structured page for businesses that need to be findable and reachable now: who you are, what you offer, where you work, and a contact form that delivers.",
    care: "We write the copy with you, build it, and host it. Small changes such as new hours, a new photo or updated services are covered each month.",
    terms: "$49 per month, 6-month minimum, then month to month. Domain billed yearly at cost. Cancel after the minimum and the site comes down at the end of that billing month. Ask about a buyout if you want to keep it.",
  },
  "Impero Plan": {
    cadence: "Monthly subscription",
    price: "$149 / month",
    lead: "A full website of up to five pages, typically Home, Services, About, Gallery or Work, and Contact, planned around how your customers actually decide to call you.",
    care: "We handle the writing, design, build, hosting and ongoing care. Each month we check for broken links, errors and accessibility problems, and fix what we find.",
    terms: "$149 per month, 12-month minimum, then month to month. Domain billed yearly at cost. Up to 2 hours of content updates each month. Cancel after the minimum and the site comes down at the end of that billing month. Ask about a buyout if you want to keep it.",
  },
  "Roma Plan": {
    cadence: "One-time build",
    price: "$1,499 + hosting",
    lead: "The same five-page website, paid for once. It belongs to you: the code, the content and the domain.",
    care: "Hosting is a separate $20 per month so the site stays fast, secure and online. After launch, you get 30 days of free fixes; later changes are quoted up front.",
    terms: "$1,499 one-time. Half is due to start, half when the site is ready to launch. Hosting $20 per month from launch. Domain billed yearly at cost.",
  },
};
const labels = {
  website: "A new website",
  maintenance: "Fixes or updates to an existing site",
  support: "Technical support or troubleshooting",
  pwa: "An installable web app",
  optimization: "Speed, accessibility, or SEO cleanup",
  other: "Something else",
};
const form = document.querySelector("#inquiry");
const statusEl = document.querySelector("#form-status");
const readyEl = document.querySelector("#ready");
const noteEl = document.querySelector("#note");
const copyBtn = document.querySelector("#copy-note");
const mailLink = document.querySelector("#mail-note");
let planName = "";
function field(name) { return form.elements.namedItem(name); }
function showError(name, message) {
  const slot = document.querySelector(`[data-error="${name}"]`);
  if (slot) slot.textContent = message || "";
}
function saveDraft() {
  const data = { name: field("name").value, email: field("email").value, service: field("service").value, message: field("message").value };
  if (Object.values(data).some(Boolean)) localStorage.setItem("asmara-inquiry-draft", JSON.stringify(data));
}
function loadDraft() {
  try {
    const saved = JSON.parse(localStorage.getItem("asmara-inquiry-draft") || "null");
    if (!saved) return;
    field("name").value = saved.name || "";
    field("email").value = saved.email || "";
    field("service").value = saved.service || "";
    field("message").value = saved.message || "";
  } catch {}
}
function compose() {
  const lines = [`Name: ${field("name").value.trim()}`, `Email: ${field("email").value.trim()}`, `Need: ${labels[field("service").value] || field("service").value}`];
  if (planName) lines.push(`Plan: ${planName}`);
  lines.push("", field("message").value.trim());
  return lines.join("\n");
}
function validate() {
  const errors = {};
  if (field("name").value.trim().length < 2) errors.name = "Tell us your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(field("email").value.trim())) errors.email = "Enter a real email address.";
  if (!field("service").value) errors.service = "Choose what you need.";
  if (field("message").value.trim().length < 12) errors.message = "A sentence or two is enough — what would done look like?";
  return errors;
}
function ask(service, seed) {
  if (service) field("service").value = service;
  if (seed.trim() && !field("message").value.trim()) field("message").value = seed;
  readyEl.hidden = true;
  statusEl.textContent = "";
  saveDraft();
  document.querySelector("#contact").scrollIntoView({ behavior: "smooth", block: "start" });
  setTimeout(() => field("name").focus(), 350);
}
document.querySelector("#year").textContent = String(new Date().getFullYear());
const menu = document.querySelector("#menu");
document.querySelector("#open-menu").addEventListener("click", () => menu.showModal());
document.querySelector("#close-menu").addEventListener("click", () => menu.close());
menu.addEventListener("click", (event) => { if (event.target === menu) menu.close(); });
menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => menu.close()));
document.querySelectorAll("[data-ask]").forEach((button) => {
  button.addEventListener("click", () => {
    const plan = button.getAttribute("data-plan");
    if (plan) {
      planName = plan;
      ask("website", `I'm interested in the ${plan} plan. `);
      document.querySelector("#plan-dialog").close();
      return;
    }
    planName = "";
    ask(button.getAttribute("data-service") || "", button.getAttribute("data-seed") || "");
  });
});
const dialog = document.querySelector("#plan-dialog");
document.querySelectorAll("[data-details]").forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("data-details");
    const plan = plans[name];
    document.querySelector("#plan-kicker").textContent = `${plan.cadence} · ${plan.price}`;
    document.querySelector("#plan-title").textContent = name;
    document.querySelector("#plan-lead").textContent = plan.lead;
    document.querySelector("#plan-care").textContent = plan.care;
    document.querySelector("#plan-terms").textContent = plan.terms;
    document.querySelector("#plan-start").setAttribute("data-plan", name);
    dialog.showModal();
  });
});
document.querySelector("#close-plan").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
const cards = [...document.querySelectorAll(".filter-card")];
document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    const chosen = button.getAttribute("data-filter");
    document.querySelectorAll(".filter").forEach((item) => item.setAttribute("aria-pressed", item === button ? "true" : "false"));
    cards.forEach((card) => { card.hidden = chosen !== "All" && card.getAttribute("data-industry") !== chosen; });
  });
});
loadDraft();
form.addEventListener("input", () => { ["name","email","service","message"].forEach((n) => showError(n, "")); saveDraft(); });
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const errors = validate();
  ["name","email","service","message"].forEach((n) => showError(n, errors[n] || ""));
  if (Object.keys(errors).length) { statusEl.textContent = "Check the highlighted fields."; readyEl.hidden = true; return; }
  if (field("company").value.trim()) { noteEl.textContent = "Thanks. We'll take a look."; readyEl.hidden = false; return; }
  const note = compose();
  noteEl.textContent = note;
  readyEl.hidden = false;
  copyBtn.textContent = "Copy note";
  statusEl.textContent = "Your note is ready to send. Nothing was emailed automatically.";
  mailLink.href = `mailto:?subject=${encodeURIComponent("Project note for Asmara Web Design")}&body=${encodeURIComponent(note)}`;
});
copyBtn.addEventListener("click", async () => {
  try { await navigator.clipboard.writeText(noteEl.textContent); copyBtn.textContent = "Copied"; }
  catch { statusEl.textContent = "Select the note and copy it manually."; }
});
const path = location.pathname.replace(/\/index\.html$/, "").replace(/\/$/, "") || "/";
const jump = { "/projects": "projects", "/reviews": "reviews", "/contact": "contact" }[path];
if (jump) document.getElementById(jump)?.scrollIntoView();
if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
