import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  authRequest,
  stuffAdded,
  authSuccess,
  authFailed,
  authError,
  authLogout,
  doneSuccess,
  getDeleteSuccess,
  getRequest,
  getFailed,
  getError,
  getSuccess,
  sendSuccess,
  addClassSuccess,
  getClasseSuccess,
  inscriptionSuccess,
  getCYearSuccess,
  createYSuccess,
  getAYSuccess,
  getFraisYearSuccess,
  createFSuccess,
  getFailedF,
  getStudentSuccess,
  reInscriptionSuccess,
} from "./userSlice";

const api_url = process.env.REACT_APP_API_URL;

export const loginAdminGen = (fields, role) => async (dispatch) => {
  dispatch(authRequest());

  // Simule la vérification des informations d'identification
  const { username, password } = fields;

  if (username === "adminGen@2134" && password === "123456") {
    try {
      // Simule une réponse de succès
      const result = await axios.get(
        `${api_url}connexionAdminGen/connect/AdminC2C`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (result.data.message === "Connexion réussie") {
        dispatch(authSuccess({ username, role }));
      } else {
        dispatch(authFailed("Erreur de connexion !"));
      }
    } catch (error) {
      // Gestion des erreurs de requête
      console.error("Erreur lors de la requête :", error);
      dispatch(authError(error));
    }
  } else {
    // Simule une réponse d'échec
    dispatch(authFailed("Nom d'utilisateur ou mot de passe incorrect !"));
  }
};

export const logoutAdminGen = () => async (dispatch, navigate) => {
  try {
    // Simule une réponse de succès
    const result = await axios.get(`${api_url}deconnexionAdminGen`, {
      headers: { "Content-Type": "application/json" },
    });
    if (result.data.message === "Déconnexion réussie") {
      dispatch(authLogout());
      navigate("/");
    } else {
      dispatch(authFailed("Erreur de déconnexion !"));
    }
  } catch (error) {
    // Gestion des erreurs de requête
    console.error("Erreur lors de la requête :", error);
    dispatch(authFailed("Erreur de déconnexion !"));
  }
};

export const registerSchool = (schoolData, navigate) => async (dispatch) => {
  dispatch(authRequest());

  try {
    const result = await axios.post(`${api_url}createSchool`, schoolData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (result.data.success) {
      dispatch(doneSuccess());
      navigate("/showSchool");
    } else {
      dispatch(authFailed(result.data.message));
    }
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
    dispatch(authFailed("Erreur d'enregistrement de l'établissement !"));
  }
};

export const getAllSchools = () => async (dispatch) => {
  try {
    const result = await axios.get(`${api_url}allSchools`, {
      headers: { "Content-Type": "application/json" },
    });
    dispatch(getSuccess(result.data));
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
    dispatch(authFailed("Erreur de récupération des établissements !"));
  }
};

export const deleteSchool = (id) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(`${api_url}deleteSchool/${id}/AdminC2C`, {
      headers: { "Content-Type": "application/json" },
    });
    if (!result.data.success) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getDeleteSuccess());
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const resendConfirmMail = (id) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(
      `${api_url}resendLinkConfirm/${id}/AdminC2C`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!result.data.success) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(sendSuccess(result.data.message));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const loginAdminEta = (fields, role) => async (dispatch) => {
  dispatch(authRequest());

  try {
    const result = await axios.post(
      `${api_url}school/connexionAdminSchool`,
      fields,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (result.data.success) {
      dispatch(authSuccess(result.data.school));
    } else {
      dispatch(authFailed(result.data.message));
    }
  } catch (error) {
    // Gestion des erreurs de requête
    console.error("Erreur lors de la requête :", error);
    dispatch(authError(error));
  }
};

export const addClass = (classeData, id) => async (dispatch) => {
  dispatch(authRequest());

  try {
    const result = await axios.post(`${api_url}addClasse/${id}`, classeData, {
      headers: { "Content-Type": "application/json" },
    });
    if (!result.data.success) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(addClassSuccess());
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(getError({ message: errorMessage }));
  }
};

export const getClasses = (id) => async (dispatch) => {
  try {
    const result = await axios.get(`${api_url}getClasses/${id}`, {
      headers: { "Content-Type": "application/json" },
    });
    dispatch(getClasseSuccess(result.data));
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(authFailed({ message: errorMessage }));
  }
};

export const registerStudent = (formData, id) => async (dispatch) => {
  dispatch(authRequest());

  try {
    const result = await axios.post(`${api_url}inscription/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (!result.data.success) {
      dispatch(authFailed(result.data.message));
    } else {
      dispatch(inscriptionSuccess(result.data.eleve));
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(authError(error));
  }
};

export const newAcademicYear = (formData) => async (dispatch) => {
  dispatch(authRequest());

  try {
    const result = await axios.post(`${api_url}newAcademicYear`, formData, {
      headers: { "Content-Type": "application/json" },
    });
    if (result.data.success) {
      dispatch(createYSuccess(result.data.message));
    } else {
      dispatch(getFailed(result.data.message));
    }
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
    dispatch(getError(error));
  }
};

export const getCurrentYear = () => async (dispatch) => {
  try {
    const result = await axios.get(`${api_url}currentAcademicYear`, {
      headers: { "Content-Type": "application/json" },
    });
    if (result.data.success) {
      dispatch(getCYearSuccess(result.data.yearA));
    } else {
      dispatch(getFailed(result.data.message));
    }
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
    dispatch(getError(error));
  }
};

export const getAllYears = () => async (dispatch) => {
  try {
    const result = await axios.get(`${api_url}allAcademicsYears`, {
      headers: { "Content-Type": "application/json" },
    });
    dispatch(getAYSuccess(result.data));
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
    dispatch(authFailed("Erreur de récupération des années académiques !"));
  }
};

export const getFraisYear = (level, idSchool) => async (dispatch) => {
  try {
    const result = await axios.get(`${api_url}getFrais/${level}/${idSchool}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (result.data.success) {
      dispatch(getFraisYearSuccess(result.data.yearFrais));
    } else {
      dispatch(getFailedF(result.data.message));
    }
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
    dispatch(getError(error));
  }
};

export const newFraisYear = (formData, up, idSchool) => async (dispatch) => {
  dispatch(authRequest());

  try {
    const result = up
      ? await axios.post(`${api_url}updateFrais`, formData, {
          headers: { "Content-Type": "application/json" },
        })
      : await axios.post(`${api_url}addFrais/${idSchool}`, formData, {
          headers: { "Content-Type": "application/json" },
        });
    if (result.data.success) {
      dispatch(createFSuccess(result.data.message));
    } else {
      dispatch(getFailed(result.data.message));
    }
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
    dispatch(getError(error));
  }
};

export const getStudent = (matricule) => async (dispatch) => {
  try {
    const result = await axios.get(`${api_url}getEleveReins/${matricule}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (!result.data.success) {
      dispatch(authFailed(result.data.message));
    } else {
      dispatch(getStudentSuccess(result.data.eleve));
    }
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
    dispatch(getError(error));
  }
};

export const reRegisterStudent = (formData) => async (dispatch) => {
  dispatch(authRequest());

  try {
    const result = await axios.post(`${api_url}reinscription`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (!result.data.success) {
      dispatch(authFailed(result.data.message));
    } else {
      dispatch(reInscriptionSuccess(result.data.eleve));
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(authError(error));
  }
};
