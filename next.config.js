/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    async rewrites() {
        return [
            {
                source: "/settings/:path*",
                destination: "/dashboard/:path*",
            },
        ];
    },
};

module.exports = nextConfig;
