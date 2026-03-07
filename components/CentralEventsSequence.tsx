'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, MotionValue, useTransform, AnimatePresence } from 'motion/react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { X, Download, ChevronLeft, ChevronRight } from 'lucide-react';

const FlyingPosters = dynamic(() => import('./FlyingPosters'), { ssr: false });

const CENTRAL_EVENTS = [
    {
        id: 'TMB', title: 'Tambola', subtitle: 'Numbers Strategy Exhibit', description: 'A thrillsing game of numbers and luck. Match patterns on your ticket as numbers are called out to win exciting prizes.', date: 'March 11, 2026', location: 'Main Auditorium', color: 'from-[#D4AF37] to-[#8B6508]', image: '/events/tambola.png', rulebook: '/rulebook/Tambola Central Event (1).pdf',
        rules: [
            'Each ticket has a 3x9 grid with 15 numbers (5 per row).',
            'Mark the numbers on your ticket as the Caller announces them.',
            'Early Five: The first person to strike off any five numbers.',
            'Lines: Complete all 5 numbers in the top, middle, or bottom row.',
            'Full House: Strike off all 15 numbers on the ticket for the grand prize.',
            'Claims must be made immediately after the number is called.'
        ]
    },
    {
        id: 'T2T', title: 'Trash 2 Tech', subtitle: 'Sustainable Innovation', description: 'Transform waste into wonder. Build innovative tech solutions from discarded materials and electronic waste.', date: 'March 11, 2026', location: 'Innovation Lab', color: 'from-[#2ecc71] to-[#1a7a44]', image: '/events/trash 2 tech .png', rulebook: '/rulebook/Samveekshana_Events_Rules 2k26 EC ......docx',
        rules: [
            'Team Size: 2 members per team.',
            'Registration Fees: Rs 100/-',
            'Create a functional technological model using only scrap or E-waste materials.',
            'Use of new electronic items is strictly prohibited.',
            'Judging will be based on creativity, functionality, and optimal use of materials.',
            'Top 3 positions rewarded with cash prizes and excellence certificates.'
        ]
    },
    {
        id: 'SLC', title: 'Slow Cycling', subtitle: 'The Balance Challenge', description: 'The slowest rider wins. Test your balance and control in this ultimate patience challenge on two wheels.', date: 'March 11, 2026', location: 'College Ground', color: 'from-[#e67e22] to-[#d35400]', image: '/events/slow cycling.png', rulebook: '/rulebook/Events _ Samveekshana 2026_Budget_EEE.docx',
        rules: [
            'Team Size: Individual participation.',
            'Registration Fees: Rs 50/-',
            'Reach the finish line as slowly as possible without breaking the rules.',
            'Both feet must remain on the pedals at all times. Cannot touch the ground.',
            'Participants must not stop completely; the cycle must maintain forward motion.',
            'No pushing or blocking other participants.'
        ]
    },
    {
        id: 'MCR', title: 'Musical Chair', subtitle: 'Kinetic Reflex Test', description: 'Classic fun reimagined. When the music stops, only the quickest find a seat. Last one standing wins it all.', date: 'March 11, 2026', location: 'Open Arena', color: 'from-[#9b59b6] to-[#6c3483]', image: '/events/musical chair.png', rulebook: '/rulebook/BSH Events Rules and Regulations.docx',
        rules: [
            'Team Size: Individual participation.',
            'Registration Fees: Rs 50/-',
            'Participants must walk/dance around the chairs while music is playing.',
            'When the music stops, participants must immediately find a seat.',
            'The person left standing without a chair is eliminated.',
            'The last person remaining wins the challenge.'
        ]
    },
    {
        id: 'TLU', title: 'Talent Unleash', subtitle: 'Creative Expression Stage', description: 'Your stage awaits. Showcase your hidden talents — singing, dancing, comedy, or any unique skill.', date: 'March 12, 2026', location: 'Main Stage', color: 'from-[#e74c3c] to-[#c0392b]', image: '/events/talent unleash.png', rulebook: '/rulebook/Samveekshana_Events_Rules(CA).docx',
        rules: [
            'Open platform for talents like Singing, Dancing, Stand-up comedy, Mimicry, etc.',
            'Time Limit: Each performance will be restricted to a specific time slot.',
            'Props or music tracks must be arranged by the participants.',
            'Indecent or controversial content is strictly prohibited.',
            'Judging marked on creativity, stage presence, and audience engagement.'
        ]
    },
    {
        id: 'CTF', title: 'Capture the Flag', subtitle: 'Cyber Defense Mission', description: 'A cybersecurity battleground. Hack, defend, and capture flags in this intense digital warfare challenge.', date: 'March 12, 2026', location: 'CSE Lab Block', color: 'from-[#008080] to-[#004d40]', image: '/events/capture the flag.png', rulebook: '/rulebook/Samveekshana_Events_Rules(CSE Dept).pdf',
        rules: [
            'Team Size: Team of 5 members.',
            'Registration Fees: Rs 200/- per team.',
            'Solve cybersecurity challenges (Web Security, Cryptography, Forensics, etc.).',
            'Time Limit: Total duration of 2–3 hours.',
            'Attacking the competition server or other teams is strictly prohibited.',
            'Team with the highest points at the end wins.'
        ]
    },
    {
        id: 'VAL', title: 'Valorant', subtitle: 'Tactical Combat Unit', description: "Tactical shooter showdown. Assemble your squad and compete in Riot's premier FPS tournament.", date: 'March 12, 2026', location: 'Gaming Zone', color: 'from-[#ff4655] to-[#bd3944]', image: '/events/valorant.png', rulebook: '/rulebook/rules and regulations  for samveekshana event AIDS.docx',
        rules: [
            'Team Size: 5-member team.',
            'Tournament Format: Knockout basis. LAN-based matches.',
            'No substitutes allowed during play.',
            'Map selection by coin toss or ban system.',
            'Use of cheat hacks, scripts, or harassment will result in immediate disqualification.',
            'Winners receive special trophies and participation certificates.'
        ]
    },
    {
        id: 'EFB', title: 'BGMI', subtitle: 'Battle Royale Protocol', description: 'Battlegrounds Mobile India Tournament. Survive and conquer in the ultimate battle royale.', date: 'March 11, 2026', location: 'Gaming Arena', color: 'from-[#00b4d8] to-[#0077b6]', image: '/events/Bgmi.png', rulebook: '/rulebook/BSH Events Rules and Regulations.docx',
        rules: [
            'Team Size: Squad of 4 players.',
            'Registration Fees: Rs 200/- per team.',
            'Points based on official competitive placement and kill count.',
            'Mobile devices only. No emulators or iPads allowed.',
            'Custom room credentials will be shared prior to the match start.',
            'Teaming with other squads or using hacks leads to an immediate ban.'
        ]
    },
    {
        id: 'TRG', title: 'Tech Rangoli', subtitle: 'Artistic Circuitry', description: 'Art meets technology. Create stunning rangoli designs incorporating electronic components and circuits.', date: 'March 11, 2026', location: 'Central Courtyard', color: 'from-[#f39c12] to-[#e67e22]', image: '/events/tech rangoli.png', rulebook: '/rulebook/Samveekshana_Events_Rules(CA).docx',
        rules: [
            'Team Size: Individual participation.',
            'Registration Fees: Rs 50/-',
            'Create artistic designs based on current technology trends (AI, Cyber Security).',
            'Time Limit: 1 to 2 hours.',
            'Judging criteria: Relevance to theme, creativity, and visual appeal.',
            'Certificates for all participants and trophies for winners.'
        ]
    },
    {
        id: 'BBB', title: 'Brainy Bunch Battle', subtitle: 'Cognitive Arena', description: 'Battle of the brains. A multi-round quiz competition testing knowledge across science, tech, and pop culture.', date: 'March 12, 2026', location: 'Seminar Hall', color: 'from-[#3498db] to-[#2980b9]', image: '/events/Brainy Bunch Battel.png', rulebook: '/rulebook/Techanical Quiz Department Event.pdf',
        rules: [
            'Team Size: Team of 2 members.',
            'Format: 6 rounds comprising visual questions, basic civil engineering, and fun non-technical rounds.',
            'No mobile phones or electronic instruments allowed during the quiz.',
            'Response time for each question is 60 seconds.',
            'Passing the question is allowed from Round 5 onwards.',
            'Elimination takes place after specific sets of rounds based on the lowest score.'
        ]
    },
];

