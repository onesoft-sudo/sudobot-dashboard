import { useAuthContext } from "@/contexts/AuthContext";
import useLoggedIn from "@/hooks/useLoggedIn";
import { Button } from "@mui/material";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Dispatch, FC, Fragment, SetStateAction } from "react";
import { MdClose } from "react-icons/md";
import logo from "../../images/logo.png";
import styles from "../../styles/MobileNavbar.module.css";
import Link from "../Router/Link";
import GuildSwitcher from "./GuildSwitcher";
import { sidebarItems } from "./Sidebar";

type MobileNavbarProps = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const MobileNavbar: FC<MobileNavbarProps> = ({ isOpen, setIsOpen }) => {
    const pathname = usePathname();
    const { currentGuild, user } = useAuthContext();

    if (!useLoggedIn() || !currentGuild) {
        return <></>;
    }

    return (
        <nav
            className={`${styles.mobileNavbar} ${
                isOpen ? styles.open : styles.closed
            }`}
        >
            <div className="flex justify-between items-center pl-3">
                <div>
                    <Link
                        onClick={() => setIsOpen(false)}
                        href="/"
                        className="flex items-center"
                    >
                        <Image
                            src={logo.src}
                            alt="[Logo]"
                            width={30}
                            height={30}
                        />
                        <p className="font-bold text-inherit ml-3">SudoBot</p>
                    </Link>
                </div>
                <Button
                    className="min-w-[0] m-2"
                    onClick={() => setIsOpen(false)}
                >
                    <MdClose size={28} />
                </Button>
            </div>

            <div className="list-none pt-5 border-t-[1px] border-t-[rgba(255,255,255,0.1)]">
                {sidebarItems.map((item, index) => (
                    <Fragment key={index}>
                        {index === sidebarItems.length - 1 && (
                            <div className={styles.spacer}></div>
                        )}
                        <Link
                            onClick={() => setIsOpen(false)}
                            href={item.url.replaceAll(
                                "{id}",
                                currentGuild?.id ?? "__"
                            )}
                            className={
                                styles.item +
                                (pathname ===
                                item.url.replaceAll(
                                    "{id}",
                                    currentGuild?.id ?? "__"
                                )
                                    ? ` ${styles.activeItem}`
                                    : "")
                            }
                        >
                            <item.icon className={styles.icon} />
                            <span>{item.name}</span>
                        </Link>
                    </Fragment>
                ))}
            </div>

            <div className="pl-[20px] mt-4 pt-4 border-t-[1px] border-t-[rgba(255,255,255,0.1)]">
                {user && (
                    <div className="md:hidden">
                        <GuildSwitcher
                            buttonClasses="pl-0 ml-0 min-w-[0]"
                            onGuildSwitch={() => setIsOpen(false)}
                        />
                    </div>
                )}
            </div>
        </nav>
    );
};

export default MobileNavbar;
