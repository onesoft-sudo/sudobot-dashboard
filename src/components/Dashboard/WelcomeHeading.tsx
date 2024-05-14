"use client";

import { useCurrentUser } from "@/hooks/user";
import Heading from "./Heading";

export default function WelcomeHeading() {
    const user = useCurrentUser();

    if (!user) {
        return null;
    }

    return <Heading>Welcome back, {user.name ?? user.username}!</Heading>;
}
