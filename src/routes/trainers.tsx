import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { TrainerCard } from "@/components/site/cards";
import { trainers } from "@/data/studio";

export const Route = createFileRoute("/trainers")({
  head: () => ({
    meta: [
      { title: "Our Dance Trainers — Riddhi Dance Studio Faculty" },
      {
        name: "description",
        content:
          "Meet the professional dance instructors at Riddhi Dance Studio: specialisations, experience and achievements of our Bollywood, Hip-Hop and Classical faculty.",
      },
      { property: "og:title", content: "Meet Our Dance Trainers" },
      {
        property: "og:description",
        content: "Experienced, performance-tested faculty across Bollywood, Hip-Hop and Classical dance.",
      },
    ],
  }),
  component: TrainersPage,
});

function TrainersPage() {
  return (
    <>
      <PageHero
        eyebrow="Trainers"
        title="Coached by working performers"
        description="Our faculty still perform, compete and choreograph — which means what you learn in class is what actually works on stage."
      />
      <section className="section-pad mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trainers.map((t, i) => (
            <Reveal key={t.id} delay={i * 80}>
              <TrainerCard item={t} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}