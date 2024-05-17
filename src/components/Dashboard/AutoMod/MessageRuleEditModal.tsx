import { useAppDispatch, useAppSelector } from "@/redux/hooks/AppStoreHooks";
import { setEditModalState } from "@/redux/slice/MessageRuleListSlice";
import { APIMessageRule } from "@/types/APIMessageRule";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import MessageRuleActionList from "./MessageRuleActionList";

type MessageRuleEditModalProps = {
    rules: APIMessageRule[];
};

export default function MessageRuleEditModal({ rules }: MessageRuleEditModalProps) {
    const { editModalOpen } = useAppSelector((state) => state.messageRuleList);
    const dispatch = useAppDispatch();
    const handleClose = (isOpen: boolean) => {
        if (isOpen) {
            return;
        }

        dispatch(setEditModalState({ isOpen: false, rule: null }));
    };

    return (
        <Modal isOpen={editModalOpen} onOpenChange={handleClose} scrollBehavior="inside" size="lg">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Edit Message Rule</ModalHeader>
                        <ModalBody>
                            <form>
                                <label className="mb-2 block font-semibold">Actions</label>
                                <MessageRuleActionList />
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onPress={onClose}>
                                Save
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
