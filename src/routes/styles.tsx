import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { StyleCard } from "@/components/site/cards";
import { danceStyles } from "@/data/studio";
import { createSeoHead } from "@/config/seo";

export const Route = createFileRoute("/styles")({
  head: () =>
    createSeoHead({
      title: "Dance Styles | Bollywood, Hip-Hop, Classical & Zumba",
      description:
        "Explore Bollywood, Hip-Hop, Contemporary, Classical, Kids Dance and Zumba styles taught at Riddhi Dance Studio in Satna.",
      path: "/styles",
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
