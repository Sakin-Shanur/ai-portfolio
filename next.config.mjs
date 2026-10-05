/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['172.30.1.53'],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
