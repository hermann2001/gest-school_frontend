import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box, Typography, Paper, Checkbox, FormControlLabel, TextField, CssBaseline, IconButton, InputAdornment, CircularProgress, Backdrop } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { BlueButton } from '../../components/buttonStyles';
import styled from 'styled-components';
import { loginAdminGen } from '../../redux/userRelated/userHandle';
import Popup from '../../components/Popup';

const defaultTheme = createTheme();

const AdminGenLogin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status, currentUser, response, currentRole } = useSelector(state => state.user);

    const [toggle, setToggle] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const username = event.target.username.value;
        const password = event.target.password.value;

        if (!username || !password) {
            if (!username) setUsernameError(true);
            if (!password) setPasswordError(true);
            return;
        }

        const fields = { username, password };
        setLoader(true);
        dispatch(loginAdminGen(fields, 'AdminGen'));
    };

    const handleInputChange = (event) => {
        const { name } = event.target;
        if (name === 'username') setUsernameError(false);
        if (name === 'password') setPasswordError(false);
    };

    useEffect(() => {
        if (status === 'success' && currentUser !== null && currentRole === 'AdminGen') {
            navigate('/adminDashboard');
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setMessage("Connexion échouée");
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, currentRole, navigate, response, currentUser]);


    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h4" style={{ textAlign: 'center' }} sx={{ mb: 2, color: "#2c2143" }}>
                            Connexion de 
                            l'Administrateur
                            <br />
                            Général
                        </Typography>
                        <Typography variant="h7">
                            Accéder au tableau de bord en tant qu'Administrateur Général
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Nom d'utilisateur"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                error={usernameError}
                                helperText={usernameError && 'Nom d\'utilisateur requis'}
                                onChange={handleInputChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Mot de passe"
                                type={toggle ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                error={passwordError}
                                helperText={passwordError && 'Mot de passe requis'}
                                onChange={handleInputChange}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setToggle(!toggle)}>
                                                {toggle ? (
                                                    <Visibility />
                                                ) : (
                                                    <VisibilityOff />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <BlueButton type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
                                {
                                    loader ? <CircularProgress size={24} color="inherit" /> : "Se connecter"
                                }
                            </BlueButton> 
                        </Box>
                    </Box>
                </Grid>
               
            </Grid>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loader}
            >
                <CircularProgress color="primary" />
                Patientez s'il vous plaît !
            </Backdrop>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </ThemeProvider>
    );
}

export default AdminGenLogin;

const StyledLink = styled(Link)`
  margin-top: 9px;
  text-decoration: none;
  color: #7f56da;
`;
