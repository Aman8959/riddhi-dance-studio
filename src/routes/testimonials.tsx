import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { testimonials } from "@/data/studio";
import { getApprovedReviews, submitSubmission } from "@/lib/submissions";

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  classAttended: z.string().trim().min(2, "Enter the class name").max(120),
  rating: z.coerce.number().int().min(1, "Select a rating").max(5),
  message: z.string().trim().min(10, "Write a little more about your experience").max(700),
});

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Student & Parent Reviews — Riddhi Dance Studio" },
      {
        name: "description",
        content:
          "Read reviews from students and parents of Riddhi Dance Studio across Bollywood, kids dance, hip-hop, classical and wedding choreography.",
      },
      { property: "og:title", content: "What Our Students Say" },
      {
        property: "og:description",
        content: "Honest reviews from students and parents at Riddhi Dance Studio.",
      },
    ],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [approvedReviews, setApprovedReviews] = useState<Array<{
    id: string;
    name: string;
    role: string;
    rating: number;
    quote: string;
    classAttended: string;
  }>>([]);

  useEffect(() => {
    void (async () => {
      try {
        const reviews = await getApprovedReviews();
        setApprovedReviews(
          reviews.map((review) => ({
            id: review.id,
            name: review.name,
            role: "Student",
            rating: review.rating,
            quote: review.message,
            classAttended: review.classAttended,
          })),
        );
      } catch {
        setApprovedReviews([]);
      }
    })();
  }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());
    const parsed = schema.safeParse(raw);

    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        next[String(issue.path[0])] = issue.message;
      }
      setErrors(next);
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      await submitSubmission({ type: "review", data: parsed.data });
      toast.success("Thanks for your review. It has been submitted for approval.");
      form.reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not submit your review.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Testimonials"
        title="Told by the people who dance here"
        description="Every review below comes from a current or former student family at the studio."
      />
      <section className="section-pad mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...approvedReviews, ...testimonials].map((t, i) => (
            <Reveal key={t.id} delay={i * 70}>
              <figure className="glass-panel h-full rounded-2xl p-6">
                <div className="flex gap-1 text-gold">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="size-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 border-t border-border pt-4">
                  <p className="font-display text-lg uppercase tracking-wide">{t.name}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {t.role} · {t.classAttended}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-pad mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
        <form onSubmit={onSubmit} noValidate className="glass-panel grid gap-5 rounded-3xl p-6 sm:p-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-primary">Leave a review</p>
            <h2 className="mt-2 font-display text-3xl uppercase tracking-wide">
              Share your dance experience
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="name">Your name *</Label>
              <Input id="name" name="name" type="text" className="mt-2" />
              {errors["name"] ? <p className="mt-1 text-xs text-destructive">{errors["name"]}</p> : null}
            </div>

            <div>
              <Label htmlFor="classAttended">Class attended *</Label>
              <Input id="classAttended" name="classAttended" type="text" className="mt-2" />
              {errors["classAttended"] ? (
                <p className="mt-1 text-xs text-destructive">{errors["classAttended"]}</p>
              ) : null}
            </div>
          </div>

          <div>
            <Label htmlFor="rating">Rating *</Label>
            <select
              id="rating"
              name="rating"
              defaultValue="5"
              className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Very good</option>
              <option value="3">3 - Good</option>
              <option value="2">2 - Fair</option>
              <option value="1">1 - Poor</option>
            </select>
            {errors["rating"] ? <p className="mt-1 text-xs text-destructive">{errors["rating"]}</p> : null}
          </div>

          <div>
            <Label htmlFor="message">Your review *</Label>
            <Textarea id="message" name="message" rows={5} className="mt-2" />
            {errors["message"] ? <p className="mt-1 text-xs text-destructive">{errors["message"]}</p> : null}
          </div>

          <Button type="submit" variant="hero" size="xl" className="w-full" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </section>
    </>
  );
}