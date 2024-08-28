import { useAppDispatch, useAppSelector } from "@/redux/hooks/AppStoreHooks";
import { setOpenDialog, toggleDialog } from "@/redux/slice/ContactMailSlice";
import { useCallback } from "react";

export const useContactMail = () => {
    const state = useAppSelector((state) => state.contactMail);
    const dispatch = useAppDispatch();
    const toggle = useCallback(() => {
        dispatch(toggleDialog());
    }, [dispatch]);
    const setOpen = useCallback(
        (value: boolean) => {
            dispatch(setOpenDialog(value));
        },
        [dispatch],
    );

    return {
        toggle,
        setOpen,
        isOpen: state.dialogOpen,
    };
};
