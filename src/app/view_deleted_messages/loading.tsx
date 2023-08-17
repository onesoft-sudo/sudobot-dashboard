import { LinearProgress } from "@mui/material";
import { FC } from "react";

const ViewDeletedMessagesLoading: FC = () => {
    return (
        <div>
            <LinearProgress />
            <div className="my-4 text-center text-2xl md:text-3xl">
                Loading...
            </div>
        </div>
    );
};

export default ViewDeletedMessagesLoading;
