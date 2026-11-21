import { Metadata } from 'next';
import Link from 'next/link';
import CardStackWrapper from '@/components/CardStackWrapper';

export const metadata: Metadata = {
  title: 'Stacked Glass Card Carousel | Three.js 3D Showcase',
  description:
    'A three.js stacked glass card carousel animation with soft colored background glow, mirror reflections, and smooth easeInOutCubic transitions.',
};

export default function CardStackDemoPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between" style={{ background: '#f6f6f4' }}>
      {/* Top Header Strip */}
      <header className="w-full px-6 py-4 flex items-center justify-between border-b border-slate-200/80 bg-white/70 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-colors"
          >
            ← Back to AquaHolic
          </Link>
          <span className="text-sm font-semibold text-slate-800 hidden sm:inline">
            Three.js Stacked Glass Card Carousel
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Interactive WebGL 3D • Mouse Parallax Enabled</span>
        </div>
      </header>

      {/* Main 3D Canvas Stage */}
      <main className="flex-1 w-full flex flex-col items-center justify-center relative min-h-[640px] sm:min-h-[720px] md:min-h-[780px]">
        <div className="w-full h-full min-h-[600px] sm:min-h-[680px] md:min-h-[750px] relative flex items-center justify-center">
          <CardStackWrapper className="w-full h-[600px] sm:h-[680px] md:h-[750px]" />
        </div>

        {/* Floating Bottom Info Pill */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
          <div className="bg-slate-900/80 backdrop-blur-md text-white/90 px-4 py-2 rounded-full text-xs font-medium border border-white/10 shadow-xl flex items-center gap-2">
            <span>✨ Move cursor across cards for 3° parallax effect</span>
            <span className="text-white/40">•</span>
            <span>8.8s seamless loop</span>
          </div>
        </div>
      </main>

      {/* Footer Details */}
      <footer className="w-full px-6 py-4 border-t border-slate-200/80 bg-white/50 text-center text-xs text-slate-500">
        Reusable component: <code className="font-mono text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">components/CardStackWrapper.tsx</code> • Next.js App Router compatible with zero SSR issues
      </footer>
    </div>
  );
}
