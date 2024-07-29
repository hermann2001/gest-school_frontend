import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { fetchData } from '../api';

const CustomTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: 16,
  backgroundColor: theme.palette.grey[200],
  textAlign: 'center',
}));

const CustomTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const SchoolTable = ({ school }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <CustomTableCell colSpan={6}>
          {school.name}
        </CustomTableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <CustomTableCell>Classe</CustomTableCell>
                    <CustomTableCell>Frais de Re/Inscription</CustomTableCell>
                    <CustomTableCell>Frais de Formation</CustomTableCell>
                    <CustomTableCell>Frais Annexes</CustomTableCell>
                    <CustomTableCell>Frais Total</CustomTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {school.classeWithMontant.map((classeMontant, index) => (
                    <CustomTableRow key={index}>
                      <TableCell>{classeMontant.classe.name}</TableCell>
                      <TableCell>{classeMontant.montant ? classeMontant.montant.frais_inscription : 0}</TableCell>
                      <TableCell>{classeMontant.montant  ? classeMontant.montant.frais_formation : 0}</TableCell>
                      <TableCell>{classeMontant.montant ? classeMontant.montant.frais_annexe : 0}</TableCell>
                      <TableCell>{(classeMontant.montant ? parseInt(classeMontant.montant.frais_inscription)  : 0) + (classeMontant.montant ? parseInt(classeMontant.montant.frais_formation ): 0) + (classeMontant.montant ? parseInt(classeMontant.montant.frais_annexe) : 0)}</TableCell>
                    </CustomTableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const SchoolPage = () => {
  const [data, setData] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData()
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  console.log(data);

  const handleSchoolClick = (school) => {
    setSelectedSchool(school);
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: 4, boxShadow: 5, borderRadius: 2, backgroundColor: '#fff' }}>
      <Typography variant="h4" component="h3" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 3 }}>
        Rechercher les Frais de votre Ecole !
      </Typography>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!selectedSchool ? (
        <List>
          {data.map((school, index) => (
            <ListItem button key={index} onClick={() => handleSchoolClick(school)}>
              <ListItemText primary={school.nom} />
            </ListItem>
          ))}
        </List>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 4, borderRadius: 2, boxShadow: 4 }}>
          <Table sx={{ minWidth: 650 }} aria-label="school table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => setSelectedSchool(null)}>
                    Retour
                  </Button>
                </TableCell>
                <CustomTableCell colSpan={6}>{selectedSchool.nom}</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <SchoolTable school={selectedSchool} />
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default SchoolPage;
