/*
 * Contact form
 *
 * The form is split into two layers:
 *   - Frontend (always on): validation, accessible errors, spam checks, status messages.
 *   - Delivery (off until configured): FORM_CONFIG below.
 *
 * While `provider` is empty, nothing is sent anywhere. The form prepares the
 * message so the visitor can copy it (or open their email app, if `email` is set).
 * See README.md, "Connecting the contact form".
 */
const FORM_CONFIG = {
  // '' (not connected) | 'netlify' | 'formspree'
  provider: '',
  // Formspree only: your form endpoint, e.g. 'https://formspree.io/f/abcdwxyz'
  endpoint: '',
  // Optional: your public email address. Enables an "Open in email app" button.
  email: '',
  // Where visitors can send the prepared message when delivery is off
  fallbackUrl: 'https://www.linkedin.com/in/henok-t/',
  fallbackLabel: 'Open LinkedIn',
};

const SERVICE_LABELS = {
  website: 'A new website',
  maintenance: 'Fixes or updates to an existing site',
  support: 'Technical support or troubleshooting',
  pwa: 'An installable web app',
  tool: 'A small internal tool',
  optimization: 'Speed, accessibility, or SEO cleanup',
  other: 'Something else',
};

const MIN_FILL_TIME_MS = 3000; // faster than this is almost certainly a bot
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

