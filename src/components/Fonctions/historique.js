import React, { useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button } from '@mui/material';
import { historique } from '../api';



const Historique = () => {
  const [matricule, setMatricule] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await historique({ matricule });
      if (response.status === 201) {
        setData(response.data);
        console.log(response.data);
      } else {
        alert('Matricule non trouvé');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données', error);
      alert('Erreur lors de la récupération des données');
    }
    setSubmitted(true);
  };

  const handleInputChange = (e) => {
    setMatricule(e.target.value);
  };


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
        data && (
          <>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6">Nom: {data.eleve[0].nom}</Typography>
              <Typography variant="h6">Prénoms : {data.eleve[0].prenoms}</Typography>
              <Typography variant="h6">Matricule: {matricule}</Typography>
            </Box>
            {data.historiques.map((historique, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Année Académique: {historique.annee_academique}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ mb: 1, color: historique.solde ? 'green' : 'red' }}
                >
                  Soldé : {historique.solde ? "Oui" : "Non"}
                </Typography>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Classe: {historique.classe}
                </Typography>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  École: {historique.school.name}
                </Typography>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Email: {historique.school.email}
                </Typography>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Téléphone: {historique.school.phone}
                </Typography>
                {historique.transactions.length > 0 ? (
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="historique table">
                      <TableHead>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 'bold', fontSize: 20 }}>Montant</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', fontSize: 20 }}>Annexe</TableCell>
                          <TableCell sx={{ fontWeight: 'bold', fontSize: 20 }}>Date de paiement</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {historique.transactions.map((transaction, idx) => (
                          <TableRow key={idx}>
                            <TableCell sx={{ fontSize: 17 }}>{transaction.montant}</TableCell>
                            <TableCell sx={{ fontSize: 17 }}>{transaction.annexe ? "Frais Généraux" : "Frais de Ré/Inscription et Frais de Scolarité"}</TableCell>
                            <TableCell sx={{ fontSize: 17 }}>{new Date(transaction.created_at).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <Typography variant="body1" color='red'>Aucune transaction pour cette année académique.</Typography>
                )}
              </Box>
            ))}
          </>
        )
      )}
    </Box>
  );
};

export default Historique;

