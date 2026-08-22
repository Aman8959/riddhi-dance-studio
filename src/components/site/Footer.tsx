import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";

import { danceStyles } from "@/data/studio";
import { siteConfig } from "@/config/site";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/classes", label: "Classes" },
  { to: "/trainers", label: "Trainers" },
  { to: "/gallery", label: "Gallery" },
  { to: "/events", label: "Events" },
  { to: "/contact", label: "Contact" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div>
          <p className="font-display text-2xl uppercase tracking-widest">{siteConfig.name}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {siteConfig.shortDescription}
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={siteConfig.social.instagram}
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
              className="grid size-10 place-items-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
            >
              <Instagram className="size-4" />
            </a>
            <a
              href={siteConfig.social.facebook}
              aria-label="Facebook"
              target="_blank"
              rel="noreferrer"
              className="grid size-10 place-items-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
            >
              <Facebook className="size-4" />
            </a>
            <a
              href={siteConfig.social.youtube}
              aria-label="YouTube"
              target="_blank"
              rel="noreferrer"
              className="grid size-10 place-items-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
            >
              <Youtube className="size-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Dance Styles</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {danceStyles.map((s) => (
              <li key={s.slug}>
                <Link to="/styles" className="transition-colors hover:text-foreground">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Legal</h3>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/privacy-policy" className="transition-colors hover:text-foreground">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="transition-colors hover:text-foreground">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition-colors hover:text-foreground">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>{siteConfig.phone}</a>
            </li>
            <li className="flex gap-2">
              <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </li>
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>
                {siteConfig.address.line1}
                <br />
                {siteConfig.address.line2}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-4 py-6 text-center text-xs text-muted-foreground sm:px-6 lg:px-8">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}