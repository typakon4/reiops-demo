const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || "http://localhost:8000";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/backend/:path*",
        destination: `${apiUrl}/api/:path*`
      },
      {
        source: "/health/backend",
        destination: `${apiUrl}/health`
      }
    ];
  }
};

module.exports = nextConfig;
