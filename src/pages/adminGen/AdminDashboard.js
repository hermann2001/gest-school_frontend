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
import Logout from '../Logout';

import AddSchool from './studentRelated/AddSchool';
import ShowStudents from './studentRelated/ShowStudents';
import StudentAttendance from './studentRelated/StudentAttendance';
import StudentExamMarks from './studentRelated/StudentExamMarks';
import ViewStudent from './studentRelated/ViewStudent';



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
                    <Route path="/" element={<Navigate to="/adminDashboard" />} />

                    {/* Student */}
                    <Route path="/adminDashboard/addSchool" element={<AddSchool situation="School" />} />
                    <Route path="/adminDashboard/students" element={<ShowStudents />} />
                    <Route path="/Admin/students/student/:id" element={<ViewStudent />} />
                    <Route path="/Admin/students/student/attendance/:id" element={<StudentAttendance situation="Student" />} />
                    <Route path="/Admin/students/student/marks/:id" element={<StudentExamMarks situation="Student" />} />
                    
                    <Route path="/logout" element={<Logout />} />
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