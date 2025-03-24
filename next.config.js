/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  async rewrites() {
    return [
      {
        source: '/api/login',
        destination: 'http://localhost:9000/auth/login'
      },
      {
        source: '/api/signup',
        destination: 'http://localhost:9000/auth/signup'
      }
    ]
  }
}

module.exports = nextConfig
