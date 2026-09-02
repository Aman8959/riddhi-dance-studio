import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Play, Video, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { galleryCategories, galleryItems, type GalleryItem } from "@/data/studio";
import { getMedia, type MediaItem } from "@/lib/submissions";
import { createSeoHead } from "@/config/seo";

export const Route = createFileRoute("/gallery")({
  head: () =>
    createSeoHead({
      title: "Dance Studio Gallery | Riddhi Dance Studio Satna",
      description:
        "Explore photos of classes, performances, competitions, workshops and studio events at Riddhi Dance Studio in Satna.",
      path: "/gallery",
    }),
  component: GalleryPage,
});

function GalleryPage() {
  const [category, setCategory] = useState<(typeof galleryCategories)[number]>("All");
  const [active, setActive] = useState<GalleryItem | null>(null);
  const [remoteMedia, setRemoteMedia] = useState<MediaItem[]>([]);

  useEffect(() => {
    void getMedia()
      .then(setRemoteMedia)
      .catch(() => undefined);
  }, []);

  const items = useMemo(() => {
    const publishedItems: GalleryItem[] = remoteMedia
      .filter((item) => item.kind === "image" || item.kind === "poster")
      .map((item) => ({ id: item.id, image: item.url, title: item.title, category: "Events" }));
    const allItems = [...publishedItems, ...galleryItems];
    return category === "All" ? allItems : allItems.filter((i) => i.category === category);
  }, [category, remoteMedia]);

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Moments from the floor"
        description="Classes, competitions, workshops and stage nights — a look at what a season at Riddhi actually feels like."
      />

      <section className="section-pad mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {galleryCategories.map((c) => (
              <Button
                key={c}
                type="button"
                size="sm"
                variant={category === c ? "hero" : "glass"}
                className="rounded-full"
                onClick={() => setCategory(c)}
              >
                {c}
              </Button>
            ))}
          </div>

          <Button
            asChild
            variant="hero"
            size="sm"
            className="w-fit rounded-full shadow-[var(--shadow-glow)]"
          >
            <Link to="/videos">
              <Play className="mr-1.5 size-3.5 fill-current" />
              Watch Video Gallery
            </Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={i * 50}>
              <button
                type="button"
                onClick={() => setActive(item)}
                className="group relative block w-full overflow-hidden rounded-2xl border border-border"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  width={1024}
                  height={768}
                  className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 p-4 text-left text-sm font-semibold opacity-0 transition-opacity group-hover:opacity-100">
                  {item.title}
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        {/* Dedicated Video Section Banner */}
        <div className="glass-panel mt-16 flex flex-col items-center justify-between gap-6 rounded-3xl p-6 sm:p-10 md:flex-row">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
              <Video className="size-3.5 text-gold" />
              Video Showcase
            </div>
            <h2 className="font-display text-2xl uppercase tracking-wide sm:text-3xl">
              Want to see our choreography in motion?
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Watch student performance videos, beginner to advanced choreography masterclasses, and
              live stage reels in our video library.
            </p>
          </div>
          <Button
            asChild
            variant="hero"
            size="lg"
            className="w-full shrink-0 rounded-full sm:w-auto"
          >
            <Link to="/videos">
              <Play className="mr-2 size-4 fill-current" />
              Explore All Videos
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </section>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          className="fixed inset-0 z-[60] grid place-items-center bg-background/95 p-4 backdrop-blur"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            aria-label="Close preview"
            className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-border"
            onClick={() => setActive(null)}
          >
            <X className="size-5" />
          </button>
          <figure className="max-w-4xl">
            <img
              src={active.image}
              alt={active.title}
              loading="lazy"
              decoding="async"
              width={1024}
              height={768}
              className="max-h-[75vh] w-full rounded-2xl object-contain"
            />
            <figcaption className="mt-4 text-center text-sm text-muted-foreground">
              {active.title} · {active.category}
            </figcaption>
          </figure>
        </div>
      ) : null}
    </>
  );
}
