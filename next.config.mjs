// next.config.mjs
import withTwin from './withTwin.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  eslint: {
    dirs: ['src'],
  },
}

export default withTwin(nextConfig)
