import React, { useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { styled } from '@mui/material/styles';



const schoolData = [
  {
    nom: 'École A',
    details: [
      { classe: 'Classe 1', anneeScolaire: '2023-2024', fraisReinscription: '100€', fraisInscription: '150€', fraisScolarite: '200€', fraisAnnexe: '50€' },
      { classe: 'Classe 2', anneeScolaire: '2023-2024', fraisReinscription: '110€', fraisInscription: '160€', fraisScolarite: '210€', fraisAnnexe: '60€' },
      // Ajoutez d'autres classes ici
    ]
  },
  {
    nom: 'École B',
    details: [
      { classe: 'Classe 1', anneeScolaire: '2023-2024', fraisReinscription: '120€', fraisInscription: '170€', fraisScolarite: '220€', fraisAnnexe: '70€' },
      { classe: 'Classe 2', anneeScolaire: '2023-2024', fraisReinscription: '130€', fraisInscription: '180€', fraisScolarite: '230€', fraisAnnexe: '80€' },
      // Ajoutez d'autres classes ici
    ]
  },
  // Ajoutez d'autres écoles ici
];

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
          {school.nom}
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
                    <CustomTableCell>Année Scolaire</CustomTableCell>
                    <CustomTableCell>Frais de Réinscription</CustomTableCell>
                    <CustomTableCell>Frais d'Inscription</CustomTableCell>
                    <CustomTableCell>Frais de Scolarité</CustomTableCell>
                    <CustomTableCell>Frais Annexe</CustomTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {school.details.map((detail, index) => (
                    <CustomTableRow key={index}>
                      <TableCell>{detail.classe}</TableCell>
                      <TableCell>{detail.anneeScolaire}</TableCell>
                      <TableCell>{detail.fraisReinscription}</TableCell>
                      <TableCell>{detail.fraisInscription}</TableCell>
                      <TableCell>{detail.fraisScolarite}</TableCell>
                      <TableCell>{detail.fraisAnnexe}</TableCell>
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
  const [selectedSchool, setSelectedSchool] = useState(null);
  
  const [data, setData] = useState(false);

  const handleSchoolClick = (school) => {
    setSelectedSchool(school);
  };

  // useEffect(async () => {
  //   const tre = () => {
      
  //   try {
  //     console.log("3gjh")
  //     // const response = await fetch("http://172.17.0.1:8000/api/schools")
  //     // const data = await response.json()

  //     // console.log(data)
  
  //     // setData(data)
  //   } catch (error) {
  //     console.error(error)
      
  //   }finally{
  //     //alert("fygvbh")
  //   }
  //   }


  //   tre();
  // },[])

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: 4, boxShadow: 5, borderRadius: 2, backgroundColor: '#fff' }}>
      <Typography variant="h4" component="h3" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 3 }}>
        Rechercher les Frais de votre Ecole !
      </Typography>
      {!selectedSchool ? (
        <List>
          {schoolData.map((school, index) => (
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
