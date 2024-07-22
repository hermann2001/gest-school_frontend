import React from 'react';
import { Typography, Box, Container, Divider } from '@mui/material';

const Notices = () => {
  return (
    <Container sx={{ padding: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Rôle de l'Administrateur Général
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      
      <Typography variant="body1" paragraph>
        Bienvenue sur notre Système de gestion scolaire. Cette plateforme vise à :
        <ul>
          <li>Rationaliser la gestion scolaire, organiser vos classes et inscrire des étudiants dans votre établissement.</li>
          <li>Gérer les frais de scolarité via un paiement en ligne.</li>
          <li>Gérer les notes et moyennes ainsi que les sessions d'examen.</li>
        </ul>
        En tant qu'administrateur général, vous avez un rôle central dans la gestion de la plateforme. Vous êtes responsable de la supervision des opérations, de la gestion des utilisateurs, et de la coordination avec les autres membres de l'équipe pour assurer le bon fonctionnement de toutes les fonctionnalités de la plateforme.
      </Typography>

      <Typography variant="h6" component="h2" gutterBottom>
        Vos Responsabilités
      </Typography>
      <Typography variant="body1" paragraph>
        - <strong>Gestion des Etablissements :</strong> Vous pouvez ajouter et supprimer des établissements ainsi qu'avoir accès aux informations sur chaque établissement sur système.
      </Typography>
      <Typography variant="body1" paragraph>
        - <strong>Surveillance des Activités :</strong> Vous surveillez les activités sur la plateforme pour garantir une utilisation conforme aux politiques de l'organisation. Vous gérez également les alertes et résolvez les problèmes signalés.
      </Typography>
      <Typography variant="body1" paragraph>
        - <strong>Coordination des Projets :</strong> Vous collaborez avec les équipes de développement pour intégrer de nouvelles fonctionnalités, mettre à jour les systèmes existants, et veiller à ce que les projets soient livrés dans les délais.
      </Typography>
      <Typography variant="body1" paragraph>
        - <strong>Analyse des Performances :</strong> Vous analysez les données et les rapports de performance pour identifier les opportunités d'amélioration et pour prendre des décisions stratégiques sur l'évolution de la plateforme.
      </Typography>

      <Typography variant="body1" paragraph>
        Votre rôle en tant qu'administrateur général est crucial pour assurer la réussite et la stabilité de la plateforme. Votre capacité à gérer efficacement les utilisateurs, à surveiller les activités, et à coordonner les projets contribuera grandement à l'atteinte des objectifs de l'organisation.
      </Typography>
    </Container>
  );
};

export default Notices;
