'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

// ── Server-renderable components (no 'use client') ──────────────────────────
import NoiseOverlay from '@/components/NoiseOverlay';

// ── Eagerly loaded (visible immediately) ────────────────────────────────────
import HeroSequence from '@/components/HeroSequence';
import Preloader from '@/components/Preloader';
import CornerNavSections from '@/components/CornerNavSections';

// ── Lazily loaded (only needed after scroll) ─────────────────────────────────
// ssr:false because they use GSAP / browser APIs
const NarrativeSequence = dynamic(() => import('@/components/NarrativeSequence'), { ssr: false });
const EventsSequence = dynamic(() => import('@/components/EventsSequence'), { ssr: false });
const CentralEventsSequence = dynamic(() => import('@/components/CentralEventsSequence'), { ssr: false });
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });
const Background3D = dynamic(() => import('@/components/Background3D'), { ssr: false });

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const handleLoadComplete = useCallback(() => setIsLoading(false), []);
  const [anyModalOpen, setAnyModalOpen] = useState(false);

  // Watch body.style.overflow — all modals set it to 'hidden' when open
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setAnyModalOpen(document.body.style.overflow === 'hidden');
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Softer spring on mobile → less JS work per frame
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,   // was 300 — smoother, less catch-up jank
    damping: 28,      // was 40
    restDelta: 0.002,
  });

  const bg = useTransform(
    smoothProgress,
    [0, 0.4, 0.7, 1],
    ['#041014', '#0d0d0d', '#140c08', '#020405']
  );

  return (
    <>
      {isLoading && <Preloader onComplete={handleLoadComplete} />}

      {/* Fixed top-left logo — hides when any modal is open */}
      {!isLoading && (
        <motion.div
          className="fixed top-3 left-3 md:top-5 md:left-5 z-[9500] pointer-events-none select-none"
          animate={{ opacity: anyModalOpen ? 0 : 1, scale: anyModalOpen ? 0.8 : 1 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          <Image
            src="/logo.png"
            alt="Samveekshana Logo"
            width={50}
            height={50}
            className="w-10 h-10 md:w-16 md:h-16 object-contain drop-shadow-[0_0_16px_rgba(0,128,128,0.7)]"
            priority
          />
        </motion.div>
      )}

      {/* HeroSequence manages its own GSAP pin */}
      <div className={isLoading ? 'overflow-hidden max-h-screen' : ''}>
        <HeroSequence />
      </div>

      {/*
        bg drives a CSS variable rather than a React style prop so React never
        re-renders the main element on scroll — Framer Motion updates the DOM
        directly via its animation driver.
      */}
      <motion.main
        ref={containerRef}
        className={`relative h-[1000vh] md:cursor-none selection:bg-[#008080] selection:text-white ${isLoading ? 'overflow-hidden max-h-screen' : ''}`}
        style={{ color: '#FFF8DC' }}   // static — no motion value, no re-render
      >
        {/* Background colour — compositor layer, GPU only */}
        <motion.div
          className="fixed inset-0 -z-10"
          style={{ backgroundColor: bg, willChange: 'background-color' }}
        />

        {/* Custom cursor — desktop only */}
        <div className="hidden md:block">
          <CustomCursor />
        </div>

        {/* Noise texture — Server Component, zero JS */}
        <NoiseOverlay />

        {/* 3D parallax shapes — skipped entirely on mobile */}
        <Background3D progress={smoothProgress} />

        <CornerNavSections anyModalOpen={anyModalOpen} />

        {/* Sticky cinematic panel — no perspective on mobile (saves a paint layer) */}
        <div
          className="sticky top-0 left-0 w-full h-screen overflow-hidden"
          style={{ perspective: '1200px' }}
        >
          <NarrativeSequence progress={smoothProgress} />
          <EventsSequence progress={smoothProgress} />
          <CentralEventsSequence progress={smoothProgress} />
        </div>

        {/* Progress bar — desktop only */}
        <motion.div
          className="fixed bottom-8 left-8 w-px h-32 bg-current opacity-20 z-50 origin-bottom hidden md:block"
        >
          <motion.div
            className="w-full bg-gradient-to-b from-[#008080] to-[#004d40] origin-top shadow-[0_0_10px_rgba(0,128,128,0.5)] h-full"
            style={{ scaleY: smoothProgress }}
          />
        </motion.div>
        <div className="fixed bottom-8 left-12 text-[10px] font-mono tracking-widest opacity-50 uppercase z-50 rotate-[-90deg] origin-left hidden md:block text-[#008080]">
          Turn the mechanism
        </div>
      </motion.main>
    </>
  );
}
