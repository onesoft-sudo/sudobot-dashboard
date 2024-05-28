"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { PropsWithChildren } from "react";

if (typeof window !== "undefined") {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    });
}

export default function ClientSidePostHogProvider({ children }: PropsWithChildren) {
    return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
