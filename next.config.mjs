/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "10.100.203.195",
        port: "5000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "10.100.203.195",
        port: "5000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "10.100.203.78",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "hoanghamobile.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img-s-msn-com.akamaized.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
