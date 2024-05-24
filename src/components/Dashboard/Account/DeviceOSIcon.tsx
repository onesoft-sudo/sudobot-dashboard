import { DeviceOS } from "@/types/Device";
import { type FC } from "react";
import { FaAndroid, FaApple, FaCircleQuestion, FaFreebsd, FaLinux, FaWindows } from "react-icons/fa6";
import { IconType } from "react-icons/lib";

type DeviceOSIconProps = {
    os: DeviceOS;
};

const icons: Record<DeviceOS, IconType> = {
    [DeviceOS.Windows]: FaWindows,
    [DeviceOS.MacOS]: FaApple,
    [DeviceOS.Linux]: FaLinux,
    [DeviceOS.BSD]: FaFreebsd,
    [DeviceOS.Android]: FaAndroid,
    [DeviceOS.IOS]: FaApple,
    [DeviceOS.Other]: FaCircleQuestion,
};

const DeviceOSIcon: FC<DeviceOSIconProps> = ({ os }) => {
    const Icon = icons[os];
    return <Icon size="1.5rem" />;
};

export default DeviceOSIcon;
