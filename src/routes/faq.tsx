import { createFileRoute, Link } from "@tanstack/react-router";

import { PageHero } from "@/components/site/PageHero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { faqs } from "@/data/studio";
import { createSeoHead } from "@/config/seo";

export const Route = createFileRoute("/faq")({
  head: () => ({
    ...createSeoHead({
      title: "Dance Class FAQ | Riddhi Dance Studio Satna",
      description:
        "Find answers about dance class trials, ages, fees, styles and performance opportunities at Riddhi Dance Studio in Satna.",
      path: "/faq",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Everything you wanted to ask"
        description="Still unsure? Message us on WhatsApp — we reply the same day."
      />
      <section className="section-pad mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild variant="hero" size="xl">
            <Link to="/trial">Book a Free Trial</Link>
          </Button>
          <Button asChild variant="glass" size="xl">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </>
  );
}