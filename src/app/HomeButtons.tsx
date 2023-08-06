"use client";

import { FC } from "react";
import { Button } from "@nextui-org/react";

const HomeButtons: FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Button
                size="lg"
                style={{ minHeight: 60 }}
                radius="sm"
                variant="flat"
                color="primary"
            >
                Invite
            </Button>

            <Button
                size="lg"
                style={{ minHeight: 60 }}
                radius="sm"
                variant="flat"
                color="primary"
            >
                Set up yourself
            </Button>
        </div>
    );
};

export default HomeButtons;
