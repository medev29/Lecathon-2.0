import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lecathon 2.0 — Hack. Build. Innovate.",
  description:
    "Join Lecathon 2.0, the flagship hackathon by LEC-HACKS. Build innovative solutions, win prizes, and launch your career.",
  keywords: ["hackathon", "Lecathon", "LEC-HACKS", "tech", "innovation", ""],
  openGraph: {
    title: "Lecathon 2.0",
    description: "Learn, Build, Innovate — Join the most exciting hackathon of 2026.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
