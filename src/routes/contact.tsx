import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { Link } from "@tanstack/react-router";

import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { mapsEmbed, mapsLink, siteConfig, whatsappLink } from "@/config/site";
import { submitSubmission } from "@/lib/submissions";
import { createSeoHead } from "@/config/seo";

export const Route = createFileRoute("/contact")({
  head: () => ({
    ...createSeoHead({
      title: "Contact Riddhi Dance Studio | Dance Classes in Satna",
      description:
        "Contact Riddhi Dance Studio in Satna for dance classes, directions, hours, WhatsApp support and enquiries.",
      path: "/contact",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "DanceSchool",
          name: siteConfig.name,
          description: siteConfig.shortDescription,
          telephone: siteConfig.phone,
          email: siteConfig.email,
          address: {
            "@type": "PostalAddress",
            streetAddress: siteConfig.address.line1,
            addressLocality: "Satna",
            addressRegion: "Madhya Pradesh",
            postalCode: "485001",
            addressCountry: "IN",
          },
          sameAs: [
            siteConfig.social.instagram,
            siteConfig.social.facebook,
            siteConfig.social.youtube,
          ],
        }),
      },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  phone: z.string().trim().regex(/^[0-9+\s-]{10,15}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email").max(255),
  subject: z.string().trim().min(3, "Add a subject").max(120),
  message: z.string().trim().min(10, "Tell us a little more").max(1000),
  acceptedTerms: z.literal("on", { errorMap: () => ({ message: "Please accept the Terms and Privacy Policy" }) }),
});

function ContactPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const parsed = schema.safeParse(Object.fromEntries(new FormData(form).entries()));
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      await submitSubmission({ type: "contact", data: parsed.data });
      toast.success("Message sent! We usually reply the same day.");
      form.reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not send your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Come dance with us"
        description="Walk in during studio hours, call us, or drop a message — whichever is easiest."
      >
        <Button asChild variant="hero" size="xl">
          <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>Call Now</a>
        </Button>
        <Button asChild variant="gold" size="xl">
          <a href={whatsappLink()} target="_blank" rel="noreferrer">
            <MessageCircle /> WhatsApp Us
          </a>
        </Button>
        <Button asChild variant="glass" size="xl">
          <a href={mapsLink()} target="_blank" rel="noreferrer">
            Get Directions
          </a>
        </Button>
      </PageHero>

      <section className="section-pad mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <ul className="grid gap-5 text-sm">
            <li className="glass-panel flex gap-3 rounded-2xl p-5">
              <MapPin className="size-5 shrink-0 text-primary" />
              <address className="not-italic">
                {siteConfig.address.line1}
                <br />
                {siteConfig.address.line2}
              </address>
            </li>
            <li className="glass-panel flex gap-3 rounded-2xl p-5">
              <Phone className="size-5 shrink-0 text-primary" />
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>{siteConfig.phone}</a>
            </li>
            <li className="glass-panel flex gap-3 rounded-2xl p-5">
              <Mail className="size-5 shrink-0 text-primary" />
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </li>
            <li className="glass-panel flex gap-3 rounded-2xl p-5">
              <Clock className="size-5 shrink-0 text-primary" />
              <span className="grid gap-1">
                {siteConfig.hours.map((h) => (
                  <span key={h.days}>
                    <strong className="font-semibold">{h.days}:</strong> {h.time}
                  </span>
                ))}
              </span>
            </li>
          </ul>

          <div className="mt-6 overflow-hidden rounded-2xl border border-border">
            <iframe
              title="Riddhi Dance Studio location map"
              src={mapsEmbed()}
              loading="lazy"
              className="h-72 w-full"
            />
          </div>
        </div>

        <form onSubmit={onSubmit} noValidate className="glass-panel grid gap-5 rounded-3xl p-6 sm:p-8">
          <h2 className="font-display text-3xl uppercase tracking-wide">Send a message</h2>
          {(
            [
              { name: "name", label: "Name", type: "text" },
              { name: "phone", label: "Phone", type: "tel" },
              { name: "email", label: "Email", type: "email" },
              { name: "subject", label: "Subject", type: "text" },
            ] as const
          ).map((f) => (
            <div key={f.name}>
              <Label htmlFor={f.name}>{f.label} *</Label>
              <Input id={f.name} name={f.name} type={f.type} className="mt-2" />
              {errors[f.name] ? (
                <p className="mt-1 text-xs text-destructive">{errors[f.name]}</p>
              ) : null}
            </div>
          ))}
          <div>
            <Label htmlFor="message">Message *</Label>
            <Textarea id="message" name="message" rows={5} maxLength={1000} className="mt-2" />
            {errors["message"] ? (
              <p className="mt-1 text-xs text-destructive">{errors["message"]}</p>
            ) : null}
          </div>
          <div className="rounded-lg border border-border/50 bg-card/50 p-4">
            <div className="flex items-start gap-3">
              <Checkbox id="acceptedTerms" name="acceptedTerms" aria-invalid={Boolean(errors["acceptedTerms"])} />
              <Label htmlFor="acceptedTerms" className="text-xs font-normal leading-relaxed text-muted-foreground">
                I agree to the{" "}
                <Link to="/terms" className="text-gold hover:underline">Terms of Service</Link>{" "}
                and acknowledge the{" "}
                <Link to="/privacy-policy" className="text-gold hover:underline">Privacy Policy</Link>.
              </Label>
            </div>
            {errors["acceptedTerms"] ? <p className="mt-2 text-xs text-destructive">{errors["acceptedTerms"]}</p> : null}
          </div>
          <Button type="submit" variant="hero" size="xl" className="w-full" disabled={submitting}>
            {submitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </section>
    </>
  );
}