import { createFileRoute } from "@tanstack/react-router";
import { FileCheck2, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { siteConfig } from "@/config/site";
import { createSeoHead } from "@/config/seo";

export const Route = createFileRoute("/privacy-policy")({
  head: () =>
    createSeoHead({
      title: "Privacy Policy | Riddhi Dance Studio",
      description:
        "Read how Riddhi Dance Studio collects, uses and protects personal information submitted through its website.",
      path: "/privacy-policy",
    }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy Policy"
        title="Your privacy matters to us"
        description="Understand how Riddhi Dance Studio collects and protects your information."
      />

      <section className="section-pad mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="legal-content">
          <div className="legal-meta mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Policy overview</p>
              <h2 className="mt-2 text-2xl">Clear, respectful data practices</h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                This policy explains what we collect when you contact the studio, book a trial, or join a class, why we need it,
                and the choices available to you.
              </p>
            </div>
            <p className="shrink-0 text-sm text-muted-foreground"><strong>Last updated</strong><br />August 22, 2026</p>
          </div>
          <div className="mb-12 grid gap-4 sm:grid-cols-3">
            <div className="legal-card"><ShieldCheck className="size-5 text-primary" /><h3>Collected with purpose</h3><p>Only details needed to respond, schedule, and support your studio experience.</p></div>
            <div className="legal-card"><FileCheck2 className="size-5 text-gold" /><h3>Handled responsibly</h3><p>Submissions are processed for studio operations through our configured backend services.</p></div>
            <div className="legal-card"><Mail className="size-5 text-primary" /><h3>Questions welcome</h3><p>Contact us to ask about your information or request an update where applicable.</p></div>
          </div>

          <h2 className="mt-10 text-2xl font-bold">1. Introduction</h2>
          <p>
            Riddhi Dance Studio ("we," "us," "our," or "Studio") is committed to protecting your privacy. This Privacy Policy
            explains how we collect, use, disclose, and otherwise process information about you in connection with our website and
            services.
          </p>

          <h2 className="mt-10 text-2xl font-bold">2. Information We Collect</h2>
          <p>
            We may collect the following types of information when you interact with our website or services:
          </p>
          <ul>
            <li>
              <strong>Personal Information:</strong> Name, email address, phone number, date of birth, age, gender, address, and
              other information you voluntarily provide when registering for classes, booking a trial, or contacting us.
            </li>
            <li>
              <strong>Form Submissions:</strong> Information submitted through registration forms, trial booking forms, contact
              forms, enquiry forms, and review/testimonial forms.
            </li>
            <li>
              <strong>Communication Information:</strong> Messages, enquiries, and feedback you send to us through contact forms,
              email, phone, or other channels.
            </li>
            <li>
              <strong>Technical Information:</strong> Basic usage information about how you interact with our website (through
              standard web server logs and browser data).
            </li>
          </ul>

          <h2 className="mt-10 text-2xl font-bold">3. How We Use Your Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul>
            <li>Processing dance class registrations and trial bookings</li>
            <li>Managing and confirming class attendance</li>
            <li>Responding to enquiries and providing customer support</li>
            <li>Communicating with you regarding registrations, bookings, and enquiries</li>
            <li>Publishing reviews and testimonials (with your consent where required)</li>
            <li>Operating and improving our website and services</li>
            <li>Complying with legal obligations and studio policies</li>
          </ul>

          <h2 className="mt-10 text-2xl font-bold">4. Data Storage and Processing</h2>
          <p>
            Information collected through our website may be stored and processed using the following services:
          </p>
          <ul>
            <li>
              <strong>Google Apps Script and Google Sheets:</strong> Form submissions (registration, trial bookings, contact
              enquiries) are processed and stored through Google Apps Script backend integration and recorded in Google Sheets.
            </li>
            <li>
              <strong>Google Drive:</strong> Uploaded media and documents may be stored on Google Drive for studio records and
              administrative purposes.
            </li>
            <li>
              <strong>Website Backend:</strong> Information submitted through our website is processed by our backend systems.
            </li>
          </ul>
          <p>
            Not all information is stored in every service. The data flow depends on the type of submission and the services
            involved in processing that specific request.
          </p>

          <h2 className="mt-10 text-2xl font-bold">5. Third-Party Services</h2>
          <p>
            Our website may use or integrate with the following third-party services:
          </p>
          <ul>
            <li><strong>Google Apps Script:</strong> For backend form processing and automation</li>
            <li><strong>Google Sheets:</strong> For data storage and record management</li>
            <li><strong>Google Drive:</strong> For file storage and media management</li>
            <li><strong>Vercel:</strong> For website hosting and deployment</li>
          </ul>
          <p>
            These third-party services have their own privacy policies. We encourage you to review their privacy practices
            independently.
          </p>

          <h2 className="mt-10 text-2xl font-bold">6. Data Security</h2>
          <p>
            We take reasonable precautions to protect your personal information from unauthorized access, alteration, disclosure,
            or destruction. However, no internet transmission or electronic storage system is completely secure. While we strive to
            protect your information, we cannot guarantee absolute security.
          </p>

          <h2 className="mt-10 text-2xl font-bold">7. Data Retention</h2>
          <p>
            We retain your personal information for as long as reasonably necessary to:
          </p>
          <ul>
            <li>Manage your dance class registrations</li>
            <li>Respond to your enquiries and requests</li>
            <li>Maintain records of trials and communications</li>
            <li>Comply with legal, business, and administrative requirements</li>
            <li>Provide you with requested services</li>
          </ul>

          <h2 className="mt-10 text-2xl font-bold">8. Your Rights</h2>
          <p>
            Depending on applicable laws, you may have the right to:
          </p>
          <ul>
            <li>Request access to your personal information</li>
            <li>Request correction or updating of inaccurate information</li>
            <li>Request deletion of your personal information (where applicable)</li>
            <li>Object to or restrict certain uses of your information</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information provided below.
          </p>

          <h2 className="mt-10 text-2xl font-bold">9. Children's Privacy</h2>
          <p>
            Riddhi Dance Studio serves students of various ages, including minors. Parents and guardians are responsible for
            providing information and consent on behalf of minor students. If you are under 18, please ensure your parent or
            guardian reviews this Privacy Policy and approves your use of our services.
          </p>

          <h2 className="mt-10 text-2xl font-bold">10. Photos, Videos, and Media</h2>
          <p>
            Photos, videos, and other media may be uploaded, displayed, or shared by the studio or students. If you have concerns
            about identifiable images or media containing your likeness, please contact us immediately.
          </p>

          <h2 className="mt-10 text-2xl font-bold">11. External Links and Third-Party Websites</h2>
          <p>
            Our website may contain links to external websites and services that have their own privacy policies. Riddhi Dance
            Studio is not responsible for the privacy practices, content, or data collection of external websites or services we
            do not control. Please review the privacy policies of any external websites before providing personal information.
          </p>

          <h2 className="mt-10 text-2xl font-bold">12. Policy Updates</h2>
          <p>
            We may update this Privacy Policy from time to time as our practices evolve or to comply with legal requirements. The
            "Last Updated" date at the top of this policy indicates when it was last revised. We encourage you to review this
            policy periodically.
          </p>

          <h2 className="mt-10 text-2xl font-bold">13. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, wish to exercise your privacy rights, or want to report a privacy
            concern, please contact us:
          </p>
          <ul className="mt-4 space-y-3">
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-5 shrink-0 text-primary" />
              <a href={`mailto:${siteConfig.email}`} className="text-gold hover:underline">
                {siteConfig.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-5 shrink-0 text-primary" />
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="text-gold hover:underline">
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
              <span>
                {siteConfig.address.line1}
                <br />
                {siteConfig.address.line2}
              </span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
