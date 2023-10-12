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

import { deletePermissionRole } from "@/api/routes/permissionRoles";
import useAuthWithCheck from "@/hooks/useAuthWithCheck";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    LinearProgress,
} from "@mui/material";
import { Button as NextUIButton } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FC, useState } from "react";
import { MdDelete } from "react-icons/md";

const PermissionRoleDelete: FC<{ id: number | string; guildId: string }> = ({
    id,
    guildId,
}) => {
    const { user } = useAuthWithCheck();
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationKey: ["permission_role_delete", id],
        mutationFn: () =>
            deletePermissionRole({
                guildId: guildId,
                token: user?.token ?? "",
                id,
            }),
        onSuccess() {
            queryClient.invalidateQueries(["permission_roles", guildId]);
        },
    });

    const handleClose = () => {
        setOpen(false);
        setTimeout(() => mutation.reset(), 800);
    };

    return (
        <>
            <NextUIButton
                color="danger"
                variant="flat"
                onClick={() => setOpen(true)}
            >
                <MdDelete size={20} />
                Delete
            </NextUIButton>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    {mutation.isLoading
                        ? "Deleting permission role..."
                        : mutation.isSuccess
                        ? "Success"
                        : mutation.isError
                        ? "An error has occurred"
                        : "Delete this permission role?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {mutation.isLoading ? (
                            <>
                                <LinearProgress />
                            </>
                        ) : mutation.isSuccess ? (
                            "Successfully deleted the permission role."
                        ) : mutation.isError ? (
                            "We've encountered an issue while deleting this permission role. Please contact the system admins."
                        ) : (
                            "Are you sure you want to delete this permission role?\nThis can not be undone."
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={mutation.isLoading}>
                        {(mutation.isLoading || mutation.isIdle) &&
                        !mutation.isError &&
                        !mutation.isSuccess
                            ? "Cancel"
                            : "Close"}
                    </Button>
                    {mutation.isIdle &&
                        !mutation.isError &&
                        !mutation.isSuccess && (
                            <Button
                                onClick={() => mutation.mutate()}
                                autoFocus
                                disabled={mutation.isLoading}
                            >
                                Delete
                            </Button>
                        )}
                </DialogActions>
            </Dialog>
        </>
    );
};

export default PermissionRoleDelete;
