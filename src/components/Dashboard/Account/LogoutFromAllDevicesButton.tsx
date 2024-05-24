import { useModalControls } from "@/hooks/modals";
import { Button } from "@nextui-org/react";

export default function LogoutFromAllDevicesButton() {
    const { open } = useModalControls("logoutFromAllDevicesConfirmation");

    return (
        <Button variant="light" color="danger" size="sm" onClick={open}>
            Log out from all devices
        </Button>
    );
}