const items = CENTRAL_EVENTS.map(evt => evt.image);
const CENTRAL_EVENT_FEES: Record<string, string> = {
    TMB: 'Rs. 100/-',
    T2T: 'Rs. 100/- per team',
    SLC: 'Rs. 50/-',
    MCR: 'Rs. 50/-',
    TLU: 'Rs. 50/-',
    CTF: 'Rs. 200/- per team',
    VAL: 'Rs. 500/- per team',
    EFB: 'Rs. 200/- per team',
    TRG: 'Rs. 50/-',
    BBB: 'Rs. 100/- per team',
};
const REGISTRATION_BASE_URL = process.env.NEXT_PUBLIC_REGISTRATION_URL || 'https://register.samveekshana.tech/';

function goToCentralRegistration(event: { id: string; title: string }) {
    const target = new URL(REGISTRATION_BASE_URL);
    target.searchParams.set('event', event.title);
    target.searchParams.set('event_id', event.id);
    window.open(target.toString(), '_blank', 'noopener,noreferrer');
}

/* ΓöÇΓöÇ Animated hex grid background cell ΓöÇΓöÇ */
function HexDot({ delay }: { delay: number }) {
    return (
        <motion.div
            className="w-1 h-1 rounded-full bg-[#008080]"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.15, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay, ease: 'easeInOut' }}
        />
    );
}

