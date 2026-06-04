import { getSiteContent } from "@/lib/content";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ProblemThemes from "@/components/ProblemThemes";
import Partners from "@/components/Partners";
import Schedule from "@/components/Schedule";
import PrizesFAQ from "@/components/PrizesFAQ";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getSiteContent();

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navbar registrationThemes={content.registrationThemes} />
      <Hero
        registrationThemes={content.registrationThemes}
        participantsLabel={content.settings.participantsLabel}
        durationLabel={content.settings.durationLabel}
        prizePool={content.settings.prizePool}
      />
      <About
        hackathonDate={content.settings.hackathonDate}
        venueName={content.settings.venueName}
        venueAddress={content.settings.venueAddress}
      />
      <ProblemThemes
        problemThemes={content.problemThemes}
        registrationThemes={content.registrationThemes}
      />
      <Partners sponsors={content.sponsors} />
      <Schedule
        lecaWeekSchedule={content.lecaWeekSchedule}
        hackathonSchedule={content.hackathonSchedule}
        scheduleDateLabel={content.settings.scheduleDateLabel}
      />
      <PrizesFAQ faqs={content.faqs} prizePool={content.settings.prizePool} />
      <Footer />
    </main>
  );
}
