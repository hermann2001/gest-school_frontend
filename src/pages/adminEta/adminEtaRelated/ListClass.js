import React, { useState } from 'react';
import { Button, Typography, Box, TextField, Card, CardContent, CardActionArea, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const levels = ["Maternelle", "CI", "CP", "CE1", "CE2", "CM1", "CM2", "6e", "5e", "4e", "3e", "2nde", "1ere", "Tle"];

const ListClass = () => {
  const [selectedLevel, setSelectedLevel] = useState("");
  const [classes, setClasses] = useState([]);
  const [className, setClassName] = useState("");
  const [classSize, setClassSize] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleLevelClick = (level) => {
    if (selectedLevel === level) {
      setShowForm(!showForm); 
    } else {
      setSelectedLevel(level);
      setShowForm(true); 
    }
  };
  
  const handleAddClass = () => {
    if (className && classSize) {
      setClasses([...classes, { level: selectedLevel, name: className, size: classSize }]);
      setClassName("");
      setClassSize("");
      setShowForm(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
        <Card sx={{ mb: 2, backgroundColor: '#107AEE', color: 'white', display: 'flex', alignItems: 'center' }}>
            <PlayArrowIcon sx={{ mr: 2 }}/>
            <Typography variant="h5">
                Créer les classes de l'établissement 
            </Typography>
        </Card>
      
        <Box sx={{ mb: 5, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {levels.map((level) => (
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
                        <TextField fullWidth type="text" label="Nom de la classe" value={className} onChange={(e) => setClassName(e.target.value)} sx={{ mb: 2 }} />
                        <TextField fullWidth type="number" label="Effectif" value={classSize} onChange={(e) => setClassSize(e.target.value)} sx={{ mb: 2 }} />
                        <Button variant="contained" color="primary" onClick={handleAddClass} fullWidth>
                            Ajouter la classe
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        )}

        <Card sx={{ mt: 3 , mb: 2, backgroundColor: '#107AEE', color: 'white', display: 'flex', alignItems: 'center' }}>
            <PlayArrowIcon sx={{ mr: 2 }}/>
            <Typography variant="h5">
                Classes disponibles
            </Typography>
        </Card>
      
        {classes.length === 0 ? (
            <Typography variant="h6" color="red" align="center" sx={{ mt: 5 }}>
                Aucune classe disponible !
            </Typography>
        ) : (
            classes.map((classItem, index) => (
                <Card key={index} sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h6">{classItem.level} - {classItem.name}</Typography>
                        <Typography variant="body1">Effectif: {classItem.size}</Typography>
                    </CardContent>
                </Card>
            ))
        )}
    </Box>
  );
};

export default ListClass;
