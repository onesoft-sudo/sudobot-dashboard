import { createContext, useContext } from "react";

type DialogContextType = {
    onClose?: () => void;
};

export const DialogContext = createContext<DialogContextType>({
    onClose: undefined,
});

export const useDialogContext = () => {
    return useContext(DialogContext);
};
