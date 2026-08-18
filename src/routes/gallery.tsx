import { createFileRoute } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useMemo, useState } from "react";

import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { galleryCategories, galleryItems, type GalleryItem } from "@/data/studio";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Riddhi Dance Studio Performances & Classes" },
      {
        name: "description",
        content:
          "Photos from Riddhi Dance Studio: classes, stage performances, competitions, workshops and studio events.",
      },
      { property: "og:title", content: "Riddhi Dance Studio Gallery" },
      {
        property: "og:description",
        content: "Classes, performances, competitions and workshops in pictures.",
      },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [category, setCategory] = useState<(typeof galleryCategories)[number]>("All");
  const [active, setActive] = useState<GalleryItem | null>(null);

  const items = useMemo(
    () => (category === "All" ? galleryItems : galleryItems.filter((i) => i.category === category)),
    [category],
  );

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Moments from the floor"
        description="Classes, competitions, workshops and stage nights — a look at what a season at Riddhi actually feels like."
      />

      <section className="section-pad mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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