import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Play, Search, Video } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { ClassCard } from "@/components/site/cards";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { danceClasses, normalizeClassImages, videos, type VideoItem } from "@/data/studio";
import { getContent } from "@/lib/submissions";
import { cn } from "@/lib/utils";
import { createSeoHead } from "@/config/seo";

export const Route = createFileRoute("/classes")({
  head: () =>
    createSeoHead({
      title: "Dance Classes in Satna | Bollywood, Hip-Hop, Classical & More",
      description:
        "Explore Bollywood, Hip-Hop, Contemporary, Classical, Kids Dance, Zumba and more at Riddhi Dance Studio in Satna, with fees and batch timings.",
      path: "/classes",
    }),
  component: ClassesPage,
});

const levels = ["All", "Beginner", "Intermediate", "Advanced", "All Levels"] as const;

function ClassesPage() {
  const [classes, setClasses] = useState(danceClasses);
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<(typeof levels)[number]>("All");
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  useEffect(() => {
    void getContent("classes")
      .then((next) => {
        if (next.length) setClasses(normalizeClassImages(next as typeof danceClasses));
      })
      .catch(() => undefined);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return classes.filter((c) => {
      const matchesQuery =
        !q ||
        [c.name, c.style, c.trainer, c.ageGroup, c.description].join(" ").toLowerCase().includes(q);
      const matchesLevel = level === "All" || c.level === level;
      return matchesQuery && matchesLevel;
    });
  }, [classes, query, level]);

  const levelVideos = useMemo(() => {
    if (level === "All") {
      return videos.slice(0, 6);
    }
    return videos.filter(
      (v) => v.level === level || (level === "All Levels" && v.level === "All Levels"),
    );
  }, [level]);

  return (
    <>
      <PageHero
        eyebrow="Dance classes"
        title="Dance Classes in Satna for Every Dancer"
        description="Ten styles, structured levels and batches that run morning to night. Every class starts with a free trial so you can feel the room before you commit."
      />

      <section className="section-pad mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass-panel flex flex-col gap-4 rounded-2xl p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value.slice(0, 80))}
              placeholder="Search class, style or trainer"
              aria-label="Search classes"
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {levels.map((l) => (
              <Button
                key={l}
                type="button"
                size="sm"
                variant={level === l ? "hero" : "glass"}
                className={cn("rounded-full")}
                onClick={() => setLevel(l)}
              >
                {l}
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((c, i) => (
            <Reveal key={c.id} delay={i * 60}>
              <ClassCard item={c} />
            </Reveal>
          ))}
        </div>

        {results.length === 0 ? (
          <p className="mt-12 text-center text-sm text-muted-foreground">
            No classes match that search. Try a different style or level.
          </p>
        ) : null}

        {/* Level Videos Showcase Section */}
        <div className="mt-20 border-t border-border pt-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                <Video className="size-3.5" />
                {level === "All" ? "Level Highlights" : `${level} Level Showcase`}
              </div>
              <h2 className="mt-3 font-display text-3xl uppercase tracking-wide">
                {level === "All"
                  ? "Featured Class & Choreography Videos"
                  : `${level} Category Videos`}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {level === "Advanced"
                  ? "Watch high-intensity choreography drills, masterclass routines and advanced cyphers."
                  : level === "Intermediate"
                    ? "See technical floorwork, transitions and expressive student choreography."
                    : level === "Beginner"
                      ? "Check out foundational rhythm routines, basic steps and beginner showcase reels."
                      : "See what our dancers achieve across all experience levels."}
              </p>
            </div>

            <Button asChild variant="hero" size="sm" className="w-fit rounded-full">
              <Link to="/videos" search={{ level: level === "All" ? undefined : level }}>
                <Play className="mr-1.5 size-3.5 fill-current" />
                View All {level === "All" ? "" : `${level} `}Videos
                <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {levelVideos.map((v, i) => (
              <Reveal key={v.id} delay={i * 50}>
                <article className="glass-panel overflow-hidden rounded-2xl">
                  <div className="relative aspect-video bg-muted">
                    {playingVideo === v.id && v.youtubeId ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${v.youtubeId}?autoplay=1`}
                        title={v.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                        className="size-full"
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setPlayingVideo(v.id)}
                        aria-label={`Play ${v.title}`}
                        className="group relative size-full"
                      >
                        <img
                          src={v.thumbnail}
                          alt={v.title}
                          loading="lazy"
                          decoding="async"
                          width={1024}
                          height={768}
                          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <span className="absolute inset-0 grid place-items-center bg-background/40 transition-colors group-hover:bg-background/20">
                          <span className="grid size-12 place-items-center rounded-full bg-[image:var(--gradient-brand)] text-primary-foreground shadow-[var(--shadow-glow)] transition-transform group-hover:scale-110">
                            <Play className="size-5" />
                          </span>
                        </span>
                      </button>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                        {v.category}
                      </span>
                      <Badge
                        variant={v.level === "Advanced" ? "hero" : "secondary"}
                        className="rounded-md text-[0.65rem]"
                      >
                        {v.level}
                      </Badge>
                    </div>
                    <h3 className="mt-1 font-display text-lg uppercase tracking-wide">{v.title}</h3>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {levelVideos.length === 0 ? (
            <p className="mt-6 text-center text-sm text-muted-foreground">
              No videos currently listed for {level} level. Check the full Video Gallery.
            </p>
          ) : null}
        </div>
      </section>
    </>
  );
}
