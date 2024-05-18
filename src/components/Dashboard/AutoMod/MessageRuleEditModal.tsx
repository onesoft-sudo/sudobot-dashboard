import { useConfigMutationHandlers } from "@/contexts/ConfigMutationProvider";
import { useRuleModerationConfigUpdate } from "@/hooks/config";
import { logger } from "@/logging/logger";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/AppStoreHooks";
import { setEditModalState } from "@/redux/slice/MessageRuleListSlice";
import { APIMessageRule } from "@/types/APIMessageRule";
import { APIModerationAction } from "@/types/APIModerationAction";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import MessageRuleActionList from "./MessageRuleActionList";

type MessageRuleEditModalProps = {
    rules: APIMessageRule[];
};

type MessageRuleEditFormFields = {
    actions: APIModerationAction[];
};

export default function MessageRuleEditModal({ rules }: MessageRuleEditModalProps) {
    const { editModalOpen, editingRule } = useAppSelector((state) => state.messageRuleList);
    const dispatch = useAppDispatch();
    const { update, setHasUnsavedChanges } = useRuleModerationConfigUpdate();
    const { control, handleSubmit, setValue } = useForm<MessageRuleEditFormFields>({
        defaultValues: {
            actions: [],
        },
    });
    const { emitter } = useConfigMutationHandlers();

    useEffect(() => {
        if (!editingRule) {
            return;
        }

        setValue("actions", editingRule.actions);
        console.log("Editing Rule", editingRule);

        const handler = () => {
            dispatch(setEditModalState({ isOpen: false, rule: null }));
        };

        emitter.on("reset", handler);

        return () => {
            emitter.off("reset", handler);
        };
    }, [editingRule]);

    const handleClose = (isOpen: boolean) => {
        if (isOpen) {
            return;
        }

        dispatch(setEditModalState({ isOpen: false, rule: null }));
    };

    const onSubmit = (data: any) => {
        logger.debug("MessageRuleEditModal", "Form Submit", data);

        dispatch(setEditModalState({ isOpen: false, rule: null }));
        update({
            rules: rules.map((rule) => (rule.id === editingRule?.id ? { ...rule, actions: data.actions } : rule)),
        });
        setHasUnsavedChanges();
    };

    return (
        <Modal isOpen={editModalOpen} onOpenChange={handleClose} scrollBehavior="inside" size="lg">
            <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Edit Message Rule</ModalHeader>
                        <ModalBody>
                            <label className="mb-2 block font-semibold">Actions</label>
                            <Controller
                                name="actions"
                                control={control}
                                render={({ field }) => (
                                    <MessageRuleActionList
                                        onChange={(changes) => {
                                            field.onChange(changes);
                                            logger.debug("MessageRuleEditModal", "Changed Actions", changes);
                                        }}
                                    />
                                )}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" type="submit">
                                Save
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
