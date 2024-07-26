import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { authLogout } from '../../redux/userRelated/userSlice';
import { CssBaseline, Box, Toolbar, Typography, IconButton, List, Divider,Container  } from '@mui/material';
import { RedButton } from '../../components/buttonStyles';


import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { AppBar, Drawer } from '../../components/styles';

import Inscription from './studentRelated/Inscription';
import Form_inscrip from './studentRelated/Form_inscrip';
import Reinscription from '../../components/Fonctions/reinscription';
import Historique from '../../components/Fonctions/historique';
import Scolarisation from '../../components/Fonctions/scolarite';
import Consulter from '../../components/Fonctions/consulter';
import SideBarStudent from './SideBarStudent';

const StudentDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.currentUser);

  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    dispatch(authLogout());
    navigate('/chooseUser');
  };

  return (
    <>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="absolute" open={open}>
                <Toolbar sx={{ pr: '24px' }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{ marginRight: '36px', ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
                        Tableau de bord - Elèves/Parents
                    </Typography>
                    <RedButton color="inherit" onClick={handleLogout} style={{ fontWeight: 'bold' }}>
                        Retour
                    </RedButton>
                </Toolbar>
            </AppBar>

            <Drawer variant="permanent" open={open} sx={open ? styles.drawerStyled : styles.hideDrawer}>
                <Toolbar sx={styles.toolBarStyled}>
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List component="nav">
                    <SideBarStudent />
                </List>
            </Drawer>

            <Box component="main" sx={styles.boxStyled}>
                <Toolbar />
                <Routes>
                    <Route path="/" element={<Navigate to="inscription" />} />
                    <Route path="inscription" element={<Inscription />} />
                    <Route path="formulaire_inscription" element={<Form_inscrip />} />
                    <Route path="reinscription" element={<Reinscription />} />
                    <Route path="historique" element={<Historique />} />
                    <Route path="scolarite" element={<Scolarisation />} />
                    <Route path="consulter" element={<Consulter />} />
                    {/* <Route path="notices" element={<Notices />} /> */}
                    <Route path="*" element={<Navigate to="inscription" />} />
                </Routes>
            </Box>
        </Box>
    </>
  );
};

export default StudentDashboard;

const styles = {
    boxStyled: {
      backgroundColor: (theme) =>
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[900],
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
      padding: 10, // Padding for the main content area
      transition: 'margin 0.3s', // Smooth transition when the drawer is toggled
    },
    toolBarStyled: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      px: [1],
    },
    drawerStyled: {
      width: 240,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: 240,
        boxSizing: 'border-box',
      },
    },
    hideDrawer: {
      display: 'none',
      '@media (min-width: 600px)': {
        display: 'flex',
      },
    },
}