/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/admin",
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: false,
      },
    ];
  },
  images: {
    path: "/admin/_next/image",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
