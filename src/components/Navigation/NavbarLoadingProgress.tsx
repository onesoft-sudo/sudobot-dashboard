import { useAppSelector } from "@/redux/hooks/AppStoreHooks";
import { LinearProgress } from "@mui/material";

export default function NavbarLoadingProgress() {
    const { isLoading } = useAppSelector((state) => state.navigation);

    if (!isLoading) {
        return null;
    }

    return (
        <div className="fixed left-0 top-0 z-[10000] h-2 w-full">
            <LinearProgress
                sx={{
                    background: "rgba(0, 123, 255, 0.5)",
                    "& .MuiLinearProgress-bar": {
                        backgroundColor: "#007bff",
                    },
                }}
            />
        </div>
    );
}
