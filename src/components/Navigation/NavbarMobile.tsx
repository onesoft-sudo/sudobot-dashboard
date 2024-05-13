import { links } from "@/config/navbar";
import { items } from "@/config/sidebar";
import { useIsLoggedIn } from "@/hooks/user";
import { Box, Button } from "@mui/material";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdClose } from "react-icons/md";
import Brand from "../Branding/Brand";
import GuildSwitcher from "./GuildSwitcher";

type NavbarMobileProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
};

export default function NavbarMobile({ open, setOpen }: NavbarMobileProps) {
    const pathname = usePathname();
    const isLoggedIn = useIsLoggedIn();

    return (
        <>
            {open && (
                <div
                    className="fixed left-0 top-0 z-50 h-screen w-screen bg-[rgba(0,0,0,0.08)] backdrop-blur-[2px] md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            <aside
                className={clsx(
                    "fixed top-0 z-[200] block h-screen max-h-screen w-[75vw] overflow-y-scroll bg-[rgba(0,0,0,0.04)] shadow-[0_0_1px_rgba(255,255,255,0.1)] backdrop-blur-[50px] transition-[2s_ease] scrollbar-hide dark:bg-[rgba(0,0,0,0.1)] md:hidden",
                    {
                        "left-0": open,
                        "left-[-80vw]": !open,
                    },
                )}
            >
                <div className="flex items-center justify-between bg-[rgba(255,255,255,0.3)] px-4 py-[0.57rem] dark:bg-[rgba(0,0,0,0.2)]">
                    <Brand
                        classNames={{
                            image: "h-8 w-8",
                            text: "text-base",
                        }}
                    />
                    <Button onClick={() => setOpen(false)} sx={{ minWidth: 0 }} className="text-black dark:text-white">
                        <MdClose size="1.2rem" />
                    </Button>
                </div>

                {isLoggedIn && (
                    <>
                        <hr className="[border-top:1px_solid_#aaa] dark:[border-top:1px_solid_#333]" />

                        <div className="p-2">
                            <GuildSwitcher buttonProps={{ fullWidth: true, disableRipple: false }} />
                        </div>

                        <hr className="[border-top:1px_solid_#aaa] dark:[border-top:1px_solid_#333]" />

                        <ul className="flex list-none flex-col gap-1 p-4">
                            {items.map((item) => (
                                <li key={`${item.href}_${item.title}`}>
                                    <Link
                                        href={item.href}
                                        title={item.title}
                                        className={clsx(
                                            "block rounded px-3 py-[0.35rem]",
                                            {
                                                "bg-[rgba(255,255,255,0.2)] dark:bg-[rgba(255,255,255,0.11)]":
                                                    pathname === item.href,
                                            },
                                            "hover:bg-[rgba(255,255,255,0.12)] dark:hover:bg-[rgba(255,255,255,0.09)]",
                                        )}
                                        onClick={() => {
                                            if (pathname !== item.href) {
                                                setOpen(false);
                                            }
                                        }}
                                    >
                                        <Box component="span" display="flex" alignItems="center" gap={2}>
                                            <item.icon />
                                            {item.title}
                                        </Box>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                <hr className="[border-top:1px_solid_#aaa] dark:[border-top:1px_solid_#333]" />

                <ul className="flex list-none flex-col gap-1 p-4">
                    {links.map((value) => (
                        <li key={`${value.href}_${value.title}`}>
                            <Link
                                href={value.href}
                                title={value.title}
                                className={clsx(
                                    "block rounded px-3 py-[0.35rem]",
                                    {
                                        "bg-[rgba(255,255,255,0.2)] dark:bg-[rgba(255,255,255,0.11)]":
                                            pathname === value.href,
                                    },
                                    "hover:bg-[rgba(255,255,255,0.12)] dark:hover:bg-[rgba(255,255,255,0.09)]",
                                )}
                                onClick={() => {
                                    if (pathname !== value.href) {
                                        setOpen(false);
                                    }
                                }}
                            >
                                {value.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>
        </>
    );
}
