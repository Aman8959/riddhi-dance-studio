import { MessageCircle } from "lucide-react";

import { whatsappLink } from "@/config/site";

export function WhatsAppButton() {
  return (
    <>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Riddhi Dance Studio on WhatsApp"
        className="fixed bottom-20 right-4 z-40 grid size-14 place-items-center rounded-full bg-[image:var(--gradient-brand)] text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105 sm:bottom-6"
      >
        <MessageCircle className="size-6" />
      </a>
    </>
  );
}
