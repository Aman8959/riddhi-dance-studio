import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Clock, MapPin, User } from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { events } from "@/data/studio";
import { whatsappLink } from "@/config/site";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Dance Events & Workshops — Riddhi Dance Studio" },
      {
        name: "description",
        content:
          "Upcoming dance workshops and events at Riddhi Dance Studio, including Bollywood workshops, hip-hop intensives and our annual showcase.",
      },
      { property: "og:title", content: "Upcoming Dance Events & Workshops" },
      {
        property: "og:description",
        content: "Workshops, intensives and stage productions you can register for.",
      },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Events & workshops"
        title="Something is always happening"
        description="One-day workshops, guest choreographer intensives and our annual auditorium showcase. Open to students and outsiders alike."
      />

      <section className="section-pad mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {events.map((e, i) => (
            <Reveal key={e.id} delay={i * 70}>
              <article className="glass-panel flex h-full flex-col overflow-hidden rounded-2xl sm:flex-row">
                <img
                  src={e.image}
                  alt={e.name}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-48 w-full object-cover sm:h-auto sm:w-48"
                />
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-display text-2xl uppercase leading-tight tracking-wide">
                      {e.name}
                    </h2>
                    <Badge
                      variant={e.status === "Full" ? "secondary" : "default"}
                      className={e.status === "Few Seats" ? "bg-gold text-gold-foreground" : ""}
                    >
                      {e.status}
                    </Badge>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.description}</p>
                  <ul className="mt-4 grid gap-2 text-xs text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CalendarDays className="size-3.5 text-primary" /> {e.date}
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="size-3.5 text-primary" /> {e.time} · {e.duration}
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="size-3.5 text-primary" /> {e.location}
                    </li>
                    <li className="flex items-center gap-2">
                      <User className="size-3.5 text-primary" /> {e.instructor}
                    </li>
                  </ul>
                  <div className="mt-5 pt-1">
                    <Button
                      asChild
                      variant={e.status === "Full" ? "glass" : "hero"}
                      size="sm"
                      className="rounded-full"
                    >
                      <a
                        href={whatsappLink(
                          `Hello Riddhi Dance Studio, I would like to register for "${e.name}" on ${e.date}.`,
                        )}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {e.status === "Full" ? "Join Waitlist" : "Register Now"}
                      </a>
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}