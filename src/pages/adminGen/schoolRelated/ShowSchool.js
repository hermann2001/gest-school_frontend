import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllSchools } from "../../../redux/userRelated/userHandle";
import { Paper, IconButton } from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TableTemplate from "../../../components/TableTemplate";
import SpeedDialTemplate from "../../../components/SpeedDialTemplate";
import * as React from "react";
import Button from "@mui/material/Button";
import Popup from "../../../components/Popup";

const ShowSchool = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { schools, loading, error, response } = useSelector(
    (state) => state.user
  );
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllSchools());
  }, [dispatch]);

  useEffect(() => {
    console.log("Schools state:", schools);
  }, [schools]);

  if (error) {
    console.log(error);
  }

  const [showPopup, setShowPopup] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const deleteHandler = (deleteID, address) => {
    console.log(deleteID);
    console.log(address);
    setMessage("Désolé, la fonction de suppression a été désactivée pour le moment.");
    setShowPopup(true);

    // dispatch(deleteUser(deleteID, address))
    //     .then(() => {
    //         dispatch(getAllStudents(currentUser._id));
    //     })
  };

  const reconfirmEmailHandler = (email) => {
    console.log(`Reconfirming email for: ${email}`);
    setMessage("Désolé, la reconfirmation par e-mail n'est pas encore mise en œuvre.");
    setShowPopup(true);

    // dispatch(reconfirmEmail(email))
    //     .then(() => {
    //         dispatch(getAllSchools());
    //     })
  };

  const schoolColumns = [
    { id: "logo", label: "Logo", maxWidth: 170 },
    { id: "name", label: "Etablissement", minWidth: 200 },
    { id: "email", label: "E-mail", minWidth: 170 },
    { id: "phone", label: "Téléphone", minWidth: 170 },
    { id: "adresse", label: "Adresse", minWidth: 200 },
    { id: "actions", label: "Actions", minWidth: 200 },
  ];

  const StudentButtonHaver = ({ row }) => {
    return (
      <>
        <Button
          variant="contained"
          color="primary"
          onClick={() => reconfirmEmailHandler(row.email)}
        >
          Renvoi du lien
        </Button>

        <IconButton onClick={() => deleteHandler(row.id, "School")}>
          <PersonRemoveIcon color="error" />
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
          email: school.email,
          phone: school.phone_number,
          adresse: school.adresse,
          id: school._id,
          actions: (
            <StudentButtonHaver row={school} />
          ),
        }))
      : [];

  const actions = [
    {
      icon: <PersonAddIcon color="primary" />,
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
              <TableTemplate
                columns={schoolColumns}
                rows={schoolRows}
              />
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
