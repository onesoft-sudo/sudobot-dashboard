"use client";

import { getDialogEventEmitter, getDialogIcon } from "@/hooks/dialog";
import { logger } from "@/logging/logger";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/AppStoreHooks";
import { setDialogState } from "@/redux/slice/DialogManagerSlice";
import Dialog from "./Dialog";

export default function DialogContainer() {
    const dialogs = useAppSelector((store) => store.dialogManager.dialogs);
    const dispatch = useAppDispatch();

    return (
        <>
            {dialogs.map((dialog) => {
                const Icon = getDialogIcon(dialog.id);

                return (
                    <Dialog
                        key={dialog.id}
                        isOpen={dialog.isOpen}
                        onClose={() => {
                            dispatch(setDialogState({ id: dialog.id, isOpen: false }));
                        }}
                        onManualExit={() => {
                            logger.debug("DialogContainer:Dialog:onManualExit", dialog.id);
                            getDialogEventEmitter(dialog.id)?.emit("manualExit");
                        }}
                    >
                        {Icon && (
                            <Dialog.Icon type="icon" className={dialog.classes?.iconWrapper}>
                                <Icon className={dialog.classes?.icon} />
                            </Dialog.Icon>
                        )}
                        <Dialog.Body>
                            <Dialog.Title>{dialog.title}</Dialog.Title>
                            <Dialog.Description>{dialog.description}</Dialog.Description>
                        </Dialog.Body>
                        {dialog.buttons?.length && (
                            <Dialog.Controls>
                                {dialog.buttons.map((button) => {
                                    const onPress = () => {
                                        logger.debug("DialogContainer:Dialog:Button:onPress", button.id);
                                        const emitter = getDialogEventEmitter(dialog.id);

                                        if (!emitter) {
                                            return;
                                        }

                                        emitter.emit("press", {
                                            button,
                                        });
                                    };

                                    return button.type === "primary" ? (
                                        <Dialog.PrimaryActionButton
                                            key={button.id}
                                            label={button.label}
                                            onPress={onPress}
                                        />
                                    ) : button.type === "action" ? (
                                        <Dialog.ActionButton key={button.id} label={button.label} onPress={onPress} />
                                    ) : (
                                        <Dialog.CancelButton
                                            key={button.id}
                                            color="default"
                                            label={button.label}
                                            onPress={onPress}
                                        />
                                    );
                                })}
                            </Dialog.Controls>
                        )}
                    </Dialog>
                );
            })}
        </>
    );
}
