import type { Metadata } from "next";
import { Space_Grotesk, Playfair_Display } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/3d/CustomCursor";
import FaviconAnimator from "@/components/FaviconAnimator";
import LenisProvider from "@/components/LenisProvider";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Yeamin Islam | Software Engineer",
  description: "Driven software engineer specializing in modern web development, backend systems, and machine learning.",
  icons: '/favicon-0.svg',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${spaceGrotesk.className} ${spaceGrotesk.variable} ${playfair.variable} bg-background text-white antialiased`}>
        <FaviconAnimator frames={["/favicon-0.svg","/favicon-1.svg"]} interval={350} />
        <CustomCursor />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
