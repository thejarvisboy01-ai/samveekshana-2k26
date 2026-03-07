'use client';

import { useState, useEffect } from 'react';
import { motion, MotionValue, useTransform, AnimatePresence, useSpring } from 'motion/react';
import Image from 'next/image';
import { X, Download, ChevronLeft, ChevronRight } from 'lucide-react';

const DEPARTMENTS_RAW = [
  {
    id: 'CV', title: 'CIVIL', subtitle: 'Department of Civil Engineering',
    color: 'from-[#8B7355] to-[#5C4827]', image: '/civil.png',
    description: 'Building the future from the ground up. Civil Engineering events that test structural thinking, design acumen, and engineering precision.',
    date: 'March 11 & 12, 2026', location: 'CV Department Block',
    rulebook: '/rulebook/Techanical Quiz Department Event.pdf',
    rules: [
      'Technical Quiz: Team of 2. 6 rounds covering visual and technical questions. 60 seconds per question.',
      'Shut the Box: Player rolls 2 dice and flips number tiles to match the sum. Lowest score wins round.',
      'Participants must check in one hour prior to the commencement of the event.',
      'Replacement of any participant of a team is not allowed after the 1st round.',
      'The verdict of the judging panel shall be deemed final and irrevocable.',
    ],
    events: [
      { id: 'CV1', title: 'Technical Quiz', description: 'Team of 2. 6 rounds covering visual and technical questions. 60 seconds per question.', image: '/events/tech quiz.png', date: 'March 11 & 12, 2026', location: 'CV Department Block' },
      { id: 'CV2', title: 'Shut the Box', description: 'Player rolls 2 dice and flips number tiles to match the sum. Lowest score wins round.', image: '/events/shut the box .png', date: 'March 11 & 12, 2026', location: 'CV Department Block' },
    ]
  },
  {
    id: 'ME', title: 'MECH', subtitle: 'Department of Mechanical Engineering',
    color: 'from-[#708090] to-[#4A5568]', image: '/mech.png',
    description: 'Where machines meet imagination. Mechanical Engineering brings cutting-edge design and innovation challenges to the forefront of Samveekshana.',
    date: 'March 11 & 12, 2026', location: 'ME Department Block',
    rulebook: '/rulebook/ME_Event.doc',
    rules: [
      'Future Ride (Design Your Dream Machine): 2 members/team. Rs 100/- fee. Create technical/artistic poster showcasing an aesthetic vehicle.',
      'Participants have 2 hours limit using Chart paper (A2/A3) and Colors. Must present concept description and key tech features.',
      'Navapravartan (From Problem to Powerful Solution): 2 members/team. Rs 50/- fee.',
      'Analyze the given real-world problem statement, identify root causes, and propose an innovative, practical solution.',
      'Time Limit: 120 minutes preparation, 5 minutes presentation, and 2-3 minutes Q&A.',
      'Punctuality is imperative. Check in one hour prior to commencement.',
    ],
    events: [
      { id: 'ME1', title: 'Future Ride', description: 'Create technical/artistic poster showcasing an aesthetic vehicle.', image: '/events/future ride.png', date: 'March 11 & 12, 2026', location: 'ME Department Block' },
      { id: 'ME2', title: 'Navapravartan', description: 'Analyze real-world problems and propose innovative solutions.', image: '/events/Navapravartan.png', date: 'March 11 & 12, 2026', location: 'ME Department Block' }
    ]
  },
  {
    id: 'EEE', title: 'EEE', subtitle: 'Dept. of Electrical & Electronics',
    color: 'from-[#DAA520] to-[#8B6508]', image: '/EEE.png',
    description: 'Powering innovation through circuits and systems. EEE events challenge participants with real-world electrical engineering problems.',
    date: 'March 11 & 12, 2026', location: 'EEE Department Block',
    rulebook: '/rulebook/Events _ Samveekshana 2026_Budget_EEE.docx',
    rules: [
      'TechnoFusion: Team of 2-3. Rs 150/-. Rounds: IQ Quiz, Technical Dumb Charades, and Treasure Hunt.',
      'Innovate to Elevate: Team of 2-3. Rs 100/-. Build the tallest free-standing structure using auctioned materials.',
      'Circuit designs must be original and adhere to safety norms.',
      'Prizes for winners and runners-up in each category.',
    ],
    events: [
      { id: 'EEE1', title: 'TechnoFusion', description: 'IQ Quiz, Technical Dumb Charades, and Treasure Hunt series.', image: '/events/techno fusion.png', date: 'March 11 & 12, 2026', location: 'EEE Department Block' },
      { id: 'EEE2', title: 'Innovate to Elevate', description: 'Build the tallest free-standing structure using auctioned materials.', image: '/events/inovate to elevate.png', date: 'March 11 & 12, 2026', location: 'EEE Department Block' },
    ]
  },
  {
    id: 'CSE', title: 'CSE', subtitle: 'Dept. of Computer Science & Engg.',
    color: 'from-[#008080] to-[#004d40]', image: '/CSE.png',
    description: 'Code. Debug. Conquer. CSE events challenge your programming skills, UX thinking, and problem-solving under pressure.',
    date: 'March 11 & 12, 2026', location: 'CSE Lab Block',
    rulebook: '/rulebook/Samveekshana_Events_Rules(CSE Dept).pdf',
    rules: [
      'UI/UX Redesigning: Individual. Rs 50/- fee. Redesign a given website/app interface within 2 hours using Figma/Adobe XD.',
      'Blind Coding: Individual. Rs 50/- fee. Solve programming problems with screen hidden. 4 hours in two rounds. No internet.',
      'Internet usage is strictly prohibited in Blind Coding.',
      'Judges\' decision will be final and binding across all competitions.',
    ],
    events: [
      { id: 'CSE1', title: 'UI/UX Redesigning', description: 'Redesign a given interface using Figma/Adobe XD within 2 hours.', image: '/events/ui ux.png', date: 'March 11 & 12, 2026', location: 'CSE Lab Block' },
      { id: 'CSE2', title: 'Blind Coding', description: 'Solve programming problems with the screen hidden.', image: '/events/Blind coding.png', date: 'March 11 & 12, 2026', location: 'CSE Lab Block' },
    ]
  },
  {
    id: 'BCA', title: 'BCA / MCA', subtitle: 'Bachelor & Master of Computer Apps',
    color: 'from-[#6A0DAD] to-[#3D0066]', image: '/BCA.png',
    description: 'Where creativity meets technology. BCA/MCA events blend artistic expression with technical skill in a vibrant challenge.',
    date: 'March 11 & 12, 2026', location: 'MCA Department Hall',
    rulebook: '/rulebook/Samveekshana_Events_Rules(CA).docx',
    rules: [
      'Pick and Speak: Individual. Rs 50/-. Extempore speaking on a random technical/general topic. 1 min prep, 2-4 mins speaking.',
      'Face Painting: Individual/Team of 2. Rs 50/-. Theme: Good vs Evil (Half-Face Concept).',
      'Judging criteria: Fluency, originality, creativity, and relevance to theme.',
      'Certificates for all participants and trophies for winners.',
    ],
    events: [
      { id: 'BCA1', title: 'Pick and Speak', description: 'Extempore speaking on technical or general topics.', image: '/events/pick and speak.png', date: 'March 11 & 12, 2026', location: 'MCA Department Hall' },
      { id: 'BCA2', title: 'Face Painting', description: 'Artistic expression centered on the theme of Good vs Evil.', image: '/events/face painting.png', date: 'March 11 & 12, 2026', location: 'MCA Department Hall' },
    ]
  },
  {
    id: 'ECE', title: 'ECE', subtitle: 'Dept. of Electronics & Comm. Engg.',
    color: 'from-[#006994] to-[#003d5c]', image: '/EC.png',
    description: 'Signals, circuits, and smart systems. ECE events push participants to apply electronics knowledge to real-world competitive scenarios.',
    date: 'March 11 & 12, 2026', location: 'ECE Department Block',
    rulebook: '/rulebook/Samveekshana_Events_Rules 2k26 EC ......docx',
    rules: [
      'Technological Innovation Coding: Team of 2. Rs 100/-. Python programming. Rounds: MCQs, Debugging, Logic.',
      'Brand Arena +: Team of 3. Rs 100/-. Branding strategy, logo identification, and mystery box challenges.',
      'Top 3 positions rewarded with cash prizes and excellence certificates.',
    ],
    events: [
      { id: 'ECE1', title: 'Tech Innovation Coding', description: 'Python programming challenge covering logic and debugging.', image: '/events/technological innovation coding.png', date: 'March 11 & 12, 2026', location: 'ECE Department Block' },
      { id: 'ECE2', title: 'Brand Arena +', description: 'Marketing strategy and branding challenges for creative minds.', image: '/events/brand arena .png', date: 'March 11 & 12, 2026', location: 'ECE Department Block' },
    ]
  },
  {
    id: 'AI', title: 'AI & DS', subtitle: 'Dept. of AI & Data Science',
    color: 'from-[#00b4d8] to-[#0077b6]', image: '/ai.png',
    description: 'Intelligence redefined. AI & DS events explore the frontier of machine learning, data analysis, and intelligent system design.',
    date: 'March 11 & 12, 2026', location: 'AI Lab, New Block',
    rulebook: '/rulebook/rules and regulations  for samveekshana event AIDS.docx',
    rules: [
      'Escape Room: Team of 2-4. Rs 300/- per team. Solve a series of puzzles and riddles within a time limit to escape.',
      'Tote Bag Painting: Individual. Rs 150/-. Creative expression on cotton bags provided by organizers (2-hour limit).',
      'Tote Bag Painting: Designs must be original. Pre-sketching or stencils are prohibited.',
      'Cheat hacks or harassment result in immediate disqualification.',
      'Winners receive special trophies and participation certificates.',
    ],
    events: [
      { id: 'AI1', title: 'Escape Room', description: 'Solve AI-themed puzzles and riddles to escape before time runs out.', image: '/events/escape room .png', date: 'March 11 & 12, 2026', location: 'AI Lab, New Block' },
      { id: 'AI2', title: 'Tote Bag Painting', description: 'Design and showcase your artistic skills on cotton bags.', image: '/events/totebag painting.png', date: 'March 11 & 12, 2026', location: 'AI Lab, New Block' },
    ]
  },
  {
    id: 'CSBS', title: 'CSBS', subtitle: 'Computer Science & Business Systems',
    color: 'from-[#2ecc71] to-[#1a7a44]', image: '/csbs.png',
    description: 'Where tech meets business acumen. CSBS events test entrepreneurial thinking, pitching skills, and competitive spirit.',
    date: 'March 11 & 12, 2026', location: 'CSBS Seminar Hall',
    rulebook: '/rulebook/CSBS Samveekshana 2k26.docx',
    rules: [
      'Roadies: Rs. 80/head. Multi-round event with endurance, mental challenges, and stress interviews.',
      'Pitch Tank: Team 1-4. Rs. 80/head. Startup pitching competition (4 rounds).',
      'Pitch Tank: Shark Tank style 5-minute pitch followed by 3 minutes of Investor Q&A.',
      'Evaluations based on innovation, feasibility, marketability, and endurance.',
    ],
    events: [
      { id: 'CSBS1', title: 'Roadies', description: 'Test your endurance and mental strength in multiple rounds.', image: '/events/roadies.png', date: 'March 11 & 12, 2026', location: 'CSBS Seminar Hall' },
      { id: 'CSBS2', title: 'Pitch Tank', description: 'Startup pitching platform for future entrepreneurs.', image: '/events/pitch tank.png', date: 'March 11 & 12, 2026', location: 'CSBS Seminar Hall' },
    ]
  },
  {
    id: 'BSH', title: 'BSH', subtitle: 'Basic Sciences & Humanities',
    color: 'from-[#c0392b] to-[#7b241c]', image: '/BHS.png',
    description: 'Gaming, grit, and glory. BSH brings the competitive energy of mobile gaming and reality-show style challenges to Samveekshana.',
    date: 'March 11 & 12, 2026', location: 'BSH Activity Hall',
    rulebook: '/rulebook/BSH Events Rules and Regulations.docx',
    rules: [
      'BGMI: Squad of 4. Rs 200/team. TPP Mode, Classic Maps. Points based on official competitive placement and kills.',
      'Bigboss: Reality-show style elimination challenge with tasks and audience voting.',
      'BGMI: Mobile devices only (No Emulators/iPads). Custom room credentials shared before start.',
      'Screenshots of match results are mandatory for point verification.',
      'Teaming with other squads or use of hacks leads to an immediate ban.',
      'Trophies for winning squad and top individual performers.',
    ],
    events: [
      { id: 'BSH1', title: 'BGMI', description: 'Squad-based battle royale tournament for mobile gamers.', image: '/events/Bgmi.png', date: 'March 11 & 12, 2026', location: 'BSH Activity Hall' },
      { id: 'BSH2', title: 'Bigboss', description: 'Reality-show style elimination challenge with tasks and audience voting.', image: '/events/musical chair.png', date: 'March 11 & 12, 2026', location: 'BSH Activity Hall' },
    ]
  },
];

