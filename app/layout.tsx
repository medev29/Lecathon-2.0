import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CipherThon 2.0 — Hack. Build. Innovate.",
  description:
    "Join CipherThon 2.0, the flagship hackathon by CipherSchools. Build innovative solutions, win prizes, and launch your career.",
  keywords: ["hackathon", "CipherSchools", "CipherThon", "tech", "innovation", "IMPunjab"],
  openGraph: {
    title: "CipherThon 2.0",
    description: "Learn, Build, Innovate — Join the most exciting hackathon of 2025.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
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
