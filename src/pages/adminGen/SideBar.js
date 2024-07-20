import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';

const SideBar = () => {
    const location = useLocation();
    return (
        <>
            <ListItemButton component={Link} to="/adminDashboard">
                <ListItemIcon>
                    <HomeIcon color={location.pathname === ("/" || "/adminDashboard") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Acceuil" />
            </ListItemButton>

            <ListItemButton component={Link} to="/adminDashboard/addSchool">
                <ListItemIcon>
                    <PersonOutlineIcon color={location.pathname.startsWith("/adminDashboard/addSchool") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Ecoles" />
            </ListItemButton>

            <ListItemButton component={Link} to="/adminDashboard/notices">
                <ListItemIcon>
                    <AnnouncementOutlinedIcon color={location.pathname.startsWith("/adminDashboard/notices") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Notices" />
            </ListItemButton>

            <Divider sx={{ my: 1 }} />

            <ListItemButton component={Link} to="/adminDashboard/profile">
                <ListItemIcon>
                    <AccountCircleOutlinedIcon color={location.pathname.startsWith("/adminDashboard/profile") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Admin Général" />
            </ListItemButton>
        </>
    );
}

export default SideBar
