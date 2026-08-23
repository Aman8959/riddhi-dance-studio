import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CalendarDays, Clock, MapPin, User } from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { events } from "@/data/studio";
import { getContent } from "@/lib/submissions";
import { whatsappLink } from "@/config/site";
import { createSeoHead, siteUrl } from "@/config/seo";

const indiaOffsetMinutes = 5 * 60 + 30;
const monthNumbers: Record<string, number> = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

function parseEventStart(event: (typeof events)[number]) {
  const dateMatch = /^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/.exec(event.date);
  const timeMatch = /^(\d{1,2}):(\d{2})\s+(AM|PM)$/.exec(event.time);
  const month = dateMatch ? monthNumbers[dateMatch[2]] : undefined;

  if (!dateMatch || month === undefined || !timeMatch) {
    throw new Error(`Invalid event date or time: ${event.date} ${event.time}`);
  }

  const [, dayText, , yearText] = dateMatch;
  const [, hourText, minuteText, meridiem] = timeMatch;
  const hour12 = Number(hourText);
  const minute = Number(minuteText);
  if (hour12 < 1 || hour12 > 12 || minute > 59) {
    throw new Error(`Invalid event time: ${event.time}`);
  }

  const hour24 = (hour12 % 12) + (meridiem === "PM" ? 12 : 0);
  return new Date(
    Date.UTC(Number(yearText), month, Number(dayText), hour24, minute) -
      indiaOffsetMinutes * 60 * 1000,
  );
}

function getEventDates(event: (typeof events)[number]) {
  const startDate = parseEventStart(event);
  const durationMatch = /^(\d+)\s+(Hours?|Minutes?)$/.exec(event.duration);
  if (!durationMatch) {
    throw new Error(`Invalid event duration: ${event.duration}`);
  }

  const duration = Number(durationMatch[1]) *
    (durationMatch[2].startsWith("Hour") ? 60 : 1);
  const endDate = new Date(startDate.getTime() + duration * 60 * 1000);
  if (endDate <= startDate) {
    throw new Error(`Event end must be later than start: ${event.name}`);
  }

  return { startDate: startDate.toISOString(), endDate: endDate.toISOString() };
}

export const Route = createFileRoute("/events")({
  head: () => ({
    ...createSeoHead({
      title: "Dance Events & Workshops in Satna | Riddhi Dance Studio",
      description:
        "Discover upcoming dance workshops, intensives and stage events at Riddhi Dance Studio in Satna.",
      path: "/events",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          events.map((event) => ({
            "@context": "https://schema.org",
            "@type": "Event",
            name: event.name,
            description: event.description,
            image: new URL(event.image, siteUrl).href,
            performer: {
              "@type": event.instructor === "All Faculty" ? "PerformingGroup" : "Person",
              name: event.instructor,
            },
            ...getEventDates(event),
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            location: {
              "@type": "Place",
              name: event.location,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Satna",
                addressRegion: "Madhya Pradesh",
                addressCountry: "IN",
              },
            },
            organizer: {
              "@type": "DanceSchool",
              name: "Riddhi Dance Studio",
              url: "https://www.riddhidancestudio.com/",
            },
          })),
        ),
      },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  const [managedEvents, setManagedEvents] = useState(events);
  useEffect(() => { void getContent("events").then((next) => { if (next.length) setManagedEvents(next as typeof events); }).catch(() => undefined); }, []);
  return (
    <>
      <PageHero
        eyebrow="Events & workshops"
        title="Something is always happening"
        description="One-day workshops, guest choreographer intensives and our annual auditorium showcase. Open to students and outsiders alike."
      />

      <section className="section-pad mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {managedEvents.map((e, i) => (
            <Reveal key={e.id} delay={i * 70}>
              <article className="glass-panel flex h-full flex-col overflow-hidden rounded-2xl sm:flex-row">
                <img
                  src={e.image}
                  alt={e.name}
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 640px) 12rem, 100vw"
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