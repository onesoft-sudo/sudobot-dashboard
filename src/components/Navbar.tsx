import Link from "next/link";
import { useRouter } from "next/router";
import styles from '../css/Navbar.module.css';
import ThemeButton from "./ThemeButton";
import { MdClose, MdMenu } from 'react-icons/md';
import { Button } from "@mui/material";
import { useState } from "react";

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

export default function Navbar({ centered = true }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    return (
        <nav className={`p-3 bg-[#222] ${centered ? 'md:px-[20%]' : 'md:px-7'} flex items-center gap-3`}>
            <div className="mobile">
                <ThemeButton className="min-w-0" onClick={() => setOpen(true)}><MdMenu size={20} /></ThemeButton>
            </div>
            <Link href="/" className="text-xl md:text-2xl hover:no-underline text-white hover:text-[#ccc]">SudoBot</Link>

            <div className={"md:flex items-center w-[100%] " + styles.navbarListWrapper + ' ' + (open ? styles.open : styles.closed)}>
                <div className="flex justify-end mobile">
                    <Button className="min-w-0" onClick={() => setOpen(false)}><MdClose size={18} /></Button>
                </div>

                <ul className={styles.list}>
                    {links.map(link => <li key={link.url}><Link href={link.url} className={link.url.trim() === router.asPath.trim() ? styles.active : ''}>{link.name}</Link></li>)}
                </ul>

                <div className="ml-auto">
                    <Link href="/login" style={{ textDecoration: 'none' }}><ThemeButton variant="outlined">Login</ThemeButton></Link>
                </div>
            </div>
        </nav>
    );
}