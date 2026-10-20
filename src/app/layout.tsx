import type { ReactNode } from "react";
import { Literata, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin", "latin-ext", "cyrillic", "greek"],
  variable: "--font-dm-sans",
  display: "swap",
});

const literata = Literata({
  subsets: ["latin", "latin-ext", "cyrillic", "greek"],
  variable: "--font-fraunces",
  display: "swap",
});

type TRootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: TRootLayoutProps) => (
  <html lang="en" className={`${sourceSans.variable} ${literata.variable}`}>
    <body className="min-h-screen bg-surface font-sans text-ink antialiased">
      {children}
    </body>
  </html>
);

export default RootLayout;
