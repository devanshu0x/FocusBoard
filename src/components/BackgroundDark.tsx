import { useMemo } from "react";

type Star = {
  id: number;
  size: number;
  x: number;
  y: number;
  twinkleInterval: number;
  twinkleDelay: number;
};

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, (_, i) => {
    return {
      id: i,
      size: Math.random() * 1.5 + 0.5,
      x: Math.random() * 100,
      y: Math.random() * 100,
      twinkleInterval: Math.random() * 4 + 0.75,
      twinkleDelay: Math.random() * 0.75 + 0.25,
    };
  });
}

export default function BackgroundDark() {
  let starCount = 100;
  const stars = useMemo(() => generateStars(starCount), []);
  return (
    <div className="absolute inset-0 -z-999 bg-linear-to-br from-[#000000] via-[#09071a] to-[#140f23]">
      {stars.map((e) => (
        <div
          key={e.id}
          className="rounded-full absolute bg-white animate-twinkleAnimation"
          style={{
            width: e.size,
            height: e.size,
            left: `${e.x}%`,
            top: `${e.y}%`,
            animationDuration: `${e.twinkleInterval}s`,
            animationDelay: `${e.twinkleDelay}s`,
          }}
        />
      ))}
    </div>
  );
}
