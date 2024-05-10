/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                hostname: "cdn.discordapp.com",
            },
        ],
    },
};

export default nextConfig;
