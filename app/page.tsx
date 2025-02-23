import { Background } from '@/components/ui/Background';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { CallToAction } from '@/components/home/CallToAction';

export default function Home() {
  return (
    <main className="fixed inset-0 bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-secondary)] overflow-y-auto">
      <Background />

      {/* Content Container */}
      <div className="relative z-10 min-h-full p-4 sm:p-6 lg:p-8">
        <HeroSection />
        <FeaturesSection />
        <CallToAction />
      </div>
    </main>
  );
}
