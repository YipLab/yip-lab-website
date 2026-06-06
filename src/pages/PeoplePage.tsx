import React from 'react';
import { Container, Typography, Box, Paper, Card, CardContent, Avatar } from '@mui/material';
import { People as PeopleIcon } from '@mui/icons-material';

const teamMembers = [
  {
    name: 'Christopher Yip, Ph.D.',
    title: 'Principal Investigator',
    bio: 'Professor, Department of Chemical Engineering and Applied Chemistry, Institute of Biomaterials and Biomedical Engineering, and Department of Biochemistry, University of Toronto. Canada Research Chair in Molecular Imaging.',
  },
  {
    name: 'Aaron Au, M.A.Sc.',
    title: 'Lab Technician',
    bio: 'Research focus: Single molecule biophysics and advanced microscopy techniques.',
  },
  {
    name: 'Thaisa Luup Kannen, Ph.D. Candidate',
    title: 'Graduate Researcher',
    bio: 'Research focus: Multiview imaging with a novel electromagnetic and electromechanical sample handlers.',
  },
  {
    name: 'Judy Liang, Ph.D. Candidate',
    title: 'Graduate Researcher',
    bio: 'Research focus: Single molecule biophysics and advanced microscopy techniques for CEACAM.',
  },
  {
    name: 'Ziyang Yu, Ph.D. Candidate',
    title: 'Graduate Researcher',
    bio: 'Research focus: Differentiable reconstruction, holography and computational imaging.',
  },
  {
    name: 'Yanru Xu, Ph.D. Candidate',
    title: 'Graduate Researcher',
    bio: 'Research focus: Single Objective Light sheet (SOLS) microscopy.',
  },
];

function PeoplePage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Our Team
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Meet the researchers at Yip Lab
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 4, mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          About Our Team
        </Typography>
        <Typography variant="body1" paragraph>
          Our research team comprises engineers, chemists, physicists, biologists, and life
          scientists. We bring a trans-, cross-, and multidisciplinary approach to our studies.
        </Typography>
        <Typography variant="body1">
          We are located in The Donnelly Centre at the University of Toronto and belong to both the
          Faculty of Applied Science and Engineering and the Faculty of Medicine.
        </Typography>
      </Paper>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
          },
          gap: 3,
        }}
      >
        {teamMembers.map((member) => (
          <Card key={member.name} elevation={3}>
            <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64 }}>
                <PeopleIcon fontSize="large" />
              </Avatar>
              <Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  {member.name}
                </Typography>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  {member.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {member.bio}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
}

export default PeoplePage;
