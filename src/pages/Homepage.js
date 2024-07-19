import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button } from '@mui/material';
import styled from 'styled-components';
import Students from "../assets/students.svg";
import { BlueButton } from '../components/buttonStyles';

const Homepage = () => {
    return (
        <StyledContainer>
            <Grid container spacing={0}>
                <Grid item xs={12} md={6}>
                    <img src={Students} alt="students" style={{ width: '100%' }} />
                </Grid>

                <Grid item xs={12} md={6}>
                    <StyledPaper elevation={3}>
                        <StyledTitle style={{ textAlign: 'center' }}>
                            Bienvenue sur le 
                            <br />
                            Système de gestion 
                            <br />
                            scolaire
                        </StyledTitle>
                        
                        <StyledTitle2>
                            <span>Une plateforme pour :</span>
                            <ul>
                                <li>Rationaliser la gestion scolaire, organiser vos classes et inscrire des étudiants dans votre établissement.</li>
                                <li>Gérer les frais de scolarité via un paiement en ligne.</li>
                                <li>Gérer les notes et moyennes ainsi que les sessions d'examen.</li>
                            </ul>
                        </StyledTitle2>
                    </StyledPaper>
                </Grid>
            </Grid>

            <Grid container spacing={0} justifyContent="center">
                <Grid item xs={12} md={8}>
                    <StyledBox>
                        <StyledLink to="/chooseUser">
                            <BlueButton variant="contained" fullWidth>
                                Démarrer
                            </BlueButton>
                        </StyledLink>
                        <StyledText  style={{ textAlign: 'center' }}>
                            Sélectionner votre rôle et accéder à votre tableau de bord 
                            personnalisé (Administrateur Général - Administrateur d'établissement - Élève/Parent).
                        </StyledText>
                    </StyledBox>
                </Grid>
            </Grid>
        </StyledContainer>
    );
};

export default Homepage;

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledPaper = styled.div`
  padding: 24px;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  gap: 16px;
  text-align: center;
  padding: 24px;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color:  #2F4BD3;
  /* font-family: "Manrope"; */
  font-weight: bold;
  padding-top: 50px;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledTitle2 = styled.h3`
  font-size: 20px;
  color: #252525;
  /* font-family: "Manrope"; */
  font-weight: bold;
  padding-top: 30px;
  margin-top: 30px;
  margin-bottom: 30px;
  letter-spacing: normal;
  line-height: normal;

  span {
    display: block;
    margin-bottom: 10px; /* Adjust this value to add space between the text and the list */
  }

  ul {
    text-align: justify; /* Justify text */
    margin-top: 0;
    margin-bottom: 30px; 
    padding-left: 20px;
    list-style-type: disc; /* Default bullet points */
    letter-spacing: normal;
    line-height: normal;
  
    li {
      margin-bottom: 10px; /* Space between list items */
    }
  }
`;

const StyledText = styled.p`
  color:  #2F4BD3;
  font-size: 20px;
  font-weight: bold;
  margin-top: 0;
  letter-spacing: normal;
  line-height: normal;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
