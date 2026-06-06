import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import {
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  AppBar,
  Toolbar,
  Typography,
  Container,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ScienceIcon from '@mui/icons-material/Science';
import HomePage from './pages/HomePage';
import RepoPage from './pages/RepoPage';
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {/* Header */}
          <AppBar position="static" elevation={2}>
            <Toolbar>
              <ScienceIcon sx={{ mr: 2 }} />
              <Typography
                variant="h6"
                component={RouterLink}
                to="/"
                sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
              >
                Yip Lab
              </Typography>
            </Toolbar>
          </AppBar>

          {/* Routes */}
          <Box sx={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/repo/:slug" element={<RepoPage />} />
            </Routes>
          </Box>

          {/* Footer */}
          <Box
            component="footer"
            sx={{
              py: 3,
              px: 2,
              mt: 'auto',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[200] : t.palette.grey[800],
            }}
          >
            <Container maxWidth="lg">
              <Typography variant="body2" color="text.secondary" align="center">
                © {new Date().getFullYear()} Yip Lab. All rights reserved.
              </Typography>
            </Container>
          </Box>
        </Box>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
