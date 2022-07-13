/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    images: {
      domains: ['firebasestorage.googleapis.com'],
      allowFutureImage: true,
    },
  },
}
