import { Link } from "@tanstack/react-router";
import { Clock, IndianRupee, Instagram, Users, Youtube } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { DanceClass, DanceStyle, Trainer } from "@/data/studio";

export function ClassCard({ item }: { item: DanceClass }) {
  return (
    <article className="glass-panel group flex h-full flex-col overflow-hidden rounded-2xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={`${item.name} at Riddhi Dance Studio`}
          loading="lazy"
          width={1024}
          height={768}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <Badge className="absolute left-4 top-4 bg-gold text-gold-foreground">{item.level}</Badge>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-2xl uppercase tracking-wide">{item.name}</h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
          {item.style}
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Users className="size-3.5 text-primary" />
            <span>{item.ageGroup}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="size-3.5 text-primary" />
            <span>{item.duration}</span>
          </div>
          <div className="col-span-2">Batch: {item.timing}</div>
          <div className="col-span-2">Trainer: {item.trainer}</div>
        </dl>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
          <p className="flex items-center font-display text-2xl">
            <IndianRupee className="size-4" />
            {item.price.toLocaleString("en-IN")}
            <span className="ml-1 font-sans text-[0.65rem] uppercase tracking-widest text-muted-foreground">
              /mo
            </span>
          </p>
          <Button asChild variant="hero" size="sm" className="rounded-full">
            <Link to="/trial">Book Trial</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

export function StyleCard({ item }: { item: DanceStyle }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border">
      <img
        src={item.image}
        alt={`${item.name} dance classes`}
        loading="lazy"
        width={1024}
        height={768}
        className="h-72 w-full object-cover transition-transform duration-[900ms] group-hover:scale-110 sm:h-80"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{item.level}</Badge>
          <Badge variant="outline" className="border-gold/50 text-gold">
            {item.ageGroup}
          </Badge>
        </div>
        <h3 className="mt-3 font-display text-3xl uppercase tracking-wide">{item.name}</h3>
        <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-muted-foreground opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
          {item.description}
        </p>
        <Button asChild variant="glass" size="sm" className="mt-4 rounded-full">
          <Link to="/classes">Learn More</Link>
        </Button>
      </div>
    </article>
  );
}

export function TrainerCard({ item }: { item: Trainer }) {
  return (
    <article className="glass-panel overflow-hidden rounded-2xl">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={item.image}
          alt={`${item.name}, ${item.position}`}
          loading="lazy"
          width={800}
          height={1000}
          className="size-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
      </div>
      <div className="p-5">
        <h3 className="font-display text-2xl uppercase tracking-wide">{item.name}</h3>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{item.position}</p>
        <p className="mt-3 text-sm text-muted-foreground">
          <span className="text-foreground">Specialization:</span> {item.specialization}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          <span className="text-foreground">Experience:</span> {item.experience}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.bio}</p>
        <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
          {item.achievements.map((a) => (
            <li key={a} className="flex gap-2">
              <span className="text-gold">★</span>
              {a}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex gap-2">
          <a
            href={item.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label={`${item.name} on Instagram`}
            className="grid size-9 place-items-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
          >
            <Instagram className="size-4" />
          </a>
          <a
            href={item.youtube}
            target="_blank"
            rel="noreferrer"
            aria-label={`${item.name} on YouTube`}
            className="grid size-9 place-items-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
          >
            <Youtube className="size-4" />
          </a>
        </div>
      </div>
    </article>
  );
}