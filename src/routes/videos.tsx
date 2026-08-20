import { createFileRoute } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";

import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { videos } from "@/data/studio";
import { getMedia, type MediaItem } from "@/lib/submissions";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Dance Videos — Performances & Choreography | Riddhi Dance Studio" },
      {
        name: "description",
        content:
          "Watch choreography reels, student performances, workshop highlights and behind-the-scenes videos from Riddhi Dance Studio.",
      },
      { property: "og:title", content: "Riddhi Dance Studio Videos" },
      {
        property: "og:description",
        content: "Choreography, student performances and workshop highlights on video.",
      },
    ],
  }),
  component: VideosPage,
});

function VideosPage() {
  const [playing, setPlaying] = useState<string | null>(null);
  const [remoteMedia, setRemoteMedia] = useState<MediaItem[]>([]);
  useEffect(() => { void getMedia().then(setRemoteMedia).catch(() => undefined); }, []);
  const publishedVideos = remoteMedia.filter((item) => item.kind === "video" && item.youtubeId).map((item) => ({ id: item.id, title: item.title, category: item.category, youtubeId: item.youtubeId, thumbnail: item.thumbnailUrl }));
  const allVideos = [...publishedVideos, ...videos];

  return (
    <>
      <PageHero
        eyebrow="Videos"
        title="Watch the studio in motion"
        description="Choreography reels, student showcases and workshop highlights. Thumbnails load first — nothing plays until you press play."
      />

      <section className="section-pad mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                    <video src={v.url} controls autoPlay className="size-full" />
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
                        className="size-full object-cover"
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
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                    {v.category}
                  </p>
                  <h2 className="mt-2 font-display text-xl uppercase tracking-wide">{v.title}</h2>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}