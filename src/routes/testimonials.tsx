import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { testimonials } from "@/data/studio";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Student & Parent Reviews — Riddhi Dance Studio" },
      {
        name: "description",
        content:
          "Read reviews from students and parents of Riddhi Dance Studio across Bollywood, kids dance, hip-hop, classical and wedding choreography.",
      },
      { property: "og:title", content: "What Our Students Say" },
      {
        property: "og:description",
        content: "Honest reviews from students and parents at Riddhi Dance Studio.",
      },
    ],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="Told by the people who dance here"
        description="Every review below comes from a current or former student family at the studio."
      />
      <section className="section-pad mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 70}>
              <figure className="glass-panel h-full rounded-2xl p-6">
                <div className="flex gap-1 text-gold">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="size-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 border-t border-border pt-4">
                  <p className="font-display text-lg uppercase tracking-wide">{t.name}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {t.role} · {t.classAttended}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}