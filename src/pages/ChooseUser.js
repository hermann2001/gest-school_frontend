import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Box, Container, CircularProgress, Backdrop, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { AccountCircle, School, Group, ArrowBack } from '@mui/icons-material';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Popup from '../components/Popup';

const ChooseUser = () => {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const { status, currentUser, currentRole } = useSelector(state => state.user);

  const navigateHandler = (user) => {
    if (user === "AdminGen") {
      navigate('/adminGenLogin');
    } else if (user === "AdminSch") {
      navigate('/AdminSchLogin');
    } else if (user === "Student") {
      navigate('/StudentLogin');
    }
  };

  const handleBack = () => {
    navigate('/'); // Redirige vers la page d'accueil
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      if (currentRole === 'AdminGen') {
        navigate('/AdminDashboard');
      } else if (currentRole === 'AdminSch') {
        navigate('/AdminSchDashboard');
      } else if (currentRole === 'Student') {
        navigate('/StudentDashboard');
      }
    } else if (status === 'error') {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <>
      <StyledAppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleBack} aria-label="back">
            <ArrowBack />
          </IconButton>
          <Container maxWidth="lg">
            <Typo variant="h6" component="div">
              SYSTEME DE GESTION SCOLAIRE
            </Typo>
          </Container>
        </Toolbar>
      </StyledAppBar>

      <StyledContainer>
        <Container>
          <GridContainer container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <div onClick={() => navigateHandler("AdminGen")}>
                <StyledPaper elevation={3}>
                  <Box mb={2} style={{ display: 'flex', justifyContent: 'center' }}>
                    <AccountCircle fontSize="large" />
                  </Box>
                  <StyledTypography>
                    Administrateur 
                    <br/>
                    Général
                  </StyledTypography>
                  Connectez-vous en tant qu'Administrateur Général pour accéder
                  au tableau de bord afin de gérer les données de l'application.
                </StyledPaper>
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <StyledPaper elevation={3}>
                <div onClick={() => navigateHandler("AdminSch")}>
                  <Box mb={2} style={{ display: 'flex', justifyContent: 'center' }}>
                    <School fontSize="large" />
                  </Box>
                  <StyledTypography>
                    Administrateur d'établissement
                  </StyledTypography>
                  Connectez-vous en tant qu'Administrateur d'établissement pour accéder
                  au tableau de bord afin de gérer les données de l'application.
                </div>
              </StyledPaper>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <StyledPaper elevation={3}>
                <div onClick={() => navigateHandler("Student")}>
                  <Box mb={2} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Group fontSize="large" />
                  </Box>
                  <StyledTypography>
                    Elèves
                    <br/>
                    Parents
                  </StyledTypography>
                  Connectez-vous en tant qu'Elèves/Parents pour accéder
                  au tableau de bord afin de gérer les données de l'application.
                </div>
              </StyledPaper>
            </Grid>
          </GridContainer>
        </Container>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loader}>
          <CircularProgress color="inherit" />
          Patientez s'il vous plaît !
        </Backdrop>
        <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
      </StyledContainer>
    </>
  );
};

export default ChooseUser;

const StyledContainer = styled.div`
  background: #ffffff;
  min-height: 80vh;
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

const GridContainer = styled(Grid)`
  height: 50vh; /* Hauteur de 50% de la vue */
`;

const StyledAppBar = styled(AppBar)`
  background-color: #2F4BD3 !important;
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  text-align: center;
  background-color: #2F4BD3 !important;
  color: #ffffff !important;
  cursor:pointer;

  &:hover {
    background-color: #ffffff !important;
    color: #000000 !important;
  }
`;

const StyledTypography = styled.h2`
  margin-bottom: 10px;
`;

const Typo = styled(Typography)`
  && {
    font-weight: bold;
  }
`;