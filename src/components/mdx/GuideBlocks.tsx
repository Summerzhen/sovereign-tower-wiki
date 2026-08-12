import { AlertTriangle, CheckCircle2, Info, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

type Fact = {
  label: string;
  value: string;
};

type Step = {
  title: string;
  detail: string;
  meta?: string;
};

type Choice = {
  title: string;
  items: string[];
  note?: string;
};

type CompareCard = {
  name: string;
  eyebrow?: string;
  traits: string[];
  bestFor: string;
  risk?: string;
};

export function QuickFacts({
  title = "Quick Facts",
  facts,
}: { title?: string; facts: Fact[] }) {
  return (
    <section className="my-8 rounded-lg border border-[hsl(var(--nav-theme)/0.35)] bg-[hsl(var(--card))] shadow-sm">
      <div className="flex items-center gap-2 border-b border-border bg-[hsl(var(--nav-theme)/0.08)] px-5 py-3">
        <Info className="h-4 w-4 text-[hsl(var(--nav-theme))]" />
        <h2 className="m-0 text-sm font-bold uppercase tracking-[0.18em] text-foreground">
          {title}
        </h2>
      </div>
      <dl className="grid gap-px bg-border sm:grid-cols-2">
        {facts.map((fact) => (
          <div key={fact.label} className="bg-card px-5 py-4">
            <dt className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
              {fact.label}
            </dt>
            <dd className="mt-1 text-sm font-semibold text-foreground">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export function TipBox({
  title = "Tip",
  children,
}: { title?: string; children: ReactNode }) {
  return (
    <aside className="my-6 rounded-lg border border-[hsl(var(--nav-theme)/0.35)] bg-[hsl(var(--nav-theme)/0.08)] p-5">
      <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-foreground">
        <Sparkles className="h-4 w-4 text-[hsl(var(--nav-theme))]" />
        {title}
      </div>
      <div className="mt-3 text-sm leading-7 text-muted-foreground">
        {children}
      </div>
    </aside>
  );
}

export function WarningBox({
  title = "Don't Miss It",
  children,
}: { title?: string; children: ReactNode }) {
  return (
    <aside className="my-6 rounded-lg border border-amber-500/35 bg-amber-500/10 p-5">
      <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-foreground">
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        {title}
      </div>
      <div className="mt-3 text-sm leading-7 text-muted-foreground">
        {children}
      </div>
    </aside>
  );
}

export function StepTimeline({ steps }: { steps: Step[] }) {
  return (
    <ol className="my-8 space-y-0 border-y border-border py-2">
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 py-4"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[hsl(var(--nav-theme)/0.4)] bg-[hsl(var(--nav-theme)/0.12)] text-sm font-bold text-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="border-l border-border pl-4">
            <h3 className="m-0 text-base font-bold text-foreground">
              {step.title}
            </h3>
            {step.meta && (
              <p className="m-0 mt-1 text-xs font-bold uppercase tracking-[0.14em] text-[hsl(var(--nav-theme))]">
                {step.meta}
              </p>
            )}
            <p className="m-0 mt-2 text-sm leading-7 text-muted-foreground">
              {step.detail}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function ComparisonCards({
  title,
  cards,
}: { title: string; cards: CompareCard[] }) {
  return (
    <section className="my-8">
      <h2 className="mb-4 border-b border-border pb-3 text-2xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((card) => (
          <article
            key={card.name}
            className="rounded-lg border border-border bg-card p-5 shadow-sm"
          >
            {card.eyebrow && (
              <p className="m-0 text-xs font-bold uppercase tracking-[0.16em] text-[hsl(var(--nav-theme))]">
                {card.eyebrow}
              </p>
            )}
            <h3 className="m-0 mt-1 text-xl font-bold text-foreground">
              {card.name}
            </h3>
            <ul className="my-4 space-y-2 text-sm text-muted-foreground">
              {card.traits.map((trait) => (
                <li key={trait} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--nav-theme))]" />
                  <span>{trait}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-md bg-muted p-3 text-sm">
              <p className="m-0 font-semibold text-foreground">Best for</p>
              <p className="m-0 mt-1 text-muted-foreground">{card.bestFor}</p>
              {card.risk && (
                <p className="m-0 mt-2 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  Risk: {card.risk}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ChoiceOutcome({
  title,
  choices,
  recommendation,
}: { title: string; choices: Choice[]; recommendation?: string }) {
  return (
    <section className="my-8 rounded-lg border border-border bg-card p-5 shadow-sm">
      <h2 className="m-0 text-2xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {choices.map((choice) => (
          <article
            key={choice.title}
            className="rounded-md border border-border bg-background p-4"
          >
            <h3 className="m-0 text-base font-bold text-foreground">
              {choice.title}
            </h3>
            <ul className="my-3 space-y-2 text-sm text-muted-foreground">
              {choice.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--nav-theme))]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {choice.note && (
              <p className="m-0 text-sm leading-6 text-muted-foreground">
                {choice.note}
              </p>
            )}
          </article>
        ))}
      </div>
      {recommendation && (
        <p className="mt-5 rounded-md bg-[hsl(var(--nav-theme)/0.08)] p-4 text-sm font-medium leading-7 text-foreground">
          {recommendation}
        </p>
      )}
    </section>
  );
}
