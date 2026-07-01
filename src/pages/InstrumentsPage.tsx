import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  Stack,
} from '@mui/material';
import { CalendarMonth as CalendarIcon, Email as EmailIcon } from '@mui/icons-material';
import { instruments } from '../data/instruments';

function InstrumentsPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Box
        sx={{
          textAlign: 'center',
          mb: 6,
          px: { xs: 0, md: 6 },
        }}
      >
        <Chip
          label="Bookable Lab Instruments"
          color="primary"
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Typography variant="h2" component="h1" gutterBottom>
          Instruments
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 840, mx: 'auto' }}>
          Explore the microscopes and imaging systems available for booking in Yip Lab.
        </Typography>
      </Box>

      <Card
        sx={{
          p: { xs: 3, md: 4 },
          mb: 4,
          borderLeft: '4px solid',
          borderColor: 'primary.main',
          background: (theme) =>
            theme.palette.mode === 'light'
              ? 'linear-gradient(180deg, rgba(45,90,123,0.04), rgba(45,90,123,0.01))'
              : 'linear-gradient(180deg, rgba(107,165,204,0.08), rgba(107,165,204,0.02))',
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          How booking works
        </Typography>
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.8 }}>
          Each instrument has a slightly different setup, training requirement, and safety profile.
          If you want to book time on a system, start by reviewing the notes below and then reach
          out through the contact page so we can match you with the right instrument.
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button
            component={RouterLink}
            to="/contact"
            variant="contained"
            startIcon={<EmailIcon />}
          >
            Contact the lab
          </Button>
          <Button
            component={RouterLink}
            to="/projects"
            variant="outlined"
            startIcon={<CalendarIcon />}
          >
            See research context
          </Button>
        </Stack>
      </Card>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: 'repeat(2, minmax(0, 1fr))',
          },
          gap: 3,
        }}
      >
        {instruments.map((instrument) => (
          <Card
            key={instrument.name}
            sx={{
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              '&:hover': { boxShadow: 5, transform: 'translateY(-2px)' },
            }}
          >
            <CardMedia
              component="img"
              height="240"
              image={instrument.image}
              alt={instrument.name}
              sx={{ objectFit: 'cover', bgcolor: 'background.default' }}
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1 }}>
              <Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  {instrument.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
                  {instrument.summary}
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                  Capabilities
                </Typography>
                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {instrument.capabilities.map((capability) => (
                    <Chip key={capability} label={capability} size="small" variant="outlined" />
                  ))}
                </Stack>
              </Box>

              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                  Safety notes
                </Typography>
                <Stack direction="column" spacing={0.75}>
                  {instrument.safety.map((item) => (
                    <Typography key={item} variant="body2" color="text.secondary">
                      • {item}
                    </Typography>
                  ))}
                </Stack>
              </Box>

              <Box sx={{ mt: 'auto' }}>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75, mb: 2 }}>
                  {instrument.bookingNote}
                </Typography>
                <Button component={RouterLink} to="/contact" variant="outlined" fullWidth>
                  Ask about booking
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Typography
        variant="caption"
        color="text.secondary"
        align="center"
        sx={{ mt: 4, display: 'block' }}
      >
        Technical notes summarized from the instrument guides in `public/images`.
      </Typography>
    </Container>
  );
}

export default InstrumentsPage;
