import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  getCurrentYear,
  getFraisYear,
  getStudent,
  registerStudent,
  reRegisterStudent,
} from "../../../redux/userRelated/userHandle";
import Popup from "../../../components/Popup";
import { useDispatch, useSelector } from "react-redux";
import { Label } from "@mui/icons-material";
import styled from "styled-components";

const Form_inscrip = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { actionType, schoolName, niveau, schoolId } = location.state || {};

  const { status, eleve, eleveClasse, response, error, frais } = useSelector(
    (state) => state.user
  );

  const currentYear = useSelector((state) => state.user.currentYear);
  const academic_year = currentYear?.name;
  useEffect(() => {
    dispatch(getCurrentYear());
  }, [dispatch]);

  const [photo, setPhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState("");
  const [matricule, setMatricule] = useState("");
  const [nom, setNom] = useState("");
  const [prenoms, setPrenoms] = useState("");
  const [sexe, setSexe] = useState(1);
  const [birthday, setDateNaissance] = useState("");
  const [adresse, setAdresse] = useState("");
  const [niveaux, setNiveaux] = useState([]);
  const [level, setNiveau] = useState("");
  const [serie, setSerie] = useState("");
  const [name_pere, setNomPere] = useState("");
  const [name_mere, setNomMere] = useState("");
  const [parent_mail, setEmail] = useState("");
  const [parent_telephone, setContactParents] = useState("");
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [se, setSe] = useState(false);

  const niveauxPrimaire = [
    "Maternelle",
    "CI",
    "CP",
    "CE1",
    "CE2",
    "CM1",
    "CM2",
  ];
  const niveauxSecondaire = ["6e", "5e", "4e", "3e", "2nde", "1ere", "Tle"];

  useEffect(() => {
    setNiveaux(niveau === 0 ? niveauxPrimaire : niveauxSecondaire);
  }, [niveau]);

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

    // Vérifiez la taille de la photo (max 2 Mo)
    if (photo && photo.size > 2 * 1024 * 1024) {
      // 2 Mo en octets
      setMessage("La taille de la photo ne doit pas dépasser 2 Mo.");
      setShowPopup(true);
      setLoader(false);
      return;
    }

    const formData = {
      photo,
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

    dispatch(registerStudent(formData, schoolId));
  };

  const handleReSubmit = (event) => {
    event.preventDefault();
    setLoader(true);

    if (nom) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(parent_mail)) {
        setMessage("Veuillez entrer une adresse email valide.");
        setShowPopup(true);
        setLoader(false);
        return;
      }

      // Vérifiez la taille de la photo (max 2 Mo)
      if (photo && photo.size > 2 * 1024 * 1024) {
        // 2 Mo en octets
        setMessage("La taille de la photo ne doit pas dépasser 2 Mo.");
        setShowPopup(true);
        setLoader(false);
        return;
      }

      const formData = {
        matricule,
        photo,
        adresse,
        level,
        serie,
        academic_year,
        parent_mail,
        parent_telephone,
      };

      dispatch(reRegisterStudent(formData));
    } else {
      dispatch(getStudent(matricule));
    }
  };

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handlePaymentChoice = (choice) => {
    setShowPaymentModal(false);

    if (choice === "yes") {
      navigate("/payment-page");
    } else {
      navigate("/inscription");
    }
  };

  useEffect(() => {
    if (level !== "6e" && level !== "5e") {
      setSe(true);
    } else {
      setSe(false);
    }
  }, [level]);

  useEffect(() => {
    if (status === "resuccess") {
      setMessage("Réinscription réussie !");
      setShowPopup(true);
      dispatch(getFraisYear(eleveClasse?.level, schoolId));
      setShowPaymentModal(true); // Show payment modal before submitting the form
    } else if (status === "success") {
      setMessage("Inscription réussie !");
      setShowPopup(true);
      dispatch(getFraisYear(eleveClasse?.level, schoolId));
      setShowPaymentModal(true); // Show payment modal before submitting the form
    } else if (status === "failed") {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === "error") {
      setMessage(error.response.data.message);
      setShowPopup(true);
      setLoader(false);
    } else if (status === "attente") {
      setLoader(false);
      setNom(eleve?.nom);
      setPrenoms(eleve?.prenoms);
      setAdresse(eleve?.adresse);
      setEmail(eleve?.parent_email);
      setContactParents(eleve?.parent_telephone);
      setPhotoURL(eleve?.photo);
      if (eleveClasse?.resultat === "Redouble") {
        setNiveau(eleveClasse?.level);
      } else if (eleveClasse?.resultat === "Admis") {
        niveaux.forEach((niv, index) => {
          if (niv === eleveClasse?.level) {
            setNiveau(niveaux[index + 1]);
          }
        });
      }
    }
  }, [status, error, response, eleve, eleveClasse, dispatch]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const getNiveauLabel = (niveau) => {
    return niveau === 0 ? "primaire" : "secondaire";
  };

  const renderFormFields = () => {
    if (actionType === "inscription") {
      return (
        <>
          <Card
            sx={{
              mt: 2,
              maxWidth: "600px",
              mx: "auto",
              backgroundColor: "white",
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#0E70DB",
                }}
              >
                Formulaire d'Inscription dans l'établissement
                <br />
                {getNiveauLabel(niveau)} {schoolName}
              </Typography>
              <Box sx={{ width: "100%" }}>
                <FileInputWrapper>
                  <HiddenFileInput
                    type="file"
                    accept="image/*"
                    id="logo-upload"
                    onChange={handlePhotoChange}
                  />
                  {photo && (
                    <div>
                      <ImagePreview
                        src={URL.createObjectURL(photo)}
                        alt="Photo d'identité"
                      />
                    </div>
                  )}
                  <div>
                    <StyledButton htmlFor="logo-upload">
                      Photo d'identité de l'enfant
                    </StyledButton>
                  </div>
                </FileInputWrapper>
                <TextField
                  label="Nom"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  required
                />
                <TextField
                  label="Prénoms"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={prenoms}
                  onChange={(e) => setPrenoms(e.target.value)}
                  required
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="sex-label">Sexe</InputLabel>
                  <Select
                    labelId="sex-label"
                    id="sex-select"
                    label="Sexe"
                    value={sexe}
                    onChange={(e) => setSexe(e.target.value)}
                    required
                  >
                    <MenuItem value="1">Masculin</MenuItem>
                    <MenuItem value="0">Féminin</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Date de Naissance"
                  type="date"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  InputLabelProps={{ shrink: true }}
                  value={birthday}
                  onChange={(e) => setDateNaissance(e.target.value)}
                  required
                />
                <TextField
                  label="Adresse"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={adresse}
                  onChange={(e) => setAdresse(e.target.value)}
                  required
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="grade-label">Niveau</InputLabel>
                  <Select
                    labelId="grade-label"
                    id="grade-select"
                    label="Niveau"
                    value={level}
                    onChange={(e) => setNiveau(e.target.value)}
                    required
                  >
                    {niveaux.map((niv, index) => (
                      <MenuItem key={index} value={niv}>
                        {niv}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {niveau !== 0 && se && (
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="series-label">Série</InputLabel>
                    <Select
                      labelId="series-label"
                      id="series-select"
                      label="Série"
                      value={serie}
                      onChange={(e) => setSerie(e.target.value)}
                    >
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
                <TextField
                  label="Année académique"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={academic_year}
                  disabled
                  required
                />
                <TextField
                  label="Nom et prénoms du père"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={name_pere}
                  onChange={(e) => setNomPere(e.target.value)}
                  required
                />
                <TextField
                  label="Nom et prénoms de la mère"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={name_mere}
                  onChange={(e) => setNomMere(e.target.value)}
                  required
                />
                <TextField
                  label="Adresse mail"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={parent_mail}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <TextField
                  label="Contact des parents"
                  type="number"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={parent_telephone}
                  onChange={(e) => setContactParents(e.target.value)}
                  required
                />

                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleSubmit}
                    disabled={loader}
                  >
                    {loader ? "Chargement..." : "Soumettre l'inscription"}
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </>
      );
    } else if (actionType === "réinscription") {
      return (
        <>
          <Card
            sx={{
              mt: 2,
              maxWidth: "600px",
              mx: "auto",
              backgroundColor: "white",
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#0E70DB",
                }}
              >
                Formulaire de Réinscription dans l'établissement
                <br />
                {getNiveauLabel(niveau)} {schoolName}
              </Typography>
              <Box sx={{ width: "100%" }}>
                {nom && (
                  <FileInputWrapper>
                    <HiddenFileInput
                      type="file"
                      accept="image/*"
                      id="logo-upload"
                      onChange={handlePhotoChange}
                    />
                    {photo ? (
                      <div>
                        <ImagePreview
                          src={URL.createObjectURL(photo)}
                          alt="Photo d'identité"
                        />
                      </div>
                    ) : (
                      <div>
                        <ImagePreview
                          src={process.env.REACT_APP_LOGO_URL + photoURL}
                          alt="Photo d'identité existante"
                        />
                      </div>
                    )}
                    <div>
                      <StyledButton htmlFor="logo-upload">
                        Photo d'identité de l'enfant
                      </StyledButton>
                    </div>
                  </FileInputWrapper>
                )}
                <TextField
                  label="matricule"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={matricule}
                  onChange={(e) => setMatricule(e.target.value)}
                  required
                  disabled={nom ? true : false}
                />
                {nom && (
                  <>
                    <TextField
                      label="Nom"
                      variant="outlined"
                      fullWidth
                      sx={{ mb: 2 }}
                      value={nom}
                      required
                      disabled
                    />
                    <TextField
                      label="Prénoms"
                      variant="outlined"
                      fullWidth
                      sx={{ mb: 2 }}
                      value={prenoms}
                      required
                      disabled
                    />
                    <TextField
                      label="Adresse"
                      variant="outlined"
                      fullWidth
                      sx={{ mb: 2 }}
                      value={adresse}
                      onChange={(e) => setAdresse(e.target.value)}
                      required
                    />
                    <TextField
                      label="Niveau"
                      variant="outlined"
                      fullWidth
                      sx={{ mb: 2 }}
                      value={level}
                      required
                      disabled
                    />
                    {niveau !== 0 && se && (
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="series-label">Série</InputLabel>
                        <Select
                          labelId="series-label"
                          id="series-select"
                          label="Série"
                          value={serie}
                          onChange={(e) => setSerie(e.target.value)}
                        >
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
                    <TextField
                      label="Année académique"
                      variant="outlined"
                      fullWidth
                      sx={{ mb: 2 }}
                      value={academic_year}
                      disabled
                      required
                    />
                    <TextField
                      label="Adresse mail"
                      variant="outlined"
                      fullWidth
                      sx={{ mb: 2 }}
                      value={parent_mail}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <TextField
                      label="Contact des parents"
                      type="number"
                      variant="outlined"
                      fullWidth
                      sx={{ mb: 2 }}
                      value={parent_telephone}
                      onChange={(e) => setContactParents(e.target.value)}
                      required
                    />
                  </>
                )}

                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleReSubmit}
                    disabled={loader}
                  >
                    {loader
                      ? "Chargement..."
                      : nom
                      ? "Soumettre la réinscription"
                      : "Retrouver l'enfant"}
                  </Button>
                </Box>
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
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <IconButton onClick={handleGoBack} sx={{ mr: 2 }}>
            <ArrowBackIosNewIcon />
          </IconButton>
          <Typography variant="h5">
            {actionType === "inscription"
              ? "Formulaire d'Inscription"
              : "Formulaire de Réinscription"}
          </Typography>
        </Box>
        {renderFormFields()}
      </Box>
      <Popup
        message={message}
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        status={status}
      />
      <Dialog
        open={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
      >
        <DialogTitle color={"primary"}>Confirmation de Paiement</DialogTitle>
        <DialogContent>
          {actionType === "inscription" ? (
            <Typography>
              Votre enfant <b>{eleve?.nom + " " + eleve?.prenoms}</b> a été
              inscrit dans notre établissement avec le numéro matricule{" "}
              <b>{eleve?.matricule}</b> pour l'année académique{" "}
              <b>{academic_year}</b> en {eleveClasse?.level}
              <br />
              Voulez-vous payer les frais d'inscription qui s'élevent à{" "}
              <b>{frais?.frais_inscription}</b> maintenant ?
              <br />
              <br />
              Veuillez vérifiez votre boîte mail pour télécharger votre fiche
              d'inscription.
            </Typography>
          ) : actionType === "réinscription" ? (
            <Typography>
              Votre enfant <b>{eleve?.nom + " " + eleve?.prenoms}</b> a été
              réinscrit pour l'année académique <b>{academic_year}</b> en{" "}
              {eleveClasse?.level}.
              <br /> Son matricule est le <b>{eleve?.matricule}</b>
              <br />
              Voulez-vous payer les frais de réinscription qui s'élevent à{" "}
              <b>{frais?.frais_reinscription}</b> maintenant ?
              <br />
              <br />
              Veuillez vérifiez votre boîte mail pour télécharger votre fiche
              d'inscription.
            </Typography>
          ) : (
            <Typography>Action inconnu</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handlePaymentChoice("no")} color="error">
            Payer plus tard
          </Button>
          <Button onClick={() => handlePaymentChoice("yes")} color="primary">
            Payer maintenant
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Form_inscrip;

const FileInputWrapper = styled.div`
  width: 70%;
  max-width: 400px;
  margin: 30px auto 30px auto;
  text-align: center;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const StyledButton = styled.label`
  background-color: #3b60fe;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #89a0ff;
  }
`;

const ImagePreview = styled.img`
  max-width: 200px;
  max-height: 200px;
  margin-bottom: 20px;
`;
