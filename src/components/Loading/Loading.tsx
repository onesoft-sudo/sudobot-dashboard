import { CircularProgress } from "@mui/material";
import { FC } from "react";

const Loading: FC = () => {
    return (
        <div className="text-center flex justify-center items-center gap-3 text-2xl md:text-3xl lg:text-4xl">
            <CircularProgress className="w-[1em] h-[auto]" />
            <h1>Loading...</h1>
        </div>
    );
};

export default Loading;
