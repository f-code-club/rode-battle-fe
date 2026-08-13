import Footer from '@/components/layout/DashboardLayout/components/Footer';
import AboutSection from './components/AboutSection';
import CompetitionSection from './components/CompetitionSection';
import CTASection from './components/CTASection';
import HeroSection from './components/HeroSection';
import LandingNavbar from './components/Navbar';
import PrizesSection from './components/PrizesSection';
import StatsCard from './components/StatsCard';
import TimelineSection from './components/TimelineSection';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans [&>footer]:mt-0!">
      <LandingNavbar />
      <main>
        <HeroSection />
        <div className="relative z-10 -mt-12 px-4">
          <div className="mx-auto max-w-5xl">
            <StatsCard />
          </div>
        </div>
        <div className="pt-12">
          <AboutSection />
        </div>
        <CompetitionSection />
        <TimelineSection />
        <PrizesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
