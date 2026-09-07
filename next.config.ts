import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // lets a production build run into a separate folder while `next dev` holds
  // .next — on Windows the two cannot share an output dir (EPERM on .next/trace)
  distDir: process.env.NEXT_DIST_DIR || ".next",

  images: {
    // any quality passed to <Image quality={...}> must be allow-listed here
    qualities: [75, 95],
  },
};

export default nextConfig;
