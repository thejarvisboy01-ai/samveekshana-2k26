'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 16;

export default function HeroSequence() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const eraFillRef = useRef<HTMLDivElement>(null);
  const particleRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current!;
    const hero = heroRef.current!;
    const canvas = canvasRef.current!;
    const overlay = overlayRef.current!;
    const eraFill = eraFillRef.current!;
    const pCanvas = particleRef.current!;
    const ctx = canvas.getContext('2d')!;
    const pCtx = pCanvas.getContext('2d')!;
    const eraLabels = section.querySelectorAll<HTMLElement>('.era-label');

    /* ── Canvas resize ─────────────────────────────── */
    let currentProgress = 0;
    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      pCanvas.width = window.innerWidth;
      pCanvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', () => { resize(); drawFrame(currentProgress); });

    /* ── Frame loading ─────────────────────────────── */
    const frames: HTMLImageElement[] = [];
    const ratios = new Map<HTMLImageElement, number>();
    let loaded = 0;

    function drawCover(img: HTMLImageElement, progress: number) {
      if (!ratios.has(img)) ratios.set(img, img.naturalWidth / img.naturalHeight);
      const ratio = ratios.get(img)!;
      const cw = canvas.width, ch = canvas.height;
      const cr = cw / ch;
      let dw: number, dh: number, dx: number, dy: number;
      if (cr > ratio) { dw = cw; dh = cw / ratio; dx = 0; dy = (ch - dh) / 2; }
      else { dh = ch; dw = ch * ratio; dx = (cw - dw) / 2; dy = 0; }
      const scale = 1 + progress * 0.05;
      const sw = dw * scale, sh = dh * scale;
      ctx.drawImage(img, dx - (sw - dw) / 2, dy - (sh - dh) / 2, sw, sh);
    }

    function drawFrame(progress: number) {
      currentProgress = progress;
      const exact = progress * (FRAME_COUNT - 1);
      const a = Math.floor(exact);
      const b = Math.min(a + 1, FRAME_COUNT - 1);
      const blend = exact - a;
      const imgA = frames[a], imgB = frames[b];
      if (!imgA?.complete) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.globalAlpha = 1;
      drawCover(imgA, progress);
      if (imgB?.complete && blend > 0) { ctx.globalAlpha = blend; drawCover(imgB, progress); ctx.globalAlpha = 1; }
    }

    /* ── Overlay colour shift (warm gold → deep blue/purple) ── */
    function updateOverlay(p: number) {
      const r1 = Math.round(10 + p * 20), g1 = Math.round(5 + p * 10), b1 = Math.round(30 * p);
      const r2 = Math.round(45 * p), g2 = Math.round(27 * p), b2 = Math.round(105 * p);
      overlay.style.background = `
        linear-gradient(180deg,
          rgba(${r1},${g1},${b1},${0.15 + p * 0.1}) 0%,
          rgba(0,0,0,0.02) 30%,
          rgba(${r2},${g2},${b2},${0.1 + p * 0.15}) 70%,
          rgba(6,6,6,0.9) 100%)`;
    }

    /* ── Particle embers ───────────────────────────── */
    type Ember = { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number; hue: number };
    const embers: Ember[] = [];
    let scrollSpeed = 0;

    function initEmbers() {
      embers.length = 0;
      for (let i = 0; i < 50; i++) {
        embers.push({
          x: Math.random() * pCanvas.width,
          y: Math.random() * pCanvas.height,
          size: Math.random() * 2.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: -(Math.random() * 0.6 + 0.15),
          opacity: Math.random() * 0.5 + 0.15,
          hue: Math.random() > 0.6 ? 35 : 45,
        });
      }
    }

    function animateEmbers() {
      pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
      for (const p of embers) {
        p.x += p.speedX;
        p.y += p.speedY - scrollSpeed * 2;
        if (p.y < -10) { p.y = pCanvas.height + 10; p.x = Math.random() * pCanvas.width; }
        if (p.x < -10) p.x = pCanvas.width + 10;
        if (p.x > pCanvas.width + 10) p.x = -10;
        const gr = p.size * (3 + scrollSpeed * 2);
        pCtx.save();
        pCtx.globalAlpha = p.opacity;
        pCtx.beginPath(); pCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        pCtx.fillStyle = `hsl(${p.hue},80%,60%)`; pCtx.fill();
        const grad = pCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, gr);
        grad.addColorStop(0, `hsla(${p.hue},90%,70%,0.3)`);
        grad.addColorStop(1, 'transparent');
        pCtx.beginPath(); pCtx.arc(p.x, p.y, gr, 0, Math.PI * 2);
        pCtx.fillStyle = grad; pCtx.fill();
        pCtx.restore();
      }
      requestAnimationFrame(animateEmbers);
    }

    initEmbers();
    animateEmbers();
    window.addEventListener('resize', initEmbers);

    /* ── Hero reveal → GSAP pin+scrub ─────────────── */
    function onAllLoaded() {
      drawFrame(0);
      updateOverlay(0);

      // Reveal each hero element exactly like the reference JS
      gsap.set(['.h-pre', '.h-title', '.h-sub', '.h-scroll'], { opacity: 0, y: 20 });
      gsap.set('.h-line', { opacity: 0, scaleX: 0 });

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.to('.h-pre', { opacity: 1, y: 0, duration: 0.4 })
        .to('.h-line', { opacity: 1, scaleX: 1, duration: 0.3 }, '-=0.2')
        .to('.h-title', {
          opacity: 1, y: 0, duration: 0.5,
          onStart: () => { gsap.from('.h-title', { filter: 'blur(10px)', duration: 0.5, ease: 'power3.out' }); }
        }, '-=0.2')
        .to('.h-sub', { opacity: 1, y: 0, duration: 0.4 }, '-=0.3')
        .to('.h-scroll', { opacity: 1, duration: 0.4 }, '-=0.2')
        .to('#h-era', { opacity: 1, duration: 0.4 }, '-=0.3');

      // Pin + scrub frames
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        pin: hero,
        scrub: 1.5,
        snap: {
          snapTo: 1 / (FRAME_COUNT - 1),
          duration: { min: 0.1, max: 0.3 },
          delay: 0,
          ease: 'power1.inOut',
        },
        onUpdate: (self) => {
          const p = self.progress;
          drawFrame(p);
          updateOverlay(p);
          scrollSpeed = Math.min(Math.abs(self.getVelocity() / 500), 3);

          if (eraFill) eraFill.style.height = `${p * 100}%`;
          const idx = Math.min(Math.floor(p * 4), 3);
          eraLabels.forEach((el, i) => el.classList.toggle('era-active', i === idx));
        },
      });

      // Fade scroll indicator
      gsap.to('.h-scroll', {
        opacity: 0,
        scrollTrigger: { trigger: section, start: '2% top', end: '8% top', scrub: true },
      });

      // Fade hero content midway
      gsap.to('#h-content', {
        opacity: 0, y: -80,
        scrollTrigger: { trigger: section, start: '5% top', end: '25% top', scrub: true },
      });
    }

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `/frames/frame_${String(i + 1).padStart(3, '0')}.png`;
      img.onload = img.onerror = () => { loaded++; if (loaded === FRAME_COUNT) onAllLoaded(); };
      frames.push(img);
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const ERA_ITEMS = ['ANCIENT', 'MEDIEVAL', 'INDUSTRIAL', 'DIGITAL'];

  return (
    <>
      <style>{`
        /* Era label active state */
        .era-active {
          color: #c9a84c !important;
          text-shadow: 0 0 10px rgba(201,168,76,0.3) !important;
        }
        /* Scroll dot bounce */
        @keyframes scrollBounce {
          0%,100% { transform: translateX(-50%) translateY(0);    opacity: 1;   }
          50%      { transform: translateX(-50%) translateY(12px); opacity: 0.3; }
        }
        /* Status pulse */
        @keyframes statusPulse {
          0%,100% { opacity:1; }
          50%      { opacity:0.3; }
        }
      `}</style>

      {/* Scroll container — shortened to start next section sooner */}
      <div ref={sectionRef} style={{ position: 'relative', height: '120vh' }}>

        {/* Pinned hero panel */}
        <section
          ref={heroRef}
          style={{
            position: 'relative', width: '100%', height: '100vh',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden', background: '#060606',
          }}
        >
          {/* Frame canvas */}
          <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0 }} />

          {/* Dynamic overlay */}
          <div ref={overlayRef} style={{
            position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
            background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.15) 70%, rgba(6,6,6,0.95) 100%)',
            transition: 'background 0.5s',
          }} />

          {/* Ember particles */}
          <canvas ref={particleRef} style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 5, pointerEvents: 'none' }} />

          {/* Era progress indicator — hidden on tiny screens */}
          <div id="h-era" style={{
            position: 'absolute', right: '3vw', top: '50%', transform: 'translateY(-50%)',
            zIndex: 10, display: 'flex', alignItems: 'center', gap: '1rem', opacity: 0,
          }} className="hidden min-[420px]:flex">
            <div style={{
              width: 2, height: 200,
              background: 'rgba(255,255,255,0.1)', borderRadius: 2,
              position: 'relative', overflow: 'hidden',
            }}>
              <div ref={eraFillRef} style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '0%',
                background: 'linear-gradient(180deg, #c9a84c, #00d4ff)',
                borderRadius: 2, transition: 'height 0.1s linear',
              }} />
            </div>
            <div style={{
              display: 'flex', flexDirection: 'column', gap: '2.8rem',
              fontFamily: 'var(--font-space-mono,"Space Mono",monospace)',
              fontSize: '0.55rem', letterSpacing: '0.3em',
            }}>
              {ERA_ITEMS.map((label) => (
                <span
                  key={label}
                  className="era-label"
                  style={{ color: 'rgba(255,255,255,0.15)', transition: 'color 0.5s, text-shadow 0.5s' }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div id="h-content" style={{
            position: 'relative', zIndex: 2,
            textAlign: 'center',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem',
          }}>
            {/* EST. 2026 PRE-TITLE */}
            <span className="h-pre" style={{
              fontFamily: 'var(--font-space-mono,"Space Mono",monospace)',
              fontSize: '0.7rem',
              letterSpacing: '0.5em',
              color: '#c9a84c',
              textTransform: 'uppercase',
            }}>
              EST. 2026 — SAMVEEKSHANA
            </span>

            {/* Gold divider line */}
            <div className="h-line" style={{
              width: 60, height: 1,
              background: '#c9a84c',
              transformOrigin: 'center',
            }} />

            {/* Main title */}
            <h1 className="h-title" style={{
              fontFamily: 'var(--font-cinzel-decorative,"Cinzel Decorative",serif)',
              fontSize: 'clamp(2rem, 8vw, 7rem)', // Reduced slightly to fit longer name
              fontWeight: 900,
              color: '#f0d078',
              letterSpacing: '0.06em',
              lineHeight: 1,
              textShadow: `
                0 0 40px rgba(201,168,76,0.4),
                0 0 80px rgba(201,168,76,0.2),
                0 4px 20px rgba(0,0,0,0.8)
              `,
              margin: 0,
            }}>
              SAMVEEKSHANA
            </h1>

            {/* Italic tagline */}
            <p className="h-sub" style={{
              fontFamily: 'var(--font-cormorant,"Cormorant Garamond",serif)',
              fontSize: 'clamp(1rem, 2.2vw, 1.6rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              letterSpacing: '0.15em',
              color: '#f5f0e8',
              margin: 0,
            }}>
              From Roots to Revolution
            </p>
          </div>

          {/* Scroll indicator */}
          <div className="h-scroll" style={{
            position: 'absolute', bottom: '4vh', left: '50%', transform: 'translateX(-50%)',
            zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.8rem',
          }}>
            <span style={{
              fontFamily: 'var(--font-space-mono,"Space Mono",monospace)',
              fontSize: '0.6rem', letterSpacing: '0.3em', color: '#c9a84c', textTransform: 'uppercase',
            }}>
              SCROLL TO EXPLORE
            </span>
            <div style={{
              width: 20, height: 32, border: '1px solid #c9a84c', borderRadius: 10, position: 'relative',
            }}>
              <div style={{
                width: 3, height: 6, background: '#c9a84c', borderRadius: 2,
                position: 'absolute', top: 6, left: '50%',
                transform: 'translateX(-50%)',
                animation: 'scrollBounce 1.8s ease-in-out infinite',
              }} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
