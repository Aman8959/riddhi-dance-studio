import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Play, Sparkles, Star, Trophy, Users } from "lucide-react";

import heroDesktopImage from "@/assets/hero-dance-desktop.webp";
import heroMobileImage from "@/assets/hero-dance-mobile.webp";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { StatsStrip } from "@/components/site/StatsStrip";
import { TestimonialCarousel } from "@/components/site/Testimonials";
import { ClassCard, StyleCard, TrainerCard } from "@/components/site/cards";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { createSeoHead } from "@/config/seo";
import {
  batches,
  danceClasses,
  danceStyles,
  events,
  faqs,
  plans,
  trainers,
  videos,
} from "@/data/studio";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/")({
  head: () => ({
    ...createSeoHead({
      title: "Riddhi Dance Studio | Best Dance Classes in Satna, MP",
      description:
        "Join Riddhi Dance Studio in Satna for Bollywood, Hip-Hop, Contemporary, Classical and Zumba dance classes for kids, teens and adults. Book a free trial class today.",
      path: "/",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "DanceSchool",
              "@id": "https://www.riddhidancestudio.com/#studio",
              name: siteConfig.name,
              description: siteConfig.shortDescription,
              url: "https://www.riddhidancestudio.com/",
              telephone: siteConfig.phone,
              email: siteConfig.email,
              address: {
                "@type": "PostalAddress",
                streetAddress: siteConfig.address.line1,
                addressLocality: "Satna",
                addressRegion: "Madhya Pradesh",
                postalCode: "485001",
                addressCountry: "IN",
              },
              sameAs: [
                siteConfig.social.instagram,
                siteConfig.social.facebook,
                siteConfig.social.youtube,
              ],
            },
            {
              "@type": "WebSite",
              "@id": "https://www.riddhidancestudio.com/#website",
              name: siteConfig.name,
              url: "https://www.riddhidancestudio.com/",
              publisher: { "@id": "https://www.riddhidancestudio.com/#studio" },
            },
          ],
        }),
      },
    ],
  }),
  component: HomePage,
});

const whyUs = [
  {
    icon: Users,
    title: "Small batches",
    text: "Capped batch sizes so every dancer gets personal corrections.",
  },
  {
    icon: Sparkles,
    title: "Graded syllabus",
    text: "Clear term plans from foundations to advanced choreography.",
  },
  {
    icon: Trophy,
    title: "Real stage time",
    text: "Showcases, competitions and community performances every year.",
  },
  {
    icon: CalendarDays,
    title: "Flexible batches",
    text: "Morning and evening slots with easy batch transfers.",
  },
];

