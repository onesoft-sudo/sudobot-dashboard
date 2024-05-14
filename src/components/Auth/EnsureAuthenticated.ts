"use client";

import { useCurrentUserInfo } from "@/hooks/user";

export default function EnsureAuthenticated() {
    useCurrentUserInfo(true);
    return null;
}
