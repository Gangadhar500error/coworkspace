// app/layout.tsx (SERVER)
import type { Metadata } from "next";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/app/ClientLayout";

const robotoCondensed = Roboto_Condensed({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.coworkspace.com"),
  title: {
    default: "CoworkSpace – Modern Workspace Solutions",
    template: "%s | CoworkSpace",
  },
  description: "Modern coworking space solutions for businesses and professionals.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light">
      <body className={robotoCondensed.variable}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
