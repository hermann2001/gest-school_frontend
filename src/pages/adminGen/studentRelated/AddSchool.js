import React, { useEffect, useState } from 'react';
import { useNavigate, navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerSchool, registerUser } from '../../../redux/userRelated/userHandle';
import Popup from '../../../components/Popup';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress, TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import styled from 'styled-components';
import { GreenButton } from '../../../components/buttonStyles';


const AddSchool = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;

    const [name, setName] = useState('');
    const [logo, setLogo] = useState(null);
    const [adresse, setAdrName] = useState('')
    const [phone_number, setTelName] = useState('')
    const [email, setEName] = useState('')
    const [password, setPassword] = useState('')

    const adminID = currentUser._id
    const role = "School"
    const attendance = []

    const [showPassword, setShowPassword] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState('');
    const [loader, setLoader] = useState(false);

    const fields = { name, logo, adresse, phone_number, email, password, adminID, role, attendance };

    // const submitHandler = (event) => {
    //     event.preventDefault();
    //     setLoader(true);

    //     const formData = new FormData();
    //     for (const key in fields) {
    //         formData.append(key, fields[key]);
    //     }
    //     if (logo) {
    //         formData.append('logo', logo);
    //     }

    //     dispatch(registerUser(formData, role));
    // };

    const handleLogoChange = (event) => {
        setLogo(event.target.files[0]);
    };

    // useEffect(() => {
    //     console.log(logo);
    // }, [logo]);

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);

        const formData = new FormData();
        formData.append('role', 'AdminGen');
        formData.append('name', name);
        formData.append('logo', logo);
        formData.append('adresse', adresse);
        formData.append('phone_number', phone_number);
        formData.append('email', email);
        formData.append('password', password);

        // API call
        setLoader(true);
        dispatch(registerSchool(formData, navigate));

        // Simulate API call delay
        // setTimeout(() => {
        //     setLoader(false);
        //     navigate('/adminDashboard/showSchool', { state: { school: schoolData } });
        // }, 2000);
    };

    useEffect(() => {
        if (status === 'added') {
            dispatch(underControl());
            navigate(-1);
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setMessage('Connexion échouée');
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
                            <HiddenFileInput type="file" accept="image/*" id="logo-upload" onChange={handleLogoChange} />
                            <StyledButton htmlFor="logo-upload">Choisir un fichier</StyledButton>
                            {logo && <FileName>{logo.name}</FileName>}
                        </FileInputWrapper>

                        <Label>Nom de l'établissement</Label>
                        <StyledTextField type="text" placeholder="Entrer le nom ici..."
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            autoComplete="name" required />  

                        <Label>Adresse</Label>
                        <StyledTextField type="text" placeholder="Entrer l'adresse ici..."
                            value={adresse}
                            onChange={(event) => setAdrName(event.target.value)}
                            autoComplete="adresse" required />

                        <Label>Contact de l'établissement</Label>
                        <StyledTextField type="number" placeholder="Entrer le contact ici..."
                            value={phone_number}
                            onChange={(event) => setTelName(event.target.value)}
                            autoComplete="telname" required />

                        <Label>Adresse électronique</Label>
                        <StyledTextField type="text" placeholder="Entrer l'email ici..."
                            value={email}
                            onChange={(event) => setEName(event.target.value)}
                            autoComplete="email" required />

                        <Label>Mot de passe</Label>
                        <StyledTextField
                            type={showPassword ? 'text' : 'password'}
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
                            style={{ marginBottom: '20px' }}
                        />
                    </FormContainer>

                    <GreenButton className="registerButton" type="submit" disabled={loader}  style={{ fontWeight: 'bold', padding: '10px', marginLeft: '80px', marginRight: '80px', marginTop: '20px', marginBottom: '40px' }}>
                            {loader ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            'Valider'
                        )}
                    </GreenButton>
                </form>
            </div>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    )
}

export default AddSchool

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
  background-color: #FFC300;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #FACE40;
  }
`;

const FileName = styled.span`
  margin-left: 10px;
  font-size: 14px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;