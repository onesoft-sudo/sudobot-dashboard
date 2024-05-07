import { links } from "@/config/navbar";
import { Button } from "@nextui-org/button";
import { type FC } from "react";
import Brand from "../Branding/Brand";
import styles from "./Navbar.module.css";

const Navbar: FC = () => {
    return (
        <nav className={styles.navbar}>
            <Brand />

            <ul>
                {Object.entries(links).map(([key, value]) => (
                    <li key={key}>
                        <a href={value.href}>{value.title}</a>
                    </li>
                ))}
            </ul>

            <div>
                <Button color="primary" variant="flat">
                    Login
                </Button>
            </div>
        </nav>
    );
};

export default Navbar;
