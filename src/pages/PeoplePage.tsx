import React from 'react';
import { Container, Typography, Box, Card, CardContent, Avatar } from '@mui/material';
import { People as PeopleIcon } from '@mui/icons-material';
import { teamMembers } from '../data/team';

function PeoplePage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Our Team
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Meet the researchers at Yip Lab
        </Typography>
      </Box>

      <Card sx={{ p: 4, mb: 6, borderLeft: '4px solid', borderColor: 'primary.main' }}>
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
      </Card>

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
          <Card key={member.name} sx={{ overflow: 'hidden' }}>
            <CardContent sx={{ display: 'flex', gap: 2.5, alignItems: 'flex-start' }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64, flexShrink: 0 }}>
                <PeopleIcon fontSize="large" />
              </Avatar>
              <Box>
                <Typography variant="h6" gutterBottom>
                  {member.name}
                </Typography>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  {member.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
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
