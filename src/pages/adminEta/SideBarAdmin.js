import * as React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import ListIcon from '@mui/icons-material/List';
import ClassIcon from '@mui/icons-material/Class';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import { useSelector } from 'react-redux';


const SideBarAdmin = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { schools } = useSelector((state) => state.user);

    // const handleSchoolClick = () => {
    //     if (Array.isArray(schools) && schools.length > 0) {
    //         navigate("/showSchool");
    //     } else {
    //         navigate("/addSchool");
    //     }
    // };

    return (
        <>
            <ListItemButton component={Link} to="/listStudent">
                <ListItemIcon>
                    <ListIcon color={location.pathname.startsWith("/listStudent") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Liste des élèves" />
            </ListItemButton>

            <ListItemButton component={Link} to="/listClass">
                <ListItemIcon>
                    <ClassIcon color={location.pathname.startsWith("/listClass") ? 'primary' : 'inherit'} />
                </ListItemIcon>
                <ListItemText primary="Liste des classes" />
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

export default SideBarAdmin
