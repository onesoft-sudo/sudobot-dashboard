import { useModal } from "@/hooks/modals";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

export default function LogOutFromAllDevicesDialog() {
    const { isOpen, close } = useModal("logoutFromAllDevicesConfirmation");

    return (
        <Dialog open={isOpen} onClose={close}>
            <DialogTitle>Log out from all devices</DialogTitle>
            <DialogContent>
                <p>
                    Are you sure you want to log out from all devices? This action will also log you out from this
                    device, and you&rsquo;ll have to log in again.
                </p>
            </DialogContent>
            <DialogActions>
                <Button>Yes</Button>
                <Button onClick={close}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}
