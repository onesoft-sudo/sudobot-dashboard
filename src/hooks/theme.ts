import { useAppDispatch, useAppSelector } from "@/redux/hooks/AppStoreHooks";
import { setMode as setModeAction, toggle as toggleAction } from "@/redux/slice/ThemeSlice";

export const useTheme = () => {
    const mode = useAppSelector((state) => state.theme.mode);
    const dispatch = useAppDispatch();

    const toggleMode = () => {
        dispatch(toggleAction());
    };

    const setMode = (mode: "dark" | "light") => {
        dispatch(setModeAction(mode));
    };

    return { mode, toggleMode, setMode };
};
