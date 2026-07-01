import React, { useState, useMemo } from 'react';
import { HashRouter, Routes, Route, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  CssBaseline,
  ThemeProvider,
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
  Link,
  Grid,
} from '@mui/material';
import {
  Science as ScienceIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Menu as MenuIcon,
  Home as HomeIcon,
  People as PeopleIcon,
  Work as WorkIcon,
  PrecisionManufacturing as InstrumentsIcon,
  Article as ArticleIcon,
  Mail as MailIcon,
  GitHub as GitHubIcon,
  School as ScholarIcon,
  LinkedIn as LinkedInIcon,
} from '@mui/icons-material';
import { getLightTheme, getDarkTheme } from './theme';
import HomePage from './pages/HomePage';
import RepoPage from './pages/RepoPage';
import PeoplePage from './pages/PeoplePage';
import ProjectsPage from './pages/ProjectsPage';
import InstrumentsPage from './pages/InstrumentsPage';
import PublicationsPage from './pages/PublicationsPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import pubData from './data/publications.json';
import './App.css';

const navItems = [
  { label: 'Home', path: '/', icon: <HomeIcon /> },
  { label: 'People', path: '/people', icon: <PeopleIcon /> },
  { label: 'Projects', path: '/projects', icon: <WorkIcon /> },
  { label: 'Instruments', path: '/instruments', icon: <InstrumentsIcon /> },
  { label: 'Publications', path: '/publications', icon: <ArticleIcon /> },
  { label: 'Contact', path: '/contact', icon: <MailIcon /> },
];

const footerLinks = {
  github: 'https://github.com/YipLab',
  scholar: pubData.googleScholar || '',
  researchGate: pubData.researchGate || '',
  linkedIn: pubData.linkedIn || '',
  uoftProfile: pubData.profileUrl || '',
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const theme = useMemo(() => (darkMode ? getDarkTheme() : getLightTheme()), [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <AppBar
            position="sticky"
            elevation={0}
            sx={{
              bgcolor: 'background.paper',
              color: 'text.primary',
              borderBottom: '1px solid',
              borderColor: 'divider',
              backdropFilter: 'blur(8px)',
            }}
          >
            <Toolbar>
              <IconButton color="inherit" edge="start" onClick={toggleDrawer} sx={{ mr: 1 }}>
                <MenuIcon />
              </IconButton>

              {/* Logo placeholder — replace with animated lab logo later */}
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  mr: 1.5,
                  borderRadius: 2,
                  bgcolor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <ScienceIcon sx={{ color: '#fff', fontSize: 22 }} />
              </Box>

              <Typography
                variant="h6"
                component={RouterLink}
                to="/"
                sx={{
                  flexGrow: 1,
                  color: 'inherit',
                  textDecoration: 'none',
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                }}
              >
                Yip Lab
              </Typography>
              <IconButton color="inherit" onClick={toggleDarkMode}>
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Toolbar>
          </AppBar>

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
                <Typography variant="h6" fontFamily='"Playfair Display", serif' fontWeight={700}>
                  Yip Lab
                </Typography>
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

          <Box sx={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/repo/:slug" element={<RepoPage />} />
              <Route path="/people" element={<PeoplePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/instruments" element={<InstrumentsPage />} />
              <Route path="/publications" element={<PublicationsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Box>

          {/* Expanded Footer */}
          <Box
            component="footer"
            sx={{
              mt: 'auto',
              borderTop: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
            }}
          >
            <Container maxWidth="lg" sx={{ py: 6 }}>
              <Grid container spacing={4}>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 600 }}
                  >
                    Yip Lab
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Molecular Imaging & Biophysics
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    The Donnelly Centre
                    <br />
                    University of Toronto
                    <br />
                    160 College Street
                    <br />
                    Toronto, Ontario M5S 3E1
                    <br />
                    Canada
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                  <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, mb: 1.5 }}>
                    Quick Links
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    {navItems.map((item) => (
                      <Link
                        key={item.label}
                        component={RouterLink}
                        to={item.path}
                        color="text.secondary"
                        underline="hover"
                        sx={{ fontSize: '0.875rem' }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                  <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, mb: 1.5 }}>
                    External Links
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    {footerLinks.scholar && (
                      <Link
                        href={footerLinks.scholar}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="text.secondary"
                        underline="hover"
                        sx={{
                          fontSize: '0.875rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                        }}
                      >
                        <ScholarIcon sx={{ fontSize: 18 }} />
                        Google Scholar
                      </Link>
                    )}
                    {footerLinks.github && (
                      <Link
                        href={footerLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="text.secondary"
                        underline="hover"
                        sx={{
                          fontSize: '0.875rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                        }}
                      >
                        <GitHubIcon sx={{ fontSize: 18 }} />
                        GitHub
                      </Link>
                    )}
                    {footerLinks.researchGate && (
                      <Link
                        href={footerLinks.researchGate}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="text.secondary"
                        underline="hover"
                        sx={{ fontSize: '0.875rem' }}
                      >
                        ResearchGate
                      </Link>
                    )}
                    {footerLinks.linkedIn && (
                      <Link
                        href={footerLinks.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="text.secondary"
                        underline="hover"
                        sx={{
                          fontSize: '0.875rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                        }}
                      >
                        <LinkedInIcon sx={{ fontSize: 18 }} />
                        LinkedIn
                      </Link>
                    )}
                    {footerLinks.uoftProfile && (
                      <Link
                        href={footerLinks.uoftProfile}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="text.secondary"
                        underline="hover"
                        sx={{ fontSize: '0.875rem' }}
                      >
                        U of T Profile
                      </Link>
                    )}
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                  <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, mb: 1.5 }}>
                    Affiliations
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    Faculty of Applied Science & Engineering
                    <br />
                    Faculty of Medicine
                    <br />
                    Dept. of Chemical Engineering
                    <br />
                    Institute of Biomaterials & Biomedical Engineering
                    <br />
                    Dept. of Biochemistry
                  </Typography>
                </Grid>
              </Grid>
            </Container>

            <Box
              sx={{
                borderTop: '1px solid',
                borderColor: 'divider',
                py: 2,
                textAlign: 'center',
              }}
            >
              <Container maxWidth="lg">
                <Typography variant="body2" color="text.secondary">
                  © {new Date().getFullYear()} Yip Lab. All rights reserved.
                </Typography>
              </Container>
            </Box>
          </Box>
        </Box>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
