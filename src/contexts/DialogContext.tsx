import { createContext, useContext } from "react";

type DialogContextType = {
    onClose?: () => void;
};

export const DialogContext = createContext<DialogContextType>({
    onClose: undefined,
});

export const useDialog = () => {
    return useContext(DialogContext);
};
