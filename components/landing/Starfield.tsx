// Deterministic starfield (seeded PRNG) so SSR and client markup match.
function makeStars(count: number, seed: number) {
  let s = seed;
  const rand = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
  return Array.from({ length: count }, () => ({
    top: rand() * 100,
    left: rand() * 100,
    size: rand() * 1.6 + 0.6,
    delay: rand() * 5,
    duration: rand() * 4 + 2,
    opacity: rand() * 0.6 + 0.2,
  }));
}

export default function Starfield({
  count = 90,
  seed = 7,
  className = "",
}: {
  count?: number;
  seed?: number;
  className?: string;
}) {
  const stars = makeStars(count, seed);
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {stars.map((st, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top: `${st.top}%`,
            left: `${st.left}%`,
            width: `${st.size}px`,
            height: `${st.size}px`,
            opacity: st.opacity,
            animation: `twinkle ${st.duration}s ease-in-out ${st.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
