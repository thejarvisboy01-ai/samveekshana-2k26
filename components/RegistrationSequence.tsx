'use client';

import { motion, MotionValue, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function RegistrationSequence({ progress }: { progress: MotionValue<number> }) {
  // Tighter window for faster fade transitions
  const opacity = useTransform(progress, [0.75, 0.765], [0, 1]);
  const scale = useTransform(progress, [0.75, 1], [0.5, 1]);
  const pointerEvents = useTransform(progress, [0.75, 0.765], ['none', 'auto']);

  // Vortex rotations
  const rotate1 = useTransform(progress, [0.75, 1], [0, 360]);
  const rotate2 = useTransform(progress, [0.75, 1], [0, -360]);
  const rotate3 = useTransform(progress, [0.75, 1], [0, 720]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{ opacity, zIndex: 50, pointerEvents: pointerEvents as any }}
    >
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#008080 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* 3D Vortex Background */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none" style={{ perspective: '1000px' }}>
        <motion.div
          className="absolute w-[150vw] h-[150vw] max-w-[1500px] max-h-[1500px] rounded-full border-[2px] border-dashed border-[#008080]/20"
          style={{ rotateZ: rotate1, rotateX: 60 }}
        />
        <motion.div
          className="absolute w-[100vw] h-[100vw] max-w-[1000px] max-h-[1000px] rounded-full border-[4px] border-dotted border-[#D4AF37]/30"
          style={{ rotateZ: rotate2, rotateX: 70 }}
        />
        <motion.div
          className="absolute w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full border-[1px] border-solid border-[#008080]/40 shadow-[0_0_100px_rgba(0,128,128,0.2)]"
          style={{ rotateZ: rotate3, rotateX: 80 }}
        />
        <div className="absolute w-[20vw] h-[20vw] max-w-[200px] max-h-[200px] rounded-full bg-gradient-to-tr from-[#008080] to-[#D4AF37] blur-[80px] animate-pulse opacity-40" />
      </div>

      <motion.div className="text-center z-10 relative w-full px-8" style={{ scale }}>
        <div className="font-mono text-sm tracking-[0.5em] text-[#008080] mb-8 uppercase font-bold drop-shadow-[0_0_8px_rgba(0,128,128,0.5)]">
          The Portal Opens
        </div>
        <h2 className="text-[clamp(3rem,12vw,10rem)] font-serif font-normal leading-[0.85] tracking-tight mb-8 md:mb-12 text-transparent bg-clip-text bg-gradient-to-b from-[#FFF8DC] to-[#D4AF37] drop-shadow-[0_0_20px_rgba(212,175,55,0.3)] uppercase">
          ENTER THE<br />SANCTUM
        </h2>

        <button className="group relative inline-flex items-center justify-center px-8 py-4 md:px-12 md:py-6 font-mono text-sm tracking-widest uppercase overflow-hidden bg-transparent text-[#FFF8DC] transition-transform hover:scale-110 duration-500 cursor-pointer rounded-sm border-2 border-[#008080]/50 hover:border-[#D4AF37] shadow-[0_0_30px_rgba(0,128,128,0.1)] hover:shadow-[0_0_60px_rgba(212,175,55,0.4)] backdrop-blur-md">
          <span className="relative z-10 flex items-center gap-4 font-bold">
            Commence Journey <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#008080]/20 to-[#D4AF37]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </button>
      </motion.div>

      <div className="absolute bottom-8 md:bottom-12 w-full flex justify-between px-6 md:px-12 font-mono text-xs text-[#008080]/60 uppercase z-10">
        <div>Pravartana MMXXVI</div>
        <div className="animate-pulse font-bold text-[#008080] drop-shadow-[0_0_5px_rgba(0,128,128,0.5)]">Awaiting Input</div>
      </div>
    </motion.div>
  );
}
