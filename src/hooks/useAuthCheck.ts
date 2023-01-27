import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

export default function useAuthCheck() {
    const router = useRouter();

    useEffect(() => {
        // console.log(localStorage.getItem('user'));
        
        if (!localStorage.getItem('user')) {
            router.push('/login');
        }
    });
}