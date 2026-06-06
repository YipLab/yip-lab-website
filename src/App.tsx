import React, { useState, useMemo } from 'react';
import { HashRouter, Routes, Route, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  AppBar,
  Toolbar,
  Typography,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Science as ScienceIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Menu as MenuIcon,
  Home as HomeIcon,
  People as PeopleIcon,
  Work as WorkIcon,
  Biotech as SystemsIcon,
  Article as ArticleIcon,
  Mail as MailIcon,
} from '@mui/icons-material';
import HomePage from './pages/HomePage';
import RepoPage from './pages/RepoPage';
import PeoplePage from './pages/PeoplePage';
import ProjectsPage from './pages/ProjectsPage';
import PublicationsPage from './pages/PublicationsPage';
import ContactPage from './pages/ContactPage';
import './App.css';

const navItems = [
  { label: 'Home', path: '/', icon: <HomeIcon /> },
  { label: 'People', path: '/people', icon: <PeopleIcon /> },
  { label: 'Projects', path: '/projects', icon: <WorkIcon /> },
  { label: 'Systems', path: '/', icon: <SystemsIcon /> },
  { label: 'Publications', path: '/publications', icon: <ArticleIcon /> },
  { label: 'Contact', path: '/contact', icon: <MailIcon /> },
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: { main: '#1976d2' },
          secondary: { main: '#dc004e' },
        },
      }),
    [darkMode],
  );

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          {/* Header */}
          <AppBar position="static" elevation={2}>
            <Toolbar>
              <IconButton color="inherit" edge="start" onClick={toggleDrawer} sx={{ mr: 1 }}>
                <MenuIcon />
              </IconButton>
              <ScienceIcon sx={{ mr: 1 }} />
              <Typography
                variant="h6"
                component={RouterLink}
                to="/"
                sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
              >
                Yip Lab
              </Typography>
              <IconButton color="inherit" onClick={toggleDarkMode}>
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Toolbar>
          </AppBar>

          {/* Hamburger Menu Drawer */}
          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
            <Box sx={{ width: 250 }} role="presentation">
              <Box
                sx={{
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                }}
              >
                <ScienceIcon />
                <Typography variant="h6">Yip Lab</Typography>
              </Box>
              <Divider />
              <List>
                {navItems.map((item) => (
                  <ListItem key={item.label} disablePadding>
                    <ListItemButton component={RouterLink} to={item.path} onClick={toggleDrawer}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.label} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>

          {/* Routes */}
          <Box sx={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/repo/:slug" element={<RepoPage />} />
              <Route path="/people" element={<PeoplePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/publications" element={<PublicationsPage />} />
              <Route path="/contact" element={<ContactPage />} />
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
