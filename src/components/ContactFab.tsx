"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { MessageSquare } from "lucide-react";

const ContactModal = dynamic(() => import("@/components/ContactModal"), { ssr: false });

export default function ContactFab() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-contact-modal", handler as EventListener);
    return () => window.removeEventListener("open-contact-modal", handler as EventListener);
  }, []);
  return (
    <>
      <button
        aria-label="Contact"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white text-orange-500 shadow-lg transition-transform hover:scale-105 active:scale-95"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
      <ContactModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

