import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Popup from "../../../components/Popup";
import { CircularProgress, TextField, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import styled from "styled-components";
import { GreenButton } from "../../../components/buttonStyles";
import { getStudentByMatricule, addStudentToClass } from "../../../redux/userRelated/userHandle";
import { underControl } from "../../../redux/userRelated/userSlice";

const AddStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userState = useSelector((state) => state.user);
  const { status, response, error } = userState;

  const [matricule, setMatricule] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);

  const handleMatriculeChange = async (event) => {
    // const matricule = event.target.value;
    // setMatricule(matricule);
    // if (matricule) {
    //   const student = await dispatch(getStudentByMatricule(matricule));
    //   if (student) {
    //     setName(student.name);
    //     setSurname(student.surname);
    //   }
    // }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);

    const studentData = {
      matricule,
      name,
      surname,
      studentClass,
    };

    // dispatch(addStudentToClass(studentData, navigate));
  };

  useEffect(() => {
    if (status === "added") {
      dispatch(underControl());
      navigate("/adminEtaDashboard/listClass");
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
            <span className="registerTitle">Ajouter un élève</span>

            <Label>Matricule</Label>
            <StyledTextField
              type="text"
              placeholder="Entrer le matricule ici..."
              value={matricule}
              onChange={handleMatriculeChange}
              autoComplete="matricule"
              required
            />

            <Label>Nom</Label>
            <StyledTextField
              type="text"
              value={name}
              disabled
              autoComplete="name"
              required
            />

            <Label>Prénoms</Label>
            <StyledTextField
              type="text"
              value={surname}
              disabled
              autoComplete="surname"
              required
            />

            <Label>Classe</Label>
            <StyledFormControl>
              <InputLabel>Classe</InputLabel>
              <Select
                value={studentClass}
                onChange={(event) => setStudentClass(event.target.value)}
                required
              >
                <MenuItem value="6eA/1">6eA/1</MenuItem>
                <MenuItem value="5eB/2">5eB/2</MenuItem>
                <MenuItem value="2ndeCD">2ndeCD</MenuItem>
                {/* Add other class options here */}
              </Select>
            </StyledFormControl>
          </FormContainer>

          <GreenButton
            className="registerButton"
            type="submit"
            disabled={loader}
            style={{
              fontWeight: "bold",
              padding: "10px",
              margin: "36px 80px 40px 80px",
            }}
          >
            {loader ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Ajouter l'élève"
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

export default AddStudent;

const StyledTextField = styled(TextField)`
  width: 70%;
  max-width: 400px;
  margin: 0 auto 20px auto;
  display: block;
`;

const StyledFormControl = styled(FormControl)`
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
  margin-top: 30px;
  text-align: center;
`;