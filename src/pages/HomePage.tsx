import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from '@mui/material';
import repos from '../data/repos.json';

function HomePage() {
  return (
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
          research focuses on developing innovative optical systems and computational methods for
          biological and medical imaging applications.
        </Typography>
        <Typography variant="body1">
          We work on various cutting-edge technologies including Digital Holographic Microscopy,
          Selective Plane Illumination Microscopy (SPIM), and automated imaging systems. Our
          interdisciplinary approach combines optics, engineering, and computational biology to push
          the boundaries of what&apos;s possible in microscopy.
        </Typography>
      </Paper>

      {/* Research Systems Section */}
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
        {repos.map((item) => (
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
            <CardActionArea component={Link} to={`/repo/${item.slug}`}>
              {item.previewImage ? (
                <CardMedia
                  component="img"
                  height="160"
                  image={item.previewImage}
                  alt={item.title}
                  sx={{ objectFit: 'cover' }}
                />
              ) : (
                <Box
                  sx={{
                    height: 160,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText',
                  }}
                >
                  <Typography variant="h5" align="center" sx={{ px: 2 }}>
                    {item.title}
                  </Typography>
                </Box>
              )}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {item.description}
                </Typography>
                <Typography variant="caption" color="primary">
                  {item.repoUrl}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Container>
  );
}

export default HomePage;
