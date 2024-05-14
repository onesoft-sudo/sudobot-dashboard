import { useAppDispatch } from "@/redux/hooks/AppStoreHooks";
import { setLoading } from "@/redux/slice/NavigationSlice";
import { useRouter as useNextRouter } from "next/navigation";

export const useRouter = () => {
    const router = useNextRouter();
    const dispatch = useAppDispatch();

    return {
        ...router,
        push: (url: string) => {
            dispatch(setLoading(true));
            router.push(url);
        },
        replace: (url: string) => {
            dispatch(setLoading(true));
            router.replace(url);
        },
        back() {
            dispatch(setLoading(true));
            router.back();
        },
        forward() {
            dispatch(setLoading(true));
            router.forward();
        },
        refresh() {
            dispatch(setLoading(true));
            router.refresh();
        },
    } satisfies typeof router;
};
