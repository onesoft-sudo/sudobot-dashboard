import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { Dispatch, FC, SetStateAction, useLayoutEffect, useState } from "react";
import PermissionRoleCreateForm from "./PermissionRoleCreateForm";

interface PermissionRoleCreateModalProps {
    onMount: (setOpen: Dispatch<SetStateAction<boolean>>) => any;
}

const PermissionRoleCreateModal: FC<PermissionRoleCreateModalProps> = ({
    onMount,
}) => {
    const [open, setOpen] = useState(false);

    useLayoutEffect(() => {
        onMount(setOpen);
    }, []);

    return (
        <Modal backdrop={"blur"} isOpen={open} onClose={() => setOpen(false)}>
            <ModalContent>
                {onClose => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Create Permission Role
                        </ModalHeader>
                        <ModalBody>
                            <PermissionRoleCreateForm onEnd={onClose} />
                            <div></div>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default PermissionRoleCreateModal;
