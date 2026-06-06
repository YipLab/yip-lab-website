import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Card,
  CardContent,
  CssBaseline,
  ThemeProvider,
  createTheme,
  AppBar,
  Toolbar,
} from '@mui/material';
import ScienceIcon from '@mui/icons-material/Science';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// Placeholder data for publications/works/systems
const publications = [
  {
    id: 1,
    title: 'Plate Scanner',
    description: 'Automated plate scanning system for high-throughput imaging',
    repository: 'YipLab/plate_scanner',
    type: 'System',
  },
  {
    id: 2,
    title: 'P-DHM',
    description: 'Phase Digital Holographic Microscopy system',
    repository: 'YipLab/P-DHM',
    type: 'System',
  },
  {
    id: 3,
    title: 'IX83 Modules',
    description: 'Modules and extensions for IX83 microscope system',
    repository: 'YipLab/IX83-Modules',
    type: 'System',
  },
  {
    id: 4,
    title: 'SPIM3',
    description: 'Selective Plane Illumination Microscopy - Generation 3',
    repository: 'YipLab/SPIM3',
    type: 'System',
  },
  {
    id: 5,
    title: 'SPIM2',
    description: 'Selective Plane Illumination Microscopy - Generation 2',
    repository: 'YipLab/SPIM2',
    type: 'System',
  },
  {
    id: 6,
    title: 'SPIM1',
    description: 'Selective Plane Illumination Microscopy - Generation 1',
    repository: 'YipLab/SPIM1',
    type: 'System',
  },
];

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        {/* Header/Title Section */}
        <AppBar position="static" elevation={2}>
          <Toolbar>
            <ScienceIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Yip Lab
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {/* Main Title */}
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h2" component="h1" gutterBottom>
              Welcome to Yip Lab
            </Typography>
            <Typography variant="h5" color="text.secondary">
              Research and Innovation in Microscopy and Imaging Systems
            </Typography>
          </Box>

          {/* About Section */}
          <Paper elevation={3} sx={{ p: 4, mb: 6 }}>
            <Typography variant="h4" component="h2" gutterBottom>
              About
            </Typography>
            <Typography variant="body1" paragraph>
              The Yip Lab is dedicated to advancing the field of microscopy and imaging systems. Our
              research focuses on developing innovative optical systems and computational methods
              for biological and medical imaging applications.
            </Typography>
            <Typography variant="body1">
              We work on various cutting-edge technologies including Digital Holographic Microscopy,
              Selective Plane Illumination Microscopy (SPIM), and automated imaging systems. Our
              interdisciplinary approach combines optics, engineering, and computational biology to
              push the boundaries of what's possible in microscopy.
            </Typography>
          </Paper>

          {/* Publications/Works/Systems Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Research Systems and Projects
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Explore our research systems and projects available on GitHub
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: 3,
            }}
          >
            {publications.map((item) => (
              <Card
                key={item.id}
                elevation={2}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {item.description}
                  </Typography>
                  <Typography variant="caption" color="primary">
                    {item.repository}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: 'auto',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="body2" color="text.secondary" align="center">
              © {new Date().getFullYear()} Yip Lab. All rights reserved.
            </Typography>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
