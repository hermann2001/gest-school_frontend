import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navigate, Route, Routes } from 'react-router-dom';
import { authLogout } from '../../redux/userRelated/userSlice';
import { CssBaseline, Box, Toolbar, Typography, IconButton, List, Divider } from '@mui/material';
import { RedButton } from '../../components/buttonStyles';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { AppBar, Drawer } from '../../components/styles';

import SideBar from './SideBar'; 
import AcademicYear from './adminRelated/AcademicYear';

import AddSchool from './adminRelated/AddSchool';
import ShowSchool from './adminRelated/ShowSchool';
import HomeBoard from './adminRelated/HomeSchool';
import Notices from './adminRelated/Notices';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
                        Tableau de bord Administrateur Général
                    </Typography>
                    <RedButton color="inherit" onClick={handleLogout} style={{ fontWeight: 'bold' }}>
                        Déconnexion
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
                    <SideBar />
                </List>
            </Drawer>

            <Box component="main" sx={styles.boxStyled}>
                <Toolbar />
                <Routes>
                    <Route path="/" element={<Navigate to="home" />} />
                    <Route path="home" element={<HomeBoard />} />
                    <Route path="addSchool" element={<AddSchool situation="School" />} />
                    <Route path="showSchool" element={<ShowSchool />} />
                    <Route path="academicyear" element={<AcademicYear />} />
                    <Route path="notices" element={<Notices />} />
                    <Route path="*" element={<Navigate to="home" />} />
                </Routes>
            </Box>
        </Box>
    </>
  );
};

export default AdminDashboard;

const styles = {
    boxStyled: {
        backgroundColor: (theme) =>
            theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    toolBarStyled: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        px: [1],
    },
    drawerStyled: {
        display: "flex"
    },
    hideDrawer: {
        display: 'flex',
        '@media (max-width: 600px)': {
            display: 'none',
        },
    },
}