import { Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, MenuList } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { MdInbox, MdSettings, MdShield, MdConstruction, MdPowerSettingsNew, MdMenu, MdArrowDropDown, MdArrowDropUp, MdBarChart, MdCheck } from 'react-icons/md';
import GuildControl from "./GuildControl";

export const SidebarEntries = [
    {
        icon: MdBarChart,
        name: 'Overview',
        href: '/dashboard'
    },
    {
        icon: MdPowerSettingsNew,
        name: 'Basic Settings',
        href: '/dashboard/basicsettings'
    },
    {
        icon: MdShield,
        name: 'Auto Moderation',
        href: '/dashboard/automod'
    },
    {
        icon: MdConstruction,
        name: 'Manual Moderation',
        href: '/dashboard'
    },
    {
        icon: MdSettings,
        name: 'Account Settings',
        href: '/dashboard'
    },
];

export default function Sidebar() {
    const [open, setOpen] = useState(false);

    return (
        <div className="md:min-h-[80vh] bg-[#222] px-4 py-3 rounded">
            <GuildControl />
            <div>
                <div className="mobile">
                    <Button fullWidth={true} className="mb-2" onClick={() => setOpen(s => !s)} endIcon={open ? <MdArrowDropUp size={20} /> : <MdArrowDropDown size={20} />}>
                        Navigate...
                    </Button>
                </div>
                <div className={"md:min-h-[80vh] overflow-hidden " + (open ? '' : 'h-0 p-0 m-0 hidden') + " md:block"} style={{ transition: '0.5s' }}>
                    <List>
                        {SidebarEntries.map(entry => (
                            <ListItem key={entry.name} disablePadding style={{ width: '100%' }}>
                                <Link style={{ width: '100%' }} className="text-inherit no-underline hover:no-underline hover:text-inherit" href={entry.href}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <entry.icon />
                                        </ListItemIcon>
                                        <ListItemText primary={entry.name} />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </div>
        </div>
    );
}