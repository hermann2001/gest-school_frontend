import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const getAcademicYears = (numberOfYears) => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 0; i < numberOfYears; i++) {
        const startYear = currentYear + i;
        const endYear = startYear + 1;
        years.push(`${startYear}-${endYear}`);
    }
    return years;
};

const Form_inscrip = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { actionType, schoolName, niveau } = location.state || {};

    const [nom, setNom] = useState("");
    const [prenoms, setPrenoms] = useState("");
    const [sexe, setSexe] = useState("");
    const [dateNaissance, setDateNaissance] = useState("");
    const [adresse, setAdresse] = useState("");
    const [niv, setNiveau] = useState("");
    const [serie, setSerie] = useState("");
    const [anneeAcademique, setAnneeAcademique] = useState("");
    const [nomPere, setNomPere] = useState("");
    const [nomMere, setNomMere] = useState("");
    const [email, setEmail] = useState("");
    const [contactParents, setContactParents] = useState("");
    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoader(true);
      
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          setMessage("Veuillez entrer une adresse email valide.");
          setShowPopup(true);
          setLoader(false);
          return;
        }
      
        // Préparer les données à envoyer
        const formData = {
          nom,
          prenoms,
          sexe,
          dateNaissance,
          adresse,
          niv,
          serie,
          anneeAcademique,
          nomPere,
          nomMere,
          email,
          contactParents,
        };
      
        // dispatch(registerStudent(formData))
        //   .then(() => {
        //     setMessage("Inscription réussie !");
        //     setShowPopup(true);
        //   })
        //   .catch((error) => {
        //     setMessage(`Erreur: ${error.message}`);
        //     setShowPopup(true);
        //   })
        //   .finally(() => {
        //     setLoader(false);
        //   });
      };
      


    const handleGoBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    const getNiveauLabel = (niveau) => {
        return niveau === 0 ? 'primaire' : 'secondaire';
    };

    const renderFormFields = () => {
        if (actionType === 'inscription') {
            return (
                <>
                    <Card sx={{ mt: 2, maxWidth: '600px', mx: 'auto', backgroundColor: 'white' }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#0E70DB' }}>
                                Formulaire d'Inscription dans l'établissement 
                                <br />
                                {getNiveauLabel(niveau)} {schoolName}
                            </Typography>
                            <Box sx={{ width: '100%' }}>
                                <TextField label="Nom" variant="outlined" fullWidth sx={{ mb: 2 }} value={nom} onChange={(e) => setNom(e.target.value)} required/>
                                <TextField label="Prénoms" variant="outlined" fullWidth sx={{ mb: 2 }} value={prenoms} onChange={(e) => setPrenoms(e.target.value)} required/>
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel id="sex-label">Sexe</InputLabel>
                                    <Select labelId="sex-label" id="sex-select" label="Sexe" value={sexe} onChange={(e) => setSexe(e.target.value)}required>
                                        <MenuItem value="male">Masculin</MenuItem>
                                        <MenuItem value="female">Féminin</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField label="Date de Naissance" type="date" variant="outlined" fullWidth sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} value={dateNaissance} onChange={(e) => setDateNaissance(e.target.value)} required/>
                                <TextField label="Adresse" variant="outlined" fullWidth sx={{ mb: 2 }}  value={adresse} onChange={(e) => setAdresse(e.target.value)} required/>
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel id="grade-label">Niveau</InputLabel>
                                    <Select labelId="grade-label" id="grade-select" label="Niveau" value={niv} onChange={(e) => setNiveau(e.target.value)} required>
                                        <MenuItem value={1}>Maternelle</MenuItem><MenuItem value={2}>CI</MenuItem><MenuItem value={3}>CP</MenuItem>
                                        <MenuItem value={4}>CE1</MenuItem><MenuItem value={5}>CE2</MenuItem><MenuItem value={6}>CM1</MenuItem>
                                        <MenuItem value={7}>CM2</MenuItem><MenuItem value={8}>6e</MenuItem><MenuItem value={9}>5e</MenuItem>
                                        <MenuItem value={10}>4e</MenuItem><MenuItem value={11}>3e</MenuItem><MenuItem value={12}>2nde</MenuItem>
                                        <MenuItem value={13}>1ere</MenuItem><MenuItem value={14}>Tle</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel id="series-label">Série</InputLabel>
                                    <Select labelId="series-label" id="series-select" label="Série" value={serie} onChange={(e) => setSerie(e.target.value)} >
                                        <MenuItem value="A">A</MenuItem>
                                        <MenuItem value="B">B</MenuItem>
                                        <MenuItem value="C">C</MenuItem>
                                        <MenuItem value="D">D</MenuItem>
                                        <MenuItem value="G2">G2</MenuItem>
                                        <MenuItem value="E">E</MenuItem>
                                        <MenuItem value="F">F</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel id="academic-year-label">Année académique</InputLabel>
                                    <Select labelId="academic-year-label" id="academic-year-select" label="Année académique"  value={anneeAcademique} onChange={(e) => setAnneeAcademique(e.target.value)} required>
                                        {getAcademicYears(1).map((year) => (
                                            <MenuItem key={year} value={year}>{year}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <TextField label="Nom et prénoms du père" variant="outlined" fullWidth sx={{ mb: 2 }} value={nomPere} onChange={(e) => setNomPere(e.target.value)} required/>
                                <TextField label="Nom et prénoms de la mère" variant="outlined" fullWidth sx={{ mb: 2 }} value={nomMere} onChange={(e) => setNomMere(e.target.value)} required/>
                                <TextField label="Adresse mail" variant="outlined" fullWidth sx={{ mb: 2 }} value={email} onChange={(e) => setEmail(e.target.value)} required/>
                                <TextField label="Contact des parents" variant="outlined" fullWidth sx={{ mb: 2 }}  value={contactParents} onChange={(e) => setContactParents(e.target.value)} required/>

                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                    <Button variant="contained" color="success"  onClick={handleSubmit} disabled={loader} >
                                        Soumettre l'inscription
                                    </Button>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </>
            );
        } else if (actionType === 'réinscription') {
            return (
                <>
                    <Card sx={{ mt: 2, maxWidth: '600px', mx: 'auto', backgroundColor: 'white' }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
                                Formulaire de Réinscription
                            </Typography>
                            <Box sx={{ width: '100%' }}>
                                {/* Replace with fields specific to re-enrollment */}
                                <TextField label="Nom" variant="outlined" fullWidth sx={{ mb: 2 }} />
                                <TextField label="Prénom" variant="outlined" fullWidth sx={{ mb: 2 }} />
                                <TextField label="Adresse" variant="outlined" fullWidth sx={{ mb: 2 }} />
                                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                                    Soumettre
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </>
            );
        } else {
            return <Typography variant="h6">Type d'action inconnu</Typography>;
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <IconButton onClick={handleGoBack} sx={{ mr: 2 }}>
                    <ArrowBackIosNewIcon />
                </IconButton>
                <Typography variant="h4">
                    {actionType === 'inscription' ? 'Formulaire d\'Inscription' : 'Formulaire de Réinscription'}
                </Typography>
            </Box>
            {renderFormFields()}
        </Box>
    );
};

export default Form_inscrip;
