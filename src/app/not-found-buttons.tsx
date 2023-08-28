"use client";

import Link from "@/components/Router/Link";
import { Button } from "@nextui-org/react";
import { FC } from "react";

const NotFoundButtons: FC = () => {
    return (
        <div>
            <Button variant="flat" color="primary" size="lg" as={Link} href="/">
                Return to Home
            </Button>
        </div>
    );
};

export default NotFoundButtons;
