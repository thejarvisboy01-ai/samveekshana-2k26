'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

// Components
import HeroSequence from '@/components/HeroSequence';
import NarrativeSequence from '@/components/NarrativeSequence';
import EventsSequence from '@/components/EventsSequence';
import CentralEventsSequence from '@/components/CentralEventsSequence';
import CustomCursor from '@/components/CustomCursor';
import NoiseOverlay from '@/components/NoiseOverlay';
import Background3D from '@/components/Background3D';
import Preloader from '@/components/Preloader';
import CornerNavSections from '@/components/CornerNavSections';

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const handleLoadComplete = useCallback(() => setIsLoading(false), []);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
    restDelta: 0.001,
  });

  // Rich Vintage Tech Palette
  // Deep Oxidized Teal -> Dark Mahogany -> Obsidian
  const bg = useTransform(
    smoothProgress,
    [0, 0.4, 0.7, 1],
    ['#041014', '#0d0d0d', '#140c08', '#020405']
  );

  const text = useTransform(
    smoothProgress,
    [0, 1],
    ['#FFF8DC', '#FFF8DC']
  );

  return (
    <>
      {isLoading && <Preloader onComplete={handleLoadComplete} />}

      {/* HeroSequence manages its own GSAP pin — lives outside the main scroll container */}
      <div className={isLoading ? 'overflow-hidden max-h-screen' : ''}>
        <HeroSequence />
      </div>

      <motion.main
        ref={containerRef}
        className={`relative h-[1000vh] md:cursor-none selection:bg-[#008080] selection:text-white ${isLoading ? 'overflow-hidden max-h-screen' : ''}`}
        style={{ color: text }}
      >
        <motion.div className="fixed inset-0 -z-10" style={{ backgroundColor: bg }} />

        {/* Custom cursor — only on desktop (touch devices don't need it) */}
        <div className="hidden md:block">
          <CustomCursor />
        </div>
        <NoiseOverlay />
        <Background3D progress={smoothProgress} />
        <CornerNavSections />

        {/* Remaining sequences in the sticky cinematic panel */}
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden" style={{ perspective: '1200px' }}>
          <NarrativeSequence progress={smoothProgress} />
          <EventsSequence progress={smoothProgress} />
          <CentralEventsSequence progress={smoothProgress} />
        </div>

        {/* Progress Indicator — desktop only */}
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
