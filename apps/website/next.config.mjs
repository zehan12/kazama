/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['kizuna'],
  typescript: { ignoreBuildErrors: true }
}

export default nextConfig
