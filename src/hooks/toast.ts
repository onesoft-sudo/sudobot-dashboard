import { useAppDispatch } from "@/redux/hooks/AppStoreHooks";
import { ToastDetails, addToast, removeToast } from "@/redux/slice/ToastManagerSlice";
import { useRef } from "react";
import { v4 as uuid } from "uuid";

export const useToast = () => {
    const dispatch = useAppDispatch();
    const lastIdRef = useRef<string>();

    return {
        addToast: (details: Omit<ToastDetails, "id">) => {
            const id = uuid();

            lastIdRef.current = id;
            dispatch(
                addToast({
                    ...details,
                    id,
                }),
            );

            return id;
        },
        removeToast: (id?: string) => {
            const finalId = id ?? lastIdRef.current;

            if (!finalId) {
                return;
            }

            dispatch(removeToast(finalId));
        },
    };
};
