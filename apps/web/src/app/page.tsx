import { Features } from '@/components/landing/features';
import { FloatingCard } from '@/components/landing/floating-card';
import { Hero } from '@/components/landing/hero';
import { Navbar } from '@/components/landing/navbar';


export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-text-primary flex flex-col items-center justify-center">
      <Navbar />
      <div className="w-full max-w-[1205px] flex flex-col items-center justify-center">
        <Hero />
        <Features />
        <FloatingCard />
      </div>
    </main>
  );
}

