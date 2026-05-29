import { Features } from '@/components/landing/features';
import { FloatingCard } from '@/components/landing/floating-card';
import { Hero } from '@/components/landing/hero';
import { Navbar } from '@/components/landing/navbar';


export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.15),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.15),transparent_35%)] text-text-primary flex flex-col items-center justify-center">
      <Navbar />
      <div className="w-full max-w-[1205px] flex flex-col items-center justify-center">
        <Hero />
        <Features />
        <FloatingCard />
      </div>
    </main>
  );
}

