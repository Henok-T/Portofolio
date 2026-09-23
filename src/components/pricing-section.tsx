import { useEffect, useRef, useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/button";
import { included, plans, type Plan } from "@/lib/content";
import { useInquiry } from "@/lib/inquiry";
import { cn } from "@/lib/utils";

export function PricingSection() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<Plan | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active && !dialog.open) dialog.showModal();
    if (!active && dialog.open) dialog.close();
  }, [active]);

  function pick(plan: Plan) {
    setActive(null);
    useInquiry.getState().choose({
      service: "website",
      plan: plan.name,
      seed: `I'm interested in the ${plan.name} plan. `,
    });
  }

  return (
    <section id="pricing" className="scroll-mt-20 px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold text-lagoon">Pricing</p>
        <div className="mt-3 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="max-w-xl font-display text-4xl font-semibold text-ink md:text-5xl">
            Three ways to get online.
          </h2>
          <p className="max-w-md text-muted">
            Pick the one that fits your budget and how hands-on you want to be.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.id}
              className={cn(
                "flex flex-col rounded-3xl border p-6",
                plan.recommended ? "border-ink bg-ink text-bg" : "border-line bg-surface text-ink",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <p className={cn("text-sm font-semibold", plan.recommended ? "text-bg/70" : "text-muted")}>
                  {plan.cadence}
                </p>
                {plan.recommended ? (
                  <span className="rounded-full bg-coral px-3 py-1 text-xs font-semibold text-surface">
                    Recommended
                  </span>
                ) : null}
              </div>
              <h3 className="mt-4 font-brand text-3xl font-semibold">{plan.name}</h3>
              <p className={cn("mt-2 min-h-12 text-sm", plan.recommended ? "text-bg/80" : "text-muted")}>
                {plan.blurb}
              </p>
              <p className="mt-6 flex items-end gap-2">
                <span className="font-display text-5xl font-semibold tabular-nums">{plan.price}</span>
                <span className={cn("mb-1 text-sm", plan.recommended ? "text-bg/70" : "text-muted")}>{plan.unit}</span>
              </p>
              <p className={cn("mt-2 text-sm", plan.recommended ? "text-bg/70" : "text-muted")}>{plan.note}</p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-coral" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-2 pt-8">
                <Button variant={plan.recommended ? "coral" : "ink"} onClick={() => pick(plan)}>
                  Choose {plan.name}
                </Button>
                <button
                  type="button"
                  onClick={() => setActive(plan)}
                  className={cn(
                    "min-h-11 text-sm font-semibold underline-offset-4 hover:underline",
                    plan.recommended ? "text-bg" : "text-lagoon",
                  )}
                >
                  Full details
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-line bg-surface px-5 py-5 md:px-7">
          <p className="text-sm font-semibold text-ink">Every plan includes</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {included.map((item) => (
              <li key={item} className="rounded-full bg-lagoon/10 px-3 py-1.5 text-sm font-medium text-lagoon">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">
            Need fixes to an existing site, or something that doesn't fit a plan? Tell us what you need and we'll send a free estimate.
          </p>
          <button
            type="button"
            className="mt-3 min-h-11 text-sm font-semibold text-lagoon underline-offset-4 hover:underline"
            onClick={() =>
              useInquiry.getState().choose({
                service: "other",
                seed: "I'd like a free estimate for work that doesn't fit a plan. ",
              })
            }
          >
            Request an estimate
          </button>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="sheet"
        aria-labelledby="plan-dialog-title"
        onClose={() => setActive(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) setActive(null);
        }}
      >
        {active ? (
          <div className="max-h-[85dvh] overflow-auto p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-lagoon">
                  {active.cadence} · {active.price} {active.unit}
                </p>
                <h3 id="plan-dialog-title" className="mt-1 font-brand text-3xl font-semibold">
                  {active.name}
                </h3>
              </div>
              <button
                type="button"
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-line"
                aria-label="Close details"
                onClick={() => setActive(null)}
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <p className="mt-5 text-ink">{active.lead}</p>
            <p className="mt-3 text-muted">{active.care}</p>
            <p className="mt-5 text-sm font-semibold text-ink">Terms</p>
            <p className="mt-2 text-sm text-muted">{active.terms}</p>
            <Button className="mt-6" onClick={() => pick(active)}>
              Contact us to get started
            </Button>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}
