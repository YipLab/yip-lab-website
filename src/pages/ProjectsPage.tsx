import React from 'react';
import { Container, Typography, Box, Paper, Chip } from '@mui/material';
import { Work as WorkIcon } from '@mui/icons-material';

const researchThemes = [
  {
    title: 'Single Molecule Biophysics',
    description:
      'Understanding the fundamental mechanisms associated with how molecules assemble to form supramolecular architectures, from small molecule systems through peptides to proteins.',
    tags: ['AFM', 'Single Molecule', 'Biophysics'],
  },
  {
    title: 'Membrane Protein Interactions',
    description:
      'Studying how proteins and peptides interact with cellular membranes, which has importance for understanding how toxins work and how signaling pathways are regulated.',
    tags: ['Membranes', 'Proteins', 'Toxins'],
  },
  {
    title: 'Digital Holographic Microscopy',
    description:
      'Developing portable telecentric digital holographic microscopes for label-free quantitative phase imaging of biological specimens.',
    tags: ['DHM', 'Phase Imaging', 'Label-Free'],
  },
  {
    title: 'Selective Plane Illumination Microscopy',
    description:
      'Designing and building SPIM systems including multiview OpenSPIM, inverted iSPIM, and single objective lightsheet microscopes for 3D live cell imaging.',
    tags: ['SPIM', 'Light Sheet', '3D Imaging'],
  },
  {
    title: 'Automated Imaging Systems',
    description:
      'Creating adaptive robotic microscopes and high-throughput line scan readers for automated, large-scale biological imaging applications.',
    tags: ['Automation', 'Robotics', 'High-Throughput'],
  },
  {
    title: 'Computational Imaging',
    description:
      'Applying computational techniques including machine learning and advanced image processing to enhance microscopy data acquisition and analysis.',
    tags: ['Machine Learning', 'Image Processing', 'Data Analysis'],
  },
];

function ProjectsPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Research Projects
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Exploring the frontiers of molecular imaging
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 4, mb: 6 }}>
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
      </Paper>

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
          <Paper key={theme.title} elevation={3} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <WorkIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" component="h3">
                {theme.title}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              {theme.description}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {theme.tags.map((tag) => (
                <Chip key={tag} label={tag} size="small" color="primary" variant="outlined" />
              ))}
            </Box>
          </Paper>
        ))}
      </Box>
    </Container>
  );
}

export default ProjectsPage;