/* ΓöÇΓöÇ Holographic scan-line event row ΓöÇΓöÇ */
function EventRow({ name, index, isActive, onClick }: { name: string; index: number; isActive: boolean; onClick?: () => void }) {
    return (
        <motion.div
            className="relative flex items-center gap-1.5 md:gap-5 py-[4px] md:py-[10px] cursor-pointer select-none"
            animate={{
                opacity: isActive ? 1 : 0.55,
                x: isActive ? 14 : 0,
                scale: isActive ? 1.04 : 1,
            }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            onClick={onClick}
        >
            {/* Active indicator ΓÇö double ring + core */}
            <div className="relative w-3 h-3 md:w-6 md:h-6 flex items-center justify-center shrink-0">
                {/* Outer ring */}
                <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                        borderWidth: isActive ? 1.5 : 1,
                        borderColor: isActive ? '#00D9D9' : 'rgba(0,128,128,0.2)',
                        boxShadow: isActive
                            ? '0 0 14px rgba(0,217,217,0.5), 0 0 28px rgba(0,217,217,0.15), inset 0 0 8px rgba(0,217,217,0.2)'
                            : '0 0 0px transparent',
                        rotate: isActive ? 360 : 0,
                    }}
                    transition={{
                        rotate: isActive ? { duration: 8, repeat: Infinity, ease: 'linear' } : { duration: 0.3 },
                        default: { duration: 0.4 },
                    }}
                    style={{ borderStyle: isActive ? 'dashed' : 'solid' }}
                />
                {/* Inner ring */}
                {isActive && (
                    <motion.div
                        className="absolute inset-[3px] rounded-full border border-[#00D9D9]/30"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    />
                )}
                {/* Core dot */}
                <motion.div
                    className="w-1 h-1 md:w-2 md:h-2 rounded-full"
                    animate={{
                        backgroundColor: isActive ? '#00D9D9' : 'rgba(0,128,128,0.2)',
                        scale: isActive ? [1, 1.5, 1] : 1,
                        boxShadow: isActive ? '0 0 8px #00D9D9' : '0 0 0px transparent',
                    }}
                    transition={isActive ? { scale: { repeat: Infinity, duration: 1.4, ease: 'easeInOut' } } : { duration: 0.3 }}
                />
            </div>

            {/* Index number */}
            <motion.span
                className="font-mono text-[7px] md:text-xs tracking-[0.1em] md:tracking-[0.2em] w-4 md:w-6"
                animate={{ color: isActive ? '#D4AF37' : 'rgba(212,175,55,0.2)' }}
                transition={{ duration: 0.3 }}
            >
                {(index + 1).toString().padStart(2, '0')}
            </motion.span>

            {/* Event name */}
            <motion.span
                className="font-mono text-[8px] md:text-base lg:text-lg tracking-[0.1em] md:tracking-[0.18em] uppercase"
                animate={{
                    color: isActive ? '#00ffff' : 'rgba(0,217,217,0.45)',
                    textShadow: isActive
                        ? '0 0 12px rgba(0,255,255,0.6), 0 0 30px rgba(0,255,255,0.2), 0 0 60px rgba(0,255,255,0.1)'
                        : '0 0 0px transparent',
                    letterSpacing: isActive ? '0.22em' : '0.1em',
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
            >
                {name}
            </motion.span>

            {/* Active: holographic scan line + glow bar */}
            <AnimatePresence>
                {isActive && (
                    <>
                        <motion.div
                            className="absolute bottom-0 left-10 right-0 h-px"
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 0.5 }}
                            exit={{ scaleX: 0, opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            style={{ background: 'linear-gradient(90deg, #00D9D9, rgba(0,217,217,0.1), transparent)', transformOrigin: 'left' }}
                        />
                        <motion.div
                            className="absolute inset-y-0 left-0 right-0 -z-10 rounded-r-sm"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            style={{ background: 'linear-gradient(90deg, rgba(0,217,217,0.06), transparent 70%)' }}
                        />
                    </>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function CentralEventsSequence({ progress }: { progress: MotionValue<number> }) {
    const [activeIdx, setActiveIdx] = useState(0);
    const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
    const [rulebookEvent, setRulebookEvent] = useState<(typeof CENTRAL_EVENTS)[number] | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isSectionInteractive, setIsSectionInteractive] = useState(false);
    const listRef = useRef<HTMLDivElement>(null);
    const postersRef = useRef<{ handleWheel: (e: WheelEvent) => boolean; reset: () => void } | null>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const wasVisible = useRef(false);

    // Keep mobile duration shorter so scrolling doesn't feel stuck in this section.
    const opacity = useTransform(
        progress,
        isMobile ? [0.69, 0.71, 0.98, 1.0] : [0.7, 0.72, 0.98, 1.0],
        [0, 1, 1, 1]
    );
    // Explicit section interaction ownership prevents touch interception across sections.
    useEffect(() => {
        const unsubscribe = progress.on('change', (latest: number) => {
            const inWindow = isMobile
                ? latest >= 0.68 && latest <= 1.0
                : latest >= 0.7 && latest <= 1.0;
            setIsSectionInteractive(inWindow || selectedEvent !== null || rulebookEvent !== null);
        });
        return unsubscribe;
    }, [progress, isMobile, selectedEvent]);

    /* Detect mobile for responsive poster sizing */
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Lock body scroll when a card is open
    useEffect(() => {
        if (selectedEvent !== null || rulebookEvent !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [selectedEvent]);

    /* Reset posters to first event every time section becomes visible */
    useEffect(() => {
        const unsubscribe = opacity.on('change', (v: number) => {
            const isVisible = v > 0.05;
            if (isVisible && !wasVisible.current) {
                postersRef.current?.reset();
                setActiveIdx(0);
            }
            wasVisible.current = isVisible;
        });
        return unsubscribe;
    }, [opacity]);

    /* Capture wheel on entire section and forward to FlyingPosters */
    useEffect(() => {
        if (isMobile) return;
        const el = sectionRef.current;
        if (!el) return;

        const onWheel = (e: WheelEvent) => {
            if (postersRef.current) {
                const consumed = postersRef.current.handleWheel(e);
                if (consumed) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }
        };

        el.addEventListener('wheel', onWheel, { passive: false });
        return () => el.removeEventListener('wheel', onWheel);
    }, [isMobile]);

    /* Auto-scroll list so the active item stays visible */
    useEffect(() => {
        if (!listRef.current || isMobile) return;
        const row = listRef.current.children[activeIdx] as HTMLElement | undefined;
        if (row) {
            row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [activeIdx, isMobile]);

    const goPrev = useCallback(() => {
        setActiveIdx((prev) => (prev === 0 ? CENTRAL_EVENTS.length - 1 : prev - 1));
    }, []);

    const goNext = useCallback(() => {
        setActiveIdx((prev) => (prev + 1) % CENTRAL_EVENTS.length);
    }, []);

    const activeEvent = CENTRAL_EVENTS[activeIdx];

    return (
        <motion.div
            ref={sectionRef}
            className="absolute inset-0 overflow-hidden"
            style={{
                opacity,
                zIndex: isSectionInteractive ? 25 : 15,
                pointerEvents: isSectionInteractive ? 'auto' : 'none',
            }}
        >
            {/* Full-screen dark base */}
            <div className="absolute inset-0 bg-[#020810]" />

            {/* ΓöÇΓöÇ LAYOUT: flex row ΓöÇΓöÇ */}
            {isMobile ? (
                <div className="relative md:hidden w-full h-full overflow-hidden" style={{ touchAction: 'pan-y' }}>
                    <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,217,217,0.14) 2px, rgba(0,217,217,0.14) 3px)' }} />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 20%, rgba(0,128,128,0.2), transparent 45%)' }} />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 90%, rgba(212,175,55,0.12), transparent 35%)' }} />

                    <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center z-30 select-none pointer-events-none">
                        <div className="text-[44px] leading-[0.82] font-serif uppercase tracking-tight text-[#f0d078]" style={{ textShadow: '0 0 18px rgba(240,208,120,0.25)' }}>
                            <div>Central</div>
                            <div className="-mt-0.5">Events</div>
                        </div>
                    </div>

                    <motion.div
                        className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[520px] h-[180px] rounded-[50%] bg-[#00d9d9]/10 blur-3xl pointer-events-none z-10"
                        animate={{ opacity: [0.45, 0.7, 0.45], scale: [0.96, 1.06, 0.96] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute bottom-[10.7%] left-1/2 -translate-x-1/2 w-[220px] h-[28px] rounded-[50%] border border-[#00d9d9]/50 bg-[#00171a]/80 pointer-events-none z-20"
                        animate={{ boxShadow: ['0 0 30px rgba(0,217,217,0.25)', '0 0 60px rgba(0,217,217,0.4)', '0 0 30px rgba(0,217,217,0.25)'] }}
                        transition={{ duration: 3.2, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute bottom-[11.5%] left-1/2 -translate-x-1/2 w-[980px] h-[70vh] pointer-events-none z-10"
                        style={{
                            background: 'conic-gradient(from 180deg at 50% 100%, transparent 41%, rgba(255,248,220,0.15) 47%, rgba(0,217,217,0.45) 50%, rgba(255,248,220,0.15) 53%, transparent 59%)',
                            clipPath: 'polygon(50% 100%, 32% 0%, 68% 0%)',
                            filter: 'blur(24px)',
                        }}
                        animate={{ opacity: [0.55, 0.85, 0.55] }}
                        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                    />

                    <div className="relative z-30 h-full flex flex-col items-center justify-center pt-28">
                        <div className="flex items-center justify-center gap-4 w-full px-2">
                            <motion.button
                                onClick={goPrev}
                                className="pointer-events-auto w-10 h-10 border border-[#00d9d9]/50 rounded-full flex items-center justify-center text-[#00d9d9] bg-black/40 backdrop-blur-md"
                                whileHover={{ scale: 1.1, boxShadow: '0 0 24px rgba(0,217,217,0.45)' }}
                                whileTap={{ scale: 0.92 }}
                            >
                                <ChevronLeft size={18} />
                            </motion.button>

                            <motion.button
                                onClick={() => setSelectedEvent(activeIdx)}
                                className="relative w-[min(86vw,340px)] h-[min(132vw,520px)] border border-[#00d9d9]/45 rounded-sm overflow-hidden bg-[#02070a]/95 pointer-events-auto"
                                animate={{ y: [0, -16, 0] }}
                                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                                whileHover={{ scale: 1.015, boxShadow: '0 0 45px rgba(0,217,217,0.35)' }}
                            >
                                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0,217,217,0.15), transparent 32%, rgba(0,0,0,0.65) 68%, rgba(0,0,0,0.94) 100%)' }} />
                                <div className="absolute inset-0 pointer-events-none" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.05) 2px, rgba(0,255,255,0.05) 3px)' }} />
                                <Image src={activeEvent.image} alt={activeEvent.title} fill className="object-contain object-top p-2 pt-1" referrerPolicy="no-referrer" />
                                <div className="absolute inset-x-0 bottom-0 p-4 text-left bg-gradient-to-t from-[#02070a] via-[#02070a]/96 to-transparent border-t border-[#00d9d9]/20">
                                    <div className="text-[9px] font-mono tracking-[0.28em] text-[#00d9d9]/70 uppercase">{activeEvent.id} / Central</div>
                                    <div className="text-2xl font-mono font-semibold text-[#fff8dc] uppercase leading-[0.92] mt-1">{activeEvent.title}</div>
                                    <div className="text-[11px] font-mono text-[#fff8dc]/75 mt-2 line-clamp-2 leading-snug">{activeEvent.description}</div>
                                    <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-[10px] font-mono uppercase tracking-[0.1em]">
                                        <div className="text-[#00d9d9]/80">{activeEvent.date}</div>
                                        <div className="text-right text-[#00d9d9]/80">{activeEvent.location}</div>
                                        <div className="col-span-2 text-right text-[#d4af37]">{CENTRAL_EVENT_FEES[activeEvent.id] || 'Fee at desk'}</div>
                                    </div>
                                </div>
                                <div className="absolute top-3 left-3 w-3 h-3 border-l border-t border-[#d4af37]/60" />
                                <div className="absolute top-3 right-3 w-3 h-3 border-r border-t border-[#d4af37]/60" />
                                <div className="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-[#d4af37]/60" />
                                <div className="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-[#d4af37]/60" />
                            </motion.button>

                            <motion.button
                                onClick={goNext}
                                className="pointer-events-auto w-10 h-10 border border-[#00d9d9]/50 rounded-full flex items-center justify-center text-[#00d9d9] bg-black/40 backdrop-blur-md"
                                whileHover={{ scale: 1.1, boxShadow: '0 0 24px rgba(0,217,217,0.45)' }}
                                whileTap={{ scale: 0.92 }}
                            >
                                <ChevronRight size={18} />
                            </motion.button>
                        </div>

                        <div className="mt-5 w-full px-3">
                            <div className="flex items-center justify-start gap-2 overflow-x-auto no-scrollbar pb-2" style={{ touchAction: 'pan-y' }}>
                                {CENTRAL_EVENTS.map((evt, idx) => (
                                    <button
                                        key={evt.id}
                                        type="button"
                                        onClick={() => setActiveIdx(idx)}
                                        className={`px-3 py-1.5 rounded-full border font-mono text-[10px] tracking-[0.15em] uppercase whitespace-nowrap transition-all ${idx === activeIdx
                                            ? 'border-[#00d9d9] text-[#00d9d9] bg-[#00d9d9]/12 shadow-[0_0_20px_rgba(0,217,217,0.25)]'
                                            : 'border-[#008080]/35 text-[#008080] bg-black/30 hover:border-[#00d9d9]/50 hover:text-[#00d9d9]/80'
                                            }`}
                                    >
                                        {evt.title}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <div className="relative w-full h-full flex flex-row overflow-hidden">

                        {/* ΓûîLEFT PANEL ΓÇö 38% */}
                        <div className="relative hidden md:flex md:w-[38%] h-full shrink-0 flex-col justify-center z-10 overflow-hidden">

                            {/* Layered background effects */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#020810] via-[#020810] to-transparent" />
                            {/* CRT scan-lines */}
                            <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,255,255,0.08) 1px, rgba(0,255,255,0.08) 2px)' }} />
                            {/* Holographic noise grid */}
                            <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,217,217,0.3) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                            {/* Ambient glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] rounded-full bg-[radial-gradient(ellipse,rgba(0,128,128,0.04)_0%,transparent_70%)] pointer-events-none" />

                            {/* Vertical glowing separator ΓÇö always visible */}
                            <div className="absolute right-0 top-[5%] bottom-[5%] w-px">
                                <div className="w-full h-full bg-gradient-to-b from-transparent via-[#008080]/30 to-transparent" />
                                <motion.div
                                    className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-[#00D9D9]/60 to-transparent"
                                    animate={{ top: ['0%', '85%', '0%'] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                                />
                            </div>
                            <div className="absolute right-0 top-[5%] bottom-[5%] w-[6px] bg-gradient-to-b from-transparent via-[#008080]/5 to-transparent blur-md" />

                            {/* Content */}
                            <div className="relative px-2 sm:px-4 md:px-10 lg:px-14 py-2 md:py-6 h-full flex flex-col justify-center">

                                {/* Phase label with animated decoration */}
                                <div className="text-[7px] md:text-[11px] font-mono tracking-[0.3em] md:tracking-[0.5em] text-[#008080]/60 mb-2 md:mb-5 uppercase flex items-center gap-2">
                                    <motion.span
                                        className="inline-block w-8 h-px"
                                        style={{ background: 'linear-gradient(90deg, transparent, #008080)' }}
                                        animate={{ opacity: [0.3, 0.8, 0.3] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                    />
                                    <span className="relative">
                                        CORE_EXHIBITS
                                        <motion.span
                                            className="absolute -bottom-1 left-0 right-0 h-px bg-[#008080]/20"
                                            animate={{ scaleX: [0, 1, 0] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                            style={{ transformOrigin: 'left' }}
                                        />
                                    </span>
                                </div>

                                {/* Title with holographic double-layer */}
                                <div className="mb-1 md:mb-8 relative">
                                    {/* Ghost duplicate for depth */}
                                    <h2
                                        className="absolute -left-[2px] -top-[1px] text-base sm:text-2xl md:text-5xl lg:text-6xl font-serif font-bold uppercase leading-[0.9] tracking-tight opacity-20 blur-[1px] select-none pointer-events-none"
                                        style={{
                                            fontFamily: 'var(--font-cinzel-decorative, serif)',
                                            color: '#00D9D9',
                                        }}
                                    >
                                        Central
                                    </h2>
                                    <h2
                                        className="relative text-base sm:text-2xl md:text-5xl lg:text-6xl font-serif font-bold uppercase leading-[0.9] tracking-tight"
                                        style={{
                                            fontFamily: 'var(--font-cinzel-decorative, serif)',
                                            color: '#f0d078',
                                            textShadow: '0 0 40px rgba(240,208,120,0.2), 0 2px 4px rgba(0,0,0,0.5)',
                                        }}
                                    >
                                        Central
                                    </h2>
                                    <h2
                                        className="text-sm sm:text-xl md:text-4xl lg:text-5xl font-serif font-bold uppercase leading-[0.9] tracking-tight mt-0.5 md:mt-1"
                                        style={{
                                            fontFamily: 'var(--font-cinzel-decorative, serif)',
                                            color: '#c9a84c',
                                            opacity: 0.7,
                                            textShadow: '0 0 25px rgba(201,168,76,0.15)',
                                        }}
                                    >
                                        Events
                                    </h2>
                                    {/* Decorative underline */}
                                    <div className="mt-3 flex items-center gap-2">
                                        <div className="h-px w-12 bg-gradient-to-r from-[#D4AF37]/50 to-transparent" />
                                        <div className="w-1.5 h-1.5 rotate-45 border border-[#D4AF37]/40" />
                                        <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-[#D4AF37]/20 to-transparent" />
                                    </div>
                                </div>

                                {/* Active event big number ΓÇö holographic ghost */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeIdx}
                                        className="absolute top-4 right-4 md:right-8 font-mono font-bold leading-none select-none pointer-events-none"
                                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -15, scale: 1.05 }}
                                        transition={{ duration: 0.35, ease: 'easeOut' }}
                                    >
                                        <span
                                            className="text-4xl md:text-8xl lg:text-[10rem] block"
                                            style={{
                                                color: 'transparent',
                                                WebkitTextStroke: '1px rgba(0,217,217,0.06)',
                                                textShadow: '0 0 40px rgba(0,217,217,0.04)',
                                            }}
                                        >
                                            {(activeIdx + 1).toString().padStart(2, '0')}
                                        </span>
                                    </motion.div>
                                </AnimatePresence>

                                {/* Event list with vertical rail */}
                                <div className="relative overflow-y-auto flex-1 no-scrollbar">
                                    {/* Vertical rail ΓÇö dashed */}
                                    <div
                                        className="absolute left-[10px] md:left-[12px] top-2 bottom-2 w-px"
                                        style={{
                                            backgroundImage: 'repeating-linear-gradient(180deg, rgba(0,128,128,0.2) 0px, rgba(0,128,128,0.2) 4px, transparent 4px, transparent 8px)',
                                        }}
                                    />

                                    {/* Active rail segment ΓÇö traveling glow */}
                                    <motion.div
                                        className="absolute left-[8px] md:left-[10px] w-[5px] rounded-full"
                                        animate={{
                                            top: `${activeIdx * (100 / CENTRAL_EVENTS.length)}%`,
                                        }}
                                        transition={{ type: 'spring', stiffness: 220, damping: 28 }}
                                        style={{
                                            height: `${100 / CENTRAL_EVENTS.length}%`,
                                            background: 'linear-gradient(180deg, transparent 5%, #00D9D9 50%, transparent 95%)',
                                            boxShadow: '0 0 12px rgba(0,217,217,0.6), 0 0 24px rgba(0,217,217,0.2)',
                                            filter: 'blur(0.5px)',
                                        }}
                                    />

                                    {/* Event rows */}
                                    <div ref={listRef} className="relative overflow-y-auto no-scrollbar">
                                        {CENTRAL_EVENTS.map((evt, i) => (
                                            <EventRow key={i} name={evt.title} index={i} isActive={i === activeIdx} onClick={() => setSelectedEvent(i)} />
                                        ))}
                                    </div>
                                </div>

                                {/* Bottom status bar */}
                                <div className="mt-4 md:mt-6 flex items-center gap-3 text-[8px] md:text-[9px] font-mono tracking-[0.3em] text-[#008080]/30 uppercase">
                                    <div className="flex items-center gap-1.5">
                                        <motion.div
                                            className="w-1.5 h-1.5 rounded-full bg-[#00D9D9]"
                                            animate={{ opacity: [0.3, 1, 0.3] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        />
                                        <span>LIVE</span>
                                    </div>
                                    <span className="text-[#008080]/15">|</span>
                                    <span>{(activeIdx + 1).toString().padStart(2, '0')}/{CENTRAL_EVENTS.length.toString().padStart(2, '0')}</span>
                                    <span className="text-[#008080]/15">|</span>
                                    <span>SYNC</span>
                                </div>
                            </div>
                        </div>

                        {/* ΓûîRIGHT PANEL ΓÇö flex-1 (FlyingPosters) */}
                        <div className="relative flex-1 h-full overflow-hidden">
                            {/* Subtle ambient glow behind posters */}
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,128,128,0.06)_0%,transparent_70%)] pointer-events-none z-0" />

                            <div className="w-full h-full opacity-90 mix-blend-screen">
                                <FlyingPosters
                                    ref={postersRef}
                                    items={items}
                                    planeWidth={isMobile ? 380 : 400}
                                    planeHeight={isMobile ? 480 : 500}
                                    distortion={0.5}
                                    scrollEase={0.05}
                                    cameraFov={40}
                                    cameraZ={35}
                                    onActiveIndex={setActiveIdx}
                                />
                            </div>

                            {/* Clickable overlay to open detail for active poster ΓÇö inherits pointerEvents from section */}
                            <div
                                className="absolute inset-0 z-10 cursor-pointer"
                                onClick={() => setSelectedEvent(activeIdx)}
                            />

                            {/* Corner frame decorations */}
                            <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-[#008080]/15 pointer-events-none z-20" />
                            <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-[#008080]/15 pointer-events-none z-20" />
                        </div>
                    </div>

                    {/* Scroll hint */}
                    <div className="absolute bottom-5 right-5 md:bottom-7 md:right-7 text-[#D4AF37] font-mono text-[7px] md:text-[8px] tracking-[0.25em] opacity-40 z-10 pointer-events-none hidden md:flex items-center gap-2 border border-[#D4AF37]/15 px-3 py-1.5 bg-[#020810]/60 backdrop-blur-sm">
                        <motion.svg
                            width="10" height="10" viewBox="0 0 10 10" className="opacity-60"
                            animate={{ y: [0, 2, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <path d="M5 1v8M2 6l3 3 3-3" stroke="#D4AF37" strokeWidth="1" fill="none" />
                        </motion.svg>
                        SCROLL TO PAN
                    </div>

                    {/* Top-left corner frame */}
                    <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-[#008080]/15 pointer-events-none z-20" />
                    <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-[#008080]/15 pointer-events-none z-20" />

                    {/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */}
                    {/* HOLOGRAPHIC PROJECTOR MODAL                                   */}
                    {/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */}
                </>
            )}

            <AnimatePresence>
                {selectedEvent !== null && (
                    <motion.div
                        className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none bg-black"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.9, ease: 'easeOut' }}
                        style={{ perspective: '2000px' } as any}
                    >
                        {/* Background click to close */}
                        <div className="absolute inset-0 pointer-events-auto" onClick={() => setSelectedEvent(null)} />

                        {/* 3D HUD PANELS */}
                        <div className="absolute inset-0 pointer-events-none hidden md:block" style={{ perspective: '2000px' }}>
                            {/* TOP LEFT */}
                            <motion.div
                                className="absolute top-[15%] left-[8%] w-44 h-28 border border-[#008080]/50 rounded-sm bg-[#041014]/60 backdrop-blur-md overflow-hidden"
                                style={{ transformStyle: 'preserve-3d', boxShadow: '0 0 30px rgba(0,128,128,0.3), inset 0 0 20px rgba(0,128,128,0.1)' }}
                                initial={{ opacity: 0, x: -100, y: -100 }}
                                animate={{ opacity: 1, x: 0, y: 0, rotateX: [0, 5, 0], rotateY: [-5, 0, -5] }}
                                transition={{ duration: 0.8, rotateX: { duration: 4, repeat: Infinity }, rotateY: { duration: 5, repeat: Infinity } }}
                            >
                                <div className="p-3 text-[9px] font-mono text-[#008080] tracking-widest uppercase">
                                    <div className="mb-2">[ DATA STREAM ]</div>
                                    <div className="opacity-60 text-[8px] space-y-1">
                                        <div>SYS: ACTIVE</div>
                                        <div>FREQ: 2.4GHz</div>
                                        <div>PKT: 1024MB</div>
                                    </div>
                                </div>
                            </motion.div>
                            {/* TOP RIGHT */}
                            <motion.div
                                className="absolute top-[15%] right-[8%] w-44 h-28 border border-[#D4AF37]/50 rounded-sm bg-[#041014]/60 backdrop-blur-md overflow-hidden"
                                style={{ transformStyle: 'preserve-3d', boxShadow: '0 0 30px rgba(212,175,55,0.3), inset 0 0 20px rgba(212,175,55,0.1)' }}
                                initial={{ opacity: 0, x: 100, y: -100 }}
                                animate={{ opacity: 1, x: 0, y: 0, rotateX: [0, 5, 0], rotateY: [5, 0, 5] }}
                                transition={{ duration: 0.8, rotateX: { duration: 4, repeat: Infinity }, rotateY: { duration: 5, repeat: Infinity } }}
                            >
                                <div className="p-3 text-[9px] font-mono text-[#D4AF37] tracking-widest uppercase">
                                    <div className="mb-2">[ SCAN RESULT ]</div>
                                    <div className="opacity-60 text-[8px] space-y-1">
                                        <div>SIGNAL: 98%</div>
                                        <div>TEMP: 42┬░C</div>
                                        <div>STATUS: OK</div>
                                    </div>
                                </div>
                            </motion.div>
                            {/* BOTTOM LEFT */}
                            <motion.div
                                className="absolute bottom-[15%] left-[8%] w-52 h-36 border border-[#008080]/50 rounded-sm bg-[#041014]/60 backdrop-blur-md overflow-hidden"
                                style={{ transformStyle: 'preserve-3d', boxShadow: '0 0 30px rgba(0,128,128,0.3), inset 0 0 20px rgba(0,128,128,0.1)' }}
                                initial={{ opacity: 0, x: -100, y: 100 }}
                                animate={{ opacity: 1, x: 0, y: 0, rotateX: [0, -5, 0], rotateY: [-5, 0, -5] }}
                                transition={{ duration: 0.8, rotateX: { duration: 4.5, repeat: Infinity }, rotateY: { duration: 5.5, repeat: Infinity } }}
                            >
                                <div className="p-3 text-[9px] font-mono text-[#008080] tracking-widest uppercase">
                                    <div className="mb-3">[ ARCHIVE LOG ]</div>
                                    <div className="opacity-60 text-[8px] space-y-2 font-mono">
                                        <div className="flex justify-between"><span>EVT-{CENTRAL_EVENTS[selectedEvent].id}</span><span>SYNCED</span></div>
                                        <div className="w-full h-1 border border-[#008080]/30 relative overflow-hidden">
                                            <motion.div className="h-full bg-gradient-to-r from-[#008080] to-transparent" animate={{ width: ['0%', '100%', '0%'] }} transition={{ duration: 3, repeat: Infinity }} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                            {/* BOTTOM RIGHT */}
                            <motion.div
                                className="absolute bottom-[15%] right-[8%] w-52 h-36 border border-[#D4AF37]/50 rounded-sm bg-[#041014]/60 backdrop-blur-md overflow-hidden"
                                style={{ transformStyle: 'preserve-3d', boxShadow: '0 0 30px rgba(212,175,55,0.3), inset 0 0 20px rgba(212,175,55,0.1)' }}
                                initial={{ opacity: 0, x: 100, y: 100 }}
                                animate={{ opacity: 1, x: 0, y: 0, rotateX: [0, -5, 0], rotateY: [5, 0, 5] }}
                                transition={{ duration: 0.8, rotateX: { duration: 4.5, repeat: Infinity }, rotateY: { duration: 5.5, repeat: Infinity } }}
                            >
                                <div className="p-3 text-[9px] font-mono text-[#D4AF37] tracking-widest uppercase">
                                    <div className="mb-3">[ HOLOGRAM STABLE ]</div>
                                    <div className="opacity-60 text-[8px] space-y-2">
                                        <div>RENDER: ON</div>
                                        <div>DEPTH: {(selectedEvent + 1) * 100}m</div>
                                        <div className="flex gap-2 mt-2">
                                            {[...Array(5)].map((_, i) => (
                                                <motion.div key={i} className="w-1 h-4 border border-[#D4AF37]/40 rounded-[1px]" animate={{ height: ['100%', '60%', '100%'] }} transition={{ duration: 0.4, delay: i * 0.1, repeat: Infinity }} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* PROJECTOR BASE */}
                        <motion.div
                            className="absolute bottom-[2vh] left-1/2 -translate-x-1/2 w-48 h-12 bg-gradient-to-b from-[#008080] to-[#004d40] blur-3xl opacity-70 z-10 rounded-[50%]"
                            initial={{ scale: 0.5 }}
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            style={{ transform: 'rotateX(80deg)' }}
                        />

                        {/* PROJECTOR BEAM */}
                        <motion.div
                            className="absolute bottom-[-10vh] left-1/2 -translate-x-1/2 w-full h-[120vh] pointer-events-none z-[11]"
                            style={{
                                background: `conic-gradient(from 180deg at 50% 100%, transparent 45%, rgba(255,248,220,0.1) 48%, rgba(0,128,128,0.4) 50%, rgba(255,248,220,0.1) 52%, transparent 55%)`,
                                clipPath: `polygon(50% 100%, 30% 0%, 70% 0%)`,
                                filter: 'blur(30px)',
                            }}
                            initial={{ opacity: 0, scaleY: 0 }}
                            animate={{ opacity: 1, scaleY: 1 }}
                            transition={{ delay: 0.3, duration: 1.2 }}
                        />

                        {/* RESONANCE FIELD RINGS */}
                        <div className="absolute inset-0 z-[15] pointer-events-none flex items-center justify-center">
                            <motion.div
                                className="absolute w-[46vw] h-[46vw] max-w-[680px] max-h-[680px] rounded-full border border-[#008080]/30"
                                animate={{ scale: [0.92, 1.04, 0.92], opacity: [0.2, 0.55, 0.2] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                            />
                            <motion.div
                                className="absolute w-[34vw] h-[34vw] max-w-[520px] max-h-[520px] rounded-full border border-[#D4AF37]/35"
                                animate={{ scale: [1.06, 0.94, 1.06], opacity: [0.15, 0.45, 0.15] }}
                                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                            />
                            <motion.div
                                className="absolute w-[52vw] h-[52vw] max-w-[760px] max-h-[760px]"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            >
                                <div className="absolute top-[6%] left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.9)]" />
                                <div className="absolute bottom-[18%] left-[14%] w-[7px] h-[7px] rounded-full bg-[#00A6A6] shadow-[0_0_12px_rgba(0,166,166,0.9)]" />
                                <div className="absolute bottom-[22%] right-[16%] w-[6px] h-[6px] rounded-full bg-[#008080] shadow-[0_0_12px_rgba(0,128,128,0.9)]" />
                            </motion.div>

                            {/* Horizontal laser lines */}
                            <motion.div
                                className="absolute left-[20%] top-1/2 -translate-y-1/2 h-px w-[18vw] max-w-[280px] bg-gradient-to-r from-transparent via-[#008080]/60 to-[#008080]/10"
                                animate={{ opacity: [0.15, 0.7, 0.15], scaleX: [0.92, 1.06, 0.92] }}
                                transition={{ duration: 2.8, repeat: Infinity }}
                            />
                            <motion.div
                                className="absolute right-[20%] top-1/2 -translate-y-1/2 h-px w-[18vw] max-w-[280px] bg-gradient-to-l from-transparent via-[#D4AF37]/70 to-[#D4AF37]/10"
                                animate={{ opacity: [0.2, 0.75, 0.2], scaleX: [0.9, 1.08, 0.9] }}
                                transition={{ duration: 3.1, repeat: Infinity }}
                            />
                        </div>

                        {/* INTERACTIVE HUD & NAV */}
                        <div className="relative flex flex-col items-center gap-2 md:gap-0 z-20 w-full px-3 md:px-0">
                            {/* MOBILE: Center-edge nav controls */}
                            <div className="md:hidden absolute inset-0 pointer-events-none">
                                <motion.button
                                    onClick={(e) => { e.stopPropagation(); setSelectedEvent(prev => prev! === 0 ? CENTRAL_EVENTS.length - 1 : prev! - 1); }}
                                    className="pointer-events-auto absolute left-1 top-1/2 -translate-y-1/2 w-11 h-11 border border-[#008080]/55 rounded-full flex items-center justify-center text-[#00d9d9] bg-black/55 backdrop-blur-sm"
                                    whileTap={{ scale: 0.85 }}
                                >
                                    <ChevronLeft size={18} />
                                </motion.button>
                                <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-[#008080] tracking-widest">
                                    {String((selectedEvent ?? 0) + 1).padStart(2, '0')} / {String(CENTRAL_EVENTS.length).padStart(2, '0')}
                                </span>
                                <motion.button
                                    onClick={(e) => { e.stopPropagation(); setSelectedEvent(prev => (prev! + 1) % CENTRAL_EVENTS.length); }}
                                    className="pointer-events-auto absolute right-1 top-1/2 -translate-y-1/2 w-11 h-11 border border-[#008080]/55 rounded-full flex items-center justify-center text-[#00d9d9] bg-black/55 backdrop-blur-sm"
                                    whileTap={{ scale: 0.85 }}
                                >
                                    <ChevronRight size={18} />
                                </motion.button>
                            </div>

                            {/* Desktop: side nav + card */}
                            <div className="flex items-center justify-center gap-4 md:gap-16 w-full">
                                {/* PREV */}
                                <motion.button
                                    onClick={(e) => { e.stopPropagation(); setSelectedEvent(prev => prev! === 0 ? CENTRAL_EVENTS.length - 1 : prev! - 1); }}
                                    className="hidden md:flex pointer-events-auto w-12 h-12 md:w-14 md:h-14 border-2 border-[#008080]/50 rounded-full items-center justify-center text-[#008080] hover:text-[#FFF8DC] hover:border-[#FFF8DC] transition-all bg-black/50 backdrop-blur-md group"
                                    whileHover={{ scale: 1.15, boxShadow: '0 0 20px rgba(0,128,128,0.6)' }}
                                    whileTap={{ scale: 0.85 }}
                                >
                                    <div className="text-[10px] font-mono absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest text-[#008080]">PREV</div>
                                    <ChevronLeft size={24} />
                                </motion.button>

                                {/* THE PROJECTED CARD */}
                                <motion.div
                                    className="relative w-[min(94vw,650px)] h-[min(150vw,700px)] max-h-[85vh] pointer-events-auto flex items-center justify-center shadow-[0_0_200px_rgba(0,128,128,0.3)] overflow-hidden"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6 }}
                                    style={{
                                        maskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
                                        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
                                        transformStyle: 'preserve-3d'
                                    }}
                                >
                                    <CentralSwipeableInfo
                                        events={CENTRAL_EVENTS}
                                        activeIndex={selectedEvent}
                                        setActiveIndex={setSelectedEvent}
                                        onOpenRulebook={(ev) => setRulebookEvent(ev)}
                                    />
                                </motion.div>

                                {/* NEXT */}
                                <motion.button
                                    onClick={(e) => { e.stopPropagation(); setSelectedEvent(prev => (prev! + 1) % CENTRAL_EVENTS.length); }}
                                    className="hidden md:flex pointer-events-auto w-12 h-12 md:w-14 md:h-14 border-2 border-[#008080]/50 rounded-full items-center justify-center text-[#008080] hover:text-[#FFF8DC] hover:border-[#FFF8DC] transition-all bg-black/50 backdrop-blur-md group"
                                    whileHover={{ scale: 1.15, boxShadow: '0 0 20px rgba(0,128,128,0.6)' }}
                                    whileTap={{ scale: 0.85 }}
                                >
                                    <div className="text-[10px] font-mono absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest text-[#008080]">NEXT</div>
                                    <ChevronRight size={24} />
                                </motion.button>
                            </div>
                        </div>

                        {/* Particles & Data Streams */}
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={`p-${i}`}
                                className="absolute"
                                style={{
                                    width: Math.random() > 0.8 ? '1px' : '2px',
                                    height: Math.random() > 0.8 ? '15px' : '2px',
                                    backgroundColor: Math.random() > 0.3 ? '#008080' : '#D4AF37',
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    boxShadow: `0 0 ${4 + Math.random() * 8}px ${Math.random() > 0.3 ? '#008080' : '#D4AF37'}`,
                                }}
                                animate={{ y: [0, -300 - Math.random() * 400], opacity: [0, 0.8, 0], scale: [0.5, 1, 0.5] }}
                                transition={{ duration: 4 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 10, ease: 'linear' }}
                            />
                        ))}

                        {/* Glitch Fragments */}
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={`g-${i}`}
                                className="absolute w-4 h-[1px] bg-[#008080]/40"
                                style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                                animate={{ opacity: [0, 1, 0, 0.8, 0], x: [0, 10, -5, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 + Math.random() * 5 }}
                            />
                        ))}

                        {/* Central Glow */}
                        <motion.div
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
                            style={{ background: 'radial-gradient(circle, rgba(0,128,128,0.2) 0%, transparent 70%)', filter: 'blur(40px)' }}
                            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />

                        {/* HUD Rotating Circle */}
                        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                            <motion.div
                                className="relative w-[75vw] md:w-[700px] h-[700px]"
                                style={{ border: '1px solid rgba(0,128,128,0.15)', borderRadius: '50%' }}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
                            >
                                <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[9px] text-[#008080] font-mono tracking-widest opacity-40">[ ACTIVE ]</div>
                                <div className="absolute top-1/2 right-0 -translate-y-1/2 text-[9px] text-[#008080] font-mono tracking-widest opacity-40">[ SYNC ]</div>
                            </motion.div>
                        </div>

                        {/* Close Button */}
                        <motion.button
                            onClick={() => setSelectedEvent(null)}
                            className="absolute top-4 left-4 md:top-12 md:left-12 z-[200] pointer-events-auto text-[#008080] hover:text-[#D4AF37] transition-colors p-3 md:p-4 border border-[#008080]/30 rounded-full hover:border-[#D4AF37]/60 bg-black/60 backdrop-blur-sm"
                            whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(0,128,128,0.4)' }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <X size={22} />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Holographic Rulebook Overlay */}
            <AnimatePresence>
                {rulebookEvent && (
                    <HolographicRulebook event={rulebookEvent} onClose={() => setRulebookEvent(null)} />
                )}
            </AnimatePresence>
        </motion.div>
    );
}

/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */
/* SWIPEABLE INFO CARD FOR CENTRAL EVENTS                        */
/* ΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉΓòÉ */
function CentralSwipeableInfo({
    events,
    activeIndex,
    setActiveIndex,
    onOpenRulebook,
}: {
    events: typeof CENTRAL_EVENTS;
    activeIndex: number;
    setActiveIndex: (i: number) => void;
    onOpenRulebook: (ev: (typeof CENTRAL_EVENTS)[number]) => void;
}) {
    const [[page, direction], setPage] = useState([activeIndex, 0]);

    useEffect(() => {
        if (activeIndex !== page) {
            setPage([activeIndex, activeIndex > page ? 1 : -1]);
        }
    }, [activeIndex, page]);

    const paginate = (newDirection: number) => {
        let nextIndex = page + newDirection;
        if (nextIndex < 0) nextIndex = events.length - 1;
        if (nextIndex >= events.length) nextIndex = 0;
        setPage([nextIndex, newDirection]);
        setActiveIndex(nextIndex);
    };

    const variants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 200 : -200,
            opacity: 0,
            scale: 0.7,
            rotateY: dir > 0 ? 60 : -60,
            rotateX: dir > 0 ? -10 : 10,
            y: dir > 0 ? 50 : -50,
        }),
        center: { zIndex: 1, x: 0, opacity: 1, scale: 1, rotateY: 0, rotateX: 0, y: 0 },
        exit: (dir: number) => ({
            zIndex: 0,
            x: dir < 0 ? 200 : -200,
            opacity: 0,
            scale: 0.7,
            rotateY: dir < 0 ? 60 : -60,
            rotateX: dir < 0 ? -10 : 10,
            y: dir < 0 ? 50 : -50,
        }),
    };

    return (
        <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1200px' }}>
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={page}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: 'spring', stiffness: 250, damping: 25 },
                        y: { type: 'spring', stiffness: 250, damping: 25 },
                        scale: { type: 'spring', stiffness: 250, damping: 25 },
                        rotateY: { type: 'spring', stiffness: 250, damping: 25 },
                        rotateX: { type: 'spring', stiffness: 250, damping: 25 },
                        opacity: { duration: 0.3 },
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.4}
                    onDragEnd={(_e: any, { offset }: any) => {
                        if (offset.x < -40) paginate(1);
                        else if (offset.x > 40) paginate(-1);
                    }}
                    className="absolute w-full h-full md:w-[600px] md:h-[650px] bg-[#020608] border-2 border-[#008080]/50 rounded-sm overflow-hidden flex flex-col cursor-grab active:cursor-grabbing shadow-[0_0_80px_rgba(0,128,128,0.4)] hover:shadow-[0_0_120px_rgba(0,128,128,0.6)] transition-shadow overflow-y-auto no-scrollbar"
                    style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
                    whileHover={{ boxShadow: '0 0 120px rgba(0,128,128,0.6), inset 0 0 40px rgba(0,128,128,0.1)' }}
                >
                    {/* Animated border glow */}
                    <motion.div
                        className="absolute inset-0 rounded-sm pointer-events-none"
                        style={{
                            border: '1px solid transparent',
                            borderImageSource: 'linear-gradient(135deg, #008080, #D4AF37, #008080)',
                            borderImageSlice: 1,
                            boxShadow: 'inset 0 0 30px rgba(0,128,128,0.2)',
                        }}
                        animate={{ boxShadow: ['inset 0 0 30px rgba(0,128,128,0.2)', 'inset 0 0 50px rgba(0,128,128,0.4)', 'inset 0 0 30px rgba(0,128,128,0.2)'] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />

                    {/* Image area */}
                    <div className="relative w-full h-[38%] md:h-[45%] shrink-0 overflow-hidden bg-black/40 border-b border-[#008080]/30">
                        <motion.div initial={{ scale: 1 }} whileHover={{ scale: 1.15 }} transition={{ duration: 0.5 }} className="w-full h-full">
                            <Image
                                src={events[page].image}
                                alt={events[page].title}
                                fill
                                className="object-contain"
                                referrerPolicy="no-referrer"
                            />
                        </motion.div>
                        <div className={`absolute inset-0 bg-gradient-to-br ${events[page].color} mix-blend-overlay opacity-40`} />
                        <div className="absolute inset-0 bg-[#008080]/20 mix-blend-color" />
                        <motion.div
                            className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#020608] to-transparent"
                            animate={{ height: ['64px', '80px', '64px'] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0"
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>

                    {/* Content area */}
                    <motion.div
                        className="px-4 md:px-10 py-3 md:py-6 flex-1 flex flex-col justify-start text-left min-h-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <motion.div
                            className="text-[11px] md:text-[12px] font-mono text-[#008080] mb-2 font-bold tracking-[0.5em] uppercase"
                            animate={{ textShadow: ['0 0 10px rgba(0,128,128,0.3)', '0 0 20px rgba(0,128,128,0.6)', '0 0 10px rgba(0,128,128,0.3)'] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            {events[page].id} // EXHIBIT
                        </motion.div>

                        <motion.h2
                            className="text-2xl md:text-4xl font-mono font-bold text-[#FFF8DC] tracking-tighter uppercase mb-1 leading-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            {events[page].title}
                        </motion.h2>

                        <motion.p
                            className="font-mono text-[11px] md:text-[12px] text-[#FFF8DC]/80 leading-relaxed mt-3 mb-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            {events[page].description}
                        </motion.p>

                        <motion.h3
                            className="text-[10px] md:text-[11px] font-mono tracking-[0.35em] text-[#D4AF37] uppercase mb-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            {events[page].subtitle}
                        </motion.h3>

                        <motion.div
                            className="mt-auto border-t border-[#008080]/30 pt-3 md:pt-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            <div className="grid grid-cols-2 gap-3 md:gap-8 mb-4">
                                <motion.div className="text-left" whileHover={{ x: 5 }}>
                                    <div className="text-[9px] text-[#008080] tracking-widest uppercase mb-1 font-bold">Time Log</div>
                                    <div className="text-[10px] md:text-[11px] text-[#FFF8DC] font-mono">{events[page].date}</div>
                                </motion.div>
                                <motion.div className="text-left" whileHover={{ x: 5 }}>
                                    <div className="text-[9px] text-[#008080] tracking-widest uppercase mb-1 font-bold">Sector</div>
                                    <div className="text-[10px] md:text-[11px] text-[#FFF8DC] font-mono">{events[page].location}</div>
                                </motion.div>
                            </div>

                            <motion.button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goToCentralRegistration(events[page]);
                                }}
                                className="w-full relative overflow-hidden group mb-2"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <motion.div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background: 'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.24) 50%, transparent 100%)',
                                    }}
                                    animate={{ x: ['-100%', '100%'] }}
                                    transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                                />
                                <div className="relative border border-[#D4AF37] py-3.5 px-4 flex items-center justify-between bg-[#D4AF37]/25 shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:bg-[#D4AF37]/35 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <motion.div
                                            className="w-5 h-5 border-2 border-[#D4AF37] flex items-center justify-center"
                                            animate={{ rotateY: [0, 180, 360] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                        >
                                            <div className="w-2.5 h-2.5 bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
                                        </motion.div>
                                        <span className="text-[11px] md:text-[13px] font-mono tracking-[0.24em] md:tracking-[0.4em] text-[#FFF8DC] uppercase font-black drop-shadow-lg">REGISTER NOW</span>
                                    </div>
                                    <span className="text-[10px] md:text-[11px] font-mono font-bold text-[#D4AF37] bg-black/40 px-2 py-0.5 rounded-sm">{CENTRAL_EVENT_FEES[events[page].id] || 'Fee at desk'}</span>
                                </div>
                            </motion.button>

                            <motion.button
                                type="button"
                                className="w-full relative overflow-hidden group mb-2"
                                onClick={(e) => { e.stopPropagation(); onOpenRulebook(events[page]); }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <motion.div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{
                                        background: 'linear-gradient(90deg, transparent 0%, rgba(0,128,128,0.15) 50%, transparent 100%)',
                                    }}
                                    animate={{ x: ['-100%', '100%'] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                                />
                                <div className="relative border border-[#00FFFF]/50 group-hover:border-[#D4AF37]/90 transition-all duration-300 py-3.5 px-4 flex items-center justify-between bg-black/40 group-hover:bg-[#D4AF37]/10">
                                    <div className="flex items-center gap-3">
                                        <motion.div
                                            className="w-5 h-5 border-2 border-[#00FFFF]/70 group-hover:border-[#D4AF37] transition-colors flex items-center justify-center"
                                            animate={{ rotateY: [0, 180, 360] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                                        >
                                            <div className="w-2.5 h-2.5 bg-[#00FFFF] group-hover:bg-[#D4AF37] transition-colors shadow-[0_0_8px_rgba(0,255,255,0.6)]" />
                                        </motion.div>
                                        <span className="text-[11px] md:text-[13px] font-mono tracking-[0.2em] md:tracking-[0.4em] text-[#00FFFF] group-hover:text-[#FFF8DC] transition-colors uppercase font-black drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">ACCESS RULE BOOK</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 opacity-80">
                                        {[...Array(3)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="w-[3px] bg-[#00FFFF] group-hover:bg-[#D4AF37] transition-colors"
                                                animate={{ height: ['8px', '20px', '8px'] }}
                                                transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    {/* Animated corner accents */}
                    <motion.div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#D4AF37]/70 rounded-sm" animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }} transition={{ duration: 2.5, repeat: Infinity }} />
                    <motion.div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#D4AF37]/70 rounded-sm" animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }} />
                    <motion.div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#D4AF37]/70 rounded-sm" animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.4 }} />
                    <motion.div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#D4AF37]/70 rounded-sm" animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.6 }} />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

// --- HOLOGRAPHIC RULEBOOK ---
function HolographicRulebook({
    event,
    onClose,
}: {
    event: (typeof CENTRAL_EVENTS)[number];
    onClose: () => void;
}) {
    const [phase, setPhase] = useState<'boot' | 'decrypt' | 'live'>('boot');
    const [revealedRules, setRevealedRules] = useState<number>(0);
    const [activeRule, setActiveRule] = useState<number | null>(null);

    useEffect(() => {
        const t1 = setTimeout(() => setPhase('decrypt'), 300);
        const t2 = setTimeout(() => setPhase('live'), 700);
        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);

    useEffect(() => {
        if (phase !== 'live') return;
        let i = 0;
        const interval = setInterval(() => {
            i += 1;
            setRevealedRules(i);
            if (i >= (event.rules?.length || 0)) clearInterval(interval);
        }, 260);
        return () => clearInterval(interval);
    }, [phase, event.rules?.length]);

    return (
        <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
        >
            <motion.div
                className="absolute inset-0 bg-black/95 backdrop-blur-md"
                onClick={onClose}
            />

            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,128,128,0.08) 0%, transparent 70%)' }} />
            </div>

            <motion.div
                className="absolute inset-x-0 h-[1px] bg-[#00FFFF]/10 pointer-events-none z-10"
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                style={{ boxShadow: '0 0 12px #00FFFF' }}
            />

            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(#00FFFF 1px, transparent 1px), linear-gradient(90deg, #00FFFF 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />

            <motion.div
                className="relative z-20 w-full max-w-4xl max-h-full overflow-hidden"
                initial={{ scale: 0.6, rotateX: 40, opacity: 0, y: 60 }}
                animate={{ scale: 1, rotateX: 0, opacity: 1, y: 0 }}
                exit={{ scale: 0.5, rotateX: -30, opacity: 0, y: -80 }}
                transition={{ type: 'spring', stiffness: 90, damping: 18 }}
                style={{ perspective: '1600px', transformStyle: 'preserve-3d' }}
            >
                <div className="flex flex-col bg-[#020c0c]/98 border border-[#008080]/60 rounded-sm">
                    <div className="border-b border-[#008080]/60 p-4 md:p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 md:w-10 md:h-10 border border-[#008080] flex items-center justify-center text-[#008080] font-mono font-bold text-xs">RB</div>
                            <div>
                                <div className="text-[10px] font-mono text-[#008080] tracking-[0.5em] uppercase">DIRECTIVE FILE</div>
                                <div className="text-sm md:text-xl font-mono font-bold text-[#FFF8DC] uppercase tracking-wider">{event.title} // RULE PROTOCOL</div>
                            </div>
                        </div>
                        <motion.button onClick={onClose} className="p-2 border border-[#008080]/40 text-[#008080] hover:text-[#D4AF37] hover:border-[#D4AF37]/60" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <X size={20} />
                        </motion.button>
                    </div>

                    <div className="p-4 md:p-8 overflow-y-auto custom-scrollbar max-h-[60vh]">
                        {phase === 'live' && event.rules.map((rule: string, idx: number) => (
                            <motion.div key={idx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: idx < revealedRules ? 1 : 0, x: idx < revealedRules ? 0 : 20 }} transition={{ duration: 0.4 }} className="mb-4">
                                <div className={`p-4 border transition-all ${activeRule === idx ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-[#008080]/20 bg-black/40'}`} onClick={() => setActiveRule(activeRule === idx ? null : idx)}>
                                    <div className="flex items-start gap-4">
                                        <div className={`w-6 h-6 border flex items-center justify-center text-[10px] font-mono ${activeRule === idx ? 'border-[#D4AF37] text-[#D4AF37]' : 'border-[#008080]/40 text-[#008080]'}`}>{String(idx + 1).padStart(2, '0')}</div>
                                        <p className={`text-xs md:text-sm font-mono leading-relaxed ${activeRule === idx ? 'text-[#FFF8DC]' : 'text-[#FFF8DC]/70'}`}>{rule}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="p-3 md:p-4 border-t border-[#008080]/60 flex items-center justify-between bg-[#010a0a]">
                        <div className="text-[9px] font-mono text-[#008080]/50 tracking-[0.3em] uppercase">CLASSIFIED_PROTOCOL // {event.id}</div>
                        {event.rulebook && (
                            <motion.a href={event.rulebook} download className="flex items-center gap-2 px-3 py-1.5 border border-[#D4AF37]/50 text-[#D4AF37] text-[10px] font-mono uppercase bg-[#D4AF37]/5 hover:bg-[#D4AF37]/15">
                                <Download size={14} /> Download Rulebook
                            </motion.a>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
