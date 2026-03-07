'use client';

import { AnimatePresence, motion } from 'motion/react';
import {
  Github,
  Info,
  Instagram,
  Linkedin,
  MessageCircle,
  Rocket,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import LogoImage from 'next/image';
import { useEffect, useState } from 'react';

type PanelKey = 'developers' | 'about' | null;

type DevProfile = {
  name: string;
  role: string;
  tagline: string;
  photo: string;
  socials: {
    linkedin?: string;
    instagram?: string;
    github?: string;
    whatsapp?: string;
  };
};

const REGISTER_URL = process.env.NEXT_PUBLIC_REGISTRATION_URL || 'https://register.samveekshana.tech/';

const DEVELOPERS: DevProfile[] = [
  {
    name: 'Rakesh Sabnis',
    role: 'Lead Frontend Developer',
    tagline: 'Builds fast, high-energy interfaces with cinematic interactions.',
    photo: '/developers/rakesh-sabnis.jpg',
    socials: {
      linkedin: 'https://www.linkedin.com/in/rakesh-sabnis-47675329a',
      instagram: 'https://www.instagram.com/rakesh_sabnis?igsh=eDN4djJiYzlqNGdk',
      github: 'https://github.com/RakeshSabnis',
      whatsapp: 'https://wa.me/918073113794',
    },
  },
  {
    name: 'Sanskaar Undale',
    role: 'Full Stack Developer',
    tagline: 'Mastering frontend finesse and robust backend logic.',
    photo: '/developers/sanskaar-undale.jpeg',
    socials: {
      linkedin: 'https://www.linkedin.com/in/sanskaar-sateesh-undale-aa90122ba',
      instagram: 'https://www.instagram.com/sansss.2186?igsh=c3JtYmlycG82NzUx',
      github: 'https://github.com/CodeFreak2186',
      whatsapp: 'https://wa.me/916363066361',
    },
  },
  {
    name: 'Nilesh Patil',
    role: 'Lead Systems Architect',
    tagline: 'Architecting scalable solutions and core infrastructure.',
    photo: '/developers/nilesh-patil.jpeg',
    socials: {
      linkedin: 'https://linkedin.com/in/nileshpatil6',
      instagram: 'https://instagram.com/nileshpatil_6',
      github: 'https://github.com/nileshpatil6',
      whatsapp: 'https://wa.me/918431496045',
    },
  },
  {
    name: 'Piyush Kulkarni',
    role: 'UI/UX & Frontend Engineer',
    tagline: 'Crafting immersive digital journeys with precision.',
    photo: '/developers/piyush-kulkarni.jpeg',
    socials: {
      linkedin: 'https://www.linkedin.com/in/piyushkulkarni13/',
      instagram: 'https://www.instagram.com/piyushexitmusic/',
      github: 'https://github.com/piy-ushk',
      whatsapp: 'https://wa.me/918459458707',
    },
  },
  {
    name: 'Aman Mali',
    role: 'Backend & Security Engineer',
    tagline: 'Hardening systems and optimizing data performance.',
    photo: '/developers/aman-mali.jpeg',
    socials: {
      linkedin: 'https://www.linkedin.com/in/amanmali',
      instagram: 'https://www.instagram.com/aman.mali.944?igsh=MXFuOWNpc3dwaHV3NQ==',
      github: 'https://github.com/amanmali944',
      whatsapp: 'https://wa.me/916364623301',
    },
  },
];

const ABOUT_POINTS = [
  {
    title: 'What is Samveekshana?',
    body: 'A multi-department technical and cultural convergence built to feel like a cinematic mission. Every section of the site and event design mirrors that high-energy theme.',
  },
  {
    title: 'Why this vibe?',
    body: 'We intentionally went bold: layered depth, kinetic visuals, and intense transitions to make exploration feel alive instead of static.',
  },
  {
    title: 'What you can expect',
    body: 'Challenge rounds, department showcases, central events, and rapid registration flow with immersive storytelling from start to finish.',
  },
];

const BG_ORBS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: 80 + Math.random() * 220,
  duration: 8 + Math.random() * 10,
}));

