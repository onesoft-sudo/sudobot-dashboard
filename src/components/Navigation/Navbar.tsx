import { FC } from 'react';
import styles from '@/styles/Navbar.module.css'
import Image from "next/image";
import logo from '@/images/logo.ico'
import Link from "next/link";

const links = [
    {
        name: 'Home',
        url: '/'
    },
    {
        name: 'Features',
        url: '/features'
    },
    {
        name: 'Contact',
        url: '/contact'
    },
    {
        name: 'Documentation',
        url: '/docs'
    }
];

const Navbar: FC = () => {
    return (
        <nav className={styles.navbar}>
            <Link href="/" className={styles.brand}>
                <Image src={logo.src} alt="Logo" height={50} width={50} />
                <span className={styles.brandName}>SudoBot</span>
            </Link>

            <ul className={styles.links}>
                {links.map(link => (
                    <li key={link.url} className={styles.link}>
                        <Link href={link.url} title={link.name} className={styles.linkAnchor}>
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>

            <div></div>
        </nav>
    );
};

export default Navbar;