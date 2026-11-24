/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    dangerouslyAllowLocalIP: true,
    qualities: [75, 80],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    const strapiUrl = process.env.STRAPI_URL || "http://127.0.0.1:1337";
    return [
      {
        source: "/uploads/:path*",
        destination: `${strapiUrl}/uploads/:path*`,
      },
      {
        source: "/admin",
        destination: `${strapiUrl}/admin`,
      },
      {
        source: "/admin/:path*",
        destination: `${strapiUrl}/admin/:path*`,
      },
      {
        source: "/content-manager/:path*",
        destination: `${strapiUrl}/content-manager/:path*`,
      },
      {
        source: "/content-type-builder/:path*",
        destination: `${strapiUrl}/content-type-builder/:path*`,
      },
      {
        source: "/upload/:path*",
        destination: `${strapiUrl}/upload/:path*`,
      },
      {
        source: "/users-permissions/:path*",
        destination: `${strapiUrl}/users-permissions/:path*`,
      },
      {
        source: "/i18n/:path*",
        destination: `${strapiUrl}/i18n/:path*`,
      },
    ];
  },
};

export default nextConfig;
