import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { danceStyles } from "@/data/studio";
import { cn } from "@/lib/utils";
import { submitSubmission } from "@/lib/submissions";
import { Link } from "@tanstack/react-router";
import { createSeoHead } from "@/config/seo";

export const Route = createFileRoute("/trial")({
  head: () =>
    createSeoHead({
      title: "Book a Free Trial Dance Class | Riddhi Dance Studio",
      description:
        "Book a free trial dance class at Riddhi Dance Studio in Satna. Choose your style, date and available time slot.",
      path: "/trial",
    }),
  component: TrialPage,
});

const slots = ["7:00 AM", "5:00 PM", "6:30 PM", "7:00 PM", "8:15 PM"];

const schema = z.object({
  name: z.string().trim().min(2, "Enter the student's name").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\s-]{10,15}$/, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email").max(255),
  style: z.string().trim().min(1, "Select a dance style"),
  date: z.string().trim().min(1, "Pick a preferred date"),
  time: z.string().trim().min(1, "Pick a time slot"),
  acceptedTerms: z.literal("on", {
    errorMap: () => ({ message: "Please accept the Terms and Privacy Policy" }),
  }),
});

function TrialPage() {
  const [style, setStyle] = useState("");
  const [time, setTime] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmed, setConfirmed] = useState<z.infer<typeof schema> | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const raw = { ...Object.fromEntries(new FormData(e.currentTarget).entries()), style, time };
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      toast.error("Please complete the highlighted fields.");
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      await submitSubmission({ type: "trial", data: parsed.data });
      setConfirmed(parsed.data);
      toast.success("Trial slot requested!");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not submit your trial request. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmed) {
    return (
      <>
        <PageHero
          eyebrow="Trial confirmed"
          title="Your slot is reserved"
          description="We have your trial request. Our team will send a WhatsApp confirmation with directions and what to wear."
        />
        <section className="section-pad mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="glass-panel rounded-3xl p-8">
            <dl className="grid gap-3 text-sm">
              <Row label="Student" value={confirmed.name} />
              <Row label="Dance style" value={confirmed.style} />
              <Row label="Date" value={confirmed.date} />
              <Row label="Time" value={confirmed.time} />
              <Row label="Phone" value={confirmed.phone} />
              <Row label="Email" value={confirmed.email} />
            </dl>
            <div className="mt-8">
              <Button variant="glass" size="xl" onClick={() => setConfirmed(null)}>
                Book Another Trial
              </Button>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Free trial class"
        title="Try before you join"
        description="One full class, with the regular batch, at no cost. Pick a style, a date and an available slot."
      />
      <section className="section-pad mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={onSubmit}
          noValidate
          className="glass-panel grid gap-6 rounded-3xl p-6 sm:p-8"
        >
          <div>
            <Label>Dance style *</Label>
            <div className="mt-3 flex flex-wrap gap-2">
              {danceStyles.map((s) => (
                <Button
                  key={s.slug}
                  type="button"
                  size="sm"
                  variant={style === s.name ? "hero" : "glass"}
                  className="rounded-full"
                  onClick={() => setStyle(s.name)}
                >
                  {s.name}
                </Button>
              ))}
            </div>
            {errors["style"] ? (
              <p className="mt-2 text-xs text-destructive">{errors["style"]}</p>
            ) : null}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Student name *</Label>
              <Input id="name" name="name" className="mt-2" />
              {errors["name"] ? (
                <p className="mt-1 text-xs text-destructive">{errors["name"]}</p>
              ) : null}
            </div>
            <div>
              <Label htmlFor="phone">Phone number *</Label>
              <Input id="phone" name="phone" type="tel" className="mt-2" />
              {errors["phone"] ? (
                <p className="mt-1 text-xs text-destructive">{errors["phone"]}</p>
              ) : null}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input id="email" name="email" type="email" className="mt-2" />
              {errors["email"] ? (
                <p className="mt-1 text-xs text-destructive">{errors["email"]}</p>
              ) : null}
            </div>
            <div>
              <Label htmlFor="date">Preferred date *</Label>
              <Input id="date" name="date" type="date" className="mt-2" />
              {errors["date"] ? (
                <p className="mt-1 text-xs text-destructive">{errors["date"]}</p>
              ) : null}
            </div>
          </div>

          <div>
            <Label>Available slots *</Label>
            <div className="mt-3 flex flex-wrap gap-2">
              {slots.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setTime(s)}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm transition-colors",
                    time === s
                      ? "border-primary bg-primary/15 text-foreground"
                      : "border-border text-muted-foreground hover:text-foreground",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
            {errors["time"] ? (
              <p className="mt-2 text-xs text-destructive">{errors["time"]}</p>
            ) : null}
          </div>

          <div className="mt-2 rounded-lg border border-border/50 bg-card/50 p-4">
            <div className="flex items-start gap-3">
              <Checkbox
                id="acceptedTerms"
                name="acceptedTerms"
                aria-invalid={Boolean(errors["acceptedTerms"])}
              />
              <Label
                htmlFor="acceptedTerms"
                className="text-xs font-normal leading-relaxed text-muted-foreground"
              >
                I agree to the{" "}
                <Link to="/terms" className="text-gold hover:underline">
                  Terms of Service
                </Link>{" "}
                and acknowledge the{" "}
                <Link to="/privacy-policy" className="text-gold hover:underline">
                  Privacy Policy
                </Link>
                .
              </Label>
            </div>
            {errors["acceptedTerms"] ? (
              <p className="mt-2 text-xs text-destructive">{errors["acceptedTerms"]}</p>
            ) : null}
          </div>

          <Button type="submit" variant="hero" size="xl" className="w-full" disabled={submitting}>
            {submitting ? "Submitting..." : "Book My Free Trial"}
          </Button>
        </form>
      </section>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border pb-2">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-semibold">{value}</dd>
    </div>
  );
}
