import { APIPermissionRole } from "@/types/APIPermissionRole";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { FC, useRef } from "react";
import PermissionRoleEditForm from "./PermissionRoleEditForm";

interface PermissionRoleEditModalProps {
    isEditing: boolean;
    toggleEditing: () => any;
    permission: APIPermissionRole;
}

const PermissionRoleEditModal: FC<PermissionRoleEditModalProps> = ({
    isEditing,
    toggleEditing,
    permission,
}) => {
    const ref = useRef<{ submit: Function }>();

    return (
        <Modal backdrop={"blur"} isOpen={isEditing} onClose={toggleEditing}>
            <ModalContent>
                {onClose => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Edit Permission Role
                        </ModalHeader>
                        <ModalBody>
                            <PermissionRoleEditForm
                                onEnd={onClose}
                                permission={permission}
                            />
                            <div></div>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default PermissionRoleEditModal;
