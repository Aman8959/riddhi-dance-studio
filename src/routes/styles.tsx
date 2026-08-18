import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { StyleCard } from "@/components/site/cards";
import { danceStyles } from "@/data/studio";

export const Route = createFileRoute("/styles")({
  head: () => ({
    meta: [
      { title: "Dance Styles We Teach — Bollywood, Hip-Hop, Classical & Zumba" },
      {
        name: "description",
        content:
          "Bollywood, Hip-Hop, Contemporary, Bharatanatyam, Kids Dance and Zumba — see skill levels and suitable age groups for every dance style we teach.",
      },
      { property: "og:title", content: "Dance Styles at Riddhi Dance Studio" },
      {
        property: "og:description",
        content: "Ten dance styles with clear levels and age groups for every learner.",
      },
    ],
  }),
  component: StylesPage,
});

function StylesPage() {
  return (
    <>
      <PageHero
        eyebrow="Dance styles"
        title="Pick your language of movement"
        description="From filmy Bollywood energy to the discipline of Bharatanatyam — each style has its own syllabus, faculty and performance path."
      />
      <section className="section-pad mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {danceStyles.map((s, i) => (
            <Reveal key={s.slug} delay={i * 60}>
              <StyleCard item={s} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}