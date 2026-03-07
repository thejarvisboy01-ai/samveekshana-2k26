'use client';

import { useEffect, useState } from 'react';
import { motion, MotionValue, useTransform } from 'motion/react';
import Image from 'next/image';

const TEAM = [
  { role: 'GRANDMASTER', name: 'ALEXANDER V.', img: '/BCA.png', col: 1, row: 1 },
  { role: 'CHIEF ARCHITECT', name: 'MARCUS T.', img: '/CSE.png', col: 3, row: 2 },
  { role: 'MASTER ARTISAN', name: 'SARAH K.', img: '/EEE.png', col: 2, row: 3 },
  { role: 'LOREKEEPER', name: 'DAVID R.', img: '/ai.png', col: 4, row: 1 },
];

function TeamMember({ member, index, progress }: { member: any, index: number, progress: MotionValue<number> }) {
  const itemY = useTransform(progress, [0.62, 0.72], [200 * (index % 2 === 0 ? 1 : -1), -200 * (index % 2 === 0 ? 1 : -1)]);
  const rotateX = useTransform(progress, [0.62, 0.72], [20, -20]);
  const rotateY = useTransform(progress, [0.62, 0.72], [-15 + (index * 10), 15 - (index * 10)]);
  const z = useTransform(progress, [0.62, 0.72], [-200 + (index * 100), 200 - (index * 100)]);

  return (
    <motion.div
      className="relative group w-full"
      style={{ y: itemY, rotateX, rotateY, z, transformStyle: 'preserve-3d' }}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-t-full border-2 border-[#008080]/30 shadow-[0_0_30px_rgba(0,128,128,0.1)] group-hover:shadow-[0_0_50px_rgba(212,175,55,0.4)] group-hover:border-[#D4AF37]/80 transition-all duration-500 mb-6 bg-[#041014]">
        <Image
          src={member.img}
          alt={member.name}
          fill
          className="object-cover contrast-110 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#041014] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[#008080]/10 group-hover:bg-[#D4AF37]/20 mix-blend-overlay transition-colors duration-500" />
      </div>
      <div className="text-center" style={{ transform: 'translateZ(50px)' }}>
        <div className="font-mono text-[10px] md:text-xs text-[#008080] tracking-widest mb-1 uppercase drop-shadow-[0_0_5px_rgba(0,128,128,0.5)] font-bold">{member.role}</div>
        <div className="font-serif text-lg md:text-2xl font-normal tracking-tight uppercase text-[#FFF8DC] drop-shadow-lg">{member.name}</div>
      </div>
    </motion.div>
  );
}

export default function TeamSequence({ progress }: { progress: MotionValue<number> }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Tighter window for faster fade transitions
  const opacity = useTransform(
    progress,
    isMobile ? [0.585, 0.6, 0.745, 0.76] : [0.62, 0.635, 0.745, 0.76],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ opacity, perspective: '1200px', zIndex: 40 }}
    >
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#008080 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="absolute top-6 left-6 md:top-12 md:left-12 text-xs font-mono tracking-widest opacity-80 uppercase text-[#008080] drop-shadow-[0_0_8px_rgba(0,128,128,0.5)]">
        [ Phase 04: The Guild ]
      </div>

      <motion.div className="w-full max-w-6xl mx-auto px-4 md:px-8" style={{ transformStyle: 'preserve-3d' }}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
          {TEAM.map((member, i) => (
            <TeamMember key={i} member={member} index={i} progress={progress} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
