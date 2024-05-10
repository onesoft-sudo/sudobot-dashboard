import { links } from "@/config/navbar";
import { Button } from "@mui/material";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdClose } from "react-icons/md";
import Brand from "../Branding/Brand";

type NavbarMobileProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
};

export default function NavbarMobile({ open, setOpen }: NavbarMobileProps) {
    const pathname = usePathname();

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
                    "fixed top-0 z-[200] block h-screen max-h-screen w-[75vw] overflow-y-scroll bg-[rgba(0,0,0,0.1)] shadow-[0_0_1px_rgba(255,255,255,0.1)] backdrop-blur-[50px] transition-[2s_ease] scrollbar-hide md:hidden",
                    {
                        "left-0": open,
                        "left-[-80vw]": !open,
                    },
                )}
            >
                <div className="flex items-center justify-between bg-[rgba(0,0,0,0.2)] p-4">
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
                <hr className="[border-top:1px_solid_#777] dark:[border-top:1px_solid_#333]" />

                <ul className="flex list-none flex-col gap-1 p-4">
                    {Object.entries(links).map(([key, value]) => (
                        <li key={key}>
                            <Link
                                href={value.href}
                                className={clsx("block rounded px-3 py-[0.35rem] hover:bg-[rgba(255,255,255,0.09)]", {
                                    "!bg-[rgba(255,255,255,0.11)]": pathname === value.href,
                                })}
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
