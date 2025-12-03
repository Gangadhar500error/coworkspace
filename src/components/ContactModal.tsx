"use client";

import { X, User, Mail, Phone, MessageSquare, RefreshCcw, Send } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ContactModal({ open, onClose }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");

  const [seed, setSeed] = useState(() => Math.random());
  const [a, b, sum] = useMemo(() => {
    const aLocal = Math.floor(((seed * 1000) % 8) + 2); // 2..9
    const bLocal = Math.floor((((seed + 0.37) * 1000) % 8) + 2);
    return [aLocal, bLocal, aLocal + bLocal];
  }, [seed]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 opacity-0 animate-[fadeIn_200ms_ease-out_forwards]" onClick={onClose} />
      <div className="relative z-10 w-full max-w-4xl translate-y-3 opacity-0 rounded-2xl bg-white p-4 sm:p-6 shadow-xl animate-[modalIn_220ms_cubic-bezier(0.22,1,0.36,1)_forwards]">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute -right-3 -top-3 hidden h-9 w-9 items-center justify-center rounded-full bg-white/90 text-zinc-700 shadow-md hover:bg-white sm:flex"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Left: Image-style info panel */}
          <div className="rounded-2xl bg-linear-to-b from-orange-50 to-white p-5 sm:p-6">
            <h3 className="text-2xl font-semibold text-zinc-900">Get Started Today</h3>
            <p className="mt-2 text-sm text-zinc-600 max-w-prose">
              Transform your workspace with our expert team. We'll guide you through every step.
            </p>

            <div className="mt-5 rounded-xl border border-orange-100 bg-orange-50 p-4">
              <div className="flex items-start gap-3">
                <span className="mt-1 text-xl">💡</span>
                <div>
                  <p className="font-semibold text-zinc-900">Why Choose CoworkSpace?</p>
                  <p className="mt-1 text-sm leading-6 text-zinc-600">
                    Our modern workspace solutions help businesses and professionals create productive environments
                    with flexible options and premium amenities.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3 rounded-xl bg-zinc-50 p-4 ring-1 ring-zinc-100">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600"><Mail className="h-5 w-5" /></div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900">Email Support</p>
                  <p className="text-sm text-zinc-600">info@coworkspaces.us</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-zinc-50 p-4 ring-1 ring-zinc-100">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 text-green-600"><Phone className="h-5 w-5" /></div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900">Call Us Now</p>
                  <a href="tel:+18139221406" className="text-sm text-zinc-600 hover:text-orange-500 transition-colors">+1 813-922-1406</a>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-zinc-50 p-4 ring-1 ring-zinc-100">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600">⏰</div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900">Business Hours</p>
                  <p className="text-sm text-zinc-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="rounded-2xl border border-black/5 bg-white p-5 sm:p-6">
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const valid = name.trim() && /.+@.+\..+/.test(email) && message.trim() && Number(answer) === sum;
                if (!valid) {
                  alert("Please complete all required fields and answer the verification correctly.");
                  return;
                }
                // Replace with real submit action
                console.log({ name, email, phone, message });
                alert("Thanks! We'll get back to you soon.");
                onClose();
              }}
            >
              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-700">FULL NAME *</label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11 w-full rounded-lg border border-black/10 bg-white pl-9 pr-3 text-sm outline-none focus:border-orange-500"
                    placeholder="Your full name"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-700">EMAIL ADDRESS *</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 w-full rounded-lg border border-black/10 bg-white pl-9 pr-3 text-sm outline-none focus:border-orange-500"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-700">PHONE NUMBER *</label>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-11 w-full rounded-lg border border-black/10 bg-white pl-9 pr-3 text-sm outline-none focus:border-orange-500"
                    placeholder="+1 813-922-1406"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-700">MESSAGE *</label>
                <div className="relative">
                  <MessageSquare className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full resize-y rounded-lg border border-black/10 bg-white pl-9 pr-3 pt-2 text-sm outline-none focus:border-orange-500"
                    placeholder="Tell us how we can help..."
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-zinc-700">SECURITY VERIFICATION *</label>
                <div className="grid grid-cols-[1fr_auto_auto] items-center gap-3 sm:grid-cols-[160px_1fr_auto]">
                  <div className="flex h-11 items-center justify-center rounded-lg border border-black/10 bg-zinc-50 px-4 text-sm font-medium text-zinc-900">
                    {a} + {b} = ?
                  </div>
                  <input
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="h-11 rounded-lg border border-black/10 bg-white px-3 text-sm outline-none focus:border-orange-500"
                    placeholder="Answer"
                  />
                  <button
                    type="button"
                    onClick={() => { setSeed(Math.random()); setAnswer(""); }}
                    className="inline-flex h-11 items-center justify-center rounded-lg border border-black/10 bg-white px-3 text-zinc-600 hover:text-zinc-900"
                    aria-label="Refresh"
                  >
                    <RefreshCcw className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-600"
                >
                  <Send className="h-4 w-4" />
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

