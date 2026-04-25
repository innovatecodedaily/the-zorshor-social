import { Geist, Geist_Mono, Bebas_Neue, DM_Sans, Sacramento, Satisfy } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
});

const sacramento = Sacramento({
  weight: "400",
  variable: "--font-sacramento",
  subsets: ["latin"],
});

const satisfy = Satisfy({
  weight: "400",
  variable: "--font-satisfy",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZORSHOR | Strategy. Storytelling. Scale.",
  description: "ZORSHOR blends strategy, storytelling, and unmatched scale to create work that moves culture across marketing campaigns, films, social media, and digital IPs.",
  keywords: ["ZORSHOR", "Creative Agency", "Strategy", "Storytelling", "Digital IPs", "Marketing Campaigns", "Social Media Marketing"],
  openGraph: {
    title: "ZORSHOR | Strategy. Storytelling. Scale.",
    description: "Work that moves culture, not just metrics.",
    url: "https://zorshor.social",
    siteName: "ZORSHOR",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ZORSHOR Branding",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZORSHOR | Strategy. Storytelling. Scale.",
    description: "Work that moves culture, not just metrics.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${dmSans.variable} ${sacramento.variable} ${satisfy.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
