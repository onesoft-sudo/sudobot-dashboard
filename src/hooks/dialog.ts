import { useAppDispatch } from "@/redux/hooks/AppStoreHooks";
import { addDialog, removeDialog, setDialogState } from "@/redux/slice/DialogManagerSlice";
import EventEmitter from "events";
import { useCallback, useEffect, useMemo } from "react";
import { IconType } from "react-icons/lib";
import { v4 as uuidv4 } from "uuid";

type DialogCreateOptions = {
    title: string;
    description: string;
    icon: IconType;
    buttons?: DialogButtonOptions[];
    classes?: {
        icon?: string;
        iconWrapper?: string;
    };
};

type DialogButtonOptions = {
    type: "primary" | "action" | "cancel";
    id: string;
    label: string;
    onPress: (data: { button: { id: string; label: string } }) => void;
};

const icons = new Map<string, IconType>();

export function getDialogIcon(id: string) {
    return icons.get(id) ?? null;
}

const dialogEventEmitters = new Map<string, EventEmitter>();

export function getDialogEventEmitter(id: string) {
    return dialogEventEmitters.get(id);
}

export const useDialog = (factory: (close: () => void) => DialogCreateOptions) => {
    const dispatch = useAppDispatch();
    const id = useMemo(() => uuidv4(), []);

    const close = useCallback(() => {
        const emitter = getDialogEventEmitter(id);
        emitter?.emit("close");
        dispatch(setDialogState({ id, isOpen: false }));
    }, []);

    const dialogOptions = useMemo(() => factory(close), []);

    const open = useCallback(() => {
        dispatch(setDialogState({ id, isOpen: true }));

        return () =>
            new Promise<string | null>((resolve, reject) => {
                const emitter = getDialogEventEmitter(id);

                if (!emitter) {
                    reject(new Error("No emitter found"));
                    return;
                }

                emitter.on("press", (data) => {
                    if (!dialogOptions.buttons?.some((button) => button.id === data.button.id)) {
                        return;
                    }

                    resolve(data.button.id);
                });

                emitter.on("manualExit", () => {
                    reject(new Error("Dialog closed"));
                });
            });
    }, []);

    useEffect(() => {
        icons.set(id, dialogOptions.icon);
        const emitter = new EventEmitter();
        dialogEventEmitters.set(id, emitter);

        if (dialogOptions.buttons?.length) {
            for (const button of dialogOptions.buttons) {
                emitter.on("press", (data) => {
                    if (button.id === data.button.id) {
                        button.onPress(data);
                    }
                });
            }
        }

        dispatch(
            addDialog({
                id,
                isOpen: false,
                buttons: dialogOptions.buttons?.map((button) => ({
                    id: button.id,
                    label: button.label,
                    type: button.type,
                })),
                title: dialogOptions.title,
                description: dialogOptions.description,
                classes: dialogOptions.classes,
            }),
        );

        return () => {
            icons.delete(id);
            emitter.removeAllListeners();
            dialogEventEmitters.delete(id);
            dispatch(removeDialog(id));
        };
    }, []);

    return { open, close };
};
