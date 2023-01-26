import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

export default function useAuthCheck() {
    const router = useRouter();

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            router.push('/login');
        }
    });
}