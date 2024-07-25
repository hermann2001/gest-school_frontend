import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography, Box, TextField, Card, CardContent, CardActionArea, IconButton, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { addClass, getAllSchools, getClasses } from '../../../redux/userRelated/userHandle';
import Popup from '../../../components/Popup';

const ListClass = () => {
    const dispatch = useDispatch();
    const [selectedLevel, setSelectedLevel] = useState("");
    const [className, setClassName] = useState("");
    const [classSize, setClassSize] = useState("");
    const [classSerie, setClassSerie] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [loader, setLoader] = useState(false);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const currentUser = useSelector((state) => state.user.currentUser);

    const currentRole = useSelector((state) => state.user.currentRole);
    const schoolType = currentUser?.secondaire;

    const { classes, loading, error, response } = useSelector(
        (state) => state.user
    );

    useEffect(() => {
        if (currentUser?.id) {
            dispatch(getClasses(currentUser.id));
        }
    }, [dispatch, currentUser]);

    const categories = {
        "Primaire": ["Maternelle", "CI", "CP", "CE1", "CE2", "CM1", "CM2"],
        "Secondaire": ["6e", "5e", "4e", "3e", "2nde", "1ere", "Tle"]
    };
    
    const categoryKey = schoolType === 1 ? "Secondaire" : "Primaire";

    useEffect(() => {
        console.log('Current User:', currentUser); // Log currentUser to check its value
        console.log('School Type:', schoolType); // Log schoolType value
        dispatch(getAllSchools()); // Ensure schools data is fetched
    }, [dispatch, currentUser, schoolType]);

    const handleLevelClick = (level) => {
        if (selectedLevel === level) {
        setShowForm(!showForm); 
        } else {
        setSelectedLevel(level);
        setShowForm(true); 
        }
    };
    
    const handleAddClass = () => {
        const formData = {
            name: className,
            level: selectedLevel,
            serie: classSerie,
            effectif: parseInt(classSize, 10),
            role: currentRole,
        };
    
        setLoader(true);
        dispatch(addClass(formData, currentUser?.id)).then(() => {
            dispatch(getClasses(currentUser?.id));
        }).finally(() => {
            setLoader(false);
        });
        setShowForm(false); 
    };
    

    return (
        <>
        <Box sx={{ p: 3 }}>
            <Card sx={{ mb: 2, backgroundColor: '#107AEE', color: 'white', display: 'flex', alignItems: 'center' }}>
                <PlayArrowIcon sx={{ mr: 2 }}/>
                <Typography variant="h5">
                    Créer les classes de l'établissement 
                </Typography>
            </Card>
            
            <Box sx={{ mb: 5, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {categories[categoryKey]?.map((level) => (
                    <Card key={level} sx={{ minWidth: 164 }}>
                        <CardActionArea onClick={() => handleLevelClick(level)}>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="h6">{level}</Typography>
                                    <IconButton size="small">
                                        <AddIcon />
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>

            {showForm && (
                <Card sx={{ mt: 2, maxWidth: '600px', mx: 'auto', backgroundColor: 'white' }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
                            Ajouter une classe pour la {selectedLevel}
                        </Typography>
                        <Box sx={{ width: '100%' }}>
                            <TextField fullWidth type="text" label="Niveau d'étude" value={selectedLevel} sx={{ mb: 2 }} />
                            <TextField fullWidth type="text" label="Nom de la classe" value={className} onChange={(e) => setClassName(e.target.value)} sx={{ mb: 2 }} required />
                            <TextField fullWidth type="text" label="Série" value={classSerie} onChange={(e) => setClassSerie(e.target.value)} sx={{ mb: 2 }} />
                            <TextField fullWidth type="number" label="Effectif" value={classSize} onChange={(e) => setClassSize(e.target.value)} sx={{ mb: 2 }} required />
                            <Button variant="contained" color="primary" onClick={handleAddClass} fullWidth>
                                Ajouter la classe
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            )}

            <Card sx={{ mt: 3, mb: 2, backgroundColor: '#107AEE', color: 'white', display: 'flex', alignItems: 'center' }}>
                <PlayArrowIcon sx={{ mr: 2 }}/>
                <Typography variant="h5">
                Classes disponibles
                </Typography>
            </Card>
            
            {Array.isArray(classes) && classes.length === 0 ? (
                <Typography variant="h6" color="red" align="center" sx={{ mt: 5 }}>
                    Aucune classe disponible !
                </Typography>
            ) : (
                <Grid container spacing={2}>
                    {classes?.map((classItem) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={classItem.id}>
                            <Card sx={{ mb: 2 }}>
                                <CardContent>
                                    <Typography variant="h6">{classItem.level} - {classItem.name}</Typography>
                                    <Typography variant="body1">Effectif: {classItem.effectif}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
        <Popup
            message={message}
            setShowPopup={setShowPopup}
            showPopup={showPopup}
        />
      </>
    );
};

export default ListClass;
