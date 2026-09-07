import { cn } from "@/lib/utils";

type Props = {
  /** edge length in px */
  size: number;
  /** css colour used for the wireframe edges and translucent fill */
  color: string;
  className?: string;
  reverse?: boolean;
  duration?: number;
  delay?: number;
};

const FACES = [
  (h: number) => `rotateY(0deg) translateZ(${h}px)`,
  (h: number) => `rotateY(180deg) translateZ(${h}px)`,
  (h: number) => `rotateY(90deg) translateZ(${h}px)`,
  (h: number) => `rotateY(-90deg) translateZ(${h}px)`,
  (h: number) => `rotateX(90deg) translateZ(${h}px)`,
  (h: number) => `rotateX(-90deg) translateZ(${h}px)`,
];

/** A hollow, slowly tumbling CSS-3D wireframe cube. */
export function Cube({ size, color, className, reverse, duration = 26, delay = 0 }: Props) {
  const half = size / 2;

  return (
    <div className={cn("absolute", className)} style={{ width: size, height: size, perspective: size * 4 }}>
      <div
        className="preserve-3d relative h-full w-full"
        style={{
          animation: `${reverse ? "cube-spin-rev" : "cube-spin"} ${duration}s linear infinite`,
          animationDelay: `${delay}s`,
        }}
      >
        {FACES.map((toTransform, i) => (
          <div
            key={i}
            className="absolute h-full w-full border"
            style={{
              transform: toTransform(half),
              borderColor: color,
              background: `linear-gradient(135deg, ${color}14, transparent 70%)`,
              boxShadow: `inset 0 0 24px ${color}12`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
