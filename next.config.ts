import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Let browsers and Vercel reuse resized images for 31 days instead of re-checking every visit.
    minimumCacheTTL: 2678400,
  },
  async redirects() {
    return [
      // Friendly aliases people may type or that we may print on flyers and ads.
      { source: "/skill-game", destination: "/skill-games", permanent: true },
      { source: "/replace-skill-games", destination: "/skill-games", permanent: true },
      { source: "/skill-game-replacement", destination: "/skill-games", permanent: true },
      { source: "/host", destination: "/host-a-machine", permanent: true },
      { source: "/find-a-machine", destination: "/locations", permanent: true },
      { source: "/pokemon", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
