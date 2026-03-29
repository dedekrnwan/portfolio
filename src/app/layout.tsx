import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SiteShell } from "@/components/site-shell";
import { portfolio } from "@/lib/portfolio";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: portfolio.site.title,
  description: portfolio.site.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full px-6 font-mono">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (() => {
                const resolved = window.matchMedia("(prefers-color-scheme: dark)").matches
                  ? "dark"
                  : "light";
                document.documentElement.classList.toggle("dark", resolved === "dark");
                document.documentElement.style.colorScheme = resolved;
              })();
            `,
          }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
