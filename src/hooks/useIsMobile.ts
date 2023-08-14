import { useMediaQuery } from "@mui/material";

export default function useIsDesktop() {
    return useMediaQuery("(max-width: 970px)");
}
