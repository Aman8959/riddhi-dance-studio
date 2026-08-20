import { createFileRoute } from "@tanstack/react-router";
import { Award, HeartHandshake, Sparkles, Target } from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { StatsStrip } from "@/components/site/StatsStrip";
import studioImage from "@/assets/gallery-studio.jpg";
import { specialServices } from "@/data/studio";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Riddhi Dance Studio — Our Vision & Training Approach" },
      {
        name: "description",
        content:
          "Meet Riddhi Dance Studio: our vision, dance philosophy, training approach and why 500+ students choose us for dance classes.",
      },
      { property: "og:title", content: "About Riddhi Dance Studio" },
      {
        property: "og:description",
        content: "Our vision, philosophy and training approach for dancers of every age and level.",
      },
    ],
  }),
  component: AboutPage,
});

const pillars = [
  {
    icon: Sparkles,
    title: "Our Vision",
    text: "To build a studio where every student — regardless of age, body type or background — discovers the dancer inside them.",
  },
  {
    icon: Target,
    title: "Our Mission",
    text: "Deliver structured, technique-first dance education with real stage opportunities and honest, personal feedback.",
  },
  {
    icon: HeartHandshake,
    title: "Our Philosophy",
    text: "Dance is expression before performance. We coach confidence and musicality alongside choreography.",
  },
  {
    icon: Award,
    title: "Our Achievements",
    text: "50+ stage productions, championship wins, 20+ arangetram debuts and 150+ wedding choreographies.",
  },
];

const reasons = [
  "Small batch sizes so every dancer gets corrections",
  "Graded syllabus per style, from beginner to advanced",
  "Professionally trained, background-verified faculty",
  "Sprung wooden floor, mirrored walls and pro sound",
  "Annual showcase on a real auditorium stage",
  "Flexible batch transfers and make-up classes",
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the studio"
        title="Where discipline meets pure expression"
        description="Riddhi Dance Studio began in a single mirrored room with six students. Today it is a full-fledged academy training over 500 dancers a year across ten styles — and the coaching philosophy has not changed one bit."
      />

      <StatsStrip />

      <section className="section-pad mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <img
              src={studioImage}
              alt="Interior of the Riddhi Dance Studio training floor"
              loading="lazy"
              decoding="async"
              sizes="(min-width: 1024px) 50vw, 100vw"
              width={1024}
              height={768}
              className="rounded-3xl border border-border object-cover"
            />
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Our approach"
              title="Training that actually progresses"
              description="Every batch follows a term plan: foundations, technique drills, choreography, then performance. You always know what you are learning this month and what comes next."
            />
            <ul className="mt-8 grid gap-3">
              {reasons.map((r, i) => (
                <Reveal key={r} delay={i * 60}>
                  <li className="flex gap-3 text-sm text-muted-foreground">
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                    {r}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-pad border-t border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="What drives us" title="Vision, mission & values" align="center" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className="glass-panel h-full rounded-2xl p-6">
                  <p.icon className="size-6 text-gold" />
                  <h3 className="mt-4 font-display text-2xl uppercase tracking-wide">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Special services"
          title="Beyond regular batches"
          description="We also choreograph and perform outside the studio floor."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {specialServices.map((s, i) => (
            <Reveal key={s.id} delay={i * 70}>
              <div className="glass-panel h-full rounded-2xl p-6">
                <h3 className="font-display text-xl uppercase tracking-wide">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}