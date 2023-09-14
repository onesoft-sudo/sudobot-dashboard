import { useAuthContext } from "@/contexts/AuthContext";

export default function useUser() {
    const { user, dispatch } = useAuthContext();
    return [user, dispatch];
}
