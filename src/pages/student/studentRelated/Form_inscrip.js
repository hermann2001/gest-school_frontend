import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, FormControl, InputLabel, Select, MenuItem, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { registerStudent } from '../../../redux/userRelated/userHandle';
import Popup from '../../../components/Popup';
import { useDispatch, useSelector } from 'react-redux';

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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { actionType, schoolName, niveau, schoolId } = location.state || {};

    const { status, eleve, eleveClasse, response, error } = useSelector(
        (state) => state.user
    );

    const [nom, setNom] = useState("");
    const [prenoms, setPrenoms] = useState("");
    const [sexe, setSexe] = useState(1);
    const [birthday, setDateNaissance] = useState("");
    const [adresse, setAdresse] = useState("");
    const [level, setNiveau] = useState("");
    const [serie, setSerie] = useState("");
    const [academic_year, setAnneeAcademique] = useState("");
    const [name_pere, setNomPere] = useState("");
    const [name_mere, setNomMere] = useState("");
    const [parent_mail, setEmail] = useState("");
    const [parent_telephone, setContactParents] = useState("");
    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoader(true);
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(parent_mail)) {
            setMessage("Veuillez entrer une adresse email valide.");
            setShowPopup(true);
            setLoader(false);
            return;
        }
        
        setShowPaymentModal(true); // Show payment modal before submitting the form
    };

    const handlePaymentChoice = (choice) => {
        setShowPaymentModal(false);
        const formData = {
            nom,
            prenoms,
            sexe,
            birthday,
            adresse,
            level,
            serie,
            academic_year,
            name_pere,
            name_mere,
            parent_mail,
            parent_telephone,
        };

        if (choice === 'yes') {
            dispatch(registerStudent(formData, schoolId));
            navigate('/payment-page');
        } else {
            dispatch(registerStudent(formData, schoolId));
        }
    };

    useEffect(() => {
        if (
            status === "success"
        ) {
            setMessage("Inscription réussie !");
            setShowPopup(true);
            navigate(-1);
        } else if (status === "failed") {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === "error") {
            setMessage(error.response.data.message);
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, eleve, navigate, response, eleveClasse]);
      

    const handleGoBack = () => {
        navigate(-1);
    };

    const getNiveauLabel = (niveau) => {
        return niveau === 0 ? 'primaire' : 'secondaire';
    };

    const renderFormFields = () => {
        const niveauxPrimaire = ['Maternelle', 'CI', 'CP', 'CE1', 'CE2', 'CM1', 'CM2'];
        const niveauxSecondaire = ['6e', '5e', '4e', '3e', '2nde', '1ere', 'Tle'];
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
                                        <MenuItem value="1">Masculin</MenuItem>
                                        <MenuItem value="0">Féminin</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField label="Date de Naissance" type="date" variant="outlined" fullWidth sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} value={birthday} onChange={(e) => setDateNaissance(e.target.value)} required/>
                                <TextField label="Adresse" variant="outlined" fullWidth sx={{ mb: 2 }}  value={adresse} onChange={(e) => setAdresse(e.target.value)} required/>
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel id="grade-label">Niveau</InputLabel>
                                    <Select labelId="grade-label" id="grade-select" label="Niveau" value={level} onChange={(e) => setNiveau(e.target.value)} required>
                                        {(niveau === 0 ? niveauxPrimaire : niveauxSecondaire).map((niveau, index) => (
                                            <MenuItem key={index} value={index + 1}>{niveau}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {niveau !== 0 && (
                                    <FormControl fullWidth sx={{ mb: 2 }}>
                                        <InputLabel id="series-label">Série</InputLabel>
                                        <Select labelId="series-label" id="series-select" label="Série" value={serie} onChange={(e) => setSerie(e.target.value)}>
                                            <MenuItem value="A">A</MenuItem>
                                            <MenuItem value="B">B</MenuItem>
                                            <MenuItem value="C">C</MenuItem>
                                            <MenuItem value="D">D</MenuItem>
                                            <MenuItem value="G2">G2</MenuItem>
                                            <MenuItem value="E">E</MenuItem>
                                            <MenuItem value="F">F</MenuItem>
                                        </Select>
                                    </FormControl>
                                )}
                                <FormControl fullWidth sx={{ mb: 2 }}>
                                    <InputLabel id="academic-year-label">Année académique</InputLabel>
                                    <Select labelId="academic-year-label" id="academic-year-select" label="Année académique"  value={academic_year} onChange={(e) => setAnneeAcademique(e.target.value)} required>
                                        {getAcademicYears(1).map((year) => (
                                            <MenuItem key={year} value={year}>{year}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <TextField label="Nom et prénoms du père" variant="outlined" fullWidth sx={{ mb: 2 }} value={name_pere} onChange={(e) => setNomPere(e.target.value)} required/>
                                <TextField label="Nom et prénoms de la mère" variant="outlined" fullWidth sx={{ mb: 2 }} value={name_mere} onChange={(e) => setNomMere(e.target.value)} required/>
                                <TextField label="Adresse mail" variant="outlined" fullWidth sx={{ mb: 2 }} value={parent_mail} onChange={(e) => setEmail(e.target.value)} required/>
                                <TextField label="Contact des parents" type="number" variant="outlined" fullWidth sx={{ mb: 2 }}  value={parent_telephone} onChange={(e) => setContactParents(e.target.value)} required/>

                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                    <Button variant="contained" color="success"  onClick={handleSubmit} disabled={loader} >
                                    {loader ? 'Chargement...' : 'Soumettre l\'inscription'}
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
        <>
            <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <IconButton onClick={handleGoBack} sx={{ mr: 2 }}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <Typography variant="h5">
                        {actionType === 'inscription' ? 'Formulaire d\'Inscription' : 'Formulaire de Réinscription'}
                    </Typography>
                </Box>
                {renderFormFields()}
            </Box>
            <Popup message={message} showPopup={showPopup} setShowPopup={setShowPopup} status={status} />
            <Dialog open={showPaymentModal} onClose={() => setShowPaymentModal(false)}>
                <DialogTitle color={"primary"}>Confirmation de Paiement</DialogTitle>
                <DialogContent>
                    <Typography>
                        Voulez-vous payer les frais d'inscription maintenant?
                        <br />
                        Vérifiez votre boîte mail pour télécharger votre fiche d'inscription. 
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handlePaymentChoice('no')} color="error">Non</Button>
                    <Button onClick={() => handlePaymentChoice('yes')} color="primary">Oui</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Form_inscrip;
