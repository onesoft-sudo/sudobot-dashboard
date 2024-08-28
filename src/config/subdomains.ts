export const subdomains: Record<string, SubdomainConfig> = {
    verify: {
        rewrite: "/verify%URI%",
    },
};

type SubdomainConfig = {
    rewrite?: string;
};
