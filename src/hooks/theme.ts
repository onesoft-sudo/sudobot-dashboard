import { useAppDispatch, useAppSelector } from "@/redux/hooks/AppStoreHooks";
import { setMode as setModeAction, toggle as toggleAction } from "@/redux/slice/ThemeSlice";
import { useCallback } from "react";

export const useTheme = () => {
    const mode = useAppSelector((state) => state.theme.mode);
    const dispatch = useAppDispatch();

    const toggleMode = useCallback(() => {
        dispatch(toggleAction());
    }, [dispatch]);

    const setMode = useCallback(
        (mode: "dark" | "light") => {
            dispatch(setModeAction(mode));
        },
        [dispatch],
    );

    return { mode, toggleMode, setMode };
};
