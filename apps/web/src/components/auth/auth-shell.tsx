import Link from 'next/link';
import type { ReactNode } from 'react';

type AuthShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
};

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-hidden bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.15),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.15),transparent_35%)] px-4 py-8 text-text-primary sm:px-6">
      <div className="flex w-full max-w-[480px] flex-col">
        <Link href="/" className="mb-8 flex items-center self-start transition hover:opacity-80">
          <img src="/logos/lifeos-logo.svg" alt="life.os" className="mr-2 h-9 w-9" />
          <span className="text-xl font-medium">
            life<span className="text-primary">.os</span>
          </span>
        </Link>

        <div className="rounded-2xl border border-white/10 bg-surface/90 p-5 shadow-card backdrop-blur-sm sm:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary sm:text-base">
              {subtitle}
            </p>
          </div>

          {children}
        </div>

        <div className="mt-6 text-center text-sm text-text-secondary">{footer}</div>
      </div>
    </main>
  );
}
