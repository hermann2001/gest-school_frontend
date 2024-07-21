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
  //    getDeleteSuccess,
  getRequest,
  getFailed,
  getError,
  getSuccess,
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
      dispatch(authFailed("Erreur de connexion !"));
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

export const registerSchool = (fields, navigate) => async (dispatch) => {
  dispatch(authRequest());

  try {
    const result = await axios.post(`${api_url}createSchool`, fields, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (result.data.success) {
      dispatch(doneSuccess());
      navigate("/adminDashboard/showSchool");
    } else {
      dispatch(authFailed(result.data.message));
    }
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
    dispatch(authFailed("Erreur d'enregistrement de l'établissement !"));
  }
};

export const getAllSchools = () => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(`${api_url}allSchools`, {
      headers: { "Content-Type": "application/json" },
    });
    if (result.data) {
      dispatch(getSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (fields, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/adminDashboard/SchoolReg",
        fields
      );
      return response.data;
    } catch (error) {
      // Extraire le message d'erreur ou autres informations pertinentes
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = () => (dispatch) => {
  dispatch(authLogout());
};

export const getUserDetails = (id, address) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/${address}/${id}`
    );
    if (result.data) {
      dispatch(getSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

// export const deleteUser = (id, address) => async (dispatch) => {
//     dispatch(getRequest());

//     try {
//         const result = await axios.delete(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`);
//         if (result.data.message) {
//             dispatch(getFailed(result.data.message));
//         } else {
//             dispatch(getDeleteSuccess());
//         }
//     } catch (error) {
//         dispatch(getError(error));
//     }
// }

export const deleteUser = (id, address) => async (dispatch) => {
  dispatch(getRequest());
  dispatch(getFailed("Sorry the delete function has been disabled for now."));
};

export const updateUser = (fields, id, address) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/${address}/${id}`,
      fields,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (result.data.schoolName) {
      dispatch(authSuccess(result.data));
    } else {
      dispatch(doneSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError(error));
  }
};

export const addStuff = (fields, address) => async (dispatch) => {
  dispatch(authRequest());

  try {
    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/${address}Create`,
      fields,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (result.data.message) {
      dispatch(authFailed(result.data.message));
    } else {
      dispatch(stuffAdded(result.data));
    }
  } catch (error) {
    dispatch(authError(error));
  }
};
