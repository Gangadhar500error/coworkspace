"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ContactFab from "@/components/ContactFab";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideLayout =
  pathname === "/signin" || pathname === "/forgot-password" || pathname.startsWith("/admin") || pathname.startsWith("/customer") || pathname.startsWith("/manager");

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {!hideLayout && <Navbar />}
      <main className={`flex-1 ${!hideLayout ? 'pt-[130px]' : ''}`}>{children}</main>
      {!hideLayout && <Footer />}
      {!hideLayout && <ScrollToTop />}
      {!hideLayout && <ContactFab />}
    </div>
  );
}
