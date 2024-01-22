'use client';

import { FC } from 'react';
import NavbarItem from "@/components/Navigation/NavbarItem";
import { links } from "@/utils/links";

const Links: FC = () => {
    return (
        links.map((link, index) => (
            <NavbarItem key={index} link={link} />
        ))
    );
};

export default Links;