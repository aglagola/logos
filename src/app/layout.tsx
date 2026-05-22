import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Logos — AI-Powered Debate & Reasoning Platform",
  description:
    "Debate ideas, uncover hidden assumptions, and refine your reasoning with AI. An operating system for structured human thought.",
  keywords: ["debate", "AI", "reasoning", "philosophy", "axioms", "logic"],
  openGraph: {
    title: "Logos — AI-Powered Debate & Reasoning Platform",
    description: "Sharpen your mind through opposition. AI-powered debate, axiom analysis, and reasoning refinement.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Navbar />
        {children}
        <Toaster
          theme="dark"
          toastOptions={{
            style: {
              background: "#1E1E24",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#E8E4DC",
              fontFamily: "Inter, sans-serif",
              fontSize: "13px",
            },
          }}
        />
      </body>
    </html>
  );
}
