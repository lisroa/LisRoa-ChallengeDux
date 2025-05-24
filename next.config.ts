import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    async redirects() {
        return [
            {
                source: '/',
                destination: '/user',
                permanent: true, // or false if you might change it later
            },
        ]
    },
};

export default nextConfig;
