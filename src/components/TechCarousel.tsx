import React, { useRef, useEffect, useState, useMemo } from 'react';
import { tecnologias } from './Tecnologias';

// Merge all techs and dedupe by nombre
const allTechsRaw = [...tecnologias.frontend, ...tecnologias.backend, ...tecnologias.database, ...tecnologias.tools];
const allTechs = allTechsRaw.filter((t, i, arr) => arr.findIndex(x => x.nombre === t.nombre) === i);

function splitInRows<T>(arr: T[], rows: number) {
  const r: T[][] = Array.from({ length: rows }, () => []);
  arr.forEach((item, idx) => r[idx % rows].push(item));
  return r;
}

const techRows = splitInRows(allTechs, 3);

type TechCarouselProps = { language?: string; translations?: any; isMobile?: boolean };

export default function TechCarousel({ language = 'es', translations, isMobile = false }: TechCarouselProps) {
  const title = translations?.technologies || (language === 'en' ? 'Technologies' : 'Tecnologías');

  return (
    <section className="w-full my-16 flex flex-col items-center" data-aos="fade-up" data-aos-offset={isMobile ? '200' : '600'}>
      <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-gray-900 dark:text-white">{title}</h2>
      <div className="w-full max-w-5xl mx-auto">
        <div className="relative w-full flex flex-col">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-20 z-10 fade-gradient" style={{ background: 'linear-gradient(to right, var(--fade-gradient, rgba(255,255,255,0.85)) 60%, transparent 100%)' }} />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-20 z-10 fade-gradient" style={{ background: 'linear-gradient(to left, var(--fade-gradient, rgba(255,255,255,0.85)) 60%, transparent 100%)' }} />

          {techRows.map((row, i) => (
            <CarouselRow key={i} techs={row} direction={i % 2 === 0 ? 'left' : 'right'} />
          ))}

          <style>{`
            .fade-gradient { --fade-gradient: rgba(255,255,255,0.85); }
            .dark .fade-gradient { --fade-gradient: rgba(26,32,44,0.85); }
          `}</style>
        </div>
      </div>
    </section>
  );
}

type CarouselRowProps = { techs: any[]; direction: 'left' | 'right' };

function CarouselRow({ techs, direction }: CarouselRowProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [duration, setDuration] = useState<number>(30);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [baseWidth, setBaseWidth] = useState<number>(0);
  const [repeatCount, setRepeatCount] = useState<number>(2);

  // simpler marquee: render the sequence twice and animate translateX(-50%) on the track
  const singleSequence = useMemo(() => techs.map((item, idx) => (
    <a key={`${item.nombre}-${idx}`} href={item.url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center bg-white dark:bg-gray-900 rounded-xl px-4 py-3 shadow hover:scale-110 transition-transform border border-gray-200 dark:border-gray-700 min-w-[90px] sm:min-w-[110px] max-w-[140px] cursor-pointer mx-2 flex-shrink-0" title={item.nombre}>
      <span className="text-3xl mb-1">{item.icono}</span>
      <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap text-center">{item.nombre}</span>
    </a>
  )), [techs]);

  // compute a duration proportional to number of items (so longer sequences scroll slower)
  const computedDuration = Math.max(12, Math.ceil(techs.length * 3));

  const handlePauseStart = () => setIsPaused(true);
  const handlePauseEnd = () => setIsPaused(false);

  const trackStyle: React.CSSProperties = {
    display: 'inline-flex',
    animationName: 'td-marquee',
    animationDuration: `${computedDuration}s`,
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    animationDirection: direction === 'right' ? 'reverse' : 'normal',
    animationPlayState: isPaused ? 'paused' : 'running',
    willChange: 'transform',
  } as React.CSSProperties;

  return (
    <div ref={containerRef} className="overflow-hidden w-full my-0 min-h-[90px] py-2" onMouseEnter={handlePauseStart} onMouseLeave={handlePauseEnd} onTouchStart={handlePauseStart} onTouchEnd={handlePauseEnd} onTouchCancel={handlePauseEnd}>
      <div style={{ overflow: 'hidden' }}>
        <div ref={trackRef} className={`inline-flex items-center`} style={trackStyle}>
          <div className="inline-flex">{singleSequence}</div>
          <div className="inline-flex">{singleSequence}</div>
        </div>
      </div>
      <style>{`
        @keyframes td-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}
