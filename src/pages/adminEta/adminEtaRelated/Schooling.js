import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Typography,
  Box,
  TextField,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  getFraisYear,
  newFraisYear,
} from "../../../redux/userRelated/userHandle";
import Popup from "../../../components/Popup";

const Schooling = () => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState(""); // Ajouter cet état
  const [showPopup, setShowPopup] = useState(false); // Ajouter cet état

  const [selectedLevel, setSelectedLevel] = useState(null);
  const [existed, setExisted] = useState(false);
  const [enrollmentFee, setEnrollmentFee] = useState("");
  const [reEnrollmentFee, setReEnrollmentFee] = useState("");
  const [totalSchoolingFee, setTotalSchoolingFee] = useState("");
  const [installment1, setInstallment1] = useState("");
  const [installment2, setInstallment2] = useState("");
  const [installment3, setInstallment3] = useState("");

  const { frais, statusF, response, error } = useSelector(
    (state) => state.user
  );
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentRole = useSelector((state) => state.user.currentRole);
  const schoolType = currentUser?.secondaire;

  const categories = {
    Primaire: ["Maternelle", "CI", "CP", "CE1", "CE2", "CM1", "CM2"],
    Secondaire: ["6e", "5e", "4e", "3e", "2nde", "1ere", "Tle"],
  };

  const categoryKey = schoolType === 1 ? "Secondaire" : "Primaire";

  useEffect(() => {
    if (selectedLevel) {
      dispatch(getFraisYear(selectedLevel, currentUser?.id));
    }
  }, [selectedLevel, dispatch, currentUser?.id]);

  useEffect(() => {
    if (frais) {
      setEnrollmentFee(frais.frais_inscription);
      setReEnrollmentFee(frais.frais_reinscription);
      setTotalSchoolingFee(frais.frais_scolarite);
      setInstallment1(frais.frais_scolarite_tranche1);
      setInstallment2(frais.frais_scolarite_tranche2);
      setInstallment3(frais.frais_scolarite_tranche3);
      setExisted(true);
    } else {
      setEnrollmentFee("");
      setReEnrollmentFee("");
      setTotalSchoolingFee("");
      setInstallment1("");
      setInstallment2("");
      setInstallment3("");
      setExisted(false);
    }
  }, [frais]);

  const handleLevelClick = (level) => {
    setSelectedLevel(level === selectedLevel ? null : level);
  };

  const handleFeeSubmit = (e) => {
    e.preventDefault();

    if (
      parseFloat(totalSchoolingFee) !==
      parseFloat(installment1) +
        parseFloat(installment2) +
        parseFloat(installment3)
    ) {
      setMessage(
        "Les frais de scolarité doivent faire la somme des frais des différentes tranches"
      );
      setShowPopup(true);
    } else {
      const formData = {
        level: selectedLevel,
        frais_inscription: parseFloat(enrollmentFee),
        frais_reinscription: parseFloat(reEnrollmentFee),
        frais_scolarite: parseFloat(totalSchoolingFee),
        frais_scolarite_tranche1: parseFloat(installment1),
        frais_scolarite_tranche2: parseFloat(installment2),
        frais_scolarite_tranche3: parseFloat(installment3),
        role: currentRole,
      };

      setLoader(true);

      dispatch(newFraisYear(formData, existed, currentUser?.id));
    }
  };

  useEffect(() => {
    if (statusF) {
      setMessage(statusF);
      setShowPopup(true);
    } else if (response) {
      setMessage(response);
      setShowPopup(true);
    } else if (error) {
      setMessage(error.response.data.message);
      setShowPopup(true);
    }
  }, [statusF, error, response]);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 5, display: "flex", flexWrap: "wrap", gap: 2 }}>
        {categories[categoryKey]?.map((level) => (
          <Card key={level} sx={{ minWidth: 163 }}>
            <CardActionArea onClick={() => handleLevelClick(level)}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {level}
                  </Typography>
                  <AddIcon />
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>

      {selectedLevel && (
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
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
              Définir les frais pour le niveau {selectedLevel}
            </Typography>

            <form onSubmit={handleFeeSubmit}>
              <TextField
                fullWidth
                type="number"
                label="Frais d'inscription"
                value={enrollmentFee}
                onChange={(e) => setEnrollmentFee(e.target.value)}
                required
                sx={{ mb: 2 }}
                inputProps={{
                  step: "0.01",
                  min: "0",
                }}
              />
              <TextField
                fullWidth
                type="number"
                label="Frais de réinscription"
                value={reEnrollmentFee}
                onChange={(e) => setReEnrollmentFee(e.target.value)}
                required
                sx={{ mb: 2 }}
                inputProps={{
                  step: "0.01",
                  min: "0",
                }}
              />
              <TextField
                fullWidth
                type="number"
                label="Frais de scolarité globale"
                value={totalSchoolingFee}
                onChange={(e) => setTotalSchoolingFee(e.target.value)}
                required
                sx={{ mb: 2 }}
                inputProps={{
                  step: "0.01",
                  min: "0",
                }}
              />
              <TextField
                fullWidth
                type="number"
                label="1ère tranche"
                value={installment1}
                onChange={(e) => setInstallment1(e.target.value)}
                required
                sx={{ mb: 2 }}
                inputProps={{
                  step: "0.01",
                  min: "0",
                }}
              />
              <TextField
                fullWidth
                type="number"
                label="2ème tranche"
                value={installment2}
                onChange={(e) => setInstallment2(e.target.value)}
                required
                sx={{ mb: 2 }}
                inputProps={{
                  step: "0.01",
                  min: "0",
                }}
              />
              <TextField
                fullWidth
                type="number"
                label="3ème tranche"
                value={installment3}
                onChange={(e) => setInstallment3(e.target.value)}
                required
                sx={{ mb: 2 }}
                inputProps={{
                  step: "0.01",
                  min: "0",
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Enregistrer les frais
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
      <Popup
        message={message}
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        status={statusF}
      />
    </Box>
  );
};

export default Schooling;
