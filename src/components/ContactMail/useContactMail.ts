import { useAppDispatch, useAppSelector } from "@/redux/hooks/AppStoreHooks";
import {
    closeDialog,
    openDialog,
    toggleDialog,
} from "@/redux/slice/ContactMailSlice";
import { useCallback } from "react";

export const useContactMail = () => {
    const state = useAppSelector((state) => state.contactMail);
    const dispatch = useAppDispatch();
    const open = useCallback(() => {
        dispatch(openDialog());
    }, [dispatch]);
    const close = useCallback(() => {
        dispatch(closeDialog());
    }, [dispatch]);
    const toggle = useCallback(() => {
        dispatch(toggleDialog());
    }, [dispatch]);

    return {
        open,
        close,
        toggle,
        isOpen: state.dialogOpen,
    };
};
