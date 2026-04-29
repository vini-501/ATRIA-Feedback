/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['vm-6h7zj6op4a3pnvpbjstfo49x.vusercontent.net'],
}

export default nextConfig
