import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Card, CardContent } from '@mui/material';

const AcademicYear = () => {
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Traitement pour créer une nouvelle année académique
        console.log(`Nouvelle année académique : ${startYear}-${endYear}`);
        // Réinitialiser les champs du formulaire
        setStartYear('');
        setEndYear('');
    };

    return (
        <Box sx={{ mt: 15, p: 3, maxWidth: 600, mx: 'auto' }}>
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
                        Créer une Année Académique
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Année de début"
                            type="number"
                            value={startYear}
                            onChange={(e) => setStartYear(e.target.value)}
                            required
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            label="Année de fin"
                            type="number"
                            value={endYear}
                            onChange={(e) => setEndYear(e.target.value)}
                            required
                            sx={{ mb: 2 }}
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Créer
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AcademicYear;
