const fs = require('fs');

let content = fs.readFileSync('old_central_events_utf8.txt', 'utf8');

const updatedEvents = `const CENTRAL_EVENTS = [
    { id: 'TMB', title: 'Tambola', description: 'A thrilling game of numbers and luck.', date: 'March 11, 2026', location: 'Main Auditorium', color: 'from-[#D4AF37] to-[#8B6508]', image: '/events/tambola.png' },
    { id: 'T2T', title: 'Trash 2 Tech', description: 'Transform waste into wonder.', date: 'March 11, 2026', location: 'Innovation Lab', color: 'from-[#2ecc71] to-[#1a7a44]', image: '/events/trash 2 tech .png' },
    { id: 'SLC', title: 'Slow Cycling', description: 'The slowest rider wins.', date: 'March 11, 2026', location: 'College Ground', color: 'from-[#e67e22] to-[#d35400]', image: '/events/slow cycling.png' },
    { id: 'MCR', title: 'Musical Chair', description: 'Classic fun reimagined. Last one standing wins it all.', date: 'March 11, 2026', location: 'Open Arena', color: 'from-[#9b59b6] to-[#6c3483]', image: '/events/musical chair.png' },
    { id: 'TLU', title: 'Talent Unleash', description: 'Your stage awaits. Showcase your hidden talents.', date: 'March 12, 2026', location: 'Main Stage', color: 'from-[#e74c3c] to-[#c0392b]', image: '/events/talent unleash.png' },
    { id: 'CTF', title: 'Capture the Flag', description: 'A cybersecurity battleground.', date: 'March 12, 2026', location: 'CSE Lab Block', color: 'from-[#008080] to-[#004d40]', image: '/events/capture the flag.png' },
    { id: 'VAL', title: 'Valorant', description: 'Tactical shooter showdown.', date: 'March 12, 2026', location: 'Gaming Zone', color: 'from-[#ff4655] to-[#bd3944]', image: '/events/valorant.png' },
    { id: 'TRG', title: 'Tech Rangoli', description: 'Art meets technology. Create stunning rangoli designs.', date: 'March 11, 2026', location: 'Central Courtyard', color: 'from-[#f39c12] to-[#e67e22]', image: '/events/tech rangoli.png' },
    { id: 'BBB', title: 'Brainy Bunch Battle', description: 'Battle of the brains. A multi-round quiz.', date: 'March 12, 2026', location: 'Seminar Hall', color: 'from-[#3498db] to-[#2980b9]', image: '/events/Brainy Bunch Battel.png' },
    { id: 'BGM', title: 'BGMI', description: 'Battlegrounds Mobile India Tournament.', date: 'March 11, 2026', location: 'Gaming Arena', color: 'from-[#00b4d8] to-[#0077b6]', image: '/events/Bgmi.png' }
];`;

content = content.replace(/const CENTRAL_EVENTS = \[\s*\{[\s\S]*?\}\s*\];/m, updatedEvents);

content = content.replace(
    /const items = CENTRAL_EVENTS\.map\([\s\S]*?\);/m,
    `const items = CENTRAL_EVENTS.map(evt => evt.image);`
);

content = content.replace(
    /className=\"relative w-full h-\[38%\] md:h-\[45%\] shrink-0 overflow-hidden grayscale contrast-150\"/,
    `className="relative w-full h-[38%] md:h-[45%] shrink-0 overflow-hidden bg-black/40 border-b border-[#008080]/30"`
);

content = content.replace(
    /src=\{\`https:\/\/picsum\.photos\/seed\/\$\{events\[page\]\.id\}\/1000\/1000\`\}/,
    `src={events[page].image}`
);

content = content.replace(
    /className=\"object-cover\"/,
    `className="object-contain"`
);

fs.writeFileSync('components/CentralEventsSequence.tsx', content);

console.log("File successfully replaced");
