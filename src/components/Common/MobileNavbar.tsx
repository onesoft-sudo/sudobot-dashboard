import { useAuthContext } from "@/contexts/AuthContext";
import useLoggedIn from "@/hooks/useLoggedIn";
import { navbarLinks, sidebarItems } from "@/utils/links";
import { Button, styled } from "@mui/material";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Dispatch, FC, Fragment, SetStateAction } from "react";
import { MdClose } from "react-icons/md";
import logo from "../../images/logo.png";
import styles from "../../styles/MobileNavbar.module.css";
import GuildSwitcher from "../Dashboard/GuildSwitcher";
import Link from "../Router/Link";
type MobileNavbarProps = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const MobileNavbar: FC<MobileNavbarProps> = ({ isOpen, setIsOpen }) => {
    const pathname = usePathname();
    const { currentGuild, user } = useAuthContext();
    const loggedIn = useLoggedIn() && !!currentGuild;
    const items = [...navbarLinks, ...(loggedIn ? sidebarItems : [])];
    const CustomButton = styled(Button)({
        minWidth: 0,
        padding: "3px 5px",
        marginRight: "10px",
        marginTop: "5px",
        marginBottom: "5px",
    });

    return (
        <nav
            className={`${styles.mobileNavbar} ${
                isOpen ? styles.open : styles.closed
            } md:hidden`}
        >
            <div className="flex justify-between items-center pl-3 py-2">
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
                <CustomButton onClick={() => setIsOpen(false)}>
                    <MdClose size={28} />
                </CustomButton>
            </div>

            <div className="list-none pt-5 border-t-[1px] border-t-[rgba(255,255,255,0.1)]">
                {items.map((item, index) => {
                    const Icon = (("icon" in item ? item.icon : null) ??
                        (() => null)) as FC<any>;

                    return (
                        <Fragment key={index}>
                            {loggedIn && index === navbarLinks.length && (
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
                                {"icon" in item && (
                                    <Icon className={styles.icon} />
                                )}
                                <span>{item.name}</span>
                            </Link>
                        </Fragment>
                    );
                })}
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
