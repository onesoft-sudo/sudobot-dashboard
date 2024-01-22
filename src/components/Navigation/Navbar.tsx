import { FC } from 'react';
import styles from '@/styles/Navbar.module.css'
import Image from "next/image";
import logo from '@/images/logo.png'
import Link from "next/link";
import Button from "@/components/Button/Button";
import Links from "@/components/Navigation/Links";

const Navbar: FC = () => {
    return (
        <nav className={styles.navbar}>
            <Link href="/" className={styles.brand}>
                <Image src={logo.src} alt="Logo" height={35} width={35} />
                <span className={styles.brandName}>SudoBot</span>
            </Link>

            <ul className={styles.links}>
                <Links />
            </ul>

            <div className={styles.buttons}>
                <Button>Login</Button>
            </div>
        </nav>
    );
};

export default Navbar;