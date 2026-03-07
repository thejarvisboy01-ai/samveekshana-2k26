'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LogoImage from 'next/image';

// Completely unique preloader cards — using actual event posters
const LOADER_CARDS = [
    { symbol: '💻', label: 'COMPUTER SCIENCE', accent: '#008080', imgPath: '/CSE.png' },
    { symbol: '🎨', label: 'BCA / MCA', accent: '#D4AF37', imgPath: '/BCA.png' },
    { symbol: '🤖', label: 'AI & DS', accent: '#B87333', imgPath: '/ai.png' },
    { symbol: '📱', label: 'UI/UX DESIGN', accent: '#006666', imgPath: '/event_posters_compressed/ui ux.png' },
    { symbol: '🎮', label: 'VALORANT', accent: '#8B6508', imgPath: '/event_posters_compressed/valorant.png' },
    { symbol: '🛰️', label: 'ELECTRONICS', accent: '#008080', imgPath: '/EC.png' },
    { symbol: '⚡', label: 'ELECTRICAL', accent: '#D4AF37', imgPath: '/EEE.png' },
    { symbol: '🏗️', label: 'CIVIL', accent: '#006666', imgPath: '/civil.png' },
    { symbol: '⚙️', label: 'MECHANICAL', accent: '#B87333', imgPath: '/mech.png' },
    { symbol: '🏆', label: 'CENTRAL EVENTS', accent: '#008080', imgPath: '/centeral events .png' },
    { symbol: '🚩', label: 'CAPTURE THE FLAG', accent: '#D4AF37', imgPath: '/event_posters_compressed/capture the flag.png' },
    { symbol: '🎯', label: 'TAMBOLA', accent: '#B87333', imgPath: '/event_posters_compressed/tambola.png' },
];

