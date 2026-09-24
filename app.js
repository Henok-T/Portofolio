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
let planName = "";
let submitted = false;
function field(name) { return form.elements.namedItem(name); }
function showError(name, message) {
  const slot = document.querySelector(`[data-error="${name}"]`);
  const el = field(name);
  if (slot) slot.textContent = message || "";
  if (el) el.setAttribute("aria-invalid", message ? "true" : "false");
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
loadDraft();
["name", "email", "service", "message"].forEach((n) => {
  field(n)?.addEventListener("blur", () => {
    const errors = validate();
    showError(n, errors[n] || "");
  });
});
form.addEventListener("input", () => {
  saveDraft();
  if (!submitted) return;
  const errors = validate();
  ["name", "email", "service", "message"].forEach((n) => showError(n, errors[n] || ""));
});
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  submitted = true;
  const errors = validate();
  ["name", "email", "service", "message"].forEach((n) => showError(n, errors[n] || ""));
  if (Object.keys(errors).length) {
    statusEl.textContent = "Check the highlighted fields.";
    field(["name", "email", "service", "message"].find((n) => errors[n]))?.focus();
    return;
  }
  if (field("company").value.trim()) return;
  const submitBtn = form.querySelector('[type="submit"]');
  submitBtn.textContent = "Sending…";
  submitBtn.disabled = true;
  statusEl.textContent = "";
  const email = field("email").value.trim();
  const params = new URLSearchParams({ "form-name": "inquiry", name: field("name").value.trim(), email, service: field("service").value, message: field("message").value.trim(), company: field("company").value });
  if (planName) params.set("plan", planName);
  try {
    const res = await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: params.toString() });
    if (!res.ok) throw new Error(res.status);
    form.reset();
    ["name", "email", "service", "message"].forEach((n) => showError(n, ""));
    planName = "";
    submitted = false;
    localStorage.removeItem("asmara-inquiry-draft");
    statusEl.textContent = `Message sent. We’ll reply to ${email}.`;
  } catch {
    statusEl.replaceChildren();
    statusEl.append("Your message didn’t send. Check your connection and try again, or ");
    const link = document.createElement("a");
    link.href = "https://www.linkedin.com/in/henok-t/";
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "message us on LinkedIn";
    statusEl.append(link, ".");
  } finally {
    submitBtn.textContent = "Send message";
    submitBtn.disabled = false;
  }
});
if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
