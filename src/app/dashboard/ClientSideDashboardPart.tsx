"use client";

import { useCurrentGuild } from "@/hooks/guild";

export default function ClientSideDashboardPart() {
    const { data: guild } = useCurrentGuild();

    return <div className="px-3">Now viewing: {guild?.name}</div>;
}
