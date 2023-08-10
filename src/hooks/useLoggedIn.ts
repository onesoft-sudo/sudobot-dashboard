"use client";

import { useAuthContext } from "@/contexts/AuthContext";

export default function useLoggedIn() {
    const { user } = useAuthContext();
    return !!user;
}
