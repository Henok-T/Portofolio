import { useEffect, useState } from "react";
import { serviceLabel, serviceOptions, studio } from "@/lib/content";
import { useInquiry } from "@/lib/inquiry";
import { Button } from "@/components/button";

const DRAFT_KEY = "asmara-inquiry-draft";

type Fields = {
  name: string;
  email: string;
  service: string;
  message: string;
};

const empty: Fields = { name: "", email: "", service: "", message: "" };

function compose(fields: Fields, plan: string) {
  const lines = [
    `Name: ${fields.name.trim()}`,
    `Email: ${fields.email.trim()}`,
    `Need: ${serviceLabel(fields.service)}`,
  ];
  if (plan) lines.push(`Plan: ${plan}`);
  lines.push("", fields.message.trim());
  return lines.join("\n");
}

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(empty);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState("");
  const [prepared, setPrepared] = useState("");
  const [copied, setCopied] = useState(false);
  const bump = useInquiry((state) => state.bump);
  const hintService = useInquiry((state) => state.service);
  const hintPlan = useInquiry((state) => state.plan);
  const hintSeed = useInquiry((state) => state.seed);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as Partial<Fields>;
      setFields({
        name: saved.name ?? "",
        email: saved.email ?? "",
        service: saved.service ?? "",
        message: saved.message ?? "",
      });
    } catch {
      /* ignore broken drafts */
    }
  }, []);

  useEffect(() => {
    if (!fields.name && !fields.email && !fields.service && !fields.message) return;
    localStorage.setItem(DRAFT_KEY, JSON.stringify(fields));
  }, [fields]);

  useEffect(() => {
    if (!bump) return;
    setFields((current) => ({
      ...current,
      service: hintService || current.service,
      message: hintSeed && !current.message.includes(hintSeed.trim()) && !current.message.trim()
        ? hintSeed
        : current.message,
    }));
    setPrepared("");
    setStatus("");
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => document.getElementById("field-name")?.focus(), 350);
  }, [bump, hintService, hintSeed]);

  function update<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function validate(next: Fields) {
    const nextErrors: Partial<Record<keyof Fields, string>> = {};
    if (next.name.trim().length < 2) nextErrors.name = "Tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(next.email.trim())) {
      nextErrors.email = "Enter a real email address.";
    }
    if (!next.service) nextErrors.service = "Choose what you need.";
    if (next.message.trim().length < 12) {
      nextErrors.message = "A sentence or two is enough — what would done look like?";
    }
    return nextErrors;
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const nextErrors = validate(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      setStatus("Check the highlighted fields.");
      setPrepared("");
      return;
    }
    if (honeypot.trim()) {
      setPrepared("Thanks. We'll take a look.");
      setStatus("");
      return;
    }
    const note = compose(fields, hintPlan);
    setPrepared(note);
    setCopied(false);
    setStatus("Your note is ready to send. Nothing was emailed automatically.");
  }

  async function copyNote() {
    try {
      await navigator.clipboard.writeText(prepared);
      setCopied(true);
    } catch {
      setCopied(false);
      setStatus("Select the note and copy it manually.");
    }
  }

  const mailto = `mailto:?subject=${encodeURIComponent("Project note for Asmara Web Design")}&body=${encodeURIComponent(prepared)}`;

  return (
    <form
      className="rounded-card border border-line bg-surface p-5 shadow-card sm:p-7"
      onSubmit={onSubmit}
      noValidate
    >
      <p className="text-sm text-muted">All fields are required. We'll reply with questions before suggesting a plan.</p>
      <div className="sr-only" aria-hidden="true">
        <label>
          Leave this empty
          <input
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </label>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.name} id="field-name">
          <input
            id="field-name"
            name="name"
            autoComplete="name"
            value={fields.name}
            onChange={(event) => update("name", event.target.value)}
            className="field"
          />
        </Field>
        <Field label="Email" error={errors.email} id="field-email">
          <input
            id="field-email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            value={fields.email}
            onChange={(event) => update("email", event.target.value)}
            className="field"
          />
        </Field>
      </div>

      <div className="mt-4">
        <Field label="What do you need?" error={errors.service} id="field-service">
          <select
            id="field-service"
            name="service"
            value={fields.service}
            onChange={(event) => update("service", event.target.value)}
            className="field"
          >
            <option value="">Choose one</option>
            {serviceOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Message" error={errors.message} id="field-message">
          <textarea
            id="field-message"
            name="message"
            rows={5}
            value={fields.message}
            onChange={(event) => update("message", event.target.value)}
            placeholder="What's happening now, and what would done look like?"
            className="field min-h-32 resize-y"
          />
        </Field>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Button type="submit" variant="coral">
          Prepare message
        </Button>
        <p className="text-sm text-muted">Online sending isn't connected yet, so this prepares your note.</p>
      </div>

      <div aria-live="polite" className="mt-4">
        {status ? <p className="text-sm font-medium text-ink">{status}</p> : null}
        {prepared ? (
          <div className="mt-3 rounded-2xl bg-lagoon/10 p-4">
            <p className="font-semibold text-ink">Ready to send</p>
            <p className="mt-1 text-sm text-muted">
              Copy the note, open it in your email app, or message us on LinkedIn — the fastest way to reach us right now.
            </p>
            <pre className="mt-3 max-h-48 overflow-auto whitespace-pre-wrap rounded-xl bg-surface p-3 text-sm text-ink">
              {prepared}
            </pre>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button type="button" variant="ink" onClick={copyNote}>
                {copied ? "Copied" : "Copy note"}
              </Button>
              <a
                href={mailto}
                className="inline-flex min-h-11 items-center rounded-full border border-line bg-surface px-5 text-sm font-semibold text-ink"
              >
                Open in email
              </a>
              <a
                href={studio.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center rounded-full px-5 text-sm font-semibold text-lagoon"
              >
                LinkedIn
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error ? (
        <span className="mt-1 block text-sm font-medium text-coral" role="alert">
          {error}
        </span>
      ) : null}
    </label>
  );
}
