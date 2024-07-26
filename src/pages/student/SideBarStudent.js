import * as React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';


const SideBarStudent = () => {
    const location = useLocation();

    const handleSchoolClick = () => {
    };

    return (
        <>
            <ListItemButton onClick={handleSchoolClick} component={Link} to="/inscription">
                <ListItemIcon>
                    <AppRegistrationIcon color={location.pathname.startsWith("/inscription") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Inscription" />
            </ListItemButton>

            <ListItemButton component={Link} to="/notices">
                <ListItemIcon>
                    <AnnouncementOutlinedIcon color={location.pathname.startsWith("/notices") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Notices" />
            </ListItemButton>

        
        </>
    );
}

export default SideBarStudent
