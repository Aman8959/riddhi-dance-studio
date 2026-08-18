import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, IndianRupee } from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Button } from "@/components/ui/button";
import { plans, specialServices } from "@/data/studio";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Dance Class Fees & Membership Plans — Riddhi Dance Studio" },
      {
        name: "description",
        content:
          "Transparent monthly dance class fees at Riddhi Dance Studio: Basic, Standard and Premium memberships with unlimited classes and workshop access.",
      },
      { property: "og:title", content: "Membership Plans & Fees" },
      {
        property: "og:description",
        content: "Basic, Standard and Premium dance memberships with clear monthly pricing.",
      },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing & membership"
        title="Simple plans, no hidden fees"
        description="Pay monthly, switch styles anytime and cancel whenever. Quarterly and annual payments get an additional discount."
      />

      <section className="section-pad mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <article
                className={cn(
                  "glass-panel relative flex h-full flex-col rounded-3xl p-8",
                  p.highlight && "glow-ring border-primary/60",
                )}
              >
                {p.highlight ? (
                  <span className="absolute -top-3 left-8 rounded-full bg-gold px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-gold-foreground">
                    Most popular
                  </span>
                ) : null}
                <h2 className="font-display text-3xl uppercase tracking-wide">{p.name}</h2>
                <p className="mt-4 flex items-center font-display text-5xl">
                  <IndianRupee className="size-6" />
                  {p.price.toLocaleString("en-IN")}
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{p.period}</p>
                <ul className="mt-6 flex-1 space-y-3 text-sm text-muted-foreground">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-gold" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant={p.highlight ? "hero" : "glass"}
                  size="xl"
                  className="mt-8 w-full"
                >
                  <Link to="/register">Join Now</Link>
                </Button>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-pad border-t border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Custom pricing"
            title="Special services"
            description="Weddings, corporate events, schools and personal training are quoted per project. Tell us the date and song, and we will share a package."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {specialServices.map((s, i) => (
              <Reveal key={s.id} delay={i * 60}>
                <div className="glass-panel h-full rounded-2xl p-6">
                  <h3 className="font-display text-xl uppercase tracking-wide">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <Button asChild variant="hero" size="xl">
              <Link to="/contact">Request a Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}