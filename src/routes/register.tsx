import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { danceClasses, danceStyles, normalizeClassImages } from "@/data/studio";
import { whatsappLink } from "@/config/site";
import { submitSubmission } from "@/lib/submissions";
import { getContent } from "@/lib/submissions";
import { createSeoHead } from "@/config/seo";

export const Route = createFileRoute("/register")({
  head: () =>
    createSeoHead({
      title: "Register for Dance Classes | Riddhi Dance Studio Satna",
      description:
        "Register online for dance classes at Riddhi Dance Studio in Satna and choose your preferred style and batch.",
      path: "/register",
    }),
  component: RegisterPage,
});

const schema = z.object({
  studentName: z.string().trim().min(2, "Enter the student's full name").max(80),
  parentName: z.string().trim().max(80).optional().or(z.literal("")),
  dob: z.string().trim().min(1, "Date of birth is required"),
  age: z.coerce.number().min(3, "Minimum age is 3").max(90),
  gender: z.string().trim().min(1, "Select a gender"),
  mobile: z
    .string()
    .trim()
    .regex(/^[0-9+\s-]{10,15}$/, "Enter a valid mobile number"),
  email: z.string().trim().email("Enter a valid email").max(255),
  address: z.string().trim().min(5, "Enter your address").max(300),
  style: z.string().trim().min(1, "Select a dance style"),
  batch: z.string().trim().min(1, "Select a preferred batch"),
  experience: z.string().trim().max(300).optional().or(z.literal("")),
  startDate: z.string().trim().min(1, "Select a preferred start date"),
  message: z.string().trim().max(600).optional().or(z.literal("")),
  acceptedTerms: z.literal("on", {
    errorMap: () => ({ message: "Please accept the Terms and Privacy Policy" }),
  }),
});

function RegisterPage() {
  const [managedClasses, setManagedClasses] = useState(danceClasses);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    void getContent("classes")
      .then((next) => {
        if (next.length) setManagedClasses(normalizeClassImages(next as typeof danceClasses));
      })
      .catch(() => undefined);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.currentTarget).entries());
    const parsed = schema.safeParse(raw);
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
      const cleanData: Record<string, string | number> = {};
      for (const [key, value] of Object.entries(parsed.data)) {
        if (value !== undefined && value !== "") cleanData[key] = value;
      }
      await submitSubmission({ type: "registration", data: cleanData });
      setDone(parsed.data.studentName);
      toast.success("Registration received — we will confirm your batch shortly.");
      e.currentTarget.reset();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not submit your registration. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Online registration"
        title="Join the studio"
        description="Fill this once. Our team verifies batch availability and confirms your seat on WhatsApp within 24 hours."
      />

      <section className="section-pad mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {done ? (
          <div className="glass-panel rounded-3xl p-8 text-center">
            <h2 className="font-display text-3xl uppercase tracking-wide">Registration received</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Thank you, {done}. Our team will confirm your batch and fee details shortly.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild variant="hero" size="xl">
                <a href={whatsappLink()} target="_blank" rel="noreferrer">
                  Confirm on WhatsApp
                </a>
              </Button>
              <Button variant="glass" size="xl" onClick={() => setDone(null)}>
                Register Another Student
              </Button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            noValidate
            className="glass-panel grid gap-5 rounded-3xl p-6 sm:p-8"
          >
            <Field label="Student name" name="studentName" error={errors["studentName"]} required />
            <Field
              label="Parent name (if applicable)"
              name="parentName"
              error={errors["parentName"]}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Date of birth" name="dob" type="date" error={errors["dob"]} required />
              <Field label="Age" name="age" type="number" error={errors["age"]} required />
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <SelectField
                label="Gender"
                name="gender"
                error={errors["gender"]}
                options={["Female", "Male", "Other", "Prefer not to say"]}
              />
              <Field
                label="Mobile number"
                name="mobile"
                type="tel"
                error={errors["mobile"]}
                required
              />
            </div>
            <Field label="Email" name="email" type="email" error={errors["email"]} required />
            <Field label="Address" name="address" error={errors["address"]} required />
            <div className="grid gap-5 sm:grid-cols-2">
              <SelectField
                label="Dance style"
                name="style"
                error={errors["style"]}
                options={danceStyles.map((s) => s.name)}
              />
              <SelectField
                label="Preferred batch"
                name="batch"
                error={errors["batch"]}
                options={managedClasses.map((c) => `${c.name} — ${c.timing}`)}
              />
            </div>
            <Field
              label="Preferred start date"
              name="startDate"
              type="date"
              error={errors["startDate"]}
              required
            />
            <div>
              <Label htmlFor="experience">Previous dance experience</Label>
              <Textarea
                id="experience"
                name="experience"
                rows={3}
                maxLength={300}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" rows={3} maxLength={600} className="mt-2" />
            </div>
            <div className="rounded-lg border border-border/50 bg-card/50 p-4">
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
              {submitting ? "Submitting..." : "Submit Registration"}
            </Button>
          </form>
        )}
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string | undefined;
  required?: boolean;
}) {
  return (
    <div>
      <Label htmlFor={name}>
        {label}
        {required ? " *" : ""}
      </Label>
      <Input id={name} name={name} type={type} className="mt-2" aria-invalid={Boolean(error)} />
      {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  error,
}: {
  label: string;
  name: string;
  options: string[];
  error?: string | undefined;
}) {
  return (
    <div>
      <Label htmlFor={name}>{label} *</Label>
      <select
        id={name}
        name={name}
        defaultValue=""
        className="mt-2 h-9 w-full rounded-md border border-input bg-card px-3 text-sm"
      >
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
