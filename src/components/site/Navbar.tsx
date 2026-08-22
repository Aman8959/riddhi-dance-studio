import { Link } from "@tanstack/react-router";
import { Menu, ShieldCheck, X } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { navLinks } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

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
          scrolled
            ? "glass-panel border-x-0 border-t-0 shadow-none"
            : "border-b border-transparent",
        )}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto grid h-16 w-full max-w-[1600px] grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-6 lg:h-20 lg:gap-6 lg:px-8 xl:px-10"
        >
          <Link
            to="/"
            aria-label="Riddhi Dance Studio"
            className="group flex shrink-0 items-center gap-2 lg:gap-3"
            onClick={() => setOpen(false)}
          >
            <span className="grid size-10 place-items-center rounded-full bg-[image:var(--gradient-brand)] font-display text-xl text-primary-foreground">
              R
            </span>
            <span className="min-w-0 leading-none">
              <span className="block font-logo text-xl font-semibold leading-none tracking-[0.06em] text-gradient-brand transition-transform duration-300 group-hover:scale-[1.02] sm:text-2xl lg:text-3xl">
                Riddhi
              </span>
              <span className="mt-1 block whitespace-nowrap font-logo text-[0.58rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                Dance Studio
              </span>
            </span>
          </Link>

          <ul className="hidden min-w-0 items-center justify-self-center gap-0.5 xl:flex 2xl:gap-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  activeOptions={{ exact: link.to === "/" }}
                  activeProps={{ className: "text-gold" }}
                  inactiveProps={{ className: "text-muted-foreground" }}
                  className="whitespace-nowrap rounded-full px-2 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.08em] transition-colors hover:text-foreground 2xl:px-3 2xl:text-xs 2xl:tracking-[0.14em]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-1.5 lg:gap-2">
            <Button
              asChild
              variant="glass"
              size="sm"
              className="hidden lg:inline-flex lg:h-10 lg:px-3 lg:text-xs 2xl:px-4"
            >
              <Link to="/admin">
                <ShieldCheck className="size-4" /> Admin Login
              </Link>
            </Button>
            <Button
              asChild
              variant="hero"
              size="sm"
              className="hidden sm:inline-flex lg:h-10 lg:px-3.5 lg:text-xs 2xl:px-4"
            >
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
