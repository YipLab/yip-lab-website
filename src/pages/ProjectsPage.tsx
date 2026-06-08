import React from 'react';
import { Container, Typography, Box, Card, CardContent, Chip } from '@mui/material';
import { Work as WorkIcon } from '@mui/icons-material';
import { researchThemes } from '../data/themes';

function ProjectsPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Research Projects
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Exploring the frontiers of molecular imaging
        </Typography>
      </Box>

      <Card sx={{ p: 4, mb: 6, borderLeft: '4px solid', borderColor: 'primary.main' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Research Overview
        </Typography>
        <Typography variant="body1" paragraph>
          Our research focuses on phenomena that take place on molecular length scales. We are
          particularly interested in understanding the structural, chemical, and physical
          interactions that drive the interactions between molecules. Such insights are critical for
          fields as diverse as biology, nanotechnology, and engineering.
        </Typography>
        <Typography variant="body1">
          To accomplish this, we apply a multifaceted approach that combines novel functional
          imaging and characterization tools for studying phenomena at the single molecule scale,
          with computational techniques.
        </Typography>
      </Card>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, 1fr)',
          },
          gap: 3,
        }}
      >
        {researchThemes.map((theme) => (
          <Card key={theme.title} sx={{ overflow: 'hidden' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <WorkIcon color="primary" sx={{ mr: 1.5 }} />
                <Typography variant="h6">{theme.title}</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" paragraph sx={{ lineHeight: 1.7 }}>
                {theme.description}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {theme.tags.map((tag) => (
                  <Chip key={tag} label={tag} size="small" color="primary" variant="outlined" />
                ))}
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
}

export default ProjectsPage;
