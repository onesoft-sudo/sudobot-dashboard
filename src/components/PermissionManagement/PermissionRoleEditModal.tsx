/*
* This file is part of SudoBot Dashboard.
*
* Copyright (C) 2021-2023 OSN Developers.
*
* SudoBot Dashboard is free software; you can redistribute it and/or modify it
* under the terms of the GNU Affero General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* SudoBot Dashboard is distributed in the hope that it will be useful, but
* WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU Affero General Public License for more details.
*
* You should have received a copy of the GNU Affero General Public License
* along with SudoBot Dashboard. If not, see <https://www.gnu.org/licenses/>.
*/

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
