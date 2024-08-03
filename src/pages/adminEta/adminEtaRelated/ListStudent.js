import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Paper,
  Typography,
} from "@mui/material";
import { getAllYears } from "../../../redux/userRelated/userHandle";

const primaryLevels = ["Maternelle", "CI", "CP", "CE1", "CE2", "CM1", "CM2"];
const secondaryLevels = ["6e", "5e", "4e", "3e", "2nde", "1ere", "Tle"];

const ListStudent = () => {
  const dispatch = useDispatch();
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [students, setStudents] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);

  const schoolType = currentUser?.secondaire;
  const levels = schoolType === 1 ? secondaryLevels : primaryLevels;

  const { years, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllYears());
  }, [dispatch]);

  useEffect(() => {
    if (selectedLevel && selectedYear) {
      // Appel à l'API pour obtenir les données des élèves en fonction du niveau et de l'année sélectionnés
      fetchStudentsByLevelAndYear(selectedLevel, selectedYear).then((data) => {
        setStudents(data);
      });
    }
  }, [selectedLevel, selectedYear]);

  // Fonction simulée pour obtenir les élèves
  const fetchStudentsByLevelAndYear = async (level, year) => {
    // Remplace ceci par un appel API réel
    return [
      {
        matricule: "12345",
        name: "John",
        surname: "Doe",
        class: level,
        year: year,
      },
      {
        matricule: "67890",
        name: "Jane",
        surname: "Doe",
        class: level,
        year: year,
      },
    ];
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          mb: 2,
          maxWidth: 900,
          width: "100%",
          mx: "auto",
          display: "flex",
          gap: 2,
        }}
      >
        <Select
          fullWidth
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          displayEmpty
          sx={{ flex: 1 }}
        >
          <MenuItem value="" disabled>
            Sélectionner un niveau
          </MenuItem>
          {levels.map((level) => (
            <MenuItem key={level} value={level}>
              {level}
            </MenuItem>
          ))}
        </Select>
        <Select
          fullWidth
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          displayEmpty
          sx={{ flex: 1 }}
        >
          <MenuItem value="" disabled>
            Sélectionner une année scolaire
          </MenuItem>
          {years.map((year) => (
            <MenuItem key={year.id} value={year.name}>
              {year.name}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {selectedLevel && selectedYear && (
        <Card sx={{ mt: 2, backgroundColor: "white" }}>
          <CardContent>
            <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
              Liste des élèves pour {selectedLevel} ({selectedYear})
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                      Matricule
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                      Nom
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                      Prénom
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                      Classe
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        Aucun élève disponible
                      </TableCell>
                    </TableRow>
                  ) : (
                    students.map((student, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          {student.matricule}
                        </TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.surname}</TableCell>
                        <TableCell>{student.class}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ListStudent;
