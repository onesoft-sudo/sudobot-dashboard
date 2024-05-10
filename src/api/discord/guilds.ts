import { Guild } from "@/types/Guild";

export const getGuild = async (id: string): Promise<Guild | null> => {
    if (id === "911987536379912193") {
        return {
            id: "911987536379912193",
            name: "Private Server",
            icon: "83b86b717d62c70a3d98715788259404",
        };
    }

    if (id === "964969362073198652") {
        return {
            id: "964969362073198652",
            name: "OSN's Official Server",
            icon: "72513102a786e607bc8d47ffc342a1f0",
        };
    }

    return null;
};

export const getGuilds = async (ids: string[]): Promise<Guild[]> => {
    if (ids.length === 0) {
        return [];
    }

    const result = [];

    if (ids.includes("911987536379912193")) {
        result.push({
            id: "911987536379912193",
            name: "Private Server",
            icon: "83b86b717d62c70a3d98715788259404",
        });
    }

    if (ids.includes("964969362073198652")) {
        result.push({
            id: "964969362073198652",
            name: "OSN's Official Server",
            icon: "72513102a786e607bc8d47ffc342a1f0",
        });
    }

    return result;
};
