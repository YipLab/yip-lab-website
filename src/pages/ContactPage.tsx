import React from 'react';
import { Container, Typography, Box, Paper, Link } from '@mui/material';
import {
  LocationOn as LocationIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';

function ContactPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Get in touch with Yip Lab
        </Typography>
      </Box>

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
        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
            <LocationIcon color="primary" sx={{ mr: 2, mt: 0.5 }} fontSize="large" />
            <Box>
              <Typography variant="h6" gutterBottom>
                Address
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
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
            <EmailIcon color="primary" sx={{ mr: 2, mt: 0.5 }} fontSize="large" />
            <Box>
              <Typography variant="h6" gutterBottom>
                Email
              </Typography>
              <Typography variant="body2" color="text.secondary">
                christopher.yip@utoronto.ca
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <PhoneIcon color="primary" sx={{ mr: 2, mt: 0.5 }} fontSize="large" />
            <Box>
              <Typography variant="h6" gutterBottom>
                Phone
              </Typography>
              <Typography variant="body2" color="text.secondary">
                +1 (416) 978-7853
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Paper elevation={3} sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
            <LanguageIcon color="primary" sx={{ mr: 2, mt: 0.5 }} fontSize="large" />
            <Box>
              <Typography variant="h6" gutterBottom>
                Affiliations
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Faculty of Applied Science and Engineering
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Faculty of Medicine
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Department of Chemical Engineering and Applied Chemistry
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Institute of Biomaterials and Biomedical Engineering
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Department of Biochemistry
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom>
            Useful Links
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Link href="https://tdccbr.med.utoronto.ca/" target="_blank" rel="noopener noreferrer">
              The Donnelly Centre
            </Link>
            <Link href="https://www.utoronto.ca/" target="_blank" rel="noopener noreferrer">
              University of Toronto
            </Link>
            <Link
              href="https://www.chem-eng.utoronto.ca/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Department of Chemical Engineering
            </Link>
            <Link href="https://www.utoronto.ca/IBBME" target="_blank" rel="noopener noreferrer">
              Institute of Biomaterials and Biomedical Engineering
            </Link>
            <Link
              href="https://biochemistry.utoronto.ca/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Department of Biochemistry
            </Link>
          </Box>
        </Paper>

        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom>
            Lab Intranet
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Members of Yip Lab can access the protected intranet for internal resources, protocols,
            and documentation.
          </Typography>
          <Link
            href="https://github.com/YipLab"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ fontWeight: 'bold' }}
          >
            Yip Lab on GitHub
          </Link>
        </Paper>
      </Box>
    </Container>
  );
}

export default ContactPage;
