import Footer from '@/components/layout/DashboardLayout/components/Footer';
import AboutSection from './components/AboutSection';
import CompetitionSection from './components/CompetitionSection';
import HeroSection from './components/HeroSection';
import LandingNavbar from './components/Navbar';
import StatsCard from './components/StatsCard';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
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
      </main>
      <Footer />
    </div>
  );
}
