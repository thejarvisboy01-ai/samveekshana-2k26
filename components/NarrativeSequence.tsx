'use client';

import { motion, MotionValue, useTransform } from 'motion/react';
import Image from 'next/image';

export default function NarrativeSequence({ progress }: { progress: MotionValue<number> }) {
  // Start immediately at 0.0 to eliminate the gap after Hero section
  const opacity = useTransform(progress, [0, 0.02, 0.38, 0.4], [0, 1, 1, 0]);

  // Phase 1: The Old Ways (Serif)
  const text1Opacity = useTransform(progress, [0, 0.02, 0.18, 0.2], [0, 1, 1, 0]);
  const text1Y = useTransform(progress, [0, 0.2], ['10%', '-10%']);
  const text1Z = useTransform(progress, [0, 0.2], [0, 200]);

  // Phase 2: The Spark (Teal/Emerald expanding)
  const sparkScale = useTransform(progress, [0.18, 0.25, 0.35], [0, 1, 50]);
  const sparkOpacity = useTransform(progress, [0.18, 0.20, 0.32, 0.35], [0, 1, 1, 0]);

  // Phase 3: The Revolution (Serif, Gold)
  const text2Opacity = useTransform(progress, [0.26, 0.29, 0.37, 0.4], [0, 1, 1, 0]);
  const text2Y = useTransform(progress, [0.26, 0.4], ['10%', '-10%']);
  const text2Z = useTransform(progress, [0.26, 0.4], [-200, 0]);

  // 3D Floating Elements
  const floatY1 = useTransform(progress, [0, 0.4], [100, -300]);
  const floatR1 = useTransform(progress, [0, 0.4], [0, 180]);
  const floatY2 = useTransform(progress, [0, 0.4], [-100, 300]);
  const floatR2 = useTransform(progress, [0, 0.4], [0, -180]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none px-8 overflow-hidden"
      style={{ opacity, perspective: '1000px' }}
    >
      {/* Floating Vintage Elements */}
      <motion.div
        className="absolute left-[15%] top-[30%] w-[15vw] max-w-[200px] aspect-square opacity-30"
        style={{ y: floatY1, rotateZ: floatR1, rotateX: 45 }}
      >
        <Image src="https://picsum.photos/seed/compass-rose/400/400" alt="Compass" fill className="object-contain sepia-[0.5] hue-rotate-[160deg] mix-blend-screen" referrerPolicy="no-referrer" />
      </motion.div>
      <motion.div
        className="absolute right-[15%] bottom-[30%] w-[20vw] max-w-[250px] aspect-square opacity-30"
        style={{ y: floatY2, rotateZ: floatR2, rotateY: 45 }}
      >
        <Image src="https://picsum.photos/seed/gears-cogs/400/400" alt="Gears" fill className="object-contain sepia-[0.8] mix-blend-screen" referrerPolicy="no-referrer" />
      </motion.div>

      {/* The Spark */}
      <motion.div
        className="absolute w-[10vw] h-[10vw] bg-gradient-to-tr from-[#008080] to-[#004d40] rounded-full mix-blend-screen z-0 blur-xl"
        style={{ scale: sparkScale, opacity: sparkOpacity }}
      />

      <div className="max-w-5xl w-full relative h-[50vh] z-10 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
        {/* Old Text */}
        <motion.h2
          className="absolute text-3xl md:text-6xl font-serif text-center text-[#B87333]/60 drop-shadow-[0_0_10px_rgba(184,115,51,0.2)]"
          style={{ opacity: text1Opacity, y: text1Y, z: text1Z }}
        >
          The signal has been <span className="italic">detected.</span>
        </motion.h2>

        {/* New Text */}
        <motion.h2
          className="absolute text-4xl md:text-7xl font-serif font-normal tracking-tight text-center text-transparent bg-clip-text bg-gradient-to-b from-[#FFF8DC] to-[#D4AF37] drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          style={{ opacity: text2Opacity, y: text2Y, z: text2Z }}
        >
          Awakening the <br />
          <span className="italic text-[#008080] drop-shadow-[0_0_15px_rgba(0,128,128,0.5)]">Machine Spirit.</span>
        </motion.h2>
      </div>
    </motion.div>
  );
}
