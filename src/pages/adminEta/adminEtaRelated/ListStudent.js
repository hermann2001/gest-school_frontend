import React, { useState, useEffect } from 'react';
import {  Box, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, CardContent, Paper, Typography  } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const levels = ["Maternelle", "CI", "CP", "CE1", "CE2", "CM1", "CM2", "6e", "5e", "4e", "3e", "2nde", "1ere", "Tle"];

const years = ["2023-2024", "2024-2025", "2025-2026"]; // Liste des années scolaires

const ListStudent = () => {
    const [selectedLevel, setSelectedLevel] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [students, setStudents] = useState([]);

    useEffect(() => {
        if (selectedLevel && selectedYear) {
        // Appel à l'API pour obtenir les données des élèves en fonction du niveau et de l'année sélectionnés
        fetchStudentsByLevelAndYear(selectedLevel, selectedYear).then(data => {
            setStudents(data);
        });
        }
    }, [selectedLevel, selectedYear]);

    // Fonction simulée pour obtenir les élèves
    const fetchStudentsByLevelAndYear = async (level, year) => {
        // Remplace ceci par un appel API réel
        return [
        { matricule: '12345', name: 'John', surname: 'Doe', class: level, registrationStatus: 'Accepted', year: year },
        { matricule: '67890', name: 'Jane', surname: 'Doe', class: level, registrationStatus: 'Rejected', year: year }
        ];
    };

    return (
        <Box sx={{ p: 3 }}>
            <Card sx={{ mb: 2, backgroundColor: '#107AEE', color: 'white', display: 'flex', alignItems: 'center' }}>
                <PlayArrowIcon sx={{ mr: 2 }}/>
                <Typography variant="h5">
                    Liste des élèves par niveau et année scolaire
                </Typography>
            </Card>

            <Box sx={{ mb: 2, maxWidth: 900, width: '100%', mx: 'auto', display: 'flex', gap: 2 }}>
                <Select fullWidth value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)} displayEmpty sx={{ flex: 1 }} >
                    <MenuItem value="" disabled>Sélectionner un niveau</MenuItem>
                    {levels.map((level) => ( <MenuItem key={level} value={level}>{level}</MenuItem> ))}
                </Select>
                <Select fullWidth value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} displayEmpty sx={{ flex: 1 }} >
                    <MenuItem value="" disabled>Sélectionner une année scolaire</MenuItem>
                    {years.map((year) => ( <MenuItem key={year} value={year}>{year}</MenuItem> ))}
                </Select>
            </Box>

            {selectedLevel && selectedYear && (
                <Card sx={{ mt: 2, backgroundColor: 'white' }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
                            Liste des élèves pour {selectedLevel} ({selectedYear})
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem'}}>Matricule</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem'}}>Nom</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem'}}>Prénom</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem'}}>Classe</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: '1rem'}}>Rejet d'inscription</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {students.length === 0 ? (
                                        <TableRow>
                                        <TableCell colSpan={5} align="center">Aucun élève disponible</TableCell>
                                        </TableRow>
                                    ) : (
                                        students.map((student, index) => (
                                        <TableRow key={index}>
                                            <TableCell sx={{ fontWeight: 'bold' }}>{student.matricule}</TableCell>
                                            <TableCell>{student.name}</TableCell>
                                            <TableCell>{student.surname}</TableCell>
                                            <TableCell>{student.class}</TableCell>
                                            <TableCell>{student.registrationStatus}</TableCell>
                                        </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

export default ListStudent;
