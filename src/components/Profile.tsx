import { MenuList, MenuItem, ListItemIcon, ListItemText, Typography, Menu, Button, Avatar } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { MdArrowDropDown, MdComputer, MdDashboard, MdLogout } from "react-icons/md";
import { AuthContextAction, useAuthContext } from "../contexts/AuthContext";

export default function Profile({ onLogout = (state: 'started' | 'ended') => {} }) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { user, dispatch } = useAuthContext();
    const router = useRouter();

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        localStorage.removeItem('user');
        dispatch({ type: AuthContextAction.LOGOUT });
        onLogout('started');
        router.push('/login').finally(() => onLogout('ended'));
    };

    return (
        <div>
            <Button onClick={handleClick} style={{ textTransform: 'none' }} endIcon={<MdArrowDropDown />}>
                <div className="flex items-center gap-5">
                    <Avatar>{user?.username[0].toUpperCase()}</Avatar>
                    <span>{user?.username}</span>
                </div>
            </Button>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <Link href="/dashboard" style={{ color: 'unset', textDecoration: 'none' }}>
                    <MenuItem>
                        <ListItemIcon>
                            <MdDashboard />
                        </ListItemIcon>

                        <ListItemText>Dashboard</ListItemText>
                    </MenuItem>
                </Link>

                <MenuItem onClick={logout}>
                    <ListItemIcon>
                        <MdLogout />
                    </ListItemIcon>

                    <ListItemText>Logout</ListItemText>
                </MenuItem>
            </Menu>
        </div>
    );
}