import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import {
  getCurrentYear,
  newAcademicYear,
} from "../../../redux/userRelated/userHandle";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Popup from "../../../components/Popup";

const AcademicYear = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentYear, loading, error, response, status } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getCurrentYear());
  }, [dispatch]);

  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [role, setRole] = useState("AdminGen");

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    const formData = new FormData();
    formData.append("date_debut", startYear);
    formData.append("date_fin", endYear);
    formData.append("role", role);

    dispatch(newAcademicYear(formData, navigate));
    // Réinitialiser les champs du formulaire
    setStartYear("");
    setEndYear("");
  };

  useEffect(() => {
    if (status) {
      setMessage(status);
      setShowPopup(true);
      setLoader(false);
    } else if (response) {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (error) {
      setMessage(error.response.data.message);
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Box sx={{ mt: 15, p: 3, maxWidth: 600, mx: "auto" }}>
            {currentYear.length > 0 && (
              <div
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                <div>Année académique actuelle : {currentYear.name}</div>
                <div>
                  Du {currentYear.date_debut} au {currentYear.date_fin}
                </div>
              </div>
            )}
            <Card>
              <CardContent>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ textAlign: "center" }}
                >
                  Créer une Année Académique
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Date de début"
                    type="date"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    value={startYear}
                    onChange={(e) => setStartYear(e.target.value)}
                    required
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Date de fin"
                    type="date"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    value={endYear}
                    onChange={(e) => setEndYear(e.target.value)}
                    required
                    sx={{ mb: 2 }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Créer
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Box>
          <Popup
            message={message}
            setShowPopup={setShowPopup}
            showPopup={showPopup}
          />
        </>
      )}
    </>
  );
};

export default AcademicYear;
