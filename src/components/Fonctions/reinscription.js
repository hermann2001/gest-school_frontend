import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, IconButton } from '@mui/material';
import { openKkiapayWidget, addKkiapayListener, removeKkiapayListener } from 'kkiapay';
import FedapayLogo from '../../assets/feda.svg'; 
import KkiapayLogo from '../../assets/kkiapay.jpeg'; 
import { montant_du, payer } from '../api'; 

const Reinscription = () => {
  const [formData, setFormData] = useState({
    matricule: '',
    email: '',
    montant: '',
    paymentMethod: '',
  });

  useEffect(() => {
    const handleKkiapaySuccess = async (event) => {
      console.log(event);
      if (event.transactionId) {
        await handlePaymentSuccess();
      }
    };

    const handleKkiapayError = (event) => {
      if (event.detail.type === 'ERROR') {
        console.error('Erreur de paiement Kkiapay', event.detail.message);
        alert('Erreur de paiement Kkiapay : ' + event.detail.message);
      }
    };

    addKkiapayListener('success', handleKkiapaySuccess);
    addKkiapayListener('error', handleKkiapayError);

    return () => {
      removeKkiapayListener('success', handleKkiapaySuccess);
      removeKkiapayListener('error', handleKkiapayError);
    };
  }, [formData]);

  

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'matricule') {
      try {
        const response = await montant_du(value);
        // console.log(response);
        if (response.status === 201) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            montant: response.data.montant_du,
          }));
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du montant dû', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.paymentMethod === 'Kkiapay') {
      openKkiapayWidget({
        amount: formData.montant,
        api_key: "dfab22b049f311ef8a2865b7aef0cbc2",
        // api_key: '238b6b20abd411ee88fc25583847ea30',
        sandbox: true,
        email: formData.email,
        phone: '97000000',
      });
    } else if (formData.paymentMethod === 'Fedapay') {
      // Implémentez l'intégration Fedapay ici
      alert('Fedapay selected');
    } else {
      alert('Veuillez sélectionner un moyen de paiement.');
    }
  };

  const handlePaymentSuccess = async () => {
    try {
      const response = await payer({
        matricule: formData.matricule,
        email: formData.email,
        montant: formData.montant,
      });
      if (response.status === 201) {
        // alert('Paiement réussi et informations enregistrées');
        // Réinitialisez le formulaire ou redirigez l'utilisateur
        setFormData({
          matricule: '',
          email: '',
          montant: '',
          paymentMethod: '',
        });
      }
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des informations de paiement', error);
      alert('Erreur lors de l\'enregistrement des informations de paiement');
    }
  };

  const selectPaymentMethod = (method) => {
    setFormData({ ...formData, paymentMethod: method });
  };

  return (
    <Box className="form-container" sx={{ maxWidth: 1000, mx: 'auto', p: 3, boxShadow: 7, borderRadius: 2 }}>
      <Typography variant="h5" component="h3" sx={{ textAlign: 'center', fontSize: 37 }} gutterBottom>
        Paiement des frais d'inscription et de scolarité ici!
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
          name="montant"
          value={formData.montant}
          onChange={handleChange}
        />

        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <IconButton
            onClick={() => selectPaymentMethod('Fedapay')}
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
            onClick={() => selectPaymentMethod('Kkiapay')}
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
