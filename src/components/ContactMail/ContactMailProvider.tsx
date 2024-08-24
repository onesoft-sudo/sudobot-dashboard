"use client";

import {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useState,
    type FC,
} from "react";

const ContactMailContext = createContext({
    isOpen: false,
    open: () => {},
    close: () => {},
    toggle: () => {},
});

export const useContactMail = () => {
    return useContext(ContactMailContext);
};

const ContactMailProvider: FC<PropsWithChildren> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);
    const toggle = useCallback(() => setIsOpen((state) => !state), []);

    return (
        <ContactMailContext.Provider value={{ isOpen, open, close, toggle }}>
            {children}
        </ContactMailContext.Provider>
    );
};

export default ContactMailProvider;
