"use client";

import { BOT_INVITE_REQUEST_URL, DOCS_SELF_SETUP_URL } from "@/utils/links";
import { Button } from "@nextui-org/react";
import { FC } from "react";

const HomeButtons: FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Button
                as={"a"}
                size="lg"
                style={{ minHeight: 60 }}
                radius="sm"
                variant="flat"
                color="primary"
                href={BOT_INVITE_REQUEST_URL}
                target="_blank"
            >
                Invite
            </Button>

            <Button
                as={"a"}
                size="lg"
                style={{ minHeight: 60 }}
                radius="sm"
                variant="flat"
                color="primary"
                href={DOCS_SELF_SETUP_URL}
                target="_blank"
            >
                Set up yourself
            </Button>
        </div>
    );
};

export default HomeButtons;