const DEPARTMENT_DISPLAY_ORDER = ['CSE', 'AI', 'ME', 'CV', 'ECE', 'EEE', 'BCA', 'CSBS', 'BSH'] as const;
const departmentOrderIndex = new Map<string, number>(
  DEPARTMENT_DISPLAY_ORDER.map((id, index) => [id, index])
);
const DEPARTMENTS = [...DEPARTMENTS_RAW]
  .sort((a, b) => {
    const aIndex = departmentOrderIndex.get(a.id) ?? Number.MAX_SAFE_INTEGER;
    const bIndex = departmentOrderIndex.get(b.id) ?? Number.MAX_SAFE_INTEGER;
    return aIndex - bIndex;
  })
  .map(dept => ({
    ...dept,
    events: dept.events.map(ev => ({ ...ev, rulebook: dept.rulebook }))
  }));

const REGISTRATION_BASE_URL = process.env.NEXT_PUBLIC_REGISTRATION_URL || 'https://register.samveekshana.tech/';
const EVENT_REGISTRATION_META: Record<string, { slug: string; fee: string }> = {
  CV1: { slug: 'technical-quiz', fee: 'Rs. 50/- per team' },
  CV2: { slug: 'shut-the-box', fee: 'Rs. 50/- per participant' },
  ME1: { slug: 'future-ride', fee: 'Rs. 100/- per team' },
  ME2: { slug: 'navapravartan', fee: 'Rs. 50/- per team' },
  EEE1: { slug: 'techno-fusion', fee: 'Rs. 150/- per team' },
  EEE2: { slug: 'innovate-to-elevate', fee: 'Rs. 100/- per team' },
  CSE1: { slug: 'ui-ux-redesigning', fee: 'Rs. 50/- per participant' },
  CSE2: { slug: 'blind-coding', fee: 'Rs. 50/-' },
  BCA1: { slug: 'pick-and-speak', fee: 'Rs. 50/-' },
  BCA2: { slug: 'face-painting', fee: 'Rs. 50/-' },
  ECE1: { slug: 'technological-innovation-coding', fee: 'Rs. 100/- per team' },
  ECE2: { slug: 'brand-arena-plus', fee: 'Rs. 150/- per team' },
  AI1: { slug: 'escape-room', fee: 'Rs. 300/- per team' },
  AI2: { slug: 'tote-bag-painting', fee: 'Rs. 150/- per team' },
  CSBS1: { slug: 'roadies', fee: 'Rs. 80/- per head' },
  CSBS2: { slug: 'pitch-tank', fee: 'Rs. 80/- per head' },
  BSH1: { slug: 'bgmi', fee: 'Rs. 200/- per team' },
  BSH2: { slug: 'bigboss', fee: 'Rs. 50/-' },
};

