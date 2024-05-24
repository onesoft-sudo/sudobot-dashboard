"use client";

import { DeviceOS } from "@/types/Device";
import { Card, CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react";
import { MdSecurity, MdWarningAmber } from "react-icons/md";
import LoggedInDevice from "./LoggedInDevice";
import LogoutFromAllDevicesButton from "./LogoutFromAllDevicesButton";
import LogOutFromAllDevicesDialog from "./LogoutFromAllDevicesDialog";

const devices = [
    {
        os: DeviceOS.Linux,
        fullOSName: "Ubuntu 24.04 LTS x86_64",
        browser: "Chrome",
        location: "Dhaka, Bangladesh",
        lastActive: new Date("2024-05-24T00:00:00Z"),
    },
    {
        os: DeviceOS.MacOS,
        fullOSName: "macOS 12",
        browser: "Safari",
        location: "Dhaka, Bangladesh",
        lastActive: new Date("2024-05-24T02:00:00Z"),
    },
    {
        os: DeviceOS.Android,
        fullOSName: "Android 12",
        browser: "Chrome",
        location: "Earth, Milky Way",
        lastActive: new Date("2024-05-24T09:00:00Z"),
        current: true,
    },
];

export default function DevicesListCard() {
    return (
        <Card shadow="sm">
            <LogOutFromAllDevicesDialog />
            <CardHeader>
                <div className="flex items-center gap-3">
                    <MdSecurity size="2rem" />
                    <div className="flex flex-col">
                        <p className="text-base">Logged in Devices</p>
                    </div>
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <div className="flex flex-col gap-3 py-3">
                    {devices.map((device, index) => {
                        return <LoggedInDevice key={index} {...device} />;
                    })}
                </div>
            </CardBody>
            <Divider />
            <CardFooter className="flex items-center justify-between">
                <p className="flex items-center gap-2 text-sm text-yellow-500">
                    <MdWarningAmber size="1.2rem" />
                    Seeing something you don&rsquo;t recognize?
                </p>
                <LogoutFromAllDevicesButton />
            </CardFooter>
        </Card>
    );
}
