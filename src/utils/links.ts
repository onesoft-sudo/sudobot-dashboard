import { MdConstruction, MdSettings, MdStorage } from "react-icons/md";

export const links = [
    {
        name: 'Home',
        url: '/'
    },
    {
        name: 'Services',
        children: [
            {
                name: 'Managed Bot',
                description: 'Completely self-hosted by us and managed bot instance, available for inviting to servers.',
                url: '/',
                icon: MdStorage
            },
            {
                name: 'Control Panel',
                description: 'Open source control panel for managing the bot, ready to be self-hosted anywhere.',
                url: '/',
                icon: MdSettings
            },
            {
                name: 'Custom Bot',
                description: 'Need a custom bot? Let us know, and we\'ll be happy to build one for you!',
                url: '/',
                icon: MdConstruction
            },
        ]
    },
    {
        name: 'Contact',
        url: '/contact'
    },
    {
        name: 'Documentation',
        url: '/docs'
    },
    {
        name: 'Invite',
        url: '/docs'
    },
];