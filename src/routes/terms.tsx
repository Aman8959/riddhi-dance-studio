import { createFileRoute } from "@tanstack/react-router";
import { FileCheck2, Mail, MapPin, Phone, Scale } from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { siteConfig } from "@/config/site";
import { createSeoHead } from "@/config/seo";

export const Route = createFileRoute("/terms")({
  head: () =>
    createSeoHead({
      title: "Terms of Service | Riddhi Dance Studio",
      description:
        "Read the terms and conditions for using the Riddhi Dance Studio website, booking trials and joining classes.",
      path: "/terms",
    }),
  component: TermsOfServicePage,
});

function TermsOfServicePage() {
  return (
    <>
      <PageHero
        eyebrow="Terms of Service"
        title="Our terms and conditions"
        description="Please read these terms carefully before using our website and services."
      />

      <section className="section-pad mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="legal-content">
          <div className="legal-meta mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Terms overview</p>
              <h2 className="mt-2 text-2xl">A smooth studio experience for everyone</h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                These terms set clear expectations for using our website, submitting enquiries, booking trials, and participating
                in classes at Riddhi Dance Studio.
              </p>
            </div>
            <p className="shrink-0 text-sm text-muted-foreground"><strong>Last updated</strong><br />August 22, 2026</p>
          </div>
          <div className="mb-12 grid gap-4 sm:grid-cols-3">
            <div className="legal-card"><FileCheck2 className="size-5 text-primary" /><h3>Use information honestly</h3><p>Provide accurate details so we can confirm your class, trial, or enquiry correctly.</p></div>
            <div className="legal-card"><Scale className="size-5 text-gold" /><h3>Respect the studio</h3><p>Follow instructor guidance, studio rules, and considerate conduct during every visit.</p></div>
            <div className="legal-card"><Mail className="size-5 text-primary" /><h3>Stay in touch</h3><p>We may contact you about bookings, schedule changes, and important studio updates.</p></div>
          </div>

          <h2 className="mt-10 text-2xl font-bold">1. Acceptance of Terms</h2>
          <p>
            By accessing and using the Riddhi Dance Studio website and services, you agree to be bound by these Terms of Service.
            If you do not agree with any part of these terms, please do not use our website or services.
          </p>

          <h2 className="mt-10 text-2xl font-bold">2. Website Usage</h2>
          <p>
            You agree to use this website only for lawful purposes and in a way that does not infringe upon the rights of others or
            restrict their use and enjoyment of the website. You may not:
          </p>
          <ul>
            <li>Harass, threaten, or intimidate anyone</li>
            <li>Post abusive, defamatory, or offensive content</li>
            <li>Attempt to gain unauthorized access to the website or systems</li>
            <li>Interfere with or disrupt the website's normal operation</li>
            <li>Engage in any form of hacking or malicious activity</li>
            <li>Post spam, commercial solicitation, or fraudulent content</li>
          </ul>

          <h2 className="mt-10 text-2xl font-bold">3. Dance Class Registration and Trial Booking</h2>
          <p>
            By registering for dance classes or booking a trial class, you acknowledge:
          </p>
          <ul>
            <li>You will provide accurate, complete, and truthful information</li>
            <li>You accept responsibility for maintaining the confidentiality of your account information</li>
            <li>You are physically capable of participating in dance classes</li>
            <li>You will follow all studio guidelines and instructor directions</li>
            <li>You understand that dance involves physical activity and inherent risks</li>
            <li>For minors, a parent or guardian has provided consent and assumes responsibility</li>
          </ul>

          <h2 className="mt-10 text-2xl font-bold">4. User-Provided Information</h2>
          <p>
            You are responsible for the accuracy and legality of any information you provide. By submitting information through our
            forms, you grant us permission to use that information for the stated purpose, including:
          </p>
          <ul>
            <li>Processing your registration or trial booking</li>
            <li>Communicating with you about your classes or enquiries</li>
            <li>Storing records for studio administration</li>
          </ul>

          <h2 className="mt-10 text-2xl font-bold">5. Communication Regarding Registrations and Enquiries</h2>
          <p>
            By submitting your contact information, you consent to:
          </p>
          <ul>
            <li>Receiving confirmation messages via email, phone, or WhatsApp</li>
            <li>Receiving updates and information about your registered classes</li>
            <li>Being contacted with responses to your enquiries</li>
            <li>Receiving important studio announcements or schedule changes</li>
          </ul>
          <p>
            You may opt out of non-essential communications by contacting us.
          </p>

          <h2 className="mt-10 text-2xl font-bold">6. Class Information and Schedule Disclaimer</h2>
          <p>
            While we strive to keep class information and schedules accurate:
          </p>
          <ul>
            <li>Class timings, instructors, or content may change without notice</li>
            <li>We are not responsible for errors in published schedules</li>
            <li>Continued classes are subject to availability and enrollment</li>
            <li>We reserve the right to cancel or modify classes as needed</li>
          </ul>

          <h2 className="mt-10 text-2xl font-bold">7. Studio Content and Intellectual Property</h2>
          <p>
            All content on this website, including text, images, logos, and videos, is the property of Riddhi Dance Studio or is
            used with permission. You may not:
          </p>
          <ul>
            <li>Reproduce, modify, or distribute any content without permission</li>
            <li>Use content for commercial purposes</li>
            <li>Remove or alter copyright or attribution notices</li>
            <li>Download or store large amounts of content without authorization</li>
          </ul>

          <h2 className="mt-10 text-2xl font-bold">8. Reviews and Testimonials</h2>
          <p>
            If you submit reviews or testimonials about Riddhi Dance Studio:
          </p>
          <ul>
            <li>Your review should be genuine, respectful, and accurate</li>
            <li>You represent that you have personal experience with our studio</li>
            <li>Riddhi Dance Studio may publish, modify, or display your review</li>
            <li>We reserve the right to remove reviews that are:</li>
            <ul style={{ marginLeft: "2rem" }}>
              <li>Inappropriate, abusive, or defamatory</li>
              <li>Fraudulent or misleading</li>
              <li>Spam or commercial solicitation</li>
              <li>Otherwise unsuitable for public display</li>
            </ul>
          </ul>

          <h2 className="mt-10 text-2xl font-bold">9. Prohibited Activities</h2>
          <p>
            You will not use this website or our services to:
          </p>
          <ul>
            <li>Violate any applicable law or regulation</li>
            <li>Infringe on anyone's intellectual property rights</li>
            <li>Post or transmit malware or harmful code</li>
            <li>Engage in harassment, threats, or intimidation</li>
            <li>Collect or track personal information without consent</li>
            <li>Deceive or defraud anyone</li>
            <li>Engage in any unethical or unlawful activity</li>
          </ul>

          <h2 className="mt-10 text-2xl font-bold">10. Website Availability and Technical Issues</h2>
          <p>
            While we work to maintain reliable website service:
          </p>
          <ul>
            <li>The website is provided "as is" without guarantees</li>
            <li>We do not warrant that the website will be error-free or uninterrupted</li>
            <li>We are not responsible for temporary unavailability due to maintenance or technical issues</li>
            <li>You are responsible for ensuring compatibility with your devices and software</li>
            <li>We reserve the right to modify or discontinue features without notice</li>
          </ul>

          <h2 className="mt-10 text-2xl font-bold">11. External Links</h2>
          <p>
            This website may contain links to external websites. Riddhi Dance Studio:
          </p>
          <ul>
            <li>Does not control external websites or their content</li>
            <li>Is not responsible for external website practices, policies, or content</li>
            <li>Does not endorse external websites or services</li>
            <li>Suggests you review the terms and privacy policies of external sites before use</li>
          </ul>

          <h2 className="mt-10 text-2xl font-bold">12. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Riddhi Dance Studio shall not be liable for:
          </p>
          <ul>
            <li>Any indirect, incidental, or consequential damages</li>
            <li>Loss of profits, revenue, or data</li>
            <li>Service interruption or website unavailability</li>
            <li>Errors or inaccuracies in website content</li>
            <li>Actions or omissions of third parties</li>
            <li>Any damages arising from your use of the website or services</li>
          </ul>

          <h2 className="mt-10 text-2xl font-bold">13. Changes to Services or Website</h2>
          <p>
            Riddhi Dance Studio reserves the right to:
          </p>
          <ul>
            <li>Modify, suspend, or discontinue any services or features</li>
            <li>Change the website design, layout, or content</li>
            <li>Update pricing, class schedules, or offerings</li>
            <li>Restrict access to certain features or content</li>
          </ul>
          <p>
            We will attempt to notify you of significant changes, but are not obligated to do so.
          </p>

          <h2 className="mt-10 text-2xl font-bold">14. Changes to These Terms</h2>
          <p>
            We may update these Terms of Service at any time. Your continued use of the website and services constitutes acceptance
            of the updated terms. We encourage you to review these terms periodically.
          </p>

          <h2 className="mt-10 text-2xl font-bold">15. Governing Law and Jurisdiction</h2>
          <p>
            These Terms of Service are governed by the laws of India, specifically Madhya Pradesh. You agree to submit to the
            exclusive jurisdiction of the courts located in Satna, Madhya Pradesh.
          </p>

          <h2 className="mt-10 text-2xl font-bold">16. Contact Information</h2>
          <p>
            If you have questions about these Terms of Service or any other matter, please contact us:
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
