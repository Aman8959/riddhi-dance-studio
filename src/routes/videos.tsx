import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, Play } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";

import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  normalizeLevel,
  normalizeLevelFilter,
  videos,
  type Level,
  type LevelFilterOption,
  type VideoItem,
} from "@/data/studio";
import { getMedia, type MediaItem } from "@/lib/submissions";
import { createSeoHead } from "@/config/seo";

const videoLevels: { id: LevelFilterOption; label: string }[] = [
  { id: "All", label: "All Levels" },
  { id: "Beginner", label: "Beginner" },
  { id: "Intermediate", label: "Intermediate" },
  { id: "Advanced", label: "Advanced" },
  { id: "All Levels", label: "Open to All" },
];

const videoSearchSchema = z.object({
  level: z.string().optional(),
});

export const Route = createFileRoute("/videos")({
  validateSearch: (search: Record<string, unknown>) => {
    const parsed = videoSearchSchema.safeParse(search);
    return parsed.success ? parsed.data : {};
  },
  head: () =>
    createSeoHead({
      title: "Dance Videos & Performances | Riddhi Dance Studio Satna",
      description:
        "Watch choreography reels, student performances, workshop highlights and behind-the-scenes videos from Riddhi Dance Studio in Satna.",
      path: "/videos",
    }),
  component: VideosPage,
});

function VideosPage() {
  const search = Route.useSearch();
  const [selectedLevel, setSelectedLevel] = useState<LevelFilterOption>(() =>
    normalizeLevelFilter(search.level),
  );
  const [playing, setPlaying] = useState<string | null>(null);
  const [remoteMedia, setRemoteMedia] = useState<MediaItem[]>([]);

  useEffect(() => {
    if (search.level !== undefined) {
      setSelectedLevel(normalizeLevelFilter(search.level));
    }
  }, [search.level]);

  useEffect(() => {
    void getMedia()
      .then(setRemoteMedia)
      .catch(() => undefined);
  }, []);

  const publishedVideos: VideoItem[] = remoteMedia
    .filter((item) => item.kind === "video" && item.youtubeId)
    .map((item) => ({
      id: item.id,
      title: item.title,
      category: item.category,
      level: "All Levels" as Level,
      youtubeId: item.youtubeId,
      thumbnail: item.thumbnailUrl,
    }));

  const allVideos = useMemo(() => {
    const list = [...publishedVideos, ...videos];
    if (selectedLevel === "All") return list;
    return list.filter((v) => normalizeLevel(v.level) === selectedLevel);
  }, [publishedVideos, selectedLevel]);

  return (
    <>
      <PageHero
        eyebrow="Videos"
        title="Watch the studio in motion"
        description="Choreography reels, beginner routines, advanced masterclasses and student showcases. Filter by dance level or watch all performances."
      />

      <section className="section-pad mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Level Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Filter by Level:
            </span>
            {videoLevels.map((lvl) => (
              <Button
                key={lvl.id}
                type="button"
                size="sm"
                variant={selectedLevel === lvl.id ? "hero" : "glass"}
                className="rounded-full"
                onClick={() => setSelectedLevel(lvl.id)}
              >
                {lvl.label}
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button asChild variant="glass" size="sm" className="rounded-full">
              <Link to="/gallery">
                <Camera className="mr-1.5 size-3.5" />
                Photo Gallery
              </Link>
            </Button>
            <Button asChild variant="glass" size="sm" className="rounded-full">
              <Link to="/classes">View Classes</Link>
            </Button>
          </div>
        </div>

        {/* Video Grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allVideos.map((v, i) => (
            <Reveal key={v.id} delay={i * 60}>
              <article className="glass-panel overflow-hidden rounded-2xl">
                <div className="relative aspect-video bg-muted">
                  {playing === v.id && v.youtubeId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${v.youtubeId}?autoplay=1`}
                      title={v.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                      className="size-full"
                    />
                  ) : playing === v.id ? (
                    <video src={v.url ?? ""} controls autoPlay className="size-full" />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setPlaying(v.id)}
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
                        <span className="grid size-14 place-items-center rounded-full bg-[image:var(--gradient-brand)] text-primary-foreground shadow-[var(--shadow-glow)] transition-transform group-hover:scale-110">
                          <Play className="size-6" />
                        </span>
                      </span>
                    </button>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                      {v.category}
                    </p>
                    <Badge
                      variant={v.level === "Advanced" ? "hero" : "secondary"}
                      className="rounded-md text-[0.7rem]"
                    >
                      {v.level}
                    </Badge>
                  </div>
                  <h2 className="mt-2 font-display text-xl uppercase tracking-wide">{v.title}</h2>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {allVideos.length === 0 ? (
          <div className="mt-12 text-center text-sm text-muted-foreground">
            No videos found for &ldquo;{selectedLevel}&rdquo; level. Try selecting
            &ldquo;All&rdquo;.
          </div>
        ) : null}
      </section>
    </>
  );
}
