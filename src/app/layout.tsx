// app/layout.tsx  (SERVER)
import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/app/ClientLayout";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.coworkspace.com"),
  title: {
    default: "CoworkSpace – Modern Workspace Solutions",
    template: "%s | CoworkSpace",
  },
  description: "Modern coworking space solutions for businesses and professionals.",
  // ... include the rest of your existing metadata (openGraph, twitter, icons, robots, etc.)
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <head>
        {/* Font CDN Links */}
        <link rel="preconnect" href="https://www-static.wework.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www-static.wework.com" />
        <link rel="stylesheet" href="https://www-static.wework.com/apercu/apercu.css" />
        {/* Preload Romana-Bold if font files exist */}
        <link rel="preload" href="/fonts/Romana-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>
        {/* ClientLayout is a client component that will conditionally render Navbar/Footer */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
