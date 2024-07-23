import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerSchool } from "../../../redux/userRelated/userHandle";
import Popup from "../../../components/Popup";
import { underControl } from "../../../redux/userRelated/userSlice";
import {
  CircularProgress,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import styled from "styled-components";
import { GreenButton } from "../../../components/buttonStyles";

const AddSchool = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userState = useSelector((state) => state.user);
  const { status, response, error } = userState;

  const [name, setName] = useState("");
  const [logo, setLogo] = useState(null);
  const [adresse, setAdrName] = useState("");
  const [phone_number, setTelName] = useState("");
  const [email, setEName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("AdminGen");

  const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  const validateName = (name) => {
    const regex = /^[\p{L}0-9- ']+$/u;
    return regex.test(name);
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&-_/#<>()=:;.,\[\]{}\\^+'])[A-Za-z\d@$!%*?&-_/#<>()=:;.,\[\]{}\\^+]{8,}$/;
    return regex.test(password);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);

    if (!validateName(name)) {
      setMessage(
        "Le champ de nom ne doit contenir que des lettres, des chiffres, des espaces, des tirets et des apostrophes."
      );
      setShowPopup(true);
      setLoader(false);
      return;
    }

    if (!validatePassword(password)) {
      setMessage(
        "Le mot de passe doit comporter au moins 8 caractères, contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial."
      );
      setShowPopup(true);
      setLoader(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("logo", logo); // Ensure `logo` is a file
    formData.append("adresse", adresse);
    formData.append("phone_number", phone_number);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("role", role);

    // Debugging: Log all the form data values
    console.log("Form Data Values:");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    dispatch(registerSchool(formData, navigate));
  };

  const handleLogoChange = (event) => {
    setLogo(event.target.files[0]);
  };

  useEffect(() => {
    if (status === "added") {
      dispatch(underControl());
      navigate("/adminDashboard/showSchool");
    } else if (status === "failed") {
      setMessage(response);
      setShowPopup(true);
      setLoader(false);
    } else if (status === "error") {
      setMessage(error.response.data.message);
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <>
      <div className="register">
        <form className="registerForm" onSubmit={submitHandler}>
          <FormContainer>
            <span className="registerTitle">Enregistrer un établissement</span>

            <Label>Logo de l'établissement</Label>
            <FileInputWrapper>
              <HiddenFileInput
                type="file"
                accept="image/*"
                id="logo-upload"
                onChange={handleLogoChange}
              />
              <StyledButton htmlFor="logo-upload">
                Choisir un fichier
              </StyledButton>
              {logo && <FileName>{logo.name}</FileName>}
            </FileInputWrapper>

            <Label>Nom de l'établissement</Label>
            <StyledTextField
              type="text"
              placeholder="Entrer le nom ici..."
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              required
            />

            <Label>Adresse</Label>
            <StyledTextField
              type="text"
              placeholder="Entrer l'adresse ici..."
              value={adresse}
              onChange={(event) => setAdrName(event.target.value)}
              autoComplete="adresse"
              required
            />

            <Label>Contact de l'établissement</Label>
            <StyledTextField
              type="number"
              placeholder="Entrer le contact ici..."
              value={phone_number}
              onChange={(event) => setTelName(event.target.value)}
              autoComplete="telname"
              required
            />

            <Label>Adresse électronique</Label>
            <StyledTextField
              type="text"
              placeholder="Entrer l'email ici..."
              value={email}
              onChange={(event) => setEName(event.target.value)}
              autoComplete="email"
              required
            />

            <Label>Mot de passe</Label>
            <StyledTextField
              type={showPassword ? "text" : "password"}
              placeholder="Entrer le mot de passe ici..."
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              required
              variant="outlined"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              style={{ marginBottom: "20px" }}
            />
          </FormContainer>

          <GreenButton
            className="registerButton"
            type="submit"
            disabled={loader}
            style={{
              fontWeight: "bold",
              padding: "10px",
              marginLeft: "80px",
              marginRight: "80px",
              marginTop: "20px",
              marginBottom: "40px",
            }}
          >
            {loader ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Valider"
            )}
          </GreenButton>
        </form>
      </div>
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
};

export default AddSchool;

const StyledTextField = styled(TextField)`
  width: 70%;
  max-width: 400px;
  margin: 0 auto 20px auto;
  display: block;
`;

const Label = styled.label`
  display: block;
  margin: 10px auto;
  width: 70%;
  max-width: 400px;
  text-align: left;
  font-size: 15px;
  font-weight: bold;
`;

const FormContainer = styled.div`
  margin-top: 200px;
  text-align: center;
`;

const FileInputWrapper = styled.div`
  width: 70%;
  max-width: 400px;
  margin: 0 auto 20px auto;
  display: flex;
  align-items: center;
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

const FileName = styled.span`
  margin-left: 10px;
  font-size: 14px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;
