import { cn } from "@/lib/utils";

type Props = {
  size: number;
  className?: string;
  /** number of vertical (longitude) rings */
  meridians?: number;
  /** number of horizontal (latitude) rings */
  parallels?: number;
  duration?: number;
};

/**
 * Wireframe globe assembled from CSS-3D rings — meridians rotated around Y,
 * parallels scaled and pushed along Z. Cheaper than a canvas and it inherits
 * the page's colour tokens.
 */
export function Sphere({
  size,
  className,
  meridians = 8,
  parallels = 5,
  duration = 40,
}: Props) {
  const r = size / 2;

  return (
    <div
      className={cn("absolute", className)}
      style={{ width: size, height: size, perspective: size * 3 }}
    >
      <div
        className="preserve-3d relative h-full w-full"
        style={{ animation: `sphere-spin ${duration}s linear infinite` }}
      >
        {/* longitude rings */}
        {Array.from({ length: meridians }).map((_, i) => (
          <div
            key={`m-${i}`}
            className="absolute inset-0 rounded-full border"
            style={{
              transform: `rotateY(${(180 / meridians) * i}deg)`,
              borderColor: i % 2 === 0 ? "rgba(0,212,255,0.22)" : "rgba(124,58,237,0.20)",
            }}
          />
        ))}

        {/* latitude rings */}
        {Array.from({ length: parallels }).map((_, i) => {
          const t = (i + 1) / (parallels + 1); // 0..1 down the sphere
          const phi = (t - 0.5) * Math.PI; // -pi/2 .. pi/2
          // rounded for the same reason as the orbit dots in Portrait.tsx:
          // trig precision is implementation-defined, so raw values can differ
          // between the server and the browser and break hydration
          const ringR = Math.cos(phi).toFixed(4);
          const z = (Math.sin(phi) * r).toFixed(4);
          return (
            <div
              key={`p-${i}`}
              className="absolute inset-0 rounded-full border"
              style={{
                transform: `rotateX(90deg) translateZ(${-Number(z)}px) scale(${ringR})`,
                borderColor: "rgba(236,72,153,0.16)",
              }}
            />
          );
        })}

        {/* core glow */}
        <div
          className="absolute left-1/2 top-1/2 h-1/3 w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
          style={{ background: "radial-gradient(circle, rgba(0,212,255,0.30), transparent 70%)" }}
        />
      </div>
    </div>
  );
}
