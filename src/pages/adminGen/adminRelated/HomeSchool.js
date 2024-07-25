import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSchools } from "../../../redux/userRelated/userHandle";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";

const HomeBoard = () => {
  const dispatch = useDispatch();
  const { schools, loading, error } = useSelector((state) => state.user);

  const nivSchool = (sec) => {
    return sec ? "Secondaire" : "Primaire";
  };

  useEffect(() => {
    dispatch(getAllSchools());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {Array.isArray(schools) && schools.length > 0 ? (
          schools.map((school) => (
            <Grid item key={school._id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={`${process.env.REACT_APP_LOGO_URL}${school.logo}`}
                  alt={`${school.name} Logo`}
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "30px",
                      color: "primary.main",
                    }}
                  >
                    {school.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ fontWeight: "bold", fontSize: "18px" }}
                  >
                    {nivSchool(school.secondaire)}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ fontSize: "18px" }}
                  ></Typography>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ fontSize: "18px" }}
                  >
                    <span
                      style={{
                        textDecoration: "underline",
                        color: "secondary.main",
                      }}
                    >
                      Adresse
                    </span>{" "}
                    : {school.adresse}{" "}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ fontSize: "18px" }}
                  >
                    <span
                      style={{
                        textDecoration: "underline",
                        color: "secondary.main",
                      }}
                    >
                      Email
                    </span>{" "}
                    : {school.email}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ fontSize: "18px" }}
                  >
                    <span
                      style={{
                        textDecoration: "underline",
                        color: "secondary.main",
                      }}
                    >
                      Contact
                    </span>{" "}
                    : +229 {school.phone_number}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" component="div">
            Aucun établissement disponible !
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default HomeBoard;
