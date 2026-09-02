import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { TrainerCard } from "@/components/site/cards";
import { trainers } from "@/data/studio";
import { createSeoHead } from "@/config/seo";

export const Route = createFileRoute("/trainers")({
  head: () =>
    createSeoHead({
      title: "Dance Trainers in Satna | Riddhi Dance Studio",
      description:
        "Meet the experienced dance trainers at Riddhi Dance Studio in Satna, with expertise across Bollywood, Hip-Hop, Classical and fitness dance.",
      path: "/trainers",
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
