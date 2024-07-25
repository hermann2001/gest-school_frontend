import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate, Route, Routes } from 'react-router-dom';
import { authLogout, authSuccess } from '../../redux/userRelated/userSlice';
import { CssBaseline, Box, Toolbar, Typography, IconButton, List, Divider } from '@mui/material';
import { RedButton } from '../../components/buttonStyles';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { AppBar, Drawer } from '../../components/styles';

import ListClass from './adminEtaRelated/ListClass';
import ListStudent from './adminEtaRelated/ListStudent';
import SideBarAdmin from './SideBarAdmin';

import { getAllSchools } from '../../redux/userRelated/userHandle';

const AdminEtaDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.currentUser);
  const schools = useSelector((state) => state.user.schools); 
  const schoolName = useSelector((state) => state.user.currentUser?.schoolName);

  const [open, setOpen] = useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    dispatch(authLogout());
    navigate('/chooseUser');
  };

  useEffect(() => {
    if (schools.length === 0) {
      dispatch(getAllSchools());
    }
  }, [dispatch, schools]);

  useEffect(() => {
    if (user && schools.length > 0) {
      const school = schools.find(school => school.email === user.email);
      if (school && user.schoolName !== school.name) {
        dispatch(authSuccess({ ...user, schoolName: school.name }));
      }
    }
  }, [user, schools, dispatch]);

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
                    {schoolName ? `Tableau de bord de ${schoolName}` : "Tableau de bord Administrateur"}

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
                    <SideBarAdmin />
                </List>
            </Drawer>

            <Box component="main" sx={styles.boxStyled}>
                <Toolbar />
                <Routes>
                    <Route path="/" element={<Navigate to="listStudent" />} />
                    <Route path="listStudent" element={<ListStudent />} />
                    <Route path="listClass" element={<ListClass />} />
                    {/* <Route path="notices" element={<Notices />} /> */}
                    <Route path="*" element={<Navigate to="listStudent" />} />
                </Routes>
            </Box>
        </Box>
    </>
  );
};

export default AdminEtaDashboard;

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