import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Friendly aliases people may type or that we may print on flyers and ads.
      { source: "/skill-game", destination: "/skill-games", permanent: true },
      { source: "/replace-skill-games", destination: "/skill-games", permanent: true },
      { source: "/skill-game-replacement", destination: "/skill-games", permanent: true },
      { source: "/host", destination: "/host-a-machine", permanent: true },
      { source: "/locations", destination: "/find-a-machine", permanent: true },
      { source: "/pokemon", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
