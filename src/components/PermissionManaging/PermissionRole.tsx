"use client";

import useIsDesktop from "@/hooks/useIsDesktop";
import useIsInitialRender from "@/hooks/useIsInitialRender";
import useTogglableState from "@/hooks/useTogglableState";
import {
    APIPermissionMode,
    APIPermissionRole,
} from "@/types/APIPermissionRole";
import { Button, Tooltip } from "@nextui-org/react";
import { motion } from "framer-motion";
import { FC } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { MdOutlineKey, MdSecurity } from "react-icons/md";
import PermissionRoleForm from "./PermissionRoleForm";

interface PermissionRoleProps {
    permission: APIPermissionRole;
    mode: APIPermissionMode;
}

const PermissionRole: FC<PermissionRoleProps> = ({ mode, permission }) => {
    const [expanded, toggleExpanded] = useTogglableState();
    const isInitialRender = useIsInitialRender();
    const isDesktop = useIsDesktop();

    return (
        <div
            style={{
                background: "#232323",
                padding: "10px 10px 10px 12px",
                margin: "10px " + (isDesktop ? "10px" : "0"),
            }}
        >
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <Tooltip
                        content={
                            permission.level !== undefined
                                ? "This is a permission level."
                                : "This is a named permission role."
                        }
                        delay={1200}
                        color="foreground"
                    >
                        <div>
                            {permission.level !== undefined ? (
                                <MdSecurity size={20} />
                            ) : (
                                <MdOutlineKey size={20} />
                            )}
                        </div>
                    </Tooltip>
                    <h3 className="ml-2">{permission.name}</h3>
                    {permission.level !== undefined && (
                        <h4 className="ml-5 text-sm text-[#999]">
                            {permission.level}
                        </h4>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        onClick={() => toggleExpanded()}
                        variant="flat"
                        radius="sm"
                        isIconOnly
                    >
                        <FaChevronDown size={15} />
                    </Button>
                </div>
            </div>

            <div className="overflow-y-hidden">
                <motion.div
                    initial={false}
                    animate={{
                        height: expanded ? "auto" : "0",
                    }}
                    transition={{
                        ease: "easeInOut",
                        duration: isInitialRender ? 0 : 0.2,
                    }}
                >
                    <PermissionRoleForm permission={permission} />
                </motion.div>
            </div>
        </div>
    );
};

export default PermissionRole;
