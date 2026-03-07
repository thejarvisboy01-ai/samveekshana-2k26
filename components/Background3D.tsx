'use client';

import { motion, MotionValue, useTransform } from 'motion/react';
import { useEffect, useState } from 'react';

// On mobile: skip the heavy 3D animated background entirely.
// On desktop: render only 10 elements (was 20) and drop the per-element borderColor motion value.
const ELEMENTS = Array.from({ length: 10 }).map((_, i) => ({
  id: i,
  isCircle: i % 2 === 0,
  size: 20 + i * 10,
  left: `${(i * 17) % 100}%`,
  top: `${(i * 23) % 100}%`,
  yStart: (i % 5) * 80,
  yEnd: -((i % 5) * 160) - 160,
  rotateXStart: i * 30,
  rotateXEnd: i * 30 + 360,
  rotateYStart: i * 45,
  rotateYEnd: i * 45 + 360,
  // Static border colour — no motion value needed
  borderColor: i % 3 === 0
    ? 'rgba(0,128,128,0.12)'
    : i % 3 === 1
      ? 'rgba(212,175,55,0.1)'
      : 'rgba(0,77,64,0.15)',
}));

function BackgroundElement({ el, progress }: { el: typeof ELEMENTS[number]; progress: MotionValue<number> }) {
  const y = useTransform(progress, [0, 1], [el.yStart, el.yEnd]);
  const rotateX = useTransform(progress, [0, 1], [el.rotateXStart, el.rotateXEnd]);
  const rotateY = useTransform(progress, [0, 1], [el.rotateYStart, el.rotateYEnd]);

  return (
    <motion.div
      className="absolute border"
      style={{
        left: el.left,
        top: el.top,
        width: el.size,
        height: el.size,
        borderRadius: el.isCircle ? '50%' : '0%',
        borderColor: el.borderColor,
        y,
        rotateX,
        rotateY,
        // GPU hint — compositor-only transforms
        willChange: 'transform',
      }}
    />
  );
}

export default function Background3D({ progress }: { progress: MotionValue<number> }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Skip entirely on mobile — saves ~40 motion subscriptions
  if (isMobile) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      style={{ perspective: '1000px' }}
    >
      {ELEMENTS.map((el) => (
        <BackgroundElement key={el.id} el={el} progress={progress} />
      ))}
    </div>
  );
}
