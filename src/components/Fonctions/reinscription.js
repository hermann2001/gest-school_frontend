import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, IconButton } from '@mui/material';
import { openKkiapayWidget, addKkiapayListener,removeKkiapayListener,} from "kkiapay";
import FedapayLogo from '../../assets/feda.jpeg'; // Remplacez par le chemin vers le logo Fedapay
import KkiapayLogo from '../../assets/kkiapay.jpeg'; // Remplacez par le chemin vers le logo Kkiapay

const Reinscription = () => {
  const [formData, setFormData] = useState({
    matricule: '',
    email: '',
    montant_inscription: '',
    paymentMethod: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.paymentMethod === "Kkiapay") {
      // openKkiapayWidget({
      //   amount: formData.montant_inscription * 100, // Assurez-vous que le montant est en centimes
      //   api_key: "dfab22b049f311ef8a2865b7aef0cbc2",
      //   sandbox: true,
      //   email: formData.email,
      //   phone: "97000000",
      // });
    } else if (formData.paymentMethod === "Fedapay") {
      alert("Fedapay selected");
      // Implémentez l'intégration Fedapay ici
    } else {
      alert("Veuillez sélectionner un moyen de paiement.");
    }
  };

  const selectPaymentMethod = (method) => {
    setFormData({ ...formData, paymentMethod: method });
  };

  return (
    <Box className="form-container" sx={{ maxWidth: 1000, mx: 'auto', p: 3, boxShadow: 7, borderRadius: 2 }}>
      <Typography variant="h5" component="h3" sx={{ textAlign: 'center', fontSize: 37 }} gutterBottom>
        Réinscrivez vous ou inscrivez vous en quelques clics!
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Matricule"
          variant="outlined"
          margin="normal"
          placeholder="Entrer le matricule"
          name="matricule"
          value={formData.matricule}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          placeholder="Entrer votre mail"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Montant"
          variant="outlined"
          margin="normal"
          placeholder="Entrer le montant"
          name="montant_inscription"
          value={formData.montant_inscription}
          onChange={handleChange}
        />

        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <IconButton
            onClick={() => selectPaymentMethod("Fedapay")}
            sx={{
              mx: 1,
              p: 2,
              backgroundColor: formData.paymentMethod === 'Fedapay' ? 'primary.main' : 'grey.300',
              color: formData.paymentMethod === 'Fedapay' ? 'white' : 'black',
            }}
          >
            <img src={FedapayLogo} alt="Fedapay" style={{ width: 40, height: 40 }} />
          </IconButton>
          <IconButton
            onClick={() => selectPaymentMethod("Kkiapay")}
            sx={{
              mx: 1,
              p: 2,
              backgroundColor: formData.paymentMethod === 'Kkiapay' ? 'primary.main' : 'grey.300',
              color: formData.paymentMethod === 'Kkiapay' ? 'white' : 'black',
            }}
          >
            <img src={KkiapayLogo} alt="Kkiapay" style={{ width: 40, height: 40 }} />
          </IconButton>
        </Box>

        <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 3 }}>
          Soumettre
        </Button>
      </form>
    </Box>
  );
};

export default Reinscription;
