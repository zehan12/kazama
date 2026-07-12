/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@zehankhan/kazama'],
  typescript: { ignoreBuildErrors: true }
}

export default nextConfig
