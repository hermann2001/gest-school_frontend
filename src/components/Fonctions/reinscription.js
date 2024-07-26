import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';
import {
  openKkiapayWidget,
  addKkiapayListener,
  removeKkiapayListener,
} from "kkiapay";

const Reinscription = () => {
  const [formData, setFormData] = useState({
    matricule: '',
    email: '',
    montant:'',
    paymentMethod: '',
  });

  function open({paymentMethod}) {
    console.log(formData)
    // alert(formData.paymentMethod)
    if (formData.paymentMethod === "Kkiapay") {
    //      openKkiapayWidget({
    //   amount: 4000,
    //   api_key: "dfab22b049f311ef8a2865b7aef0cbc2",
    //   sandbox: true,
    //   email: "randomgail@gmail.com",
    //   phone: "97000000",
    // });
    } else {
      alert("cc")
    }
 
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/reinscription', formData);
      if (response.status === 200) {
        console.log('Paiement réussi', response.data);
        // Handle successful payment here
      }
    } catch (error) {
      console.error('Paiement échoué', error.response.data);
      // Handle payment failure here
    }
  };

  return (
    <Box className="form-container" sx={{ maxWidth: 1000, mx: 'auto', p: 3, boxShadow: 7, borderRadius: 2 }}>
      <Typography variant="h5" component="h3" sx={{textAlign:'center',fontSize:37}} gutterBottom>
        Réinscrivez vous ou inscriver vous en quelques clics!
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
        <FormControl fullWidth margin="normal">
          <InputLabel id="payer-par-label">Payé par</InputLabel>
          <Select
            labelId="payer-par-label"
            label="Payé par"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <MenuItem value="Fedapay">Fedapay</MenuItem>
            <MenuItem value="Kkiapay">Kkiapay</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={({paymentMethod}) => open({paymentMethod})} color="primary" type="submit" fullWidth className="mt-3">
          Soumettre
        </Button>
        {/* <div>
          <button onClick={open}>click me</button>
        </div> */}
      </form>
    </Box>
  );
};

export default Reinscription;




