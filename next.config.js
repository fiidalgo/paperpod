module.exports = {
  async headers() {
    return []
  },
  experimental: {
    serverComponentsExternalPackages: [],
  },
  webpack: (config) => {
    return config
  },
} 