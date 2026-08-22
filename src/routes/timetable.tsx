import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import { PageHero } from "@/components/site/PageHero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { batches } from "@/data/studio";
import { getContent } from "@/lib/submissions";
import { createSeoHead } from "@/config/seo";

export const Route = createFileRoute("/timetable")({
  head: () =>
    createSeoHead({
      title: "Dance Class Timetable & Batches | Riddhi Dance Studio",
      description:
        "View and filter the weekly dance class timetable at Riddhi Dance Studio in Satna by style, age, day, trainer and level.",
      path: "/timetable",
    }),
  component: TimetablePage,
});

const unique = (values: string[]) => ["All", ...Array.from(new Set(values))];

function TimetablePage() {
  const [managedBatches, setManagedBatches] = useState(batches);
  useEffect(() => { void getContent("batches").then((next) => { if (next.length) setManagedBatches(next as typeof batches); }).catch(() => undefined); }, []);
  const [style, setStyle] = useState("All");
  const [day, setDay] = useState("All");
  const [trainer, setTrainer] = useState("All");
  const [level, setLevel] = useState("All");
  const [ageGroup, setAgeGroup] = useState("All");

  const filters = [
    { label: "Dance style", value: style, set: setStyle, options: unique(managedBatches.map((b) => b.style)) },
    { label: "Day", value: day, set: setDay, options: unique(managedBatches.map((b) => b.day)) },
    { label: "Age group", value: ageGroup, set: setAgeGroup, options: unique(managedBatches.map((b) => b.ageGroup)) },
    { label: "Trainer", value: trainer, set: setTrainer, options: unique(managedBatches.map((b) => b.trainer)) },
    { label: "Level", value: level, set: setLevel, options: unique(managedBatches.map((b) => b.level)) },
  ];

  const rows = useMemo(
    () =>
      managedBatches.filter(
        (b) =>
          (style === "All" || b.style === style) &&
          (day === "All" || b.day === day) &&
          (trainer === "All" || b.trainer === trainer) &&
          (level === "All" || b.level === level) &&
          (ageGroup === "All" || b.ageGroup === ageGroup),
      ),
    [managedBatches, style, day, trainer, level, ageGroup],
  );

  return (
    <>
      <PageHero
        eyebrow="Batches & timetable"
        title="Your week, choreographed"
        description="Filter the weekly schedule to find a batch that fits your routine. Seats update every term — early bookings get the prime evening slots."
      />

      <section className="section-pad mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass-panel grid gap-4 rounded-2xl p-4 sm:grid-cols-2 lg:grid-cols-5">
          {filters.map((f) => (
            <label key={f.label} className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
              {f.label}
              <Select value={f.value} onValueChange={f.set}>
                <SelectTrigger className="mt-2 w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {f.options.map((o) => (
                    <SelectItem key={o} value={o}>
                      {o}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>
          ))}
        </div>

        {/* Desktop table */}
        <div className="mt-8 hidden overflow-hidden rounded-2xl border border-border lg:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-card/60 text-xs uppercase tracking-[0.16em] text-muted-foreground">
              <tr>
                <th className="px-5 py-4">Day</th>
                <th className="px-5 py-4">Time</th>
                <th className="px-5 py-4">Class</th>
                <th className="px-5 py-4">Age</th>
                <th className="px-5 py-4">Trainer</th>
                <th className="px-5 py-4">Level</th>
                <th className="px-5 py-4">Seats</th>
                <th className="px-5 py-4" />
              </tr>
            </thead>
            <tbody>
              {rows.map((b) => (
                <tr key={b.id} className="border-t border-border transition-colors hover:bg-card/40">
                  <td className="px-5 py-4 font-semibold">{b.day}</td>
                  <td className="px-5 py-4 text-gold">{b.time}</td>
                  <td className="px-5 py-4">{b.className}</td>
                  <td className="px-5 py-4 text-muted-foreground">{b.ageGroup}</td>
                  <td className="px-5 py-4 text-muted-foreground">{b.trainer}</td>
                  <td className="px-5 py-4">
                    <Badge variant="secondary">{b.level}</Badge>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{b.seatsLeft} left</td>
                  <td className="px-5 py-4 text-right">
                    <Button asChild size="sm" variant="hero" className="rounded-full">
                      <Link to="/register">Book This Batch</Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="mt-8 grid gap-4 lg:hidden">
          {rows.map((b) => (
            <div key={b.id} className="glass-panel rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <p className="font-display text-xl uppercase tracking-wide">{b.className}</p>
                <Badge variant="secondary">{b.level}</Badge>
              </div>
              <p className="mt-2 text-sm text-gold">
                {b.day} · {b.time}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Age {b.ageGroup} · {b.trainer} · {b.seatsLeft} seats left
              </p>
              <Button asChild size="sm" variant="hero" className="mt-4 w-full rounded-full">
                <Link to="/register">Book This Batch</Link>
              </Button>
            </div>
          ))}
        </div>

        {rows.length === 0 ? (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            No batches match these filters. Reset a filter or message us for a custom slot.
          </p>
        ) : null}
      </section>
    </>
  );
}