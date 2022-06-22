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
  optimizeFonts: false,
}

export default nextConfig
