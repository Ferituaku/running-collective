import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TEMCY RUN | Digital HQ",
  description: "Tembalang City Running Collective. Sexy Pace. Gorpcore. Night Run.",
  icons: {
    icon: "/temcyrun.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={`${jetbrainsMono.variable} antialiased bg-void text-white selection:bg-brand selection:text-white`}
        suppressHydrationWarning
      >
        <SmoothScroll>
          <Header />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
