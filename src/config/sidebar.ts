import { MdDashboard, MdOutlineShield, MdSettings, MdTerminal } from "react-icons/md";

export const items = [
    {
        title: "Dashboard",
        icon: MdDashboard,
        href: "/dashboard",
    },
    {
        title: "Commands",
        icon: MdTerminal,
        href: "/settings/commands",
    },
    {
        title: "Auto Moderation",
        icon: MdOutlineShield,
        href: "/settings/automod",
    },
    {
        title: "Settings",
        icon: MdSettings,
        href: "/account/settings",
    },
];
