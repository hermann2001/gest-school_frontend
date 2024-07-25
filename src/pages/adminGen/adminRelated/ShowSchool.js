import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteSchool,
  getAllSchools,
  resendConfirmMail,
} from "../../../redux/userRelated/userHandle";
import { Paper, IconButton } from "@mui/material";
import TableTemplate from "../../../components/TableTemplate";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import * as React from "react";
import Popup from "../../../components/Popup";
import { Delete, Refresh } from "@mui/icons-material";
import SchoolIcon from "@mui/icons-material/School";

const ShowSchool = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { schools, loading, error, response } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getAllSchools());
  }, [dispatch]);

  if (error) {
    console.log(error);
  }

  const [showPopup, setShowPopup] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const deleteHandler = (deleteID) => {
    dispatch(deleteSchool(deleteID)).then(() => {
      dispatch(getAllSchools());
      setMessage("Suppression éffectuée avec succès !");
      setShowPopup(true);
    });
  };

  const reconfirmEmailHandler = (schoolId) => {
    dispatch(resendConfirmMail(schoolId)).then(() => {
      dispatch(getAllSchools());
      setMessage("Lien de confirmation renvoyé avec succès !");
      setShowPopup(true);
    });
  };

  const schoolColumns = [
    { id: "logo", label: "Logo", maxWidth: 170 },
    { id: "name", label: "Etablissement", minWidth: 200 },
    { id: "ecole", label: "École", maxWidth: 100 },
    { id: "email", label: "E-mail", minWidth: 170 },
    { id: "phone", label: "Téléphone", minWidth: 170 },
    { id: "adresse", label: "Adresse", minWidth: 200 },
    { id: "actions", label: "Actions", minWidth: 200 },
  ];

  const StudentButtonHaver = ({ row }) => {
    return (
      <>
        {!row.verified && (
          <IconButton onClick={() => reconfirmEmailHandler(row.id)}>
            <Refresh color="primary" />
          </IconButton>
        )}

        <IconButton onClick={() => deleteHandler(row.id)}>
          <Delete color="error" />
        </IconButton>
      </>
    );
  };

  const schoolRows =
    Array.isArray(schools) && schools.length > 0
      ? schools.map((school) => ({
          logo: (
            <img
              src={`${process.env.REACT_APP_LOGO_URL}${school.logo}`}
              alt={`${school.name} Logo`}
              width={80}
              height={80}
            />
          ),
          name: school.name,
          ecole: school.secondaire ? "Secondaire" : "Primaire",
          email: school.email,
          phone: school.phone_number,
          adresse: school.adresse,
          id: school._id,
          actions: <StudentButtonHaver row={school} />,
        }))
      : [];

  const actions = [
    {
      icon: <SchoolIcon color="primary" />,
      name: "Enregistrer un établissement",
      action: () => navigate("/addSchool"),
    },
  ];

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            {Array.isArray(schools) && schools.length > 0 && (
              <TableTemplate columns={schoolColumns} rows={schoolRows} />
            )}
            <SpeedDialTemplate actions={actions} />
          </Paper>
        </>
      )}
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </>
  );
};

export default ShowSchool;
