import React, { useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button } from '@mui/material';

const historiqueData = [
  { id: 1, nom: 'Dupont', prenom: 'Jean', matricule: '12345', anneeScolaire: '2023-2024', operation: 'Inscription', montant: '100€' },
  { id: 2, nom: 'Martin', prenom: 'Marie', matricule: '67890', anneeScolaire: '2023-2024', operation: 'Réinscription', montant: '150€' },
  { id: 3, nom: 'Durand', prenom: 'Paul', matricule: '11223', anneeScolaire: '2023-2024', operation: 'Annexe', montant: '200€' },
  // Ajoutez d'autres entrées ici
];

const Historique = () => {
  const [matricule, setMatricule] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleInputChange = (e) => {
    setMatricule(e.target.value);
  };

  const filteredData = historiqueData.filter((row) => row.matricule === matricule);

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: 3, boxShadow: 7, borderRadius: 2 }}>
      <Typography variant="h5" component="h3" sx={{ textAlign: 'center', fontSize: 37 }} gutterBottom>
        Historique des Transactions
      </Typography>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <TextField
            label="Matricule"
            variant="outlined"
            value={matricule}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 3 }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Soumettre
          </Button>
        </form>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="historique table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', fontSize: 20 }}>Nom</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: 20 }}>Prénom</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: 20 }}>Matricule</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: 20 }}>Année Scolaire</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: 20 }}>Opération</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: 20 }}>Montant</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ fontSize: 17 }}>{row.nom}</TableCell>
                  <TableCell sx={{ fontSize: 17 }}>{row.prenom}</TableCell>
                  <TableCell sx={{ fontSize: 17 }}>{row.matricule}</TableCell>
                  <TableCell sx={{ fontSize: 17 }}>{row.anneeScolaire}</TableCell>
                  <TableCell sx={{ fontSize: 17 }}>{row.operation}</TableCell>
                  <TableCell sx={{ fontSize: 17 }}>{row.montant}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Historique;
