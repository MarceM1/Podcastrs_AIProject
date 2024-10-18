/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    typescript:{
      ignoreBuildErrors:true,
    },
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lovely-flamingo-139.convex.cloud",
      },
      {
        protocol: "https",
        hostname: "effervescent-capybara-976.convex.cloud",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
};

export default nextConfig;
