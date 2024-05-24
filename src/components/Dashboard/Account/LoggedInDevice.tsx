import { DeviceOS } from "@/types/Device";
import { Button, Chip, Tooltip } from "@nextui-org/react";
import { formatDistanceToNowStrict } from "date-fns";
import { type FC } from "react";
import DeviceOSIcon from "./DeviceOSIcon";

type LoggedInDeviceProps = {
    os: DeviceOS;
    fullOSName?: string;
    browser: string;
    location: string;
    lastActive: Date;
    current?: boolean;
};

const LoggedInDevice: FC<LoggedInDeviceProps> = ({ browser, lastActive, location, os, current, fullOSName }) => {
    return (
        <div className="flex items-center justify-between rounded-lg bg-gray-100/80 px-3 py-2 shadow dark:bg-[rgb(35,35,35)] dark:shadow-white/15">
            <div className="flex items-center gap-5">
                <DeviceOSIcon os={os} />

                <div>
                    <div className="flex items-center gap-2">
                        <div>
                            <Tooltip content={fullOSName}>
                                <span className="font-semibold">{os}</span>
                            </Tooltip>{" "}
                            on {browser}
                        </div>
                        {current && (
                            <Chip color="success" size="sm" variant="dot">
                                This device
                            </Chip>
                        )}
                    </div>
                    <div className="text-sm text-[#999]">
                        {location} &bull;{" "}
                        {lastActive.getTime() >= Date.now() - 1000 * 60
                            ? "Active now"
                            : `Last seen ${formatDistanceToNowStrict(lastActive, { addSuffix: true })}`}
                    </div>
                </div>
            </div>

            <div>
                <Button variant="light" color="danger">
                    Log Out
                </Button>
            </div>
        </div>
    );
};

export default LoggedInDevice;
