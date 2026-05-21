/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['kazama'],
  typescript: { ignoreBuildErrors: true }
}

export default nextConfig