function HomePage() {
  return (
    <>
      <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden">
        <picture className="absolute inset-0 -z-10">
          <source media="(max-width: 767px)" srcSet={heroMobileImage} />
          <img
            src={heroDesktopImage}
            alt="Dancer mid-leap in the Riddhi Dance Studio spotlight"
            width={1600}
            height={907}
            fetchPriority="high"
            decoding="async"
            className="size-full object-cover object-center"
          />
        </picture>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/85 to-background/40" />
        <div className="absolute inset-0 -z-10 bg-stage" />

        <div className="mx-auto w-full max-w-7xl px-7 pt-28 pb-20 sm:px-6 lg:px-8">
          <Badge className="bg-gold text-gold-foreground">Now enrolling · Free trial class</Badge>
          <h1 className="mt-4 max-w-full text-[clamp(2.5rem,11vw,3.25rem)] font-light uppercase leading-[0.98] tracking-[0.03em] sm:mt-6 sm:max-w-3xl sm:text-6xl sm:font-normal sm:leading-[0.98] sm:tracking-wide lg:text-7xl">
            <span className="block md:inline">Dance in Satna</span>{" "}
            <span className="block md:inline">for Every Age.</span>
          </h1>
          <p className="mt-2 text-sm tracking-[0.08em] text-muted-foreground">
            Kids • Teens • Adults
          </p>
          <p className="mt-3 font-display text-2xl uppercase tracking-wide text-gradient-brand sm:mt-4">
            Move. Express. Inspire.
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:mt-6 sm:text-lg">
            {siteConfig.shortDescription} Train with working performers, learn a real syllabus and
            perform on a real stage.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 sm:mt-9">
            <Button asChild variant="hero" size="xl">
              <Link to="/classes">
                Join a Dance Class <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link to="/trial">Book a Free Trial</Link>
            </Button>
          </div>
          <div className="mt-8 flex items-start gap-2 pr-16 text-sm leading-relaxed text-muted-foreground sm:mt-10 sm:pr-0">
            <span className="flex shrink-0 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </span>
            <span className="min-w-0">Rated 5/5 by 120+ students and parents</span>
          </div>
        </div>
      </section>

      <StatsStrip />

      <section className="home-section-pad mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About the studio"
          title="A dance home, not just a class"
          description="Riddhi Dance Studio trains kids, teens and adults with a technique-first approach and a stage-ready mindset. Whether you want to dance for joy, fitness or performance, there is a batch built for you."
        />
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild variant="gold" size="xl">
            <Link to="/about">Our Story</Link>
          </Button>
          <Button asChild variant="glass" size="xl">
            <Link to="/trainers">Meet the Trainers</Link>
          </Button>
        </div>
      </section>

      <section className="home-section-pad render-later border-t border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Classes" title="Popular dance classes" />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {danceClasses.slice(0, 3).map((c, i) => (
              <Reveal key={c.id} delay={i * 60}>
                <ClassCard item={c} />
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <Button asChild variant="glass" size="xl">
              <Link to="/classes">View All Classes</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="home-section-pad render-later mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Videos" title="Watch the studio in motion" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {videos.slice(0, 3).map((video, i) => (
            <Reveal key={video.id} delay={i * 70}>
              <Link to="/videos" className="group block overflow-hidden rounded-2xl glass-panel">
                <div className="relative aspect-video bg-muted">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    loading="lazy"
                    decoding="async"
                    width={1024}
                    height={768}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 grid place-items-center bg-background/35">
                    <span className="grid size-14 place-items-center rounded-full bg-[image:var(--gradient-brand)] text-primary-foreground shadow-[var(--shadow-glow)]">
                      <Play className="size-6" />
                    </span>
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-gold">{video.category}</p>
                  <h3 className="mt-2 font-display text-xl uppercase tracking-wide">
                    {video.title}
                  </h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <Button asChild variant="glass" size="xl">
            <Link to="/videos">View All Videos</Link>
          </Button>
        </div>
      </section>

      <section className="home-section-pad render-later mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Dance styles" title="Choose your style" />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {danceStyles.slice(0, 3).map((s, i) => (
            <Reveal key={s.slug} delay={i * 60}>
              <StyleCard item={s} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <Button asChild variant="glass" size="xl">
            <Link to="/styles">View All Styles</Link>
          </Button>
        </div>
      </section>

      <section className="home-section-pad render-later border-y border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Why choose us" title="Built for real progress" align="center" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((w, i) => (
              <Reveal key={w.title} delay={i * 70}>
                <div className="glass-panel h-full rounded-2xl p-6">
                  <w.icon className="size-6 text-gold" />
                  <h3 className="mt-4 font-display text-xl uppercase tracking-wide">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section-pad render-later mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Faculty" title="Meet our trainers" />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trainers.map((t, i) => (
            <Reveal key={t.id} delay={i * 70}>
              <TrainerCard item={t} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="home-section-pad render-later border-t border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Timetable" title="Upcoming batches" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {batches.slice(0, 3).map((b, i) => (
              <Reveal key={b.id} delay={i * 50}>
                <div className="glass-panel rounded-2xl p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-gold">
                    {b.day} · {b.time}
                  </p>
                  <h3 className="mt-2 font-display text-xl uppercase tracking-wide">
                    {b.className}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Age {b.ageGroup} · {b.trainer} · {b.seatsLeft} seats left
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <Button asChild variant="glass" size="xl">
              <Link to="/timetable">View Full Timetable</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="home-section-pad render-later mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Events" title="Workshops & events" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {events.slice(0, 3).map((e, i) => (
            <Reveal key={e.id} delay={i * 70}>
              <article className="glass-panel h-full overflow-hidden rounded-2xl">
                <img
                  src={e.image}
                  alt={e.name}
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 768px) 33vw, 100vw"
                  width={1024}
                  height={768}
                  className="h-44 w-full object-cover"
                />
                <div className="p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-gold">
                    {e.date} · {e.time}
                  </p>
                  <h3 className="mt-2 font-display text-xl uppercase tracking-wide">{e.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{e.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <Button asChild variant="glass" size="xl">
            <Link to="/events">All Events</Link>
          </Button>
        </div>
      </section>

      <section className="home-section-pad render-later border-y border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Testimonials" title="Loved by our students" align="center" />
          <div className="mt-12">
            <TestimonialCarousel />
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="hero" size="xl">
              <Link to="/testimonials">Read & Write Reviews</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="home-section-pad mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Membership" title="Plans that fit your week" align="center" />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.id} delay={i * 70}>
              <div
                className={`glass-panel h-full rounded-3xl p-8 ${p.highlight ? "glow-ring border-primary/60" : ""}`}
              >
                <h3 className="font-display text-3xl uppercase tracking-wide">{p.name}</h3>
                <p className="mt-3 font-display text-4xl">₹{p.price.toLocaleString("en-IN")}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {p.period}
                </p>
                <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
                  {p.features.map((f) => (
                    <li key={f}>· {f}</li>
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
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-border">
        <div className="bg-stage mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="text-4xl uppercase leading-none tracking-wide sm:text-6xl">
            Your first class is <span className="text-gradient-brand">free</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Pick a style, pick a slot, and try a full class with the regular batch. No commitment.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="hero" size="xl">
              <Link to="/trial">Book a Trial Class</Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="home-section-pad mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="FAQ" title="Common questions" align="center" />
        <Accordion type="single" collapsible className="mt-10 w-full">
          {faqs.slice(0, 5).map((f, i) => (
            <AccordionItem key={f.q} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  );
}
