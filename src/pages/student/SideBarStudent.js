import * as React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link, useLocation,useNavigate} from 'react-router-dom';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';
import NotesIcon from '@mui/icons-material/Notes';


// import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';


const SideBarStudent = () => {
    const location = useLocation();

    const handleSchoolClick = () => {
    };

    const navigate = useNavigate();
  const handleSelect = (path) => {
    navigate(path); // Redirect to the appropriate path
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

            <ListItemButton
        selected={location.pathname === '/reinscription'}
        onClick={() => handleSelect('/reinscription')}
      >
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Re/Inscription" /> 
      </ListItemButton>
      <ListItemButton
        selected={location.pathname === '/scolarite'}
        onClick={() => handleSelect('/scolarite')}
      >
        <ListItemIcon>
          <ClassOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Frais Generaux" />
      </ListItemButton>
      <ListItemButton
        selected={location.pathname === '/historique'}
        onClick={() => handleSelect('/historique')}
      >
        <ListItemIcon>
          <NotesIcon />
        </ListItemIcon>
        <ListItemText primary="Historique" />
      </ListItemButton>
      <ListItemButton
        selected={location.pathname === '/consulter'}
        onClick={() => handleSelect('/consulter')}
      >
        <ListItemIcon>
          <ClassOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Consulter prix" />
      </ListItemButton>

        
        </>
    );
}

export default SideBarStudent