function DevCard({ profile, index }: { profile: DevProfile; index: number }) {
  const color = index % 2 === 0 ? '#00d4c3' : '#d9b44a';
  const [imageFailed, setImageFailed] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const initials = profile.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.article
      initial={{ opacity: 0, y: 40, rotateX: -18 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: 0.12 * index, duration: 0.45, ease: 'easeOut' }}
      className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-[#00d4c3]/30 bg-[#050b0f]/80 backdrop-blur-xl sm:h-[430px] md:max-w-[340px] xl:h-[440px]"
      style={{ boxShadow: `0 0 30px color-mix(in oklab, ${color} 28%, transparent)` }}
      whileHover={{ y: -8, rotateX: 4, rotateY: index % 2 === 0 ? -4 : 4, scale: 1.015 }}
    >
      <motion.div
        className="absolute -top-24 -right-16 h-44 w-44 rounded-full blur-3xl"
        style={{ background: `${color}40` }}
        animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.2, 0.45, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(110deg, transparent 35%, rgba(255,255,255,0.16) 50%, transparent 65%)' }}
        animate={{ x: ['-120%', '120%'] }}
        transition={{ duration: 2.1, repeat: Infinity, ease: 'linear', repeatDelay: 0.8 }}
      />
      <motion.div
        className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-[#00d4c3]/60"
        animate={{ opacity: [0.3, 1, 0.3], x: ['-15%', '15%', '-15%'] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      />
      <motion.div
        className="pointer-events-none absolute left-0 right-0 bottom-0 h-px bg-[#d9b44a]/60"
        animate={{ opacity: [0.35, 1, 0.35], x: ['15%', '-15%', '15%'] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      />

      <div className="relative z-10 h-full [perspective:1400px]">
        <motion.div
          className="relative h-full [transform-style:preserve-3d]"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <button
            type="button"
            aria-label={`Reveal details for ${profile.name}`}
            onClick={() => setIsFlipped(true)}
            className="absolute inset-0 w-full text-left"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          >
            {!imageFailed ? (
              <>
                <LogoImage
                  src={profile.photo}
                  alt={`${profile.name} background`}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover scale-110 blur-xl opacity-55"
                />
                <LogoImage
                  src={profile.photo}
                  alt={`${profile.name} photo`}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover grayscale-[0.08] contrast-110 saturate-[1.1] transition-transform duration-500 hover:scale-105"
                  onError={() => setImageFailed(true)}
                />
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(0,212,195,0.3),transparent_60%),radial-gradient(circle_at_70%_80%,rgba(217,180,74,0.25),transparent_60%)] text-6xl font-black tracking-widest text-[#d9b44a]">
                {initials}
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/75" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(0,212,195,0.2),transparent_48%),radial-gradient(circle_at_20%_85%,rgba(217,180,74,0.2),transparent_46%)]" />

            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{ background: 'linear-gradient(110deg, transparent 35%, rgba(255,255,255,0.16) 50%, transparent 65%)' }}
              animate={{ x: ['-120%', '120%'] }}
              transition={{ duration: 2.1, repeat: Infinity, ease: 'linear', repeatDelay: 0.8 }}
            />

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-[#d9b44a]/60 bg-black/60 px-4 py-2 text-[10px] font-mono uppercase tracking-[0.22em] text-[#ffeab0] md:bottom-4 md:tracking-[0.28em]">
              Tap on it
            </div>
          </button>

          <div
            className="absolute inset-0 flex h-full flex-col gap-3 overflow-hidden bg-[#03070a]/95 p-3.5 md:p-4"
            style={{
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(#00d4c3 1px, transparent 1px), linear-gradient(90deg, #00d4c3 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{ background: 'linear-gradient(110deg, transparent 35%, rgba(0,212,195,0.14) 50%, transparent 65%)' }}
              animate={{ x: ['-120%', '120%'] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
            />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(0,212,195,0.18),transparent_42%),radial-gradient(circle_at_90%_85%,rgba(217,180,74,0.14),transparent_44%)]" />

            <div className="rounded-xl border border-[#00d4c3]/40 bg-black/55 p-2.5 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.35)]">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#8df6eb]">developer reveal</div>
                  <h3 className="mt-1 text-lg font-black uppercase tracking-tight leading-tight text-[#fffdf2] md:text-xl">{profile.name}</h3>
                  <p className="mt-1 text-[10px] font-mono uppercase leading-snug tracking-[0.18em] text-[#ffe8a2]">{profile.role}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsFlipped(false)}
                  className="rounded border border-[#00d4c3]/40 bg-black/60 px-2 py-1 text-[9px] font-mono uppercase tracking-[0.25em] text-[#bafcf6] hover:border-[#d9b44a]/70 hover:text-[#ffeab0]"
                >
                  Back
                </button>
              </div>
            </div>

            <div className="flex-1 rounded-xl border border-[#d9b44a]/35 bg-black/55 p-2.5 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.35)]">
              <p className="line-clamp-3 text-[12px] leading-relaxed text-[#eef3e9]">{profile.tagline}</p>

              <div className="mt-2.5 grid grid-cols-2 gap-2">
                {profile.socials.linkedin && (
                  <a
                    href={profile.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-lg border border-[#00d4c3]/35 bg-[#07131a]/85 px-2.5 py-2 text-[11px] font-mono uppercase tracking-wide text-[#c5fff7] transition hover:border-[#00d4c3]"
                  >
                    <Linkedin size={13} /> LinkedIn
                  </a>
                )}
                {profile.socials.instagram && (
                  <a
                    href={profile.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-lg border border-[#d9b44a]/35 bg-[#151008]/85 px-2.5 py-2 text-[11px] font-mono uppercase tracking-wide text-[#ffefbf] transition hover:border-[#d9b44a]"
                  >
                    <Instagram size={13} /> Insta
                  </a>
                )}
                {profile.socials.github && (
                  <a
                    href={profile.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 rounded-lg border border-[#00d4c3]/35 bg-[#07131a]/85 px-2.5 py-2 text-[11px] font-mono uppercase tracking-wide text-[#c5fff7] transition hover:border-[#00d4c3]"
                  >
                    <Github size={13} /> GitHub
                  </a>
                )}
                {profile.socials.whatsapp && (
                  <a
                    href={profile.socials.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-w-0 items-center justify-center gap-1 rounded-lg border border-[#d9b44a]/35 bg-[#151008]/85 px-2 py-2 text-[10px] font-mono uppercase tracking-normal text-[#ffefbf] transition hover:border-[#d9b44a] sm:text-[11px]"
                  >
                    <MessageCircle size={13} /> WhatsApp
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.article>
  );
}

export default function CornerNavSections({ anyModalOpen = false }: { anyModalOpen?: boolean }) {
  const [panel, setPanel] = useState<PanelKey>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // An "external" modal is open when body overflow is hidden but NOT from our own panel/menu
  const ownModalOpen = panel !== null || mobileMenuOpen;
  const externalModalOpen = anyModalOpen && !ownModalOpen;

  const isOpen = panel !== null;

  useEffect(() => {
    if (isOpen || mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, mobileMenuOpen]);

  const closeMobile = () => setMobileMenuOpen(false);

  const mobileLinks = [
    {
      label: 'Register Now',
      href: REGISTER_URL,
      accent: '#d9b44a',
      icon: <Rocket size={18} />,
      isExternal: true,
    },
    {
      label: 'Developers',
      accent: '#00d4c3',
      icon: <Users size={18} />,
      onClick: () => { closeMobile(); setTimeout(() => setPanel('developers'), 200); },
    },
    {
      label: 'About',
      accent: '#00d4c3',
      icon: <Info size={18} />,
      onClick: () => { closeMobile(); setTimeout(() => setPanel('about'), 200); },
    },
  ];

  return (
    <>
      {/* ── DESKTOP NAV (hidden on mobile) ───────────────────────────── */}
      <nav className="hidden md:flex fixed right-6 top-6 z-[140] flex-col gap-2" aria-label="Quick navigation">
        <a
          href={REGISTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden rounded-full border border-[#d9b44a]/50 bg-black/70 px-4 py-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#fff3c4] backdrop-blur-md transition hover:border-[#d9b44a]"
        >
          <motion.span
            className="pointer-events-none absolute inset-y-0 left-[-40%] w-[35%] bg-gradient-to-r from-transparent via-[#d9b44a]/30 to-transparent"
            animate={{ x: ['-10%', '360%'] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
          />
          <span className="relative z-10">Register Now</span>
        </a>

        <button
          type="button"
          onClick={() => setPanel('developers')}
          className="rounded-full border border-[#00d4c3]/45 bg-black/70 px-4 py-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#b6fff7] backdrop-blur-md transition hover:border-[#00d4c3]"
        >
          <span className="inline-flex items-center gap-2"><Users size={12} /> Developers</span>
        </button>

        <button
          type="button"
          onClick={() => setPanel('about')}
          className="rounded-full border border-[#00d4c3]/45 bg-black/70 px-4 py-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#b6fff7] backdrop-blur-md transition hover:border-[#00d4c3]"
        >
          <span className="inline-flex items-center gap-2"><Info size={12} /> About</span>
        </button>
      </nav>

      {/* ── MOBILE HAMBURGER BUTTON — hides when external modal is open ── */}
      <motion.button
        type="button"
        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setMobileMenuOpen(v => !v)}
        className="md:hidden fixed right-4 top-4 z-[9000] flex h-11 w-11 flex-col items-center justify-center gap-[6px] rounded-full border border-[#008080]/50 bg-black/80 backdrop-blur-md shadow-[0_0_18px_rgba(0,128,128,0.25)]"
        whileTap={{ scale: 0.88 }}
        animate={externalModalOpen
          ? { opacity: 0, scale: 0.8, pointerEvents: 'none' as const }
          : mobileMenuOpen
            ? { opacity: 1, scale: 1, borderColor: 'rgba(212,175,55,0.7)', boxShadow: '0 0 22px rgba(212,175,55,0.3)' }
            : { opacity: 1, scale: 1, borderColor: 'rgba(0,128,128,0.5)', boxShadow: '0 0 18px rgba(0,128,128,0.25)' }
        }
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        style={{ pointerEvents: externalModalOpen ? 'none' : 'auto' }}
      >
        {/* Three morphing lines */}
        <motion.span
          className="block h-[2px] w-5 rounded-full bg-[#00d4c3] origin-center"
          animate={mobileMenuOpen
            ? { rotate: 45, y: 8, backgroundColor: '#d9b44a' }
            : { rotate: 0, y: 0, backgroundColor: '#00d4c3' }
          }
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
        <motion.span
          className="block h-[2px] w-5 rounded-full bg-[#00d4c3] origin-center"
          animate={mobileMenuOpen
            ? { opacity: 0, scaleX: 0 }
            : { opacity: 1, scaleX: 1 }
          }
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="block h-[2px] w-5 rounded-full bg-[#00d4c3] origin-center"
          animate={mobileMenuOpen
            ? { rotate: -45, y: -8, backgroundColor: '#d9b44a' }
            : { rotate: 0, y: 0, backgroundColor: '#00d4c3' }
          }
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
      </motion.button>

      {/* ── MOBILE MENU OVERLAY ───────────────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-[8000] flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-[#020405]/97 backdrop-blur-xl"
              onClick={closeMobile}
            />

            {/* Scanlines overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, #00FFFF 0px, #00FFFF 1px, transparent 1px, transparent 3px)',
              }}
            />

            {/* Grid dots */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{
                backgroundImage: 'radial-gradient(#008080 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />

            {/* Moving scan line */}
            <motion.div
              className="absolute inset-x-0 h-px bg-[#00d4c3]/20 pointer-events-none"
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              style={{ boxShadow: '0 0 10px #00d4c3' }}
            />

            {/* Corner decorations */}
            <div className="absolute top-5 left-5 w-8 h-8 border-t-2 border-l-2 border-[#008080]/40 pointer-events-none" />
            <div className="absolute top-5 right-20 w-8 h-8 border-t-2 border-r-2 border-[#008080]/40 pointer-events-none" />
            <div className="absolute bottom-10 left-5 w-8 h-8 border-b-2 border-l-2 border-[#d9b44a]/30 pointer-events-none" />
            <div className="absolute bottom-10 right-5 w-8 h-8 border-b-2 border-r-2 border-[#d9b44a]/30 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full px-6 pt-24 pb-16 justify-between">

              {/* Header tag */}
              <motion.div
                className="mb-10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05, duration: 0.4 }}
              >
                <div className="text-[9px] font-mono tracking-[0.5em] text-[#008080]/50 uppercase mb-1">Navigation Matrix</div>
                <div className="h-px w-12 bg-gradient-to-r from-[#008080] to-transparent" />
              </motion.div>

              {/* NAV ITEMS */}
              <div className="flex-1 flex flex-col justify-center gap-5">
                {mobileLinks.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -40, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: 0.08 + i * 0.1, duration: 0.4, ease: 'easeOut' }}
                  >
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMobile}
                        className="group flex items-center gap-4 w-full py-4 px-5 relative overflow-hidden"
                        style={{ border: `1px solid ${item.accent}25`, borderRadius: '2px' }}
                      >
                        {/* shimmer sweep */}
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          style={{ background: `linear-gradient(90deg, transparent, ${item.accent}15, transparent)` }}
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
                        />
                        {/* left accent bar */}
                        <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l" style={{ background: `linear-gradient(180deg, transparent, ${item.accent}, transparent)` }} />
                        {/* number */}
                        <div className="text-[11px] font-mono shrink-0" style={{ color: `${item.accent}60` }}>
                          {String(i + 1).padStart(2, '0')}
                        </div>
                        {/* icon */}
                        <div style={{ color: item.accent }}>{item.icon}</div>
                        {/* label */}
                        <span
                          className="text-[15px] font-mono font-bold uppercase tracking-[0.2em] text-[#FFF8DC] group-hover:text-white transition-colors"
                        >
                          {item.label}
                        </span>
                        {/* arrow */}
                        <motion.div
                          className="ml-auto text-[10px] font-mono"
                          style={{ color: `${item.accent}70` }}
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          →
                        </motion.div>
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={item.onClick}
                        className="group flex items-center gap-4 w-full py-4 px-5 relative overflow-hidden text-left"
                        style={{ border: `1px solid ${item.accent}25`, borderRadius: '2px' }}
                      >
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          style={{ background: `linear-gradient(90deg, transparent, ${item.accent}15, transparent)` }}
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 + i * 0.3 }}
                        />
                        <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l" style={{ background: `linear-gradient(180deg, transparent, ${item.accent}, transparent)` }} />
                        <div className="text-[11px] font-mono shrink-0" style={{ color: `${item.accent}60` }}>
                          {String(i + 1).padStart(2, '0')}
                        </div>
                        <div style={{ color: item.accent }}>{item.icon}</div>
                        <span className="text-[15px] font-mono font-bold uppercase tracking-[0.2em] text-[#FFF8DC] group-hover:text-white transition-colors">
                          {item.label}
                        </span>
                        <motion.div
                          className="ml-auto text-[10px] font-mono"
                          style={{ color: `${item.accent}70` }}
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        >
                          →
                        </motion.div>
                      </button>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Footer tag */}
              <motion.div
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="flex items-center justify-center gap-3 text-[8px] font-mono text-[#008080]/30 uppercase tracking-[0.4em]">
                  <motion.div className="w-1 h-1 rounded-full bg-green-500" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} />
                  SAMVEEKSHANA 2026
                  <motion.div className="w-1 h-1 rounded-full bg-[#d9b44a]" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.8, repeat: Infinity }} />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.section
            className="fixed inset-0 z-[160] overflow-y-auto bg-[#02070a]/95 px-3 pb-8 pt-16 md:flex md:items-center md:justify-center md:overflow-hidden md:px-4 md:py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {BG_ORBS.map((orb) => (
                <motion.div
                  key={orb.id}
                  className="absolute rounded-full"
                  style={{
                    left: orb.left,
                    top: orb.top,
                    width: orb.size,
                    height: orb.size,
                    background:
                      orb.id % 2 === 0
                        ? 'radial-gradient(circle, rgba(0,212,195,0.14), transparent 70%)'
                        : 'radial-gradient(circle, rgba(217,180,74,0.12), transparent 70%)',
                  }}
                  animate={{ y: [0, -35, 0], x: [0, 24, 0], rotate: [0, 20, 0] }}
                  transition={{ duration: orb.duration, repeat: Infinity, ease: 'easeInOut' }}
                />
              ))}

              <motion.div
                className="absolute inset-x-0 top-0 h-px bg-[#00d4c3]/30"
                animate={{ y: ['0%', '100vh'] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            <motion.button
              onClick={() => setPanel(null)}
              className="fixed left-3 top-3 z-[300] rounded-full border border-[#00d4c3]/40 bg-black/60 p-2 text-[#b6fff7] backdrop-blur-md transition hover:border-[#d9b44a] hover:text-[#fff3c4] md:absolute md:left-8 md:top-8"
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.94 }}
            >
              <X size={20} />
            </motion.button>

            {panel === 'developers' && (
              <motion.div
                className="relative z-10 mx-auto w-full max-w-6xl"
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -18, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-7 text-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#00d4c3]/45 bg-[#061219]/70 px-4 py-1 text-[10px] font-mono uppercase tracking-[0.35em] text-[#9dfcf2]">
                    <Sparkles size={12} /> core dev squad
                  </div>
                  <h2 className="mt-4 text-3xl font-black uppercase tracking-tight text-[#f4f8eb] md:text-6xl">DEVELOPER REVEAL</h2>
                  <p className="mx-auto mt-3 max-w-3xl text-[13px] text-[#c6dcd8]/85 md:text-base">
                    A 5-man squad of high-voltage engineers powering the Samveekshana web experience.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 pb-4 md:pb-0">
                  {DEVELOPERS.map((profile, index) => (
                    <DevCard key={`${profile.name}-${profile.role}`} profile={profile} index={index} />
                  ))}
                </div>
              </motion.div>
            )}

            {panel === 'about' && (
              <motion.div
                className="relative z-10 mx-auto w-full max-w-5xl"
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -18, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8 text-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#d9b44a]/50 bg-[#161105]/65 px-4 py-1 text-[10px] font-mono uppercase tracking-[0.35em] text-[#ffe7a1]">
                    <Rocket size={12} /> mission briefing
                  </div>
                  <h2 className="mt-4 text-3xl font-black uppercase tracking-tight text-[#f4f8eb] md:text-6xl">ABOUT SAMVEEKSHANA</h2>
                  <p className="mx-auto mt-3 max-w-3xl text-[13px] text-[#d7dbc3]/85 md:text-base">
                    A kinetic college fest experience blending technology, strategy, and creative expression.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 pb-4 md:grid-cols-3 md:pb-0">
                  {ABOUT_POINTS.map((point, i) => (
                    <motion.article
                      key={point.title}
                      className="relative overflow-hidden rounded-2xl border border-[#d9b44a]/35 bg-[#120f08]/80 p-5 backdrop-blur-xl"
                      initial={{ opacity: 0, y: 36, rotateY: i % 2 === 0 ? -12 : 12 }}
                      animate={{ opacity: 1, y: 0, rotateY: 0 }}
                      transition={{ delay: i * 0.11, duration: 0.4, ease: 'easeOut' }}
                    >
                      <motion.div
                        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d9b44a] to-transparent"
                        animate={{ opacity: [0.25, 1, 0.25] }}
                        transition={{ duration: 1.9, repeat: Infinity }}
                      />
                      <div className="text-[10px] font-mono uppercase tracking-[0.35em] text-[#d9b44a]/70">protocol {String(i + 1).padStart(2, '0')}</div>
                      <h3 className="mt-3 text-xl font-bold uppercase tracking-tight text-[#fff4d8]">{point.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-[#efe4c7]/85">{point.body}</p>
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
