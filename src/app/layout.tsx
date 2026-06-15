import type { Metadata } from "next";
import { Space_Grotesk, Orbitron } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/3d/CustomCursor";
import FaviconAnimator from "@/components/FaviconAnimator";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });

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
      <body className={`${spaceGrotesk.className} ${spaceGrotesk.variable} ${orbitron.variable} bg-background text-primary antialiased`}>
        <FaviconAnimator frames={["/favicon-0.svg","/favicon-1.svg"]} interval={350} />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
