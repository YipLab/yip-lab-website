import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';
import { Science as ScienceIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

function NotFoundPage() {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', py: 12 }}>
      <MotionBox
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <ScienceIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2, opacity: 0.4 }} />
        <Typography
          variant="h1"
          sx={{ fontSize: { xs: '4rem', md: '6rem' }, fontWeight: 700, color: 'primary.main' }}
        >
          404
        </Typography>
        <Typography variant="h4" gutterBottom>
          Page Not Found
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: 400, mx: 'auto' }}
        >
          The page you are looking for does not exist or has been moved.
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          size="large"
          startIcon={<ArrowBackIcon />}
        >
          Back to Home
        </Button>
      </MotionBox>
    </Container>
  );
}

export default NotFoundPage;