(() => {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const fields = {
    name: form.elements.name,
    email: form.elements.email,
    service: form.elements.service,
    message: form.elements.message,
  };
  const honeypot = form.elements.company_website;
  const submitButton = form.querySelector('[data-submit]');
  const statusBox = form.querySelector('[data-form-status]');
  const modeNote = form.querySelector('[data-form-mode-note]');
  const deliveryOn = FORM_CONFIG.provider === 'netlify'
    || (FORM_CONFIG.provider === 'formspree' && FORM_CONFIG.endpoint);

  let firstInteraction = 0;
  let attempted = false;

  /* ----- Setup ----- */

  if (deliveryOn) {
    submitButton.textContent = 'Send message';
  } else {
    modeNote.textContent = 'All fields are required. Online sending isn\'t connected yet, so this prepares your message for you to send.';
  }

  form.addEventListener('focusin', () => {
    if (!firstInteraction) firstInteraction = Date.now();
  }, { once: true });

  // Links like <a href="#contact" data-service="support"> preselect a service.
  // Links that also carry data-plan pre-fill the message field so the visitor can keep typing.
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[data-service]');
    if (link && SERVICE_LABELS[link.dataset.service]) {
      fields.service.value = link.dataset.service;
      if (link.dataset.plan && !fields.message.value.trim()) {
        fields.message.value = `I'm interested in the ${link.dataset.plan} plan. `;
      }
    }
  });

  const requested = new URLSearchParams(window.location.search).get('service');
  if (requested && SERVICE_LABELS[requested]) fields.service.value = requested;

  /* ----- Validation ----- */

  function errorFor(name) {
    const value = fields[name].value.trim();
    switch (name) {
      case 'name':
        return value ? '' : 'Enter your name.';
      case 'email':
        if (!value) return 'Enter your email address.';
        return EMAIL_PATTERN.test(value) ? '' : 'Enter an email address like name@example.com.';
      case 'service':
        return value ? '' : 'Choose what you need help with.';
      case 'message':
        if (!value) return 'Write a short note about your project or problem.';
        return value.length >= 20 ? '' : 'Add a little more detail (at least 20 characters).';
      default:
        return '';
    }
  }

  function showError(name, message) {
    const field = fields[name];
    const errorEl = document.getElementById(`cf-${name}-error`);
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    errorEl.textContent = message;
  }

  function validateAll() {
    let firstInvalid = null;
    Object.keys(fields).forEach((name) => {
      const message = errorFor(name);
      showError(name, message);
      if (message && !firstInvalid) firstInvalid = fields[name];
    });
    return firstInvalid;
  }

  // After the first submit attempt, re-check fields as people fix them
  Object.keys(fields).forEach((name) => {
    const events = name === 'service' ? ['change'] : ['input', 'blur'];
    events.forEach((type) => {
      fields[name].addEventListener(type, () => {
        if (attempted || type === 'blur' && fields[name].value) showError(name, errorFor(name));
      });
    });
  });

  /* ----- Status messages ----- */

  function showStatus(state, html) {
    statusBox.dataset.state = state;
    statusBox.innerHTML = html;
    statusBox.hidden = false;
    statusBox.focus();
  }

  const escapeHtml = (text) => text.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[c]);

  function composeMessage(data) {
    return [
      `Hi City Bear Design, I'm ${data.name} (${data.email}).`,
      `I need: ${SERVICE_LABELS[data.service]}.`,
      '',
      data.message,
    ].join('\n');
  }

  /* ----- Delivery off: prepare the message ----- */

  function prepareMessage(data) {
    const text = composeMessage(data);
    const mailto = FORM_CONFIG.email
      ? `mailto:${FORM_CONFIG.email}?subject=${encodeURIComponent(`Project note: ${SERVICE_LABELS[data.service]}`)}&body=${encodeURIComponent(text)}`
      : '';

    showStatus('info', `
      <h3>Your message is ready. It has not been sent.</h3>
      <p>Online sending isn't connected yet. Copy the message below${mailto ? ', or open it in your email app' : ` and send it on ${FORM_CONFIG.fallbackLabel.replace('Open ', '')}`}.</p>
      <div class="btn-row">
        ${mailto ? `<a class="btn btn-primary" href="${mailto}">Open in email app</a>` : ''}
        <button class="btn ${mailto ? 'btn-secondary' : 'btn-primary'}" type="button" data-copy>Copy message</button>
        ${mailto ? '' : `<a class="btn btn-secondary" href="${FORM_CONFIG.fallbackUrl}" rel="noopener">${FORM_CONFIG.fallbackLabel}</a>`}
      </div>
    `);

    statusBox.querySelector('[data-copy]').addEventListener('click', async (event) => {
      const button = event.currentTarget;
      try {
        await navigator.clipboard.writeText(text);
        button.textContent = 'Copied';
      } catch {
        button.textContent = 'Copy failed. Select the text in the form instead.';
      }
    });
  }

  /* ----- Delivery on: send it ----- */

  async function sendMessage(data) {
    let response;
    if (FORM_CONFIG.provider === 'netlify') {
      const body = new URLSearchParams({ 'form-name': form.getAttribute('name'), ...data });
      response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
    } else {
      response = await fetch(FORM_CONFIG.endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
    }
    if (!response.ok) throw new Error(`Form service responded ${response.status}`);
  }

  /* ----- Submit ----- */

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    attempted = true;
    statusBox.hidden = true;

    const firstInvalid = validateAll();
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    const data = {
      name: fields.name.value.trim(),
      email: fields.email.value.trim(),
      service: fields.service.value,
      message: fields.message.value.trim(),
    };

    const looksLikeBot = honeypot.value !== ''
      || (firstInteraction && Date.now() - firstInteraction < MIN_FILL_TIME_MS);

    if (!deliveryOn) {
      prepareMessage(data);
      return;
    }

    if (looksLikeBot) {
      // Quietly drop it; bots get no signal to retry
      form.reset();
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = 'Sending…';

    try {
      await sendMessage(data);
      form.reset();
      attempted = false;
      showStatus('success', `
        <h3>Message sent</h3>
        <p>Thanks, ${escapeHtml(data.name)}. We'll reply to ${escapeHtml(data.email)}.</p>
      `);
    } catch {
      showStatus('error', `
        <h3>Your message didn't send</h3>
        <p>Your text is still in the form. Check your connection and try again, or reach us on <a href="${FORM_CONFIG.fallbackUrl}" rel="noopener">LinkedIn</a>.</p>
      `);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Send message';
    }
  });
})();
