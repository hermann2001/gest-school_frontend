import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography, Box, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, CardContent, TableSortLabel, IconButton, CardActionArea } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
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
            setClassName("");
            setClassSerie("");
            setClassSize("");
            setShowForm(false); 
        });
    };

    const classesByLevel = Array.isArray(classes) ? classes.reduce((acc, classItem) => {
        if (!acc[classItem.level]) {
            acc[classItem.level] = [];
        }
        acc[classItem.level].push(classItem);
        return acc;
    }, {}) : {};

    const levelOrder = [
        "Maternelle", "CI", "CP", "CE1", "CE2", "CM1", "CM2",
        "6e", "5e", "4e", "3e", "2nde", "1ere", "Tle"
    ];

    const sortClassesByLevel = (classes) => {
        return Object.keys(classes)
            .sort((a, b) => levelOrder.indexOf(a) - levelOrder.indexOf(b))
            .reduce((sortedClasses, level) => {
                sortedClasses[level] = classes[level];
                return sortedClasses;
            }, {});
    };

    const sortedClassesByLevel = sortClassesByLevel(classesByLevel);

    return (
        <>
        <Box sx={{ p: 3 }}>

            <Box sx={{ mb: 5, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {categories[categoryKey]?.map((level) => (
                    <Card key={level} sx={{ minWidth: 163 }}>
                        <CardActionArea onClick={() => handleLevelClick(level)}>
                            <CardContent>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{level}</Typography>
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
                            <TextField fullWidth type="text" label="Niveau d'étude" value={selectedLevel} sx={{ mb: 2, display: 'none' }} />
                            <TextField fullWidth type="text" label="Nom de la classe" value={className} onChange={(e) => setClassName(e.target.value)} sx={{ mb: 2 }} required />
                            {schoolType === 1 && (
                                <TextField fullWidth type="text" label="Série" value={classSerie} onChange={(e) => setClassSerie(e.target.value)} sx={{ mb: 2 }} />
                            )}                            
                            <TextField fullWidth type="number" label="Effectif" value={classSize} onChange={(e) => setClassSize(e.target.value)} sx={{ mb: 2 }} required />
                            <Button variant="contained" color="primary" onClick={handleAddClass} fullWidth>
                                Ajouter la classe
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            )}
            
            {Object.keys(sortedClassesByLevel).length === 0 ? (
                <Typography variant="h6" color="red" align="center" sx={{ mt: 5 }}>
                    Aucune classe disponible !
                </Typography>
            ) : (
                <TableContainer component={Card} sx={{ mt: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ borderRight: '1px solid #ccc' }} />
                                {categories[categoryKey]?.map((level) => (
                                    <TableCell key={level} align="center" sx={{ borderRight: '1px solid #ccc', fontWeight: 'bold' }}>
                                        {level}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{ borderRight: '1px solid #ccc', fontWeight: 'bold' }}>Classes 
                                    <br />
                                    et
                                    <br />
                                    Effectif
                                </TableCell>
                                {categories[categoryKey]?.map((level) => (
                                    <TableCell key={level} align="center" sx={{ borderRight: '1px solid #ccc' }}>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            {sortedClassesByLevel[level]?.map((classItem) => (
                                                <Card key={classItem.id} sx={{ minWidth: 120, maxWidth: 150, mb: 2 }}>
                                                    <CardContent sx={{ backgroundColor: '#0E70DB', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 1 }}>
                                                        <Typography sx={{ fontWeight: 'bold' }}>{classItem.name}</Typography>
                                                    </CardContent>
                                                    <CardContent sx={{ backgroundColor: '#FFFFFF', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <Typography sx={{ fontWeight: 'bold'}}>{classItem.effectif} places</Typography>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </Box>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
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
