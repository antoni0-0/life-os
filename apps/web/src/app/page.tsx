import { GuestOnly } from '@/components/auth/guest-only';
import { Features } from '@/components/landing/features';
import { FloatingCard } from '@/components/landing/floating-card';
import { Hero } from '@/components/landing/hero';
import { Navbar } from '@/components/landing/navbar';

export default function Home() {
  return (
    <GuestOnly>
      <main className="flex min-h-screen flex-col items-center overflow-x-hidden bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.15),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.15),transparent_35%)] text-text-primary">
        <Navbar />
        <div className="flex w-full max-w-[1205px] flex-col items-center justify-center px-4 pb-10 pt-[5.5rem] sm:px-6 sm:pt-24 md:px-8">
          <Hero />
          <Features />
          <FloatingCard />
        </div>
      </main>
    </GuestOnly>
  );
}
