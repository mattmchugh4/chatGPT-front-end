/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ignore TypeScript errors during the build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ignore ESLint errors during the build
  eslint: {
    ignoreDuringBuilds: true,
  },
};
export default nextConfig;
