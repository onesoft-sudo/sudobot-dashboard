/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    async rewrites() {
        return [
            {
                source: "/settings/:path*",
                destination: "/dashboard/:path*",
            },
            {
                source: "/account",
                destination: "/dashboard/account",
            },
            {
                source: "/account/:path*",
                destination: "/dashboard/account/:path*",
            },
        ];
    },
};

module.exports = nextConfig;
