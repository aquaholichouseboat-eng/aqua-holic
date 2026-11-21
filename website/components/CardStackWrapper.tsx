'use client';

import dynamic from 'next/dynamic';

interface CardStackWrapperProps {
  className?: string;
}

// Client-only dynamic import ensuring Three.js WebGL never runs during SSR
const CardStackScene = dynamic(() => import('./CardStackScene'), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-full min-h-[500px] flex items-center justify-center"
      style={{ background: '#f6f6f4' }}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-3 border-slate-300 border-t-slate-700 animate-spin" />
        <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
          Loading 3D Card Stack...
        </span>
      </div>
    </div>
  ),
});

export default function CardStackWrapper({ className = '' }: CardStackWrapperProps) {
  return <CardStackScene className={className} />;
}
