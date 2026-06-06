import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Breadcrumbs,
  Link as MuiLink,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import repos from '../data/repos.json';

function RepoPage() {
  const { slug } = useParams<{ slug: string }>();
  const repo = repos.find((r) => r.slug === slug);

  if (!repo) {
    return (
      <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          The repository page you are looking for does not exist.
        </Typography>
        <Button component={Link} to="/" variant="contained" startIcon={<ArrowBackIcon />}>
          Back to Home
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <MuiLink component={Link} to="/" color="inherit" underline="hover">
          Home
        </MuiLink>
        <Typography color="text.primary">{repo.title}</Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {repo.title}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <Button
            variant="outlined"
            size="small"
            component="a"
            href={repo.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<OpenInNewIcon />}
          >
            View on GitHub
          </Button>
          <Button variant="text" size="small" component={Link} to="/" startIcon={<ArrowBackIcon />}>
            Back to Home
          </Button>
        </Box>
      </Box>

      {/* README Content */}
      {repo.readme ? (
        <Paper elevation={2} sx={{ p: { xs: 2, md: 4 }, overflow: 'auto' }}>
          <Box
            sx={{
              '& img': { maxWidth: '100%', height: 'auto' },
              '& pre': {
                overflow: 'auto',
                p: 2,
                bgcolor: 'grey.100',
                borderRadius: 1,
                fontSize: '0.875rem',
              },
              '& code': {
                bgcolor: 'grey.100',
                px: 0.5,
                py: 0.25,
                borderRadius: 0.5,
                fontSize: '0.875rem',
              },
              '& pre code': {
                bgcolor: 'transparent',
                px: 0,
                py: 0,
              },
              '& table': {
                borderCollapse: 'collapse',
                width: '100%',
              },
              '& th, & td': {
                border: '1px solid',
                borderColor: 'divider',
                px: 2,
                py: 1,
                textAlign: 'left',
              },
              '& th': {
                bgcolor: 'grey.100',
              },
              '& h1, & h2, & h3, & h4': {
                mt: 3,
                mb: 1.5,
              },
              '& p': {
                mb: 1.5,
                lineHeight: 1.7,
              },
              '& ul, & ol': {
                pl: 3,
                mb: 1.5,
              },
              '& li': {
                mb: 0.5,
              },
              '& blockquote': {
                borderLeft: 4,
                borderColor: 'primary.main',
                pl: 2,
                py: 0.5,
                my: 1.5,
                color: 'text.secondary',
              },
              '& hr': {
                my: 3,
                borderColor: 'divider',
              },
            }}
          >
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{repo.readme}</ReactMarkdown>
          </Box>
        </Paper>
      ) : (
        <Paper elevation={2} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            No README content available for this repository.
          </Typography>
        </Paper>
      )}

      {/* Submodules */}
      {repo.submodules.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Submodules
          </Typography>
          {repo.submodules.map((sub) => (
            <Paper key={sub.name} elevation={1} sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
              <Typography variant="h5" component="h3" gutterBottom>
                {sub.title}
              </Typography>
              {sub.readme ? (
                <Box
                  sx={{
                    '& img': { maxWidth: '100%', height: 'auto' },
                    '& pre': {
                      overflow: 'auto',
                      p: 2,
                      bgcolor: 'grey.100',
                      borderRadius: 1,
                      fontSize: '0.875rem',
                    },
                    '& code': {
                      bgcolor: 'grey.100',
                      px: 0.5,
                      py: 0.25,
                      borderRadius: 0.5,
                      fontSize: '0.875rem',
                    },
                    '& pre code': { bgcolor: 'transparent', px: 0, py: 0 },
                    '& h1, & h2, & h3, & h4': { mt: 2, mb: 1 },
                    '& p': { mb: 1, lineHeight: 1.7 },
                  }}
                >
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>{sub.readme}</ReactMarkdown>
                </Box>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No README content available.
                </Typography>
              )}
            </Paper>
          ))}
        </Box>
      )}

      {/* Gallery */}
      {repo.images.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Images
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
              },
              gap: 2,
            }}
          >
            {repo.images.map((img, idx) => (
              <Paper key={idx} elevation={1} sx={{ overflow: 'hidden' }}>
                <Box
                  component="img"
                  src={img}
                  alt={`${repo.title} image ${idx + 1}`}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    objectFit: 'contain',
                    bgcolor: 'grey.100',
                  }}
                />
              </Paper>
            ))}
          </Box>
        </Box>
      )}
    </Container>
  );
}

export default RepoPage;
