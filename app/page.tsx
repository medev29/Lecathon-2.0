import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ProblemThemes from "@/components/ProblemThemes";
import Partners from "@/components/Partners";
import Schedule from "@/components/Schedule";
import PrizesFAQ from "@/components/PrizesFAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <Hero />
      <About />
      <ProblemThemes />
      <Partners />
      <Schedule />
      <PrizesFAQ />
      <Footer />
    </main>
  );
}