const ASSETS_TO_PRELOAD = [
    '/logo.png',
    '/CSE.png',
    '/BCA.png',
    '/ai.png',
    '/EC.png',
    '/EEE.png',
    '/civil.png',
    '/mech.png',
    '/centeral events .png',
    ...Array.from({ length: 16 }, (_, i) => `/frames/frame_${String(i + 1).padStart(3, '0')}.png`)
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
    const [isVisible, setIsVisible] = useState(true);
    const [isExiting, setIsExiting] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);
    const [fallingCards, setFallingCards] = useState<{ id: number; cardIndex: number }[]>([]);
    const nextIdRef = useRef(0);
    const lastCardIndexRef = useRef(-1);
    const isExitingRef = useRef(false);

    // ── Continuous card loop (runs independently of progress) ──────────────
    useEffect(() => {
        const addCard = () => {
            if (isExitingRef.current) return;
            const id = nextIdRef.current++;
            const cardIndex = (lastCardIndexRef.current + 1) % LOADER_CARDS.length;
            lastCardIndexRef.current = cardIndex;

            setFallingCards(prev => {
                // Keep at most 12 cards in the deck to avoid memory bloat
                const trimmed = prev.length >= 12 ? prev.slice(1) : prev;
                return [...trimmed, { id, cardIndex }];
            });
        };

        // Seed with first 3 cards immediately
        for (let i = 0; i < 3; i++) addCard();

        // Then add one every 600 ms — keeps the animation alive the whole time
        const interval = setInterval(addCard, 600);
        return () => clearInterval(interval);
    }, []);

    // ── Real asset loading ─────────────────────────────────────────────────
    useEffect(() => {
        const MAX_MS = 60_000; // 60-second hard cap
        let settled = false;

        const finish = () => {
            if (settled) return;
            settled = true;
            // Animate to 100 % smoothly then exit
            setLoadProgress(100);
        };

        // Hard cap timeout
        const capTimer = setTimeout(finish, MAX_MS);

        // Track individual image loads
        let loadedCount = 0;
        const total = ASSETS_TO_PRELOAD.length;

        const onAsset = () => {
            loadedCount++;
            const raw = loadedCount / total;
            // Map real load progress to 0–85 %; the last 15 % are filled after document ready
            setLoadProgress(prev => Math.max(prev, Math.round(raw * 85)));
            if (loadedCount >= total) checkReady();
        };

        ASSETS_TO_PRELOAD.forEach(src => {
            const img = new Image();
            img.onload = onAsset;
            img.onerror = onAsset; // errors count as done
            img.src = src;
        });

        // After images, wait for document to be fully interactive
        const checkReady = () => {
            if (document.readyState === 'complete') {
                // Give the browser one more frame to paint, then wrap up
                requestAnimationFrame(() => {
                    setLoadProgress(prev => Math.max(prev, 90));
                    setTimeout(finish, 500);
                });
            } else {
                const handler = () => {
                    if (document.readyState === 'complete') {
                        document.removeEventListener('readystatechange', handler);
                        requestAnimationFrame(() => {
                            setLoadProgress(prev => Math.max(prev, 90));
                            setTimeout(finish, 500);
                        });
                    }
                };
                document.addEventListener('readystatechange', handler);
            }
        };

        return () => clearTimeout(capTimer);
    }, []);

    // ── Smoothly fill remaining 10–100 % once loadProgress hits 90 ─────────
    useEffect(() => {
        if (loadProgress >= 90 && loadProgress < 100) {
            const interval = setInterval(() => {
                setLoadProgress(prev => {
                    if (prev >= 100) { clearInterval(interval); return 100; }
                    return prev + 1;
                });
            }, 30);
            return () => clearInterval(interval);
        }
    }, [loadProgress]);

    // ── Exit when 100 % ────────────────────────────────────────────────────
    useEffect(() => {
        if (loadProgress >= 100 && !isExiting) {
            isExitingRef.current = true;
            setIsExiting(true);
            setTimeout(() => {
                setIsVisible(false);
                setTimeout(onComplete, 600);
            }, 800);
        }
    }, [loadProgress, isExiting, onComplete]);


    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center"
                    style={{ background: '#020405' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                        backgroundImage: 'radial-gradient(#008080 1px, transparent 1px)',
                        backgroundSize: '30px 30px',
                    }} />

                    {/* Radial glow */}
                    <div className="absolute inset-0" style={{
                        background: 'radial-gradient(ellipse at center, rgba(0,128,128,0.06) 0%, transparent 55%)',
                    }} />

                    <div className="flex flex-col items-center">
                        {/* ===== LARGE DECK BOX ===== */}
                        <motion.div
                            className="relative"
                            style={{ width: '280px', height: '200px' }}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                        >
                            {/* BACK WALL */}
                            <div className="absolute inset-0 rounded-lg" style={{
                                background: 'linear-gradient(180deg, #0c2222 0%, #081919 40%, #0a1e1e 100%)',
                                border: '2px solid rgba(0,128,128,0.3)',
                                zIndex: 1,
                            }}>
                                {/* Crosshatch pattern */}
                                <div className="absolute inset-0 rounded-lg opacity-25" style={{
                                    backgroundImage: `
                    repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(0,128,128,0.06) 12px, rgba(0,128,128,0.06) 13px),
                    repeating-linear-gradient(-45deg, transparent, transparent 12px, rgba(212,175,55,0.03) 12px, rgba(212,175,55,0.03) 13px)
                  `,
                                }} />
                                {/* Center emblem */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="text-center opacity-30">
                                        <div className="relative w-16 h-16 mx-auto mb-3">
                                            <div className="absolute inset-0 border-2 border-[#D4AF37]/25 rotate-45" />
                                            <div className="absolute inset-2 border border-[#008080]/20 rotate-45" />
                                            <div className="absolute inset-0 flex items-center justify-center p-3">
                                                <LogoImage
                                                    src="/logo.png"
                                                    alt="Logo"
                                                    width={40}
                                                    height={40}
                                                    className="object-contain brightness-110 contrast-125 opacity-60"
                                                />
                                            </div>
                                        </div>
                                        <div className="text-[10px] font-mono tracking-[0.4em] text-[#D4AF37]/35 uppercase">Samveekshana</div>
                                        <div className="text-[8px] font-mono tracking-[0.3em] text-[#008080]/25 uppercase mt-1">The Exhibition • MMXXVI</div>
                                    </div>
                                </div>
                                {/* Corner ornaments */}
                                <div className="absolute top-4 left-4 w-7 h-7 border-t-2 border-l-2 border-[#D4AF37]/20" />
                                <div className="absolute top-4 right-4 w-7 h-7 border-t-2 border-r-2 border-[#D4AF37]/20" />
                                <div className="absolute bottom-4 left-4 w-7 h-7 border-b-2 border-l-2 border-[#D4AF37]/20" />
                                <div className="absolute bottom-4 right-4 w-7 h-7 border-b-2 border-r-2 border-[#D4AF37]/20" />
                            </div>

                            {/* LEFT WALL */}
                            <div className="absolute top-0 bottom-0 rounded-l-lg" style={{
                                left: '-16px', width: '18px',
                                background: 'linear-gradient(90deg, #071616 0%, #0b2020 100%)',
                                borderTop: '2px solid rgba(0,128,128,0.22)',
                                borderBottom: '2px solid rgba(0,128,128,0.22)',
                                borderLeft: '2px solid rgba(0,128,128,0.22)',
                                zIndex: 20,
                            }}>
                                <div className="absolute inset-0 opacity-25" style={{
                                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(0,128,128,0.1) 5px, rgba(0,128,128,0.1) 6px)',
                                }} />
                            </div>

                            {/* RIGHT WALL */}
                            <div className="absolute top-0 bottom-0 rounded-r-lg" style={{
                                right: '-16px', width: '18px',
                                background: 'linear-gradient(90deg, #0b2020 0%, #071616 100%)',
                                borderTop: '2px solid rgba(0,128,128,0.22)',
                                borderBottom: '2px solid rgba(0,128,128,0.22)',
                                borderRight: '2px solid rgba(0,128,128,0.22)',
                                zIndex: 20,
                            }}>
                                <div className="absolute inset-0 opacity-25" style={{
                                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(0,128,128,0.1) 5px, rgba(0,128,128,0.1) 6px)',
                                }} />
                            </div>

                            {/* BOTTOM WALL */}
                            <div className="absolute left-[-16px] right-[-16px] rounded-b-lg" style={{
                                bottom: '-16px', height: '18px',
                                background: 'linear-gradient(180deg, #0b2020 0%, #071616 100%)',
                                borderBottom: '2px solid rgba(0,128,128,0.22)',
                                borderLeft: '2px solid rgba(0,128,128,0.22)',
                                borderRight: '2px solid rgba(0,128,128,0.22)',
                                zIndex: 20,
                            }} />

                            {/* FRONT LIP — tall solid wall, cards disappear behind this */}
                            <div className="absolute left-[-16px] right-[-16px] rounded-b-lg" style={{
                                bottom: '-16px', height: '58px',
                                background: 'linear-gradient(0deg, #071919 0%, #0a2222 50%, #0d2a2a 100%)',
                                borderLeft: '2px solid rgba(0,128,128,0.28)',
                                borderRight: '2px solid rgba(0,128,128,0.28)',
                                borderBottom: '2px solid rgba(0,128,128,0.28)',
                                zIndex: 30,
                            }}>
                                {/* Texture */}
                                <div className="absolute inset-0 opacity-15" style={{
                                    backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 14px, rgba(0,128,128,0.08) 14px, rgba(0,128,128,0.08) 15px)',
                                }} />
                                {/* Metal plate */}
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 px-8 py-2 border border-[#D4AF37]/25 bg-[#071515]/80 rounded-sm">
                                    <div className="text-[9px] font-mono tracking-[0.3em] text-[#D4AF37]/50 uppercase text-center">Artifact Vault</div>
                                </div>
                                {/* Brass rivets */}
                                {[
                                    'top-2 left-4', 'top-2 right-4',
                                    'bottom-2 left-4', 'bottom-2 right-4',
                                    'top-2 left-1/2 -translate-x-12', 'top-2 left-1/2 translate-x-10',
                                ].map((pos, idx) => (
                                    <div key={idx} className={`absolute ${pos} w-2 h-2 rounded-full bg-[#D4AF37]/15 shadow-[inset_0_1px_2px_rgba(212,175,55,0.3)]`} />
                                ))}
                            </div>

                            {/* TOP OPENING EDGE */}
                            <div className="absolute left-[-16px] right-[-16px]" style={{
                                top: '-5px', height: '7px',
                                background: 'linear-gradient(180deg, #0f2e2e, #0a2222)',
                                borderTop: '2px solid rgba(0,128,128,0.35)',
                                borderLeft: '2px solid rgba(0,128,128,0.28)',
                                borderRight: '2px solid rgba(0,128,128,0.28)',
                                borderRadius: '6px 6px 0 0',
                                zIndex: 25,
                            }} />

                            {/* Glow under box */}
                            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[85%] h-8 bg-[#008080]/10 blur-2xl rounded-full" style={{ zIndex: 0 }} />

                            {/* ===== PROGRESS-LINKED STACKING CARDS ===== */}
                            {fallingCards.map(({ id, cardIndex }, index) => {
                                const card = LOADER_CARDS[cardIndex];
                                const seed = id * 137.508;
                                const rotateStart = Math.sin(seed) * 15;
                                const xStart = Math.cos(seed * 0.8) * 40;

                                // Stacking metrics
                                const stackY = -index * 3; // Shift each card up slightly
                                const jitterX = (index % 2 === 0 ? 1 : -1) * 1.5;
                                const looseRotate = (index % 3 - 1) * 1.2;

                                return (
                                    <motion.div
                                        key={id}
                                        className="absolute overflow-hidden rounded-sm shadow-2xl"
                                        style={{
                                            zIndex: 2 + index,
                                            left: '12px', right: '12px',
                                            top: '12px', bottom: '12px',
                                        }}
                                        initial={{
                                            y: -500,
                                            x: xStart,
                                            rotate: rotateStart,
                                            opacity: 0,
                                            scale: 0.9,
                                        }}
                                        animate={{
                                            y: stackY,
                                            x: jitterX,
                                            rotate: looseRotate,
                                            opacity: 1,
                                            scale: 1,
                                        }}
                                        transition={{
                                            type: 'spring',
                                            damping: 20,
                                            stiffness: 100,
                                            mass: 1,
                                        }}
                                    >
                                        <div className="absolute inset-0" style={{
                                            background: `linear-gradient(145deg, #030a0c 0%, #051215 40%, #040e10 100%)`,
                                            border: `1px solid ${card.accent}25`,
                                        }}>
                                            <div className="absolute inset-0 z-0">
                                                <LogoImage
                                                    src={card.imgPath}
                                                    alt={card.label}
                                                    fill
                                                    className="object-cover opacity-60 grayscale-[0.3]"
                                                    referrerPolicy="no-referrer"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                                            </div>
                                            {/* Color tint */}
                                            <div className="absolute inset-0 z-[2] opacity-20" style={{ background: `linear-gradient(135deg, ${card.accent}30, transparent 60%)` }} />
                                            {/* Card color accent strip */}
                                            <div className="absolute top-0 left-0 right-0 h-[2px] z-[3]" style={{ background: `linear-gradient(90deg, transparent, ${card.accent}40, transparent)` }} />
                                            {/* Symbol */}
                                            <div className="absolute top-3 right-4 text-2xl opacity-40 z-[3]">{card.symbol}</div>
                                            {/* Card label */}
                                            <div className="absolute bottom-3 left-4 flex items-end gap-2 z-[3]">
                                                <div className="text-[10px] font-mono tracking-[0.2em] uppercase" style={{ color: `${card.accent}90` }}>{card.label}</div>
                                            </div>
                                            {/* Corner marks */}
                                            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l z-[3]" style={{ borderColor: `${card.accent}30` }} />
                                            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r z-[3]" style={{ borderColor: `${card.accent}30` }} />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>

                        {/* ===== LOADING BAR ===== */}
                        <motion.div
                            className="mt-14 w-[280px]"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            {/* Loading text */}
                            <div className="flex items-center justify-between mb-3">
                                <div className="text-[10px] font-mono tracking-[0.3em] text-[#008080]/50 uppercase">
                                    {loadProgress >= 100 ? 'Initialization Complete' : 'Loading Samveekshana'}
                                </div>
                                <div className="text-[10px] font-mono tracking-[0.15em] text-[#D4AF37]/40">
                                    {Math.floor(loadProgress)}%
                                </div>
                            </div>

                            {/* Bar container */}
                            <div className="relative h-[6px] rounded-full overflow-hidden border border-[#008080]/20 bg-[#041010]">
                                {/* Track pattern */}
                                <div className="absolute inset-0 opacity-20" style={{
                                    backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,128,128,0.15) 3px, rgba(0,128,128,0.15) 4px)',
                                }} />
                                {/* Fill */}
                                <motion.div
                                    className="absolute top-0 left-0 bottom-0 rounded-full"
                                    style={{
                                        background: 'linear-gradient(90deg, #004d40, #008080, #D4AF37)',
                                        boxShadow: '0 0 12px rgba(0,128,128,0.4), 0 0 30px rgba(0,128,128,0.15)',
                                    }}
                                    animate={{ width: `${loadProgress}%` }}
                                    transition={{ duration: 0.3, ease: 'easeOut' }}
                                />
                                {/* Shimmer on bar */}
                                <motion.div
                                    className="absolute top-0 bottom-0 w-16 pointer-events-none"
                                    style={{
                                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                                    }}
                                    animate={{ left: ['-10%', '110%'] }}
                                    transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                                />
                            </div>

                            {/* Sub-labels */}
                            <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center gap-1.5 text-[8px] font-mono text-[#008080]/30 uppercase tracking-widest">
                                    <motion.div
                                        className="w-1 h-1 rounded-full bg-[#008080]"
                                        animate={{ opacity: [0.2, 1, 0.2] }}
                                        transition={{ duration: 1.2, repeat: Infinity }}
                                    />
                                    {loadProgress < 30 ? 'Loading assets' : loadProgress < 60 ? 'Rendering sequences' : loadProgress < 90 ? 'Preparing exhibition' : 'Finalizing'}
                                </div>
                                <div className="text-[8px] font-mono text-[#008080]/20 tracking-widest">
                                    SAMVEEKSHANA 2026
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Bottom decorative */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 text-[8px] font-mono text-[#008080]/20 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5">
                            <motion.div
                                className="w-1 h-1 rounded-full bg-green-500"
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            System Active
                        </span>
                        <span className="text-[#008080]/10">|</span>
                        <span>ENC: RSA-4096</span>
                        <span className="text-[#008080]/10">|</span>
                        <span>Next Revolution</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
