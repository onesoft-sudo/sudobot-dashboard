"use client";

import { useCurrentUser } from "@/hooks/user";

export default function WelcomeHeading() {
    const user = useCurrentUser();

    if (!user) {
        return null;
    }

    return <h1 className="text-3xl font-semibold">Welcome back, {user.name ?? user.username}!</h1>;
}
