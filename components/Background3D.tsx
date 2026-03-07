'use client';

import { motion, MotionValue, useTransform } from 'motion/react';

function BackgroundElement({ el, progress }: { el: any, progress: MotionValue<number> }) {
  const y = useTransform(progress, [0, 1], [el.yStart, el.yEnd]);
  const rotateX = useTransform(progress, [0, 1], [el.rotateXStart, el.rotateXEnd]);
  const rotateY = useTransform(progress, [0, 1], [el.rotateYStart, el.rotateYEnd]);

  const borderColor = useTransform(
    progress,
    [0, 0.3, 0.6, 1],
    ['rgba(0,128,128,0.1)', 'rgba(212,175,55,0.15)', 'rgba(0,77,64,0.2)', 'rgba(184,115,51,0.1)']
  );

  return (
    <motion.div
      className="absolute border"
      style={{
        left: el.left,
        top: el.top,
        width: el.size,
        height: el.size,
        borderRadius: el.isCircle ? '50%' : '0%',
        y,
        rotateX,
        rotateY,
        borderColor,
        transformStyle: 'preserve-3d',
      }}
    />
  );
}

export default function Background3D({ progress }: { progress: MotionValue<number> }) {
  // Generate 20 random decorative elements
  const elements = Array.from({ length: 20 }).map((_, i) => {
    const isCircle = i % 2 === 0;
    const size = 20 + (i * 5); // 20px to 120px
    const left = `${(i * 17) % 100}%`;
    const top = `${(i * 23) % 100}%`;

    // Parallax speeds
    const yStart = (i % 5) * 100;
    const yEnd = -((i % 5) * 200) - 200;

    // 3D Rotations
    const rotateXStart = i * 30;
    const rotateXEnd = rotateXStart + 360;
    const rotateYStart = i * 45;
    const rotateYEnd = rotateYStart + 360;

    return { id: i, isCircle, size, left, top, yStart, yEnd, rotateXStart, rotateXEnd, rotateYStart, rotateYEnd };
  });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" style={{ perspective: '1000px' }}>
      {elements.map((el) => (
        <BackgroundElement key={el.id} el={el} progress={progress} />
      ))}
    </div>
  );
}
