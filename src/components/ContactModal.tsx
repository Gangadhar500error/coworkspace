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
    <div className="fixed inset-0 flex items-center justify-center z-[9999]">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl rounded-xl bg-white shadow-xl z-[10000] m-4">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute -right-3 -top-3 h-9 w-9 flex items-center justify-center rounded-full bg-white text-zinc-700 shadow-md hover:bg-zinc-50"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Left: Info panel */}
          <div className="bg-orange-50 p-6 rounded-l-xl">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-zinc-900 mb-2">Find Your Perfect Workspace</h3>
              <p className="text-sm text-zinc-600">
                Join our community and get flexible workspace solutions tailored to your needs.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-zinc-200">
                <Building2 className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-zinc-900">Flexible Options</p>
                  <p className="text-xs text-zinc-600">Private offices, hot desks, meeting rooms</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-zinc-200">
                <Users className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-zinc-900">Premium Amenities</p>
                  <p className="text-xs text-zinc-600">High-speed internet, meeting rooms</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-200 space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-zinc-600" />
                <div>
                  <p className="text-xs text-zinc-500">Email</p>
                  <a href="mailto:info@coworkspaces.us" className="text-sm text-zinc-900 hover:text-orange-500">info@coworkspaces.us</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-zinc-600" />
                <div>
                  <p className="text-xs text-zinc-500">Phone</p>
                  <a href="tel:+18139221406" className="text-sm text-zinc-900 hover:text-orange-500">+1 813-922-1406</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white p-6 rounded-r-xl">
            <div className="mb-5">
              <h3 className="text-lg font-bold text-zinc-900 mb-1">Interested in this Property</h3>
              <p className="text-xs text-zinc-500">Fill your details for a customized quote</p>
            </div>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const valid = name.trim() && /.+@.+\..+/.test(email) && phone.trim() && type && seats;
                if (!valid) {
                  alert("Please complete all required fields.");
                  return;
                }
                console.log({ name, email, phone, type, seats });
                alert("Thank you! We'll contact you soon.");
                setName("");
                setEmail("");
                setPhone("");
                setType("");
                setSeats("");
                onClose();
              }}
            >
              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-700">
                  Full Name <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11 w-full rounded-lg border border-zinc-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    placeholder="Name* (Required)"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-700">
                  Email <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 w-full rounded-lg border border-zinc-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    placeholder="Email* (Required)"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-700">
                  Phone <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-11 w-full rounded-lg border border-zinc-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    placeholder="Phone* (Required)"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-700">
                    Type <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="h-11 w-full appearance-none rounded-lg border border-zinc-200 bg-white pl-10 pr-8 text-sm text-zinc-900 outline-none transition-all duration-200 ease-in-out hover:border-zinc-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      required
                    >
                      <option value="">Select</option>
                      <option value="private-office">Private Office</option>
                      <option value="hot-desk">Hot Desk</option>
                      <option value="dedicated-desk">Dedicated Desk</option>
                      <option value="meeting-room">Meeting Room</option>
                      <option value="virtual-office">Virtual Office</option>
                      <option value="event-space">Event Space</option>
                    </select>
                    <svg className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-700">
                    Seats <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
                    <select
                      value={seats}
                      onChange={(e) => setSeats(e.target.value)}
                      className="h-11 w-full appearance-none rounded-lg border border-zinc-200 bg-white pl-10 pr-8 text-sm text-zinc-900 outline-none transition-all duration-200 ease-in-out hover:border-zinc-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      required
                    >
                      <option value="">Select</option>
                      <option value="1-5">1-5</option>
                      <option value="6-10">6-10</option>
                      <option value="10-20">10-20</option>
                      <option value="20-50">20-50</option>
                      <option value="50-100">50-100</option>
                      <option value="100+">100+</option>
                    </select>
                    <svg className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 transition-colors mt-2"
              >
                <Send className="h-4 w-4" />
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  if (typeof document === 'undefined' || !document.body) return null;
  
  return createPortal(modalContent, document.body);
}

