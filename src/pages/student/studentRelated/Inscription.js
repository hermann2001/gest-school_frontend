import React, { useState, useEffect } from 'react';
import { Box, Button, Card, Typography, CircularProgress, Grid, CardContent, CardMedia, IconButton  } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getAllSchools } from "../../../redux/userRelated/userHandle";
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ReplayIcon from '@mui/icons-material/Replay';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const Inscription = () => {
    const [showButtons, setShowButtons] = useState(true);
    const dispatch = useDispatch();
    const { schools, loading, error } = useSelector((state) => state.user);
    const [actionType, setActionType] = useState('');
    const navigate = useNavigate(); 

    const nivSchool = (sec) => {
        return sec ? "Secondaire" : "Primaire";
    };

    useEffect(() => {
        if (!showButtons) {
            dispatch(getAllSchools());
        }
    }, [showButtons, dispatch]);

    const handleActionClick = (action) => {
        setActionType(action); // Set action type based on the button clicked
        setShowButtons(false); // Fetch schools
    };

    const handleFormNavigation = (school) => {
        navigate('/formulaire_inscription', {
            state: {
                actionType,
                schoolName: school.name,
                niveau: school.secondaire,
                schoolId: school.id,
            },
        });
    };
    
    return (
        <Box sx={{ p: 3 }}>

            {showButtons ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
                        <Card sx={{ minWidth: 300, maxWidth: 350, backgroundColor: '#0E70DB' }}>
                            <CardContent sx={{ backgroundColor: '#0E70DB', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 2 }}>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>Inscription</Typography>
                                <SaveAltIcon sx={{ fontSize: '40px', mb: 1 }} />
                            </CardContent>
                            <CardContent sx={{ backgroundColor: '#FFFFFF', color: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
                                <Typography variant="body2" sx={{ fontSize: '16px', mb: 1, textAlign: 'center', fontWeight: "bold" }}>Cliquez ici pour effectuer une inscription dans une école</Typography>
                                <Button variant="contained" sx={{ backgroundColor: '#0E70DB', color: 'white' }} onClick={() => handleActionClick('inscription')}>
                                    Inscrivez-vous
                                </Button>
                            </CardContent>
                        </Card>
                        <Card sx={{ minWidth: 300, maxWidth: 350, backgroundColor: '#0E70DB' }}>
                            <CardContent sx={{ backgroundColor: '#0E70DB', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 2 }}>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>Réinscription</Typography>
                                <ReplayIcon sx={{ fontSize: '40px', mb: 1 }} />
                            </CardContent>
                            <CardContent sx={{ backgroundColor: '#FFFFFF', color: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
                                <Typography variant="body2" sx={{ fontSize: '16px', mb: 1, textAlign: 'center', fontWeight: "bold" }}>Cliquez ici pour effectuer une réinscription dans une école</Typography>
                                <Button variant="contained" sx={{ backgroundColor: '#0E70DB', color: 'white' }} onClick={() => handleActionClick('réinscription')}>
                                    Réinscrivez-vous
                                </Button>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            
            ) : (
                <>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <IconButton onClick={() => setShowButtons(true)} sx={{ mr: 1 }}>
                            <ArrowBackIosNewIcon />
                        </IconButton>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', }}>
                            Sélectionnez un établissement où vous inscrire 
                        </Typography>
                    </Box>
                    {loading ? (
                        <CircularProgress />
                    ) : error ? (
                        <Typography color="error">{error}</Typography>
                    ) : (
                        <Box sx={{ padding: 2 }}>
                            <Grid container spacing={2}>
                                {Array.isArray(schools) && schools.length > 0 ? (
                                    schools.map((school) => (
                                        <Grid item key={school._id} xs={12} sm={6} md={4}>
                                            <Card sx={{ width: '100%', maxWidth: '350px', mx: 'auto' }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0E70DB', p: 2, borderRadius: '8px',}}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: '50%', width: '200px', height: '200px'}}>
                                                        <CardMedia component="img" height="200" image={`${process.env.REACT_APP_LOGO_URL}${school.logo}`} alt={`${school.name} Logo`} 
                                                            sx={{ 
                                                                borderRadius: '50%', 
                                                                objectFit: 'cover',
                                                                width: '100%', 
                                                                height: '100%',
                                                            }}
                                                        />
                                                    </Box>
                                                </Box>
                                                <CardContent sx={{ textAlign: 'center' }}>
                                                    <Typography variant="h5" component="div" sx={{ fontWeight: "bold", fontSize: "30px", color: "primary.main", }} >
                                                        {school.name}
                                                    </Typography>

                                                    <Typography variant="body2" color="text.primary" sx={{ fontWeight: "bold", fontSize: "18px" }} >
                                                        Etablissement {nivSchool(school.secondaire)} situé à  {school.adresse}
                                                    </Typography>

                                                    <Typography variant="body2" color="text.primary" sx={{ fontSize: "18px" }} >
                                                    (+229) {school.phone_number} {school.email}
                                                    </Typography>
                                                    <Button 
                                                        variant="contained" 
                                                        sx={{ mt: 2, backgroundColor: '#0E70DB', color: 'white' }} 
                                                        onClick={() => handleFormNavigation(school)} 
                                                    >
                                                        Commencer {actionType === 'inscription' ? 'l\'inscription' : ' la réinscription'}
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))
                                ) : (
                                    <Typography variant="h6" component="div">
                                        Aucun établissement disponible !
                                    </Typography>
                                )}
                            </Grid>
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
};

export default Inscription;