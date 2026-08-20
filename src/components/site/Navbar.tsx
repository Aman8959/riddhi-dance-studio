import { Link } from "@tanstack/react-router";
import { Menu, ShieldCheck, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/classes", label: "Classes" },
  { to: "/styles", label: "Styles" },
  { to: "/trainers", label: "Trainers" },
  { to: "/timetable", label: "Timetable" },
  { to: "/gallery", label: "Gallery" },
  { to: "/videos", label: "Videos" },
  { to: "/events", label: "Events" },
  { to: "/pricing", label: "Pricing" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled ? "glass-panel border-x-0 border-t-0 shadow-none" : "border-b border-transparent",
        )}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8"
        >
          <Link to="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
            <span className="grid size-10 place-items-center rounded-full bg-[image:var(--gradient-brand)] font-display text-xl text-primary-foreground">
              R
            </span>
            <span className="leading-none">
              <span className="block font-display text-lg uppercase tracking-widest">Riddhi</span>
              <span className="block text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
                Dance Studio
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 xl:flex">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  activeOptions={{ exact: link.to === "/" }}
                  activeProps={{ className: "text-gold" }}
                  inactiveProps={{ className: "text-muted-foreground" }}
                  className="rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Button asChild variant="glass" size="xl" className="hidden lg:inline-flex">
              <Link to="/admin">
                <ShieldCheck className="size-4" /> Admin Login
              </Link>
            </Button>
            <Button asChild variant="hero" size="xl" className="hidden sm:inline-flex">
              <Link to="/trial">Book a Trial</Link>
            </Button>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid size-10 place-items-center rounded-full border border-border text-foreground xl:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </header>

      {open ? (
        <div className="fixed inset-0 top-16 z-40 overflow-y-auto bg-background/98 px-4 pb-24 pt-6 backdrop-blur-xl xl:hidden">
          <ul className="grid gap-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: link.to === "/" }}
                  activeProps={{ className: "text-gold" }}
                  className="block border-b border-border py-4 font-display text-2xl uppercase tracking-wide"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 grid gap-3">
            <Button asChild variant="glass" size="xl">
              <Link to="/admin" onClick={() => setOpen(false)}>
                <ShieldCheck className="size-4" /> Admin Login
              </Link>
            </Button>
            <Button asChild variant="hero" size="xl">
              <Link to="/trial" onClick={() => setOpen(false)}>
                Book a Free Trial
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl">
              <Link to="/register" onClick={() => setOpen(false)}>
                Join Now
              </Link>
            </Button>
            <p className="pt-2 text-center text-sm text-muted-foreground">{siteConfig.phone}</p>
          </div>
        </div>
      ) : null}
    </>
  );
}