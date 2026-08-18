import { Star } from "lucide-react";
import { useEffect, useState } from "react";

import { testimonials } from "@/data/studio";
import { cn } from "@/lib/utils";

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => window.clearInterval(id);
  }, []);

  const active = testimonials[index]!;

  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="glass-panel rounded-3xl p-8 sm:p-12">
        <div className="flex justify-center gap-1 text-gold">
          {Array.from({ length: active.rating }).map((_, i) => (
            <Star key={i} className="size-4 fill-current" />
          ))}
        </div>
        <blockquote className="mt-6 text-lg leading-relaxed text-foreground sm:text-xl">
          “{active.quote}”
        </blockquote>
        <p className="mt-6 font-display text-xl uppercase tracking-wide">{active.name}</p>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {active.role} · {active.classAttended}
        </p>
      </div>
      <div className="mt-6 flex justify-center gap-2">
        {testimonials.map((t, i) => (
          <button
            key={t.id}
            type="button"
            aria-label={`Show review from ${t.name}`}
            onClick={() => setIndex(i)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === index ? "w-8 bg-primary" : "w-3 bg-border hover:bg-muted-foreground",
            )}
          />
        ))}
      </div>
    </div>
  );
}