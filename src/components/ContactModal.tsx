"use client";

import { X, User, Mail, Phone, Building2, Users, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ContactModal({ open, onClose }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState("");
  const [seats, setSeats] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    if (open) {
      document.addEventListener("keydown", onKey);
    }
    return () => {
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || !mounted || typeof window === 'undefined') return null;

  const modalContent = (
    <div className="fixed inset-0 flex items-center justify-center p-4" style={{ zIndex: 9999 }}>
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-200" 
        onClick={onClose}
        style={{ opacity: 1 }}
      />
      <div className="relative w-full max-w-4xl rounded-2xl bg-white p-4 sm:p-6 shadow-xl transform transition-all duration-200" style={{ opacity: 1, transform: 'translateY(0)', zIndex: 10000 }}>
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute -right-3 -top-3 hidden h-9 w-9 items-center justify-center rounded-full bg-white/90 text-zinc-700 shadow-md hover:bg-white sm:flex"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Left: Info panel */}
          <div className="rounded-2xl bg-gradient-to-br from-orange-50 via-white to-orange-50/30 p-6 sm:p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-zinc-900 mb-2">Find Your Perfect Workspace</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Join our vibrant community of entrepreneurs, freelancers, and businesses. Get flexible workspace solutions tailored to your needs.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-orange-100">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900 mb-1">Flexible Workspace Options</p>
                  <p className="text-xs text-zinc-600">Private offices, hot desks, meeting rooms, and more</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-orange-100">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900 mb-1">Premium Amenities</p>
                  <p className="text-xs text-zinc-600">High-speed internet, meeting rooms, kitchen facilities</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-orange-100">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100">
                    <Mail className="h-4 w-4 text-zinc-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-zinc-500">Email</p>
                    <a href="mailto:info@coworkspaces.us" className="text-sm text-zinc-900 hover:text-orange-500 transition-colors">info@coworkspaces.us</a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-100">
                    <Phone className="h-4 w-4 text-zinc-600" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-zinc-500">Phone</p>
                    <a href="tel:+18139221406" className="text-sm text-zinc-900 hover:text-orange-500 transition-colors">+1 813-922-1406</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="rounded-2xl bg-white p-6 sm:p-8">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-zinc-900 mb-1">Request Information</h3>
              <p className="text-xs text-zinc-500">Fill out the form and we'll get back to you shortly</p>
            </div>

            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                const valid = name.trim() && /.+@.+\..+/.test(email) && phone.trim() && type && seats;
                if (!valid) {
                  alert("Please complete all required fields.");
                  return;
                }
                // Replace with real submit action
                console.log({ name, email, phone, type, seats });
                alert("Thank you! We'll contact you soon to discuss your workspace needs.");
                // Reset form
                setName("");
                setEmail("");
                setPhone("");
                setType("");
                setSeats("");
                onClose();
              }}
            >
              <div>
                <label className="mb-2 block text-xs font-semibold text-zinc-700 uppercase tracking-wide">
                  Full Name <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 w-full rounded-lg border border-zinc-200 bg-white pl-10 pr-4 text-sm outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-zinc-700 uppercase tracking-wide">
                  Email Address <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 w-full rounded-lg border border-zinc-200 bg-white pl-10 pr-4 text-sm outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-zinc-700 uppercase tracking-wide">
                  Phone Number <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-12 w-full rounded-lg border border-zinc-200 bg-white pl-10 pr-4 text-sm outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="mb-2 block text-xs font-semibold text-zinc-700 uppercase tracking-wide">
                    Workspace Type <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 z-10" />
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="h-12 w-full appearance-none rounded-lg border border-zinc-200 bg-white pl-10 pr-10 text-sm outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                      required
                    >
                      <option value="">Select type</option>
                      <option value="private-office">Private Office</option>
                      <option value="hot-desk">Hot Desk</option>
                      <option value="dedicated-desk">Dedicated Desk</option>
                      <option value="meeting-room">Meeting Room</option>
                      <option value="virtual-office">Virtual Office</option>
                      <option value="event-space">Event Space</option>
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                      <svg className="h-4 w-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-semibold text-zinc-700 uppercase tracking-wide">
                    Number of Seats <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <Users className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="number"
                      min="1"
                      value={seats}
                      onChange={(e) => setSeats(e.target.value)}
                      className="h-12 w-full rounded-lg border border-zinc-200 bg-white pl-10 pr-4 text-sm outline-none transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                      placeholder="1"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-orange-600 hover:shadow-md active:scale-[0.98]"
                >
                  <Send className="h-4 w-4" />
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  if (typeof document === 'undefined' || !document.body) return null;
  
  return createPortal(modalContent, document.body);
}

