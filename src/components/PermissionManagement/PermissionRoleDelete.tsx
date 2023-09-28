import { deletePermissionRole } from "@/api/permissionRoles";
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
