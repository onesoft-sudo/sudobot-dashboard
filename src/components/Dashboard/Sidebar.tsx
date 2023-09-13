"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import useLoggedIn from "@/hooks/useLoggedIn";
import { sidebarItems } from "@/utils/links";
import { Box } from "@mui/material";
import { usePathname } from "next/navigation";
import { FC, Fragment } from "react";
import Link from "../Router/Link";

const Sidebar: FC = () => {
    const pathname = usePathname();
    const { currentGuild } = useAuthContext();

    if (!useLoggedIn() || !currentGuild) {
        return <></>;
    }

    return (
        <aside className={`h-[100%]`}>
            <Box
                className="scrollbar-hide md:scrollbar-default bg-[linear-gradient(45deg,rgba(255,255,255,0.05),rgba(255,255,255,0.1))] h-[100%] relative shadow-[0_0_5px_0_rgba(255,255,255,0.3)] [backdrop-filter:blur(10px)] md:h-[calc(100vh-65px)] md:mb-0"
                sx={{
                    "@media (max-width: 970px)": {
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                        height: "auto",
                        display: "flex",
                        alignItems: "center",
                        overflowX: "scroll",
                    },
                }}
            >
                {sidebarItems.map((item, index) => (
                    <Fragment key={index}>
                        {index === sidebarItems.length - 1 && (
                            <div className="hidden md:absolute md:block bottom-[46px] w-[100%] bg-[#333] h-[1px] rounded-[10px]"></div>
                        )}
                        <Link
                            href={item.url.replaceAll(
                                "{id}",
                                currentGuild?.id ?? "__"
                            )}
                            className={
                                "md:my-[5px] flex items-center gap-[15px] [font-size:1.04em] py-[10px] px-[20px] md:last:absolute md:last:bottom-0 md:last:w-[100%] md:last:my-0 md:last:py-[10px] [min-width:max-content] md:[min-width:auto] mt-0 md:mt-[inherit] hover:bg-[rgba(255,255,255,0.15)]" +
                                (pathname ===
                                item.url.replaceAll(
                                    "{id}",
                                    currentGuild?.id ?? "__"
                                )
                                    ? " md:[border-left:1px_solid_#007bff] relative after:content-[''] after:absolute after:bottom-[0] after:left-0 after:w-[100%] after:bg-[#007bff] after:h-[3px] after:rounded-[10px] after:hover:rounded-tl-[inherit] after:rounded-b-[0] md:after:hidden rounded-tl-none rounded-bl-none"
                                    : "")
                            }
                        >
                            <item.icon />
                            <span>{item.name}</span>
                        </Link>
                    </Fragment>
                ))}
            </Box>
        </aside>
    );
};

export default Sidebar;
