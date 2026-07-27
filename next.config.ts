import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Emit directory-style pages (out/en/index.html) so locale URLs like /en/ resolve on
  // GitHub Pages without relying on host-specific "clean URL" rewriting.
  trailingSlash: true,
};

export default nextConfig;
