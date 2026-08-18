import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <header className="bg-stage relative overflow-hidden border-b border-border">
      <div className="mx-auto max-w-7xl px-4 pt-32 pb-16 sm:px-6 lg:px-8 lg:pt-40 lg:pb-24">
        <p className="animate-rise text-xs font-semibold uppercase tracking-[0.28em] text-gold">
          {eyebrow}
        </p>
        <h1 className="animate-rise mt-4 max-w-4xl text-5xl uppercase leading-[0.9] tracking-wide sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p className="animate-rise mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
        {children ? <div className="mt-8 flex flex-wrap gap-3">{children}</div> : null}
      </div>
    </header>
  );
}