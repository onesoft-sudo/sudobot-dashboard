import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from '../css/Navbar.module.css';

const links = [
    {
        name: "Home",
        url: '/'
    },
    {
        name: 'Contact',
        url: '/contact'
    }
];

export default function Navbar() {
    const router = useRouter();

    return (
        <nav className="p-3 bg-[#222] md:px-[20%] md:flex items-center gap-3">
            <Link href="/" className="text-xl md:text-2xl hover:no-underline text-white hover:text-[#ccc]">SudoBot</Link>

            <ul className={styles.list}>
                {links.map(link => <li><Link href={link.url} className={link.url.trim() === router.asPath.trim() ? styles.active : ''}>{link.name}</Link></li>)}
            </ul>
        </nav>
    );
}