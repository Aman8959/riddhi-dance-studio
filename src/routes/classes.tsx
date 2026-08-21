import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { ClassCard } from "@/components/site/cards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { danceClasses, normalizeClassImages } from "@/data/studio";
import { getContent } from "@/lib/submissions";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/classes")({
  head: () => ({
    meta: [
      { title: "Best Dance Classes in Satna — Bollywood, Hip-Hop, Kids & More" },
      {
        name: "description",
        content:
          "Explore dance classes at Riddhi Dance Studio: Bollywood, Hip-Hop, Contemporary, Classical, Kids Dance, Zumba, wedding and personal training with fees and batch timings.",
      },
      { property: "og:title", content: "Dance Classes at Riddhi Dance Studio" },
      {
        property: "og:description",
        content: "Class details, age groups, levels, timings, trainers and fees — book a free trial.",
      },
    ],
  }),
  component: ClassesPage,
});

const levels = ["All", "Beginner", "Intermediate", "Advanced", "All Levels"] as const;

function ClassesPage() {
  const [classes, setClasses] = useState(danceClasses);
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<(typeof levels)[number]>("All");
  useEffect(() => { void getContent("classes").then((next) => { if (next.length) setClasses(normalizeClassImages(next as typeof danceClasses)); }).catch(() => undefined); }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return classes.filter((c) => {
      const matchesQuery =
        !q ||
        [c.name, c.style, c.trainer, c.ageGroup, c.description]
          .join(" ")
          .toLowerCase()
          .includes(q);
      const matchesLevel = level === "All" || c.level === level;
      return matchesQuery && matchesLevel;
    });
  }, [classes, query, level]);

  return (
    <>
      <PageHero
        eyebrow="Dance classes"
        title="Find the class built for you"
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
      </section>
    </>
  );
}