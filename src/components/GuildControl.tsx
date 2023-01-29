import { MenuList, MenuItem, ListItemText, ListItemIcon, Menu, Button } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { MdArrowDropDown, MdCheck } from "react-icons/md";
import { AuthContextAction, useAuthContext } from "../contexts/AuthContext";

export default function GuildControl() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { user, guild, dispatch } = useAuthContext();
    const queryClient = useQueryClient();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (!user || !guild) {
        return <></>;
    }

    return (
        <div>
            <Button onClick={handleClick} fullWidth={true} endIcon={<MdArrowDropDown />}>
                <div className="flex justify-between items-center">
                    <img src={guild.iconURL} alt="" width={20} height={20} className="mr-3" />
                    <div>{guild?.name}</div>
                </div>
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {user.guilds.map((g: any) => (
                    <MenuItem onClick={() => {
                        dispatch({ type: AuthContextAction.SET_GUILD, payload: g });
                        handleClose();

                        queryClient.removeQueries({
                            queryKey: ["config", guild?.id, user?.token]
                        });
                    }} key={g.id}>
                        {guild.id === g.id && (
                            <ListItemIcon>
                                <MdCheck />
                            </ListItemIcon>
                        )}
                        <ListItemText inset={guild.id !== g.id}>{g.name}</ListItemText>
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}