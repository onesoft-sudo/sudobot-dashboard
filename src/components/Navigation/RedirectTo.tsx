"use client";

import { type FC, useEffect } from "react";
import { useRouter } from "next/navigation";

type RedirectToProps = {
    to: string;
};

const RedirectTo: FC<RedirectToProps> = ({ to }) => {
    const router = useRouter();

    useEffect(() => {
        router.replace(to);        
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return null;
};

export default RedirectTo;
