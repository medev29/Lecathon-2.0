import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Allow network host for Next.js dev websocket HMR in this environment
  // Use host-only entry per Next.js dev requirement
  allowedDevOrigins: ['10.20.21.208'],
};

export default nextConfig;
