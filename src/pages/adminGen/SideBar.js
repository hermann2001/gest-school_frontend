import * as React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';

const SideBar = () => {
    const location = useLocation();
    return (
        <>
            <ListItemButton component={Link} to="/adminDashboard">
                <ListItemIcon>
                    <HomeIcon color={location.pathname === ("/" || "/adminDashboard") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Accueil" />
            </ListItemButton>

            <ListItemButton component={Link} to="/adminDashboard/addSchool">
                <ListItemIcon>
                    <SchoolIcon color={location.pathname.startsWith("/adminDashboard/addSchool") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Ecoles" />
            </ListItemButton>

            <ListItemButton component={Link} to="/adminDashboard/notices">
                <ListItemIcon>
                    <AnnouncementOutlinedIcon color={location.pathname.startsWith("/adminDashboard/notices") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Notices" />
            </ListItemButton>

        
        </>
    );
}

export default SideBar
