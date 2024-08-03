import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  statusCY: null,
  statusF: null,
  userDetails: [],
  tempDetails: [],
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
  currentRole: (JSON.parse(localStorage.getItem("user")) || {}).role || null,
  error: null,
  response: null,
  darkMode: true,
  schools: [],
  currentYear: null,
  frais: null,
  years: [],
  classes: [],
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    authRequest: (state) => {
      state.status = "loading";
      state.loading = true;
      state.error = null;
    },
    underControl: (state) => {
      state.status = "idle";
      state.response = null;
    },
    stuffAdded: (state, action) => {
      state.status = "added";
      state.response = null;
      state.error = null;
      state.tempDetails = action.payload;
    },
    authSuccess: (state, action) => {
      state.status = "success";
      state.currentUser = action.payload;
      state.currentRole = action.payload.role;
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.response = null;
      state.error = null;
    },
    authFailed: (state, action) => {
      state.status = "failed";
      state.response = action.payload;
      state.loading = false;
      state.error = action.payload;
    },
    authError: (state, action) => {
      state.status = "error";
      state.error = action.payload;
    },
    authLogout: (state) => {
      localStorage.removeItem("user");
      state.currentUser = null;
      state.status = "idle";
      state.error = null;
      state.currentRole = null;
    },
    createYSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.statusCY = action.payload;
    },
    createFSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.statusF = action.payload;
    },
    doneSuccess: (state, action) => {
      state.userDetails = action.payload;
      state.loading = false;
      state.error = null;
      state.response = action.payload;
    },
    getSuccess: (state, action) => {
      state.schools = action.payload;
      state.loading = false;
      state.error = null;
      state.response = null;
    },
    getAYSuccess: (state, action) => {
      state.years = action.payload;
      state.loading = false;
      state.error = null;
      state.response = null;
    },
    getCYearSuccess: (state, action) => {
      state.currentYear = action.payload;
      state.loading = false;
      state.error = null;
      state.response = null;
    },
    getFraisYearSuccess: (state, action) => {
      state.frais = action.payload;
      state.loading = false;
      state.error = null;
      state.response = null;
    },
    getClasseSuccess: (state, action) => {
      state.classes = action.payload;
      state.loading = false;
      state.error = null;
      state.response = null;
    },
    getDeleteSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.response = null;
    },
    addClassSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.response = null;
    },
    inscriptionSuccess: (state, action) => {
      state.status = "success";
      state.eleve = action.payload[0];
      state.eleveClasse = action.payload[1];
      state.response = null;
      state.error = null;
    },
    getRequest: (state) => {
      state.loading = true;
    },
    getFailed: (state, action) => {
      state.response = action.payload;
      state.loading = false;
      state.error = null;
    },
    getFailedF: (state, action) => {
      state.response = action.payload;
      state.loading = false;
      state.error = null;
      state.frais = null;
    },
    getError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    sendSuccess: (state, action) => {
      state.response = action.payload;
      state.loading = false;
      state.error = null;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const {
  authRequest,
  underControl,
  stuffAdded,
  authSuccess,
  authFailed,
  authError,
  authLogout,
  doneSuccess,
  getSuccess,
  getAYSuccess,
  createYSuccess,
  createFSuccess,
  getCYearSuccess,
  getFraisYearSuccess,
  getClasseSuccess,
  getDeleteSuccess,
  addClassSuccess,
  inscriptionSuccess,
  getRequest,
  getFailed,
  getFailedF,
  sendSuccess,
  getError,
  toggleDarkMode,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
