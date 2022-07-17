/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  concurrentFeatures: true,
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
}
