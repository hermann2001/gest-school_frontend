import * as React from "react";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import { useSelector } from "react-redux";

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { schools } = useSelector((state) => state.user);

  const handleSchoolClick = () => {
    if (Array.isArray(schools) && schools.length > 0) {
      navigate("/showSchool");
    } else {
      navigate("/addSchool");
    }
  };

  return (
    <>
      <ListItemButton component={Link} to="/home">
        <ListItemIcon>
          <HomeIcon
            color={
              location.pathname.startsWith("/home") ? "primary" : "inherit"
            }
          />
        </ListItemIcon>
        <ListItemText primary="Accueil" />
      </ListItemButton>

      <ListItemButton onClick={handleSchoolClick}>
        <ListItemIcon>
          <SchoolIcon
            color={
              location.pathname.startsWith("/addSchool") ||
              location.pathname.startsWith("/showSchool")
                ? "primary"
                : "inherit"
            }
          />
        </ListItemIcon>
        <ListItemText primary="Ecoles" />
      </ListItemButton>

      <ListItemButton component={Link} to="/academicyear">
        <ListItemIcon>
          <CalendarMonthIcon
            color={
              location.pathname.startsWith("/academicyear")
                ? "primary"
                : "inherit"
            }
          />
        </ListItemIcon>
        <ListItemText primary="Année académique" />
      </ListItemButton>

      <ListItemButton component={Link} to="/notices">
        <ListItemIcon>
          <AnnouncementOutlinedIcon
            color={
              location.pathname.startsWith("/notices") ? "primary" : "inherit"
            }
          />
        </ListItemIcon>
        <ListItemText primary="Notices" />
      </ListItemButton>
    </>
  );
};

export default SideBar;
