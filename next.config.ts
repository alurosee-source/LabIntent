import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // @ts-ignore - turbopack config is not yet in types
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
