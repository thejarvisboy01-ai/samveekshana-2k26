// Server Component — no 'use client' needed, zero JS sent to browser.
// Noise is a static PNG-data-URI baked at build time, not an SVG filter evaluated at paint time.
// The mobile version uses a much lighter 100×100 tile to reduce GPU texture bandwidth.
export default function NoiseOverlay() {
  return (
    <>
      {/* Desktop noise — richer tile */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.04] mix-blend-overlay hidden md:block"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />
      {/* Mobile noise — smaller tile, lower opacity, no mix-blend (cheaper composite) */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.025] md:hidden"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px',
        }}
      />
    </>
  );
}
