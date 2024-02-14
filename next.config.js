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
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
            {
                protocol: "http",
                hostname: "**",
            },
        ],
    },
    experimental: {
    	missingSuspenseWithCSRBailout: false
    }
};

module.exports = nextConfig;