function getRegistrationMeta(event: { id: string; title: string }) {
  const fallbackSlug = event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const meta = EVENT_REGISTRATION_META[event.id];
  return {
    slug: meta?.slug || fallbackSlug,
    fee: meta?.fee || 'Fee at registration desk',
  };
}

function goToRegistration(event: { id: string; title: string }) {
  const meta = getRegistrationMeta(event);
  const target = new URL(REGISTRATION_BASE_URL);
  target.searchParams.set('event', event.title);
  target.searchParams.set('event_id', event.id);
  target.searchParams.set('slug', meta.slug);
  window.open(target.toString(), '_blank', 'noopener,noreferrer');
}


export default function EventsSequence({ progress }: { progress: MotionValue<number> }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const [rulebookEvent, setRulebookEvent] = useState<any | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isSectionInteractive, setIsSectionInteractive] = useState(false);
  const isDeck = activeIndex !== null;

  useEffect(() => {
    setActiveEventIndex(0);
  }, [activeIndex]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Lock body scroll when a card is open
  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeIndex]);

  // 0.26 to 0.44 - wider window, overlaps with Narrative fade-out
  // Tighter window for faster fade transitions
  // 0.4 to 0.7
  const opacity = useTransform(progress, [0.4, 0.41, 0.69, 0.7], [0, 1, 1, 0]);

  // Explicit touch ownership on mobile to avoid hidden sections intercepting taps.
  useEffect(() => {
    const unsubscribe = progress.on('change', (latest: number) => {
      const inWindow = isMobile
        ? latest >= 0.39 && latest <= 0.71
        : latest >= 0.4 && latest <= 0.7;
      setIsSectionInteractive(inWindow || activeIndex !== null || rulebookEvent !== null);
    });
    return unsubscribe;
  }, [progress, isMobile, activeIndex, rulebookEvent]);

  // Rotate through all departments (and a bit extra) before moving to next section.
  const scrollRotateY = useTransform(progress, [0.4, 0.7], [0, -540]);
  const smoothRotateY = useSpring(0, { stiffness: 160, damping: 24 });
  const [cardActiveAngle, setCardActiveAngle] = useState(0);

  useEffect(() => {
    if (activeIndex !== null) {
      const current = smoothRotateY.get();
      const targetAngle = -(activeIndex / DEPARTMENTS.length) * 360;
      const diff = (targetAngle - current) % 360;
      const shortestDiff = diff > 180 ? diff - 360 : diff < -180 ? diff + 360 : diff;
      smoothRotateY.set(current + shortestDiff);

      setCardActiveAngle(prev => {
        const targetCardAngle = (activeIndex / DEPARTMENTS.length) * 360;
        const cardDiff = (targetCardAngle - prev) % 360;
        const cardShortestDiff = cardDiff > 180 ? cardDiff - 360 : cardDiff < -180 ? cardDiff + 360 : cardDiff;
        return prev + cardShortestDiff;
      });
    } else {
      smoothRotateY.set(scrollRotateY.get());
    }
  }, [activeIndex, DEPARTMENTS.length, smoothRotateY, scrollRotateY]);

  useEffect(() => {
    const unsub = scrollRotateY.on('change', (latest) => {
      if (activeIndex === null) {
        smoothRotateY.set(latest);
      }
    });
    return unsub;
  }, [activeIndex, scrollRotateY, smoothRotateY]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black"
      style={{
        opacity,
        perspective: '1500px',
        zIndex: isSectionInteractive ? 30 : 20,
        pointerEvents: isSectionInteractive ? 'auto' : 'none',
      }}
    >
      {/* Background HUD Layers */}
      <div className="absolute inset-0 z-0">
        {/* Dynamic Static Grid */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(#008080 1px, transparent 1px), linear-gradient(90deg, #008080 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
          }}
        />
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#008080 1px, transparent 1px), linear-gradient(90deg, #008080 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
          animate={{ backgroundPosition: ['0px 0px', '20px 20px'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        />

        {/* Vignette & Depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_70%,#000_100%)]" />

        {/* Subtle Scanlines */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ background: 'repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 2px)' }} />

        {/* Moving Scanner Line */}
        <motion.div
          className="absolute inset-x-0 h-[2px] bg-[#008080]/20 z-10 pointer-events-none"
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          style={{ boxShadow: '0 0 15px #008080' }}
        />
      </div>

      {/* Decorative Corner HUD Elements */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-40">
        <div className="absolute top-10 left-10 w-24 h-24 border-l border-t border-[#008080]/30" />
        <div className="absolute top-10 right-10 w-24 h-24 border-r border-t border-[#008080]/30" />
        <div className="absolute bottom-10 left-10 w-24 h-24 border-l border-b border-[#008080]/30" />
        <div className="absolute bottom-10 right-10 w-24 h-24 border-r border-b border-[#008080]/30" />

        {/* Floating ID Tag */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[10px] font-mono text-[#008080]/60 tracking-[0.5em] uppercase">
          SECURE_ENCRYPTION_LAYER_ACTIVE // RECON_UNIT_04
        </div>
      </div>

      <div className="absolute top-12 left-20 md:left-32 text-xs font-mono tracking-widest opacity-80 uppercase text-[#008080] drop-shadow-[0_0_8px_rgba(0,128,128,0.5)] z-50">
        [ PHASE 02: THE EXHIBITION ]
      </div>

      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        style={{ rotateY: smoothRotateY, transformStyle: 'preserve-3d' }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {DEPARTMENTS.map((event, i) => {
          const targetRotY = isDeck ? cardActiveAngle : (i / DEPARTMENTS.length) * 360;
          const targetRotX = isDeck ? 70 : 0;
          const offset = isDeck ? (i - activeIndex + DEPARTMENTS.length) % DEPARTMENTS.length : 0;
          const targetZ = isDeck ? (-offset * 2) : 45; // reduced offset for tighter deck
          const targetY = isDeck ? 15 : 0; // Move deck slightly higher to meet the beam
          const scale = isDeck ? (i === activeIndex ? 0.7 : 0.65) : 1;

          return (
            <motion.div
              key={event.id}
              className="absolute w-[48vw] md:w-[24vw] lg:w-[20vw] max-w-[380px] aspect-[4/3] group cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
              initial={false}
              animate={{
                transform: isDeck
                  ? `translateY(25vh) rotateX(75deg) translateZ(${-offset * 10}px) scale(0.6)`
                  : `translateY(0) rotateY(${targetRotY}deg) rotateX(0deg) translateZ(clamp(320px, 96vw, 620px)) scale(1)`
              }}
              transition={{ duration: 0.35, type: 'spring', stiffness: 300, damping: 30, mass: 0.8 }}
              onClick={() => setActiveIndex(i)}
            >
              <div className="absolute inset-0 rounded-sm overflow-hidden border-[2px] border-[#008080]/30 bg-[#041014]/90 backdrop-blur-md shadow-[0_0_40px_rgba(0,128,128,0.1)] group-hover:border-[#D4AF37]/80 transition-colors duration-500">
                {/* Vintage Corner Ornaments */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]/50 z-30" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]/50 z-30" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]/50 z-30" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]/50 z-30" />

                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover opacity-100 brightness-110 contrast-110 group-hover:brightness-125 group-hover:contrast-125 group-hover:scale-110 transition-all duration-700"
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {!isDeck && (
        <div className="absolute inset-0 pointer-events-none z-[12]">
          <motion.div
            className="absolute bottom-[18%] left-1/2 -translate-x-1/2 w-[62vw] max-w-[320px] h-16 rounded-[50%] bg-[#00cfcf]/20 blur-2xl"
            animate={{ opacity: [0.35, 0.72, 0.35], scale: [0.92, 1.08, 0.92] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-[19.5%] left-1/2 -translate-x-1/2 w-[46vw] max-w-[240px] h-[2px] bg-gradient-to-r from-transparent via-[#00ffff] to-transparent"
            animate={{ opacity: [0.2, 0.85, 0.2], scaleX: [0.8, 1.12, 0.8] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[82vw] max-w-[420px] h-[40vh]"
            style={{
              background: 'conic-gradient(from 180deg at 50% 100%, transparent 44%, rgba(0,255,255,0.16) 49%, rgba(0,128,128,0.35) 50%, rgba(0,255,255,0.16) 51%, transparent 56%)',
              clipPath: 'polygon(50% 100%, 32% 0%, 68% 0%)',
              filter: 'blur(22px)',
            }}
            animate={{ opacity: [0.25, 0.6, 0.25] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-[16.5%] left-1/2 -translate-x-1/2 w-[76vw] max-w-[410px] h-[76vw] max-h-[410px] rounded-full border border-[#00d9d9]/20"
            animate={{ scale: [0.88, 1.04, 0.88], opacity: [0.18, 0.5, 0.18] }}
            transition={{ duration: 4.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      )}

      {/* Holographic Projector Modal */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="absolute inset-0 z-40 flex flex-col items-center justify-center pointer-events-none bg-black"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{ perspective: '2000px' } as any}
          >
            {/* Background click handler */}
            <div className="absolute inset-0 pointer-events-auto" onClick={() => setActiveIndex(null)} />

            {/* 3D HUD PANELS - Floating around the central card */}
            <div className="absolute inset-0 pointer-events-none" style={{ perspective: '2000px' }}>
              {/* TOP LEFT PANEL */}
              <motion.div
                className="absolute top-[8%] left-[5%] md:top-[12%] md:left-[8%] hidden md:block w-40 h-28 md:w-48 md:h-32 border border-[#008080]/50 rounded-sm bg-[#041014]/60 backdrop-blur-md overflow-hidden z-20"
                style={{
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 0 30px rgba(0,128,128,0.3), inset 0 0 20px rgba(0,128,128,0.1)'
                }}
                initial={{ opacity: 0, x: -60, y: -60 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotateX: [0, 5, 0],
                  rotateY: [-5, 0, -5]
                }}
                transition={{
                  duration: 0.25,
                  rotateX: { duration: 4, repeat: Infinity },
                  rotateY: { duration: 5, repeat: Infinity }
                }}
              >
                <div className="p-4 text-[9px] font-mono text-[#008080] tracking-widest uppercase">
                  <div className="mb-2">[ DATA STREAM ]</div>
                  <div className="opacity-60 text-[8px] space-y-1">
                    <div>SYS: ACTIVE</div>
                    <div>FREQ: 2.4GHz</div>
                    <div>PKT: 1024MB</div>
                  </div>
                </div>
              </motion.div>

              {/* TOP RIGHT PANEL */}
              <motion.div
                className="absolute top-[8%] right-[5%] md:top-[12%] md:right-[8%] hidden md:block w-40 h-28 md:w-48 md:h-32 border border-[#D4AF37]/50 rounded-sm bg-[#041014]/60 backdrop-blur-md overflow-hidden z-20"
                style={{
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 0 30px rgba(212,175,55,0.3), inset 0 0 20px rgba(212,175,55,0.1)'
                }}
                initial={{ opacity: 0, x: 60, y: -60 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotateX: [0, 5, 0],
                  rotateY: [5, 0, 5]
                }}
                transition={{
                  duration: 0.25,
                  rotateX: { duration: 4, repeat: Infinity },
                  rotateY: { duration: 5, repeat: Infinity }
                }}
              >
                <div className="p-4 text-[9px] font-mono text-[#D4AF37] tracking-widest uppercase">
                  <div className="mb-2">[ SCAN RESULT ]</div>
                  <div className="opacity-60 text-[8px] space-y-1">
                    <div>SIGNAL: 98%</div>
                    <div>TEMP: 42 C</div>
                    <div>STATUS: OK</div>
                  </div>
                </div>
              </motion.div>

              {/* BOTTOM LEFT PANEL */}
              <motion.div
                className="absolute bottom-[15%] left-[10%] hidden md:block w-56 h-40 border border-[#008080]/50 rounded-sm bg-[#041014]/60 backdrop-blur-md overflow-hidden"
                style={{
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 0 30px rgba(0,128,128,0.3), inset 0 0 20px rgba(0,128,128,0.1)'
                }}
                initial={{ opacity: 0, x: -60, y: 60 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotateX: [0, -5, 0],
                  rotateY: [-5, 0, -5]
                }}
                transition={{
                  duration: 0.25,
                  rotateX: { duration: 4.5, repeat: Infinity },
                  rotateY: { duration: 5.5, repeat: Infinity }
                }}
              >
                <div className="p-4 text-[9px] font-mono text-[#008080] tracking-widest uppercase">
                  <div className="mb-3">[ ARCHIVE LOG ]</div>
                  <div className="opacity-60 text-[8px] space-y-2 font-mono">
                    <div className="flex justify-between"><span>EVT-{DEPARTMENTS[activeIndex].id}</span><span>SYNCED</span></div>
                    <div className="w-full h-1 border border-[#008080]/30 relative overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#008080] to-transparent"
                        animate={{ width: ['0%', '100%', '0%'] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* BOTTOM RIGHT PANEL */}
              <motion.div
                className="absolute bottom-[15%] right-[10%] hidden md:block w-56 h-40 border border-[#D4AF37]/50 rounded-sm bg-[#041014]/60 backdrop-blur-md overflow-hidden"
                style={{
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 0 30px rgba(212,175,55,0.3), inset 0 0 20px rgba(212,175,55,0.1)'
                }}
                initial={{ opacity: 0, x: 60, y: 60 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotateX: [0, -5, 0],
                  rotateY: [5, 0, 5]
                }}
                transition={{
                  duration: 0.25,
                  rotateX: { duration: 4.5, repeat: Infinity },
                  rotateY: { duration: 5.5, repeat: Infinity }
                }}
              >
                <div className="p-4 text-[9px] font-mono text-[#D4AF37] tracking-widest uppercase">
                  <div className="mb-3">[ HOLOGRAM STABLE ]</div>
                  <div className="opacity-60 text-[8px] space-y-2">
                    <div>RENDER: ON</div>
                    <div>DEPTH: {(activeIndex + 1) * 100}m</div>
                    <div className="flex gap-2 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 h-4 border border-[#D4AF37]/40 rounded-[1px]"
                          animate={{ height: ['100%', '60%', '100%'] }}
                          transition={{ duration: 0.4, delay: i * 0.1, repeat: Infinity }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* 1. PROJECTOR BASE (Uplight source) */}
            <motion.div
              className="absolute bottom-[2vh] left-1/2 -translate-x-1/2 w-48 h-12 bg-gradient-to-b from-[#008080] to-[#004d40] blur-3xl opacity-70 z-10 rounded-[50%]"
              initial={{ scale: 0.5 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ transform: 'rotateX(80deg)' }}
            />

            {/* Holographic floor grid removed as per request */}

            {/* 2. CINEMATIC PROJECTOR BEAM (Stable on Card) */}
            <motion.div
              className="absolute bottom-[-10vh] left-1/2 -translate-x-1/2 w-full h-[120vh] pointer-events-none z-[11]"
              style={{
                background: `conic-gradient(from 180deg at 50% 100%, transparent 45%, rgba(255,248,220,0.1) 48%, rgba(0,128,128,0.4) 50%, rgba(255,248,220,0.1) 52%, transparent 55%)`,
                clipPath: `polygon(50% 100%, 30% 0%, 70% 0%)`,
                filter: 'blur(30px)',
              }}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ delay: 0.05, duration: 0.3 }}
            />

            {/* 2.5 RESONANCE FIELD AROUND PROJECTED CARD */}
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

            <div className="relative flex flex-col items-center gap-3 md:gap-0 z-20 w-full px-2 md:px-0">

              <div className="md:hidden absolute inset-0 pointer-events-none">
                <motion.button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const dept = DEPARTMENTS[activeIndex!];
                    const events = (dept as any).events || [];
                    if (events.length > 0) {
                      const nextIdx = activeEventIndex === 0 ? events.length - 1 : activeEventIndex - 1;
                      setActiveEventIndex(nextIdx);
                    }
                  }}
                  className="pointer-events-auto absolute left-1 top-1/2 -translate-y-1/2 w-11 h-11 border border-[#008080]/55 rounded-full flex items-center justify-center text-[#00d9d9] bg-black/55 backdrop-blur-sm z-30"
                  whileTap={{ scale: 0.85 }}
                >
                  <ChevronLeft size={18} />
                </motion.button>
                <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-[#008080] tracking-widest">
                  {String(activeEventIndex + 1).padStart(2, '0')} / {String((((DEPARTMENTS[activeIndex!] as any).events || []).length || 1)).padStart(2, '0')}
                </span>
                <motion.button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const dept = DEPARTMENTS[activeIndex!];
                    const events = (dept as any).events || [];
                    if (events.length > 0) {
                      setActiveEventIndex((activeEventIndex + 1) % events.length);
                    }
                  }}
                  className="pointer-events-auto absolute right-1 top-1/2 -translate-y-1/2 w-11 h-11 border border-[#008080]/55 rounded-full flex items-center justify-center text-[#00d9d9] bg-black/55 backdrop-blur-sm z-30"
                  whileTap={{ scale: 0.85 }}
                >
                  <ChevronRight size={18} />
                </motion.button>
              </div>

              {/* Card row with nav buttons on either side */}
              <div className="flex items-center justify-center gap-4 md:gap-16 w-full relative">

                {/* PREV BUTTON - overlaid on left edge on mobile, beside card on desktop */}
                <motion.button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const dept = DEPARTMENTS[activeIndex!];
                    const events = (dept as any).events || [];
                    if (events.length > 0) {
                      const nextIdx = activeEventIndex === 0 ? events.length - 1 : activeEventIndex - 1;
                      setActiveEventIndex(nextIdx);
                    }
                  }}
                  className="hidden md:flex pointer-events-auto w-12 h-12 md:w-20 md:h-20 border border-[#008080]/50 md:border-2 rounded-full items-center justify-center text-[#008080] hover:text-[#FFF8DC] hover:border-[#FFF8DC] transition-all bg-black/50 backdrop-blur-md group shrink-0 z-30"
                  whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(0,128,128,0.6)' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="text-[10px] font-mono absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest text-[#008080] hidden md:block">PREV</div>
                  <ChevronLeft size={24} className="md:hidden" />
                  <ChevronLeft size={36} className="hidden md:block" />
                </motion.button>
                {/* THE PROJECTED CARD REVEAL */}
                <motion.div
                  className="relative w-[min(92vw,560px)] md:w-[min(86vw,560px)] h-[min(128vw,680px)] md:h-[min(92vw,640px)] max-h-[90vh] pointer-events-auto flex items-center justify-center shadow-[0_0_100px_rgba(0,128,128,0.2)] md:shadow-[0_0_200px_rgba(0,128,128,0.3)] overflow-hidden"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    maskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <SwipeableInfo
                    dept={DEPARTMENTS[activeIndex!]}
                    eventIndex={activeEventIndex}
                    setEventIndex={setActiveEventIndex}
                    onOpenRulebook={(ev) => setRulebookEvent({ ...ev, rules: DEPARTMENTS[activeIndex!].rules })}
                  />
                </motion.div>

                {/* NEXT BUTTON - beside card on mobile too */}
                <motion.button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const dept = DEPARTMENTS[activeIndex!];
                    const events = (dept as any).events || [];
                    if (events.length > 0) {
                      setActiveEventIndex((activeEventIndex + 1) % events.length);
                    }
                  }}
                  className="hidden md:flex pointer-events-auto w-12 h-12 md:w-20 md:h-20 border border-[#008080]/50 md:border-2 rounded-full items-center justify-center text-[#008080] hover:text-[#FFF8DC] hover:border-[#FFF8DC] transition-all bg-black/50 backdrop-blur-md group shrink-0 z-30"
                  whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(0,128,128,0.6)' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="text-[10px] font-mono absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest text-[#008080] hidden md:block">NEXT</div>
                  <ChevronRight size={24} className="md:hidden" />
                  <ChevronRight size={36} className="hidden md:block" />
                </motion.button>
              </div>
            </div>

            {/* Enhanced Particles & Data Streams */}
            {[...Array(isMobile ? 15 : 50)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute"
                style={{
                  width: Math.random() > 0.8 ? '1px' : '2px',
                  height: Math.random() > 0.8 ? '15px' : '2px', // Some long "data streams"
                  backgroundColor: Math.random() > 0.3 ? '#008080' : '#D4AF37',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  boxShadow: `0 0 ${4 + Math.random() * 8}px ${Math.random() > 0.3 ? '#008080' : '#D4AF37'}`,
                }}
                animate={{
                  y: [0, -300 - Math.random() * 400],
                  opacity: [0, 0.8, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 4 + Math.random() * 10,
                  repeat: Infinity,
                  delay: Math.random() * 10,
                  ease: 'linear'
                }}
              />
            ))}

            {/* Rare Digital Glitch Fragments */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`glitch-${i}`}
                className="absolute w-4 h-[1px] bg-[#008080]/40"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0, 0.8, 0],
                  x: [0, 10, -5, 0],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 2 + Math.random() * 5,
                }}
              />
            ))}

            {/* Central Glow Aura */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(0,128,128,0.2) 0%, transparent 70%)',
                filter: 'blur(40px)'
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            {/* HUD Rotating Circle */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <motion.div
                className="relative w-[75vw] md:w-[700px] h-[700px]"
                style={{
                  border: '1px solid rgba(0, 128, 128, 0.15)',
                  borderRadius: '50%'
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[9px] text-[#008080] font-mono tracking-widest opacity-40">[ ACTIVE ]</div>
                <div className="absolute top-1/2 right-0 -translate-y-1/2 text-[9px] text-[#008080] font-mono tracking-widest opacity-40">[ SYNC ]</div>
              </motion.div>
            </div>

            {/* Close Interaction */}
            <motion.button
              onClick={() => setActiveIndex(null)}
              className="absolute top-4 left-4 md:top-12 md:left-12 z-[200] pointer-events-auto text-[#00FFFF] hover:text-[#FFF8DC] transition-colors p-3 md:p-4 border border-[#00FFFF]/40 rounded-full hover:border-[#FFF8DC]/80 bg-[#00FFFF]/10 backdrop-blur-md shadow-[0_0_20px_rgba(0,255,255,0.2)]"
              whileHover={{ scale: 1.1, boxShadow: '0 0 25px rgba(0,255,255,0.4)', backgroundColor: 'rgba(0,255,255,0.2)' }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} strokeWidth={2.5} />
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

function SwipeableInfo({ dept, eventIndex, setEventIndex, onOpenRulebook }: { dept: typeof DEPARTMENTS[number], eventIndex: number, setEventIndex: (i: number) => void, onOpenRulebook: (ev: any) => void }) {
  const [page, setPage] = useState(eventIndex);
  const [direction, setDirection] = useState(0);
  const events = (dept as any).events || [{ title: dept.title, description: dept.description, image: dept.image, date: dept.date, location: dept.location }];

  useEffect(() => {
    if (eventIndex !== page) {
      setDirection(eventIndex > page ? 1 : -1);
      setPage(eventIndex);
    }
  }, [eventIndex, page]);

  const paginate = (newDirection: number) => {
    let nextIndex = page + newDirection;
    if (nextIndex < 0) nextIndex = events.length - 1;
    if (nextIndex >= events.length) nextIndex = 0;

    setEventIndex(nextIndex);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
      scale: 0.7,
      rotateY: direction > 0 ? 60 : -60,
      rotateX: direction > 0 ? -10 : 10,
      y: direction > 0 ? 50 : -50
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      rotateX: 0,
      y: 0
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 200 : -200,
      opacity: 0,
      scale: 0.7,
      rotateY: direction < 0 ? 60 : -60,
      rotateX: direction < 0 ? -10 : 10,
      y: direction < 0 ? 50 : -50
    })
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
            x: { type: "spring", stiffness: 400, damping: 35 },
            y: { type: "spring", stiffness: 400, damping: 35 },
            scale: { type: "spring", stiffness: 400, damping: 35 },
            rotateY: { type: "spring", stiffness: 400, damping: 35 },
            rotateX: { type: "spring", stiffness: 400, damping: 35 },
            opacity: { duration: 0.12 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.4}
          onDragEnd={(e: any, { offset }: any) => {
            if (offset.x < -40) paginate(1);
            else if (offset.x > 40) paginate(-1);
          }}
          onWheel={(e) => {
            if (Math.abs(e.deltaX) > 30) {
              if (e.deltaX > 0) paginate(1);
              else paginate(-1);
            }
          }}
          className="absolute w-full h-full bg-[#020608] border-2 border-[#008080]/50 rounded-sm overflow-x-hidden overflow-y-auto no-scrollbar flex flex-col cursor-grab active:cursor-grabbing shadow-[0_0_80px_rgba(0,128,128,0.4)] hover:shadow-[0_0_120px_rgba(0,128,128,0.6)] transition-shadow"
          style={{
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden'
          }}
          whileHover={{
            boxShadow: '0 0 120px rgba(0,128,128,0.6), inset 0 0 40px rgba(0,128,128,0.1)'
          }}
        >
          {/* Animated Border Glow */}
          <motion.div
            className="absolute inset-0 rounded-sm pointer-events-none"
            style={{
              border: '1px solid transparent',
              borderImageSource: 'linear-gradient(135deg, #008080, #D4AF37, #008080)',
              borderImageSlice: 1,
              boxShadow: 'inset 0 0 30px rgba(0,128,128,0.2)'
            }}
            animate={{
              boxShadow: [
                'inset 0 0 30px rgba(0,128,128,0.2)',
                'inset 0 0 50px rgba(0,128,128,0.4)',
                'inset 0 0 30px rgba(0,128,128,0.2)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Square Card Layout - High Contrast */}
          <div className="relative w-full h-[27%] md:h-[38%] shrink-0 overflow-hidden grayscale contrast-150">
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full"
            >
              <Image
                src={events[page].image}
                alt={events[page].title}
                fill
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-[#008080]/20 mix-blend-color" />
            <motion.div
              className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#020608] to-transparent"
              animate={{ height: ['64px', '80px', '64px'] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Top glow effect */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>

          <motion.div
            className="px-3 md:px-10 py-2.5 md:py-5 flex-1 flex flex-col justify-start text-left min-h-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.div
              className="text-[9px] md:text-[12px] font-mono text-[#008080] mb-1 md:mb-2 font-bold tracking-[0.42em] md:tracking-[0.5em] uppercase"
              animate={{
                textShadow: [
                  '0 0 10px rgba(0,128,128,0.3)',
                  '0 0 20px rgba(0,128,128,0.6)',
                  '0 0 10px rgba(0,128,128,0.3)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {dept.id} // EVT-{String(page + 1).padStart(2, '0')}
            </motion.div>

            <motion.h2
              className="text-[28px] md:text-3xl font-mono font-bold text-[#FFF8DC] tracking-tighter uppercase mb-1 leading-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {events[page].title}
            </motion.h2>

            <motion.h3
              className="text-[8px] md:text-[9px] font-mono tracking-[0.22em] md:tracking-[0.35em] text-[#D4AF37] uppercase mb-2 md:mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {dept.subtitle}
            </motion.h3>

            <motion.p
              className="font-mono text-[9.5px] md:text-[12px] text-[#FFF8DC]/80 leading-[1.5] mb-2.5 md:mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {events[page].description}
            </motion.p>

            <motion.div
              className="mt-auto grid grid-cols-2 gap-2 md:gap-6 border-t border-[#008080]/30 pt-2.5 md:pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <motion.div
                className="text-left"
                whileHover={{ x: 5 }}
              >
                <div className="text-[7px] md:text-[9px] text-[#008080] tracking-[0.2em] md:tracking-widest uppercase mb-1 font-bold">Time Log</div>
                <div className="text-[10px] md:text-[11px] text-[#FFF8DC] font-mono">{events[page].date}</div>
              </motion.div>
              <motion.div
                className="text-left"
                whileHover={{ x: 5 }}
              >
                <div className="text-[7px] md:text-[9px] text-[#008080] tracking-[0.2em] md:tracking-widest uppercase mb-1 font-bold">Sector</div>
                <div className="text-[10px] md:text-[11px] text-[#FFF8DC] font-mono">{events[page].location}</div>
              </motion.div>
            </motion.div>

            {/* ACTION BUTTONS */}
            <div className="mt-2 md:mt-4 space-y-2 pointer-events-auto">
              <motion.button
                type="button"
                className="w-full relative overflow-hidden group"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.72, duration: 0.5 }}
                onClick={(e) => { e.stopPropagation(); goToRegistration(events[page]); }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.24) 50%, transparent 100%)',
                  }}
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                />
                <div className="relative border border-[#D4AF37] py-2.5 md:py-3.5 px-3 md:px-4 flex items-center justify-between gap-2 bg-[#D4AF37]/25 shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:bg-[#D4AF37]/35 transition-colors">
                  <div className="flex items-center gap-2.5 md:gap-3 min-w-0">
                    <motion.div
                      className="w-4 h-4 md:w-5 md:h-5 border-2 border-[#D4AF37] flex items-center justify-center shrink-0"
                      animate={{ rotateY: [0, 180, 360] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    >
                      <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
                    </motion.div>
                    <span className="text-[10px] md:text-[13px] font-mono tracking-[0.18em] md:tracking-[0.4em] text-[#FFF8DC] uppercase font-black leading-tight drop-shadow-lg">REGISTER NOW</span>
                  </div>
                  <span className="shrink-0 text-[9px] md:text-[11px] font-mono font-bold text-[#D4AF37] bg-black/40 px-2 py-0.5 rounded-sm">{getRegistrationMeta(events[page]).fee}</span>
                </div>
              </motion.button>

              <motion.button
                type="button"
                className="w-full relative overflow-hidden group"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.78, duration: 0.5 }}
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
                <div className="relative border border-[#00FFFF]/50 group-hover:border-[#D4AF37]/90 transition-all duration-300 py-2.5 md:py-3.5 px-3 md:px-4 flex items-center justify-between gap-2 bg-black/40 group-hover:bg-[#D4AF37]/10">
                  <div className="flex items-center gap-2.5 md:gap-3 min-w-0">
                    <motion.div
                      className="w-4 h-4 md:w-5 md:h-5 border-2 border-[#00FFFF]/70 group-hover:border-[#D4AF37] transition-colors flex items-center justify-center shrink-0"
                      animate={{ rotateY: [0, 180, 360] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    >
                      <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-[#00FFFF] group-hover:bg-[#D4AF37] transition-colors shadow-[0_0_8px_rgba(0,255,255,0.6)]" />
                    </motion.div>
                    <span className="text-[10px] md:text-[13px] font-mono tracking-[0.16em] md:tracking-[0.4em] text-[#00FFFF] group-hover:text-[#FFF8DC] transition-colors uppercase font-black leading-tight drop-shadow-[0_0_10px_rgba(0,255,255,0.5)]">ACCESS RULE BOOK</span>
                  </div>
                  <div className="flex items-center gap-1 md:gap-1.5 opacity-80 shrink-0">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-[2px] md:w-[3px] bg-[#00FFFF] group-hover:bg-[#D4AF37] transition-colors"
                        animate={{ height: ['6px', '16px', '6px'] }}
                        transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
                      />
                    ))}
                  </div>
                </div>
              </motion.button>
            </div>
          </motion.div>

          {/* Animated Corner Accents */}
          <motion.div
            className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#D4AF37]/70 rounded-sm"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#D4AF37]/70 rounded-sm"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.2 }}
          />
          <motion.div
            className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#D4AF37]/70 rounded-sm"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.4 }}
          />
          <motion.div
            className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#D4AF37]/70 rounded-sm"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.6 }}
          />
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
  event: any;
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
      className="fixed inset-0 z-[200] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Deep-space backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/95 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Ambient teal glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,128,128,0.08) 0%, transparent 70%)' }} />
      </div>

      {/* Moving scan line */}
      <motion.div
        className="absolute inset-x-0 h-[1px] bg-[#00FFFF]/10 pointer-events-none z-10"
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        style={{ boxShadow: '0 0 12px #00FFFF' }}
      />

      {/* Fine grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#00FFFF 1px, transparent 1px), linear-gradient(90deg, #00FFFF 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Floating corner particles */}
      {[...Array(24)].map((_, i) => (
        <motion.div
          key={`rp-${i}`}
          className="absolute pointer-events-none rounded-full"
          style={{
            width: Math.random() > 0.7 ? 3 : 2,
            height: Math.random() > 0.7 ? 3 : 2,
            background: i % 3 === 0 ? '#D4AF37' : '#008080',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: `0 0 6px ${i % 3 === 0 ? '#D4AF37' : '#008080'}`,
          }}
          animate={{ y: [0, -180 - Math.random() * 200], opacity: [0, 0.9, 0], x: [(Math.random() - 0.5) * 40] }}
          transition={{ duration: 5 + Math.random() * 6, repeat: Infinity, delay: Math.random() * 6, ease: 'linear' }}
        />
      ))}

      {/* MAIN HOLOGRAM CONTAINER */}
      <motion.div
        className="relative z-20 w-[calc(100%-1rem)] md:w-full max-w-4xl mx-2 md:mx-4 max-h-[92vh] overflow-hidden"
        initial={{ scale: 0.6, rotateX: 40, opacity: 0, y: 60 }}
        animate={{ scale: 1, rotateX: 0, opacity: 1, y: 0 }}
        exit={{ scale: 0.5, rotateX: -30, opacity: 0, y: -80 }}
        transition={{ type: 'spring', stiffness: 90, damping: 18 }}
        style={{ perspective: '1600px', transformStyle: 'preserve-3d' }}
      >
        {/* Outer glow ring */}
        <motion.div
          className="absolute -inset-6 pointer-events-none rounded-sm"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ boxShadow: '0 0 80px rgba(0,128,128,0.25), 0 0 160px rgba(0,128,128,0.1)' }}
        />

        {/* TOP HEADER BAR */}
        <motion.div
          className="border border-b-0 border-[#008080]/60 bg-[#020c0c] px-3 md:px-6 py-2.5 md:py-3 flex items-center justify-between gap-2 relative overflow-hidden"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          {/* Header sweep */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(0,128,128,0.12) 50%, transparent 100%)' }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
          />
          <div className="flex items-center gap-2 md:gap-4 min-w-0">
            {/* Animated book icon */}
            <motion.div
              className="w-7 h-7 md:w-8 md:h-8 border border-[#008080] flex items-center justify-center relative shrink-0"
              animate={{ borderColor: ['rgba(0,128,128,0.6)', 'rgba(212,175,55,0.8)', 'rgba(0,128,128,0.6)'] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <motion.div
                className="absolute inset-[3px] border border-[#008080]/40"
                animate={{ rotate: [0, 90, 180, 270, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              <span className="text-[#008080] text-[10px] font-mono font-bold relative z-10">RB</span>
            </motion.div>
            <div className="min-w-0">
              <div className="hidden md:block text-[8px] md:text-[9px] font-mono text-[#008080]/70 tracking-[0.16em] md:tracking-[0.5em] uppercase truncate">DIRECTIVE FILE - CLASSIFICATION: OPEN</div>
              <div className="text-[11px] md:text-base font-mono font-bold text-[#FFF8DC] tracking-[0.08em] md:tracking-widest uppercase leading-tight break-words">{event.title} // RULE PROTOCOL</div>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <div className="text-right hidden md:block">
              <div className="text-[9px] font-mono text-[#008080]/60 tracking-widest">EVENT ID</div>
              <div className="text-sm font-mono text-[#D4AF37]">{event.id}</div>
            </div>
            <motion.button
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              className="w-9 h-9 border border-[#008080]/40 hover:border-[#D4AF37]/70 text-[#008080] hover:text-[#D4AF37] transition-all flex items-center justify-center"
              whileHover={{ scale: 1.1, boxShadow: '0 0 12px rgba(212,175,55,0.4)' }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={16} />
            </motion.button>
          </div>
        </motion.div>

        {/* BODY */}
        <div className="border border-[#008080]/60 bg-[#020c0c]/98 relative overflow-hidden">
          {/* Scanlines overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.025]" style={{ background: 'repeating-linear-gradient(0deg, #00FFFF 0px, #00FFFF 1px, transparent 1px, transparent 3px)', zIndex: 1 }} />

          {/* Inner top shimmer */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#008080]/60 to-transparent" />

          {event.rulebook && (
            <div className="relative z-10 px-3 pt-3 md:hidden">
              <motion.a
                href={event.rulebook}
                download
                className="inline-flex w-full items-center justify-center gap-2 border border-[#D4AF37]/50 bg-[#D4AF37]/10 px-3 py-2 text-[#D4AF37] transition-all rounded-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download size={13} />
                <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em]">Download Rulebook</span>
              </motion.a>
            </div>
          )}

          {/* Boot Phase */}
          {phase === 'boot' && (
            <motion.div
              className="flex flex-col items-center justify-center py-24 gap-6"
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-16 h-16 border-2 border-[#008080]/60 relative flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <motion.div
                  className="absolute inset-2 border border-[#D4AF37]/40"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
                <div className="w-2 h-2 bg-[#008080] rounded-full" />
              </motion.div>
              <motion.p
                className="text-[11px] font-mono text-[#008080] tracking-[0.5em] uppercase"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                INITIALISING HOLOGRAM PROJECTOR
              </motion.p>
            </motion.div>
          )}

          {/* Decrypt Phase */}
          {phase === 'decrypt' && (
            <motion.div
              className="flex flex-col items-center justify-center py-24 gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-[11px] font-mono text-[#D4AF37] tracking-[0.4em] uppercase">DECRYPTING DIRECTIVE ARCHIVE</div>
              <div className="w-64 h-[2px] bg-[#008080]/20 relative overflow-hidden rounded-full">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#008080] to-[#00FFFF]"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.1, ease: 'easeInOut' }}
                  style={{ boxShadow: '0 0 10px #00FFFF' }}
                />
              </div>
              <motion.div
                className="w-48 text-center text-[9px] font-mono text-[#008080]/50 tracking-widest"
                animate={{ opacity: [0.3, 0.9, 0.3] }}
                transition={{ duration: 0.4, repeat: Infinity }}
              >
                {['0xA3F_INIT', 'SYS_AUTH_OK', 'READING_DIRECTIVES', 'HOLOGRAM_READY...'][Math.floor(Math.random() * 4)]}
              </motion.div>
            </motion.div>
          )}

          {/* LIVE Phase */}
          {phase === 'live' && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] min-h-[360px] md:min-h-[400px] max-h-[78vh] md:max-h-[70vh]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* LEFT PANEL - event metadata */}
              <motion.div
                className="hidden md:flex border-b md:border-b-0 md:border-r border-[#008080]/30 p-4 md:p-6 flex-col gap-4 md:gap-5 relative min-w-0"
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                {/* Animated vert line accent */}
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-[2px]"
                  style={{ background: 'linear-gradient(to bottom, transparent, #008080, transparent)' }}
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />

                <div>
                  <div className="text-[8px] font-mono text-[#008080]/60 tracking-[0.5em] uppercase mb-1">Sector Code</div>
                  <div className="text-3xl font-mono font-bold text-[#008080] drop-shadow-[0_0_12px_#008080]">{event.id}</div>
                </div>

                <div>
                  <div className="text-[8px] font-mono text-[#008080]/60 tracking-[0.5em] uppercase mb-1">Operation</div>
                  <div className="text-sm md:text-base font-mono font-bold text-[#FFF8DC] uppercase tracking-wide break-words">{event.title}</div>
                </div>

                <div>
                  <div className="text-[8px] font-mono text-[#008080]/60 tracking-[0.5em] uppercase mb-1">Classification</div>
                  <div className="text-[10px] md:text-[11px] font-mono text-[#D4AF37] uppercase tracking-[0.12em] md:tracking-wider break-words">{event.subtitle}</div>
                </div>

                <div>
                  <div className="text-[8px] font-mono text-[#008080]/60 tracking-[0.5em] uppercase mb-1">Time Window</div>
                  <div className="text-[11px] font-mono text-[#FFF8DC]/80">{event.date}</div>
                </div>

                <div>
                  <div className="text-[8px] font-mono text-[#008080]/60 tracking-[0.5em] uppercase mb-1">Deployment Zone</div>
                  <div className="text-[10px] md:text-[11px] font-mono text-[#FFF8DC]/80 break-words">{event.location}</div>
                </div>

                {/* Directive count badge */}
                <motion.div
                  className="mt-auto border border-[#008080]/40 p-3 relative overflow-hidden"
                  animate={{ boxShadow: ['0 0 10px rgba(0,128,128,0.1)', '0 0 25px rgba(0,128,128,0.3)', '0 0 10px rgba(0,128,128,0.1)'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <motion.div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(0,128,128,0.08), transparent)' }}
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                  />
                  <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-3">
                    <div>
                      <div className="text-[8px] font-mono text-[#008080]/60 tracking-[0.4em] uppercase mb-1">Directives Loaded</div>
                      <div className="text-2xl font-mono font-bold text-[#D4AF37]">
                        {String(revealedRules).padStart(2, '0')}
                        <span className="text-sm text-[#D4AF37]/40"> / {String(event.rules.length).padStart(2, '0')}</span>
                      </div>
                    </div>
                    {event.rulebook && (
                      <motion.a
                        href={event.rulebook}
                        download
                        className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#D4AF37] hover:bg-[#D4AF37]/20 transition-all rounded-sm group relative z-10 max-w-full"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Download size={12} className="group-hover:animate-bounce" />
                        <span className="text-[9px] font-mono font-bold uppercase tracking-[0.16em] md:tracking-wider">Download Rulebook</span>
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              </motion.div>

              {/* RIGHT PANEL - directives */}
              <div className="p-3 md:p-7 flex flex-col gap-3 relative min-w-0 max-h-[74vh] md:max-h-[65vh] overflow-y-auto custom-scrollbar">
                {/* Top accent strip */}
                <div className="absolute top-0 inset-x-0 flex gap-[2px] overflow-hidden h-[3px]">
                  {[...Array(40)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 bg-[#008080]"
                      animate={{ opacity: [0.1, 0.8, 0.1] }}
                      transition={{ duration: 1.5, delay: i * 0.04, repeat: Infinity }}
                    />
                  ))}
                </div>

                <div className="text-[8px] md:text-[9px] font-mono text-[#008080]/70 tracking-[0.24em] md:tracking-[0.5em] uppercase mb-2 break-words">
                  OPERATIONAL DIRECTIVES
                </div>

                {event.rules.map((rule: string, idx: number) => (
                  idx < revealedRules ? (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 30, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="relative group cursor-pointer"
                      onClick={() => setActiveRule(activeRule === idx ? null : idx)}
                    >
                      <div
                        className={`border rounded-[1px] px-3 md:px-4 py-2.5 md:py-3 flex items-start gap-2.5 md:gap-4 transition-all duration-300 relative overflow-hidden
                          ${activeRule === idx
                            ? 'border-[#D4AF37]/70 bg-[#D4AF37]/5 shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                            : 'border-[#008080]/25 bg-[#008080]/3 group-hover:border-[#008080]/60 group-hover:bg-[#008080]/8'
                          }`}
                      >
                        {/* Active rule glow sweep */}
                        {activeRule === idx && (
                          <motion.div
                            className="absolute inset-0 pointer-events-none"
                            style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.06), transparent)' }}
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                          />
                        )}

                        {/* Directive number */}
                        <div className={`shrink-0 w-6 h-6 border flex items-center justify-center transition-colors duration-300
                          ${activeRule === idx ? 'border-[#D4AF37]/70 text-[#D4AF37]' : 'border-[#008080]/50 text-[#008080]'}
                        `}>
                          <span className="text-[9px] font-mono font-bold">{String(idx + 1).padStart(2, '0')}</span>
                        </div>

                        {/* Rule text */}
                        <p className={`text-[11px] md:text-[12px] font-mono leading-relaxed transition-colors duration-300 flex-1 min-w-0 break-words
                          ${activeRule === idx ? 'text-[#FFF8DC]' : 'text-[#FFF8DC]/65 group-hover:text-[#FFF8DC]/90'}
                        `}>
                          {rule}
                        </p>

                        {/* Active indicator dot */}
                        <motion.div
                          className={`shrink-0 w-1.5 h-1.5 rounded-full mt-1 transition-colors duration-300
                            ${activeRule === idx ? 'bg-[#D4AF37]' : 'bg-[#008080]/40'}
                          `}
                          animate={activeRule === idx ? { opacity: [1, 0.3, 1], boxShadow: ['0 0 4px #D4AF37', '0 0 12px #D4AF37', '0 0 4px #D4AF37'] } : { opacity: 1 }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      </div>

                      {/* Left accent line on hover */}
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full"
                        style={{ background: activeRule === idx ? '#D4AF37' : '#008080' }}
                        animate={activeRule === idx ? { opacity: [0.7, 1, 0.7], scaleY: [0.9, 1, 0.9] } : { opacity: 0 }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </motion.div>
                  ) : (
                    <div
                      key={idx}
                      className="border border-[#008080]/10 rounded-[1px] px-4 py-3 flex items-center gap-4 opacity-20"
                    >
                      <div className="w-6 h-6 border border-[#008080]/30" />
                      <div className="flex-1 h-[10px] bg-[#008080]/20 rounded-sm overflow-hidden relative">
                        <motion.div
                          className="absolute inset-y-0 left-0 bg-[#008080]/30"
                          animate={{ width: ['0%', '60%', '20%', '80%', '40%'] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: idx * 0.1 }}
                        />
                      </div>
                    </div>
                  )
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* FOOTER BAR */}
        <motion.div
          className="hidden md:flex border border-t-0 border-[#008080]/60 bg-[#020c0c] px-3 md:px-6 py-2 items-center justify-between overflow-hidden relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(0,128,128,0.06), transparent)' }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
          <div className="hidden md:block text-[8px] font-mono text-[#008080]/40 tracking-[0.5em] uppercase">
            CLASSIFIED_PROTOCOL // {event.title} // SAMVEEKSHANA_2K26
          </div>
          <div className="md:hidden text-[8px] font-mono text-[#008080]/50 tracking-[0.2em] uppercase truncate">
            PROTOCOL // {event.id}
          </div>
          <div className="flex items-center gap-4">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-[1px] bg-[#008080]"
                animate={{ height: ['6px', '14px', '6px'], opacity: [0.3, 0.9, 0.3] }}
                transition={{ duration: 0.7, delay: i * 0.12, repeat: Infinity }}
              />
            ))}
          </div>
        </motion.div>

        {/* Corner HUD brackets */}
        {[
          'top-0 left-0 border-t-2 border-l-2',
          'top-0 right-0 border-t-2 border-r-2',
          'bottom-0 left-0 border-b-2 border-l-2',
          'bottom-0 right-0 border-b-2 border-r-2',
        ].map((cls, i) => (
          <motion.div
            key={i}
            className={`absolute w-6 h-6 border-[#D4AF37]/60 ${cls}`}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
