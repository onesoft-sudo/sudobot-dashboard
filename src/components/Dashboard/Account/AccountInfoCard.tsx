"use client";

import { useCurrentUserInfo } from "@/hooks/user";
import { Button, Card, CardBody, CardHeader, Divider, Input } from "@nextui-org/react";
import { MdAccountCircle, MdInfo } from "react-icons/md";

export default function AccountInfoCard() {
    const { user } = useCurrentUserInfo();

    if (!user) {
        return null;
    }

    return (
        <Card shadow="sm">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <MdAccountCircle size="2rem" />
                    <div className="flex flex-col">
                        <p className="text-base">Account Information</p>
                    </div>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <form action="#" method="post">
                    <Input label="Name" type="text" defaultValue={user.name} isReadOnly />

                    <Input label="Username" type="text" defaultValue={user.username} isReadOnly className="mt-3" />

                    <Input
                        label="Discord ID"
                        type="text"
                        defaultValue={user?.discordId || "Not connected"}
                        isReadOnly
                        className="mt-3"
                        isDisabled={!user?.discordId}
                    />
                    <p className="mt-1 flex items-center gap-1 px-1 text-xs text-[#999]">
                        <MdInfo /> At the moment your Discord ID cannot be changed. If you would like to change it,
                        please contact a system administrator.
                    </p>

                    <div className="mt-3 flex items-center justify-end">
                        <Button type="button" color="primary" variant="light">
                            Save
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
}
