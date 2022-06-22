/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: ['src'],
  },
  compiler: {
    // Включение babel-plugin-styled-components.
    styledComponents: true,
  },
}

export default nextConfig
