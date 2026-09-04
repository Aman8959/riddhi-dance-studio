import { createFileRoute } from "@tanstack/react-router";
import { Play, Search, Video, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";

import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { ClassCard } from "@/components/site/cards";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  danceClasses,
  normalizeClassImages,
  normalizeLevel,
  normalizeLevelFilter,
  videos,
  type DanceClass,
  type LevelFilterOption,
} from "@/data/studio";
import { getContent, getMedia, type MediaItem } from "@/lib/submissions";
import { createSeoHead } from "@/config/seo";

const classSearchSchema = z.object({
  level: z.string().optional(),
  q: z.string().optional(),
});

export const Route = createFileRoute("/classes")({
  validateSearch: (search: Record<string, unknown>) => {
    const parsed = classSearchSchema.safeParse(search);
    return parsed.success ? parsed.data : {};
  },
  head: () =>
    createSeoHead({
      title: "Dance Classes in Satna | Bollywood, Hip-Hop, Classical & More",
      description:
        "Explore Bollywood, Hip-Hop, Contemporary, Classical, Kids Dance, Zumba and more at Riddhi Dance Studio in Satna, with fees and batch timings.",
      path: "/classes",
    }),
  component: ClassesPage,
});

const levelFilterOptions: { id: LevelFilterOption; label: string }[] = [
  { id: "All", label: "All Classes" },
  { id: "Beginner", label: "Beginner" },
  { id: "Intermediate", label: "Intermediate" },
  { id: "Advanced", label: "Advanced" },
  { id: "All Levels", label: "All Levels" },
];

function ClassesPage() {
  const search = Route.useSearch();
  const [classes, setClasses] = useState<DanceClass[]>(() => normalizeClassImages(danceClasses));
  const [query, setQuery] = useState(search.q ?? "");
  const [level, setLevel] = useState<LevelFilterOption>(() => normalizeLevelFilter(search.level));
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [remoteMedia, setRemoteMedia] = useState<MediaItem[]>([]);

  // Sync if URL search changes (supporting ?level=basic, ?level=advance, etc.)
  useEffect(() => {
    if (search.level !== undefined) {
      setLevel(normalizeLevelFilter(search.level));
    }
    if (search.q !== undefined) {
      setQuery(search.q);
    }
  }, [search.level, search.q]);

  // Load published classes from CMS / Google Sheets
  useEffect(() => {
    void getContent<DanceClass>("classes")
      .then((next) => {
        if (next && next.length) {
          setClasses(normalizeClassImages(next));
        }
      })
      .catch(() => undefined);
  }, []);

  // Load remote media independently for video highlights
  useEffect(() => {
    void getMedia()
      .then(setRemoteMedia)
      .catch(() => undefined);
  }, []);

  // Filter classes based on selected level and query
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return classes.filter((c) => {
      const normalizedClassLevel = normalizeLevel(c.level);
      const matchesLevel = level === "All" || normalizedClassLevel === level;
      const matchesQuery =
        !q ||
        [c.name, c.style, c.trainer, c.ageGroup, c.description].join(" ").toLowerCase().includes(q);
      return matchesLevel && matchesQuery;
    });
  }, [classes, query, level]);

  // Featured videos showcase - independent from class level filtering
  const featuredVideos = useMemo(() => {
    const remoteList = remoteMedia
      .filter((item) => item.kind === "video" && item.youtubeId)
      .map((item) => ({
        id: item.id,
        title: item.title,
        category: item.category || "Video",
        youtubeId: item.youtubeId,
        thumbnail: item.thumbnailUrl,
        level: undefined as string | undefined,
      }));

    const staticList = videos.map((item) => ({
      id: item.id,
      title: item.title,
      category: item.category,
      youtubeId: item.youtubeId,
      thumbnail: item.thumbnail,
      level: item.level as string | undefined,
    }));

    return [...remoteList, ...staticList].slice(0, 6);
  }, [remoteMedia]);

  return (
    <>
      <PageHero
        eyebrow="Dance classes"
        title="Dance Classes in Satna for Every Dancer"
        description="Ten styles, structured levels and batches that run morning to night. Every class starts with a free trial so you can feel the room before you commit."
      />

      <section className="section-pad mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Simple & Clean Filter Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Level Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {levelFilterOptions.map((opt) => (
              <Button
                key={opt.id}
                type="button"
                size="sm"
                variant={level === opt.id ? "hero" : "glass"}
                className="rounded-full px-4 text-xs font-medium"
                onClick={() => setLevel(opt.id)}
              >
                {opt.label}
              </Button>
            ))}
          </div>

          {/* Search input */}
          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value.slice(0, 80))}
              placeholder="Search style or trainer..."
              aria-label="Search classes"
              className="h-9 pl-9 pr-8 text-sm"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="size-3.5" />
              </button>
            ) : null}
          </div>
        </div>

        {/* Classes Grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((c, i) => (
            <Reveal key={c.id} delay={i * 60}>
              <ClassCard item={c} />
            </Reveal>
          ))}
        </div>

        {results.length === 0 ? (
          <div className="mt-12 text-center">
            <p className="text-base font-semibold">No classes match that filter or search.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try selecting &ldquo;All Classes&rdquo; or clearing the search box.
            </p>
            <Button
              type="button"
              variant="hero"
              size="sm"
              className="mt-4 rounded-full"
              onClick={() => {
                setLevel("All");
                setQuery("");
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : null}

        {/* Studio Video Highlights (Independent from class level filters) */}
        <div className="mt-20 border-t border-border pt-12">
          <div className="flex flex-col gap-2">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
              <Video className="size-3.5" />
              Studio Highlights
            </div>
            <h2 className="mt-2 font-display text-3xl uppercase tracking-wide">
              Featured Class &amp; Choreography Videos
            </h2>
            <p className="text-sm text-muted-foreground">
              Watch choreography reels, student routines, and studio sessions from our classes.
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredVideos.map((v, i) => (
              <Reveal key={v.id} delay={i * 50}>
                <article className="glass-panel overflow-hidden rounded-2xl">
                  <div className="relative aspect-video bg-muted">
                    {playingVideo === v.id && v.youtubeId ? (
                      <div className="relative size-full">
                        <iframe
                          src={`https://www.youtube.com/embed/${v.youtubeId}?autoplay=1`}
                          title={v.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                          allowFullScreen
                          loading="lazy"
                          className="size-full"
                        />
                        <button
                          type="button"
                          onClick={() => setPlayingVideo(null)}
                          className="absolute right-2 top-2 z-10 grid size-7 place-items-center rounded-full bg-background/80 text-foreground shadow hover:bg-background"
                          aria-label="Close video"
                        >
                          <X className="size-4" />
                        </button>
                      </div>
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
                      {v.level ? (
                        <Badge
                          variant={v.level === "Advanced" ? "hero" : "secondary"}
                          className="rounded-md text-[0.65rem]"
                        >
                          {v.level}
                        </Badge>
                      ) : null}
                    </div>
                    <h3 className="mt-1 font-display text-lg uppercase tracking-wide">{v.title}</h3>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {featuredVideos.length === 0 ? (
            <p className="mt-6 text-center text-sm text-muted-foreground">
              No videos currently listed.
            </p>
          ) : null}
        </div>
      </section>
    </>
  );
}
