"use client";

import { Button } from "@mui/material";
import { ComponentProps, FC } from "react";

export interface StepControlsProps {
    back?: boolean;
    next?: boolean;
    onBack?: () => void;
    onNext?: () => void;
}

const StepControls: FC<StepControlsProps & ComponentProps<"div">> = ({
    back,
    next,
    onBack,
    onNext,
    ...props
}) => {
    return (
        <div
            {...props}
            className={`flex justify-between items-center ${props.className}`}
        >
            <Button onClick={onBack} disabled={!back}>
                Back
            </Button>
            <Button onClick={onNext} disabled={!next}>
                Next
            </Button>
        </div>
    );
};

export default StepControls;
