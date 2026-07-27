import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";

const display = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Laura World Cup — Chapter 22",
  description:
    "🏆 Laura World Cup · Chapter 22 — campeonato de gincanas entre amigos. #LauraFaz22 #Chapter22 #LauraWorldCup",
  openGraph: {
    title: "Laura World Cup — Chapter 22",
    description: "Você foi convocado. #LauraFaz22 #Chapter22 #LauraWorldCup",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#0B0B0C",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
