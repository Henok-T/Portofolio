(function () {
  const nav = document.querySelector("[data-nav]");
  const toggle = document.querySelector("[data-nav-toggle]");

  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeNav();
    });
  }

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  const form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const status = form.querySelector("[data-form-status]");
      const name = form.querySelector("#name");
      const email = form.querySelector("#email");
      const message = form.querySelector("#message");
      const service = form.querySelector("#service");

      const errors = [];
      if (!name.value.trim()) errors.push("Please add your name.");
      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        errors.push("Please add a valid email address.");
      }
      if (!message.value.trim() || message.value.trim().length < 12) {
        errors.push("Please include a short description of what you need.");
      }

      if (!status) return;
      if (errors.length) {
        status.className = "form-status is-visible err";
        status.textContent = errors.join(" ");
        status.focus();
        return;
      }

      const draft =
        "Name: " + name.value.trim() +
        "\nEmail: " + email.value.trim() +
        "\nService: " + (service.value || "Not specified") +
        "\n\n" + message.value.trim();

      status.className = "form-status is-visible ok";
      status.innerHTML =
        "This form is not connected to a server yet, so nothing was sent automatically. Copy the message below and send it through LinkedIn." +
        "<pre style='white-space:pre-wrap;margin:.7rem 0 0;font:inherit'>" +
        draft.replace(/[<>]/g, "") +
        "</pre>";

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(draft).catch(function () {});
      }
    });
  }
})();
