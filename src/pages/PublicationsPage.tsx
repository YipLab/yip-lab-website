import React from 'react';
import { Container, Typography, Box, Paper, Link, Chip, Button } from '@mui/material';
import { OpenInNew as OpenInNewIcon, School as ScholarIcon } from '@mui/icons-material';
import pubData from '../data/publications.json';

const typeColors: Record<string, 'primary' | 'secondary' | 'success' | 'info' | 'warning'> = {
  'journal-article': 'primary',
  'book-chapter': 'secondary',
  'conference-paper': 'info',
  book: 'success',
  other: 'warning',
};

function PublicationsPage() {
  const { publications, googleScholar, researchGate, linkedIn, profileUrl, count, lastUpdated } =
    pubData;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Publications
        </Typography>
        <Typography variant="h5" color="text.secondary">
          {count} publications
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          About Our Research
        </Typography>
        <Typography variant="body1" paragraph>
          Our publications span single-molecule biophysics, protein-membrane interactions, advanced
          microscopy techniques, and computational imaging. Our research has been supported by
          NSERC, CIHR, the Bill and Melinda Gates Foundation, the Canada Foundation for Innovation,
          and the Canada Research Chairs program.
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
          {googleScholar && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<ScholarIcon />}
              href={googleScholar}
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Scholar
            </Button>
          )}
          {profileUrl && (
            <Button
              variant="outlined"
              size="small"
              startIcon={<OpenInNewIcon />}
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              UofT Profile
            </Button>
          )}
          {researchGate && (
            <Button
              variant="outlined"
              size="small"
              href={researchGate}
              target="_blank"
              rel="noopener noreferrer"
            >
              ResearchGate
            </Button>
          )}
          {linkedIn && (
            <Button
              variant="outlined"
              size="small"
              href={linkedIn}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </Button>
          )}
        </Box>
      </Paper>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {publications.map((pub, index) => (
          <Paper
            key={index}
            elevation={1}
            sx={{
              p: 3,
              transition: 'box-shadow 0.2s, border-color 0.2s',
              borderLeft: 4,
              borderColor: `${typeColors[pub.type] || 'warning'}.main`,
              '&:hover': { boxShadow: 4 },
            }}
          >
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  {pub.title}
                </Typography>
                {pub.authors && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontStyle: 'italic' }}>
                    {pub.authors}
                  </Typography>
                )}
                {pub.journal && (
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {pub.journal}
                  </Typography>
                )}
              </Box>
              {pub.year && (
                <Chip
                  label={pub.year}
                  size="small"
                  color={typeColors[pub.type] || 'default'}
                  variant="outlined"
                  sx={{ ml: 2, flexShrink: 0 }}
                />
              )}
            </Box>
            {pub.doiUrl && (
              <Link
                href={pub.doiUrl}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ fontSize: '0.8rem', display: 'inline-flex', alignItems: 'center', mt: 1 }}
              >
                {pub.doiUrl} <OpenInNewIcon sx={{ fontSize: 14, ml: 0.5 }} />
              </Link>
            )}
          </Paper>
        ))}
      </Box>

      <Typography
        variant="caption"
        color="text.secondary"
        align="center"
        sx={{ mt: 4, display: 'block' }}
      >
        Data last updated: {new Date(lastUpdated).toLocaleDateString()} · Source: ORCID + PubMed
      </Typography>
    </Container>
  );
}

export default PublicationsPage;
