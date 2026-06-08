import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Button,
  Chip,
  Avatar,
  Grid,
  Stack,
} from '@mui/material';
import {
  Science as ScienceIcon,
  People as PeopleIcon,
  Work as WorkIcon,
  Article as ArticleIcon,
  ArrowForward as ArrowForwardIcon,
  Email as EmailIcon,
  Biotech as BiotechIcon,
} from '@mui/icons-material';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import repos from '../data/repos.json';
import pubData from '../data/publications.json';
import { teamMembers } from '../data/team';
import { researchThemes } from '../data/themes';
import { cardAccentColors } from '../theme';

const MotionBox = motion.create(Box);
const MotionTypography = motion.create(Typography);

const sectionVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const staggerProps = (i: number) => ({
  initial: { opacity: 0, y: 32, scale: 0.97 } as const,
  whileInView: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.07 },
  } as const,
  viewport: { once: true, margin: '-40px' } as const,
});

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration: 2, ease: 'easeOut' });
      return () => controls.stop();
    }
  }, [inView, count, value]);

  return (
    <Box component="span" ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </Box>
  );
}

const topPublications = pubData.publications.slice(0, 4);
const previewTeam = teamMembers.slice(0, 3);

const themeIcons = [<BiotechIcon key="bio" />, <ScienceIcon key="sci" />, <WorkIcon key="work" />];

function HeroRayTraceAnimation() {
  return (
    <Box
      className="hero-ray-trace"
      aria-hidden="true"
      sx={{
        position: 'relative',
        width: '100%',
        maxWidth: { xs: 480, md: 560 },
        justifySelf: { xs: 'center', md: 'end' },
        aspectRatio: '1.35 / 1',
        color: (t) => (t.palette.mode === 'light' ? '#2f3030' : '#d7d7d4'),
        opacity: (t) => (t.palette.mode === 'light' ? 0.86 : 0.92),
        '--hero-ray-bg': (t) => (t.palette.mode === 'light' ? '#f6f4f1' : '#171614'),
      }}
    >
      <svg viewBox="0 0 640 474" role="img" focusable="false">
        <defs>
          <filter
            id="heroRaySoftGlow"
            filterUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="640"
            height="474"
          >
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter
            id="heroRayEraseCover"
            filterUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="640"
            height="474"
          >
            <feGaussianBlur stdDeviation="0.65" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="heroTipFace" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.88" />
            <stop offset="55%" stopColor="currentColor" stopOpacity="0.42" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        <g className="hero-ray-frame">
          <g className="hero-ray-cantilever">
            <path className="hero-ray-stage-line" d="M185 310 H552" />
            <path d="M180 314 L278 314 L230 372 Z" fill="url(#heroTipFace)" />
            <path d="M180 314 L278 314 L230 372 Z" className="hero-ray-outline" />
            <path d="M204 322 L230 372 L268 322" className="hero-ray-tip-fold" />
          </g>

          <g className="hero-ray-mirror">
            <path d="M344 144 L396 120" className="hero-ray-mirror-face" />
            <path d="M390 120 L396 133" className="hero-ray-mirror-edge" />
          </g>

          <g className="hero-ray-source">
            <circle cx="550" cy="132" r="24" className="hero-ray-source-core" />
            <circle
              cx="550"
              cy="132"
              r="33"
              className="hero-ray-source-halo hero-ray-source-halo-a"
            />
            <circle
              cx="550"
              cy="132"
              r="45"
              className="hero-ray-source-halo hero-ray-source-halo-b"
            />
            <circle
              cx="550"
              cy="132"
              r="58"
              className="hero-ray-source-halo hero-ray-source-halo-c"
            />
          </g>

          <g className="hero-ray-beam-pump-group">
            <line className="hero-ray-beam-pump-underlay" x1="550" y1="132" x2="370" y2="132" />
            <line
              className="hero-ray-beam hero-ray-beam-pump"
              x1="550"
              y1="132"
              x2="370"
              y2="132"
            />
          </g>

          <g className="hero-ray-beam-target-group">
            <path
              className="hero-ray-beam-underlay hero-ray-beam-incident-underlay"
              pathLength="1"
              d="M370 132 L230 316"
            >
              <animate
                attributeName="d"
                dur="10s"
                repeatCount="indefinite"
                keyTimes="0;0.57;0.60;0.63;0.66;1"
                values="M370 132 L230 316;M370 132 L230 316;M370 132 L230.8 338.5;M370 132 L230.1 309.3;M370 132 L230 316;M370 132 L230 316"
              />
            </path>
            <path
              className="hero-ray-beam-underlay hero-ray-beam-reflected-underlay"
              pathLength="1"
              d="M230 316 L130.1 184.7"
            >
              <animate
                attributeName="d"
                dur="10s"
                repeatCount="indefinite"
                keyTimes="0;0.57;0.60;0.63;0.66;1"
                values="M230 316 L130.1 184.7;M230 316 L130.1 184.7;M230.8 338.5 L120.4 215.8;M230.1 309.3 L133.3 175.6;M230 316 L130.1 184.7;M230 316 L130.1 184.7"
              />
            </path>
            <path
              className="hero-ray-beam hero-ray-beam-incident"
              pathLength="1"
              d="M370 132 L230 316"
            >
              <animate
                attributeName="d"
                dur="10s"
                repeatCount="indefinite"
                keyTimes="0;0.57;0.60;0.63;0.66;1"
                values="M370 132 L230 316;M370 132 L230 316;M370 132 L230.8 338.5;M370 132 L230.1 309.3;M370 132 L230 316;M370 132 L230 316"
              />
            </path>
            <circle cx="230" cy="316" r="4" className="hero-ray-laser-spot">
              <animate
                attributeName="cx"
                dur="10s"
                repeatCount="indefinite"
                keyTimes="0;0.57;0.60;0.63;0.66;1"
                values="230;230;230.8;230.1;230;230"
              />
              <animate
                attributeName="cy"
                dur="10s"
                repeatCount="indefinite"
                keyTimes="0;0.57;0.60;0.63;0.66;1"
                values="316;316;338.5;309.3;316;316"
              />
            </circle>
            <path
              className="hero-ray-beam hero-ray-beam-reflected"
              pathLength="1"
              d="M230 316 L130.1 184.7"
            >
              <animate
                attributeName="d"
                dur="10s"
                repeatCount="indefinite"
                keyTimes="0;0.57;0.60;0.63;0.66;1"
                values="M230 316 L130.1 184.7;M230 316 L130.1 184.7;M230.8 338.5 L120.4 215.8;M230.1 309.3 L133.3 175.6;M230 316 L130.1 184.7;M230 316 L130.1 184.7"
              />
            </path>
          </g>
          <g className="hero-ray-beam-eraser-group">
            <line
              className="hero-ray-beam-eraser hero-ray-beam-pump-eraser"
              x1="550"
              y1="132"
              x2="370"
              y2="132"
            />
            <path
              className="hero-ray-beam-eraser hero-ray-beam-incident-eraser"
              pathLength="1"
              d="M370 132 L230 316"
            >
              <animate
                attributeName="d"
                dur="10s"
                repeatCount="indefinite"
                keyTimes="0;0.57;0.60;0.63;0.66;1"
                values="M370 132 L230 316;M370 132 L230 316;M370 132 L230.8 338.5;M370 132 L230.1 309.3;M370 132 L230 316;M370 132 L230 316"
              />
            </path>
            <path
              className="hero-ray-beam-eraser hero-ray-beam-reflected-eraser"
              pathLength="1"
              d="M230 316 L130.1 184.7"
            >
              <animate
                attributeName="d"
                dur="10s"
                repeatCount="indefinite"
                keyTimes="0;0.57;0.60;0.63;0.66;1"
                values="M230 316 L130.1 184.7;M230 316 L130.1 184.7;M230.8 338.5 L120.4 215.8;M230.1 309.3 L133.3 175.6;M230 316 L130.1 184.7;M230 316 L130.1 184.7"
              />
            </path>
          </g>

          <g className="hero-ray-wave hero-ray-wave-travel">
            <g transform="rotate(45 550 132)">
              <g className="hero-ray-wave-phase-a">
                <path d="M620 184 C644 160 668 208 692 184 S740 160 764 184 S812 208 836 184" />
                <path d="M640 224 C664 200 688 248 712 224 S760 200 784 224 S832 248 856 224" />
              </g>
              <g className="hero-ray-wave-phase-b">
                <path d="M620 184 C644 208 668 160 692 184 S740 208 764 184 S812 160 836 184" />
                <path d="M640 224 C664 248 688 200 712 224 S760 248 784 224 S832 200 856 224" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </Box>
  );
}

function HomePage() {
  return (
    <Box>
      {/* ── Hero ── */}
      <Box
        sx={{
          position: 'relative',
          minHeight: { xs: '60vh', md: '70vh' },
          display: 'flex',
          alignItems: 'center',
          background: (t) =>
            t.palette.mode === 'light'
              ? 'linear-gradient(160deg, #eef2f5 0%, #fafaf9 40%, #f5f3f0 100%)'
              : 'linear-gradient(160deg, #161614 0%, #111110 40%, #1a1916 100%)',
          overflow: 'hidden',
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 0.98fr) minmax(360px, 0.82fr)' },
            gap: { xs: 5, md: 3 },
            alignItems: 'center',
            py: { xs: 8, md: 10 },
          }}
        >
          <MotionBox
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            sx={{ position: 'relative', zIndex: 1, maxWidth: 720 }}
          >
            <MotionTypography
              variant="h1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 }}
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                lineHeight: 1.15,
                mb: 2.5,
              }}
            >
              Advancing the Frontiers of Single Molecular Imaging
            </MotionTypography>
            <MotionTypography
              variant="h5"
              color="text.secondary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 0.3 }}
              sx={{ fontWeight: 400, mb: 4, maxWidth: 560 }}
            >
              We develop open-source optical instrumentation and computational methods to study
              molecular-scale phenomena.
            </MotionTypography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const, delay: 0.5 }}
            >
              <Button
                component={Link}
                to="/projects"
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
              >
                Explore Research
              </Button>
              <Button component={Link} to="/contact" variant="outlined" size="large">
                Contact Us
              </Button>
            </Stack>
          </MotionBox>
          <MotionBox
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const, delay: 0.2 }}
            sx={{ position: 'relative', minHeight: { xs: 260, sm: 330, md: 360 } }}
          >
            <HeroRayTraceAnimation />
          </MotionBox>
        </Container>
      </Box>

      {/* ── Stats ── */}
      <Container maxWidth="lg" sx={{ mt: -4, mb: 8, position: 'relative', zIndex: 2 }}>
        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={sectionVariants}
        >
          <Grid container spacing={3}>
            {[
              { value: repos.length, label: 'Open-Source Systems' },
              { value: pubData.count, label: 'Publications' },
              { value: teamMembers.length, label: 'Lab Members' },
            ].map((stat) => (
              <Grid key={stat.label} size={{ xs: 12, sm: 4 }}>
                <Card
                  sx={{
                    textAlign: 'center',
                    py: 3,
                    borderTop: '4px solid',
                    borderColor: 'primary.main',
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 700,
                      color: 'primary.main',
                      fontFamily: '"Inter", sans-serif',
                    }}
                  >
                    <AnimatedCounter value={stat.value} suffix="+" />
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </MotionBox>
      </Container>

      {/* ── About ── */}
      <Container maxWidth="md" sx={{ mb: 10 }}>
        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={sectionVariants}
        >
          <Typography variant="h3" textAlign="center" gutterBottom>
            About the Lab
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            textAlign="center"
            sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}
          >
            The Yip Lab is dedicated to advancing microscopy and imaging systems. Our research
            focuses on developing innovative optical systems and computational methods for
            biological and medical imaging. We apply a multifaceted approach that combines novel
            functional imaging and characterization tools for studying phenomena at the single
            molecule scale, with computational techniques.
          </Typography>
        </MotionBox>
      </Container>

      {/* ── Research Areas ── */}
      <Box sx={{ bgcolor: 'background.paper', py: 8, mb: 8 }}>
        <Container maxWidth="lg">
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={sectionVariants}
            sx={{ mb: 5, textAlign: 'center' }}
          >
            <Typography variant="h3" gutterBottom>
              Research Areas
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Exploring the frontiers of molecular imaging through six core themes
            </Typography>
          </MotionBox>

          <Grid container spacing={3}>
            {researchThemes.map((theme, i) => (
              <Grid key={theme.title} size={{ xs: 12, sm: 6, md: 4 }}>
                <MotionBox {...staggerProps(i)}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 2,
                            bgcolor: 'primary.main',
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 1.5,
                            flexShrink: 0,
                          }}
                        >
                          {themeIcons[i % themeIcons.length]}
                        </Box>
                        <Typography variant="h6">{theme.title}</Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1.5, lineHeight: 1.7 }}
                      >
                        {theme.description}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {theme.tags.map((tag) => (
                          <Chip key={tag} label={tag} size="small" variant="outlined" />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── Open-Source Systems ── */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={sectionVariants}
          sx={{ mb: 5, textAlign: 'center' }}
        >
          <Typography variant="h3" gutterBottom>
            Open-Source Systems
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Hardware and software repositories available on GitHub
          </Typography>
        </MotionBox>

        <Grid container spacing={3}>
          {repos.map((item, i) => (
            <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <MotionBox {...staggerProps(i)} sx={{ height: '100%' }}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderTop: '4px solid',
                    borderColor: cardAccentColors[i % cardAccentColors.length],
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: (t) =>
                        t.palette.mode === 'light'
                          ? '0 12px 32px rgba(0,0,0,0.1)'
                          : '0 12px 32px rgba(0,0,0,0.4)',
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
                          bgcolor: cardAccentColors[i % cardAccentColors.length],
                          color: '#fff',
                        }}
                      >
                        <ScienceIcon sx={{ fontSize: 48, opacity: 0.5 }} />
                      </Box>
                    )}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        {item.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </MotionBox>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ── Recent Publications ── */}
      <Box sx={{ bgcolor: 'background.paper', py: 8, mb: 8 }}>
        <Container maxWidth="lg">
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={sectionVariants}
            sx={{ mb: 5, textAlign: 'center' }}
          >
            <Typography variant="h3" gutterBottom>
              Recent Publications
            </Typography>
          </MotionBox>

          <Grid container spacing={3}>
            {topPublications.map((pub, i) => (
              <Grid key={i} size={{ xs: 12, sm: 6 }}>
                <MotionBox {...staggerProps(i)}>
                  <Card
                    sx={{
                      height: '100%',
                      borderLeft: '4px solid',
                      borderColor: 'primary.main',
                    }}
                  >
                    <CardContent>
                      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                        {pub.title}
                      </Typography>
                      {pub.authors && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontStyle: 'italic', mb: 0.5 }}
                        >
                          {pub.authors}
                        </Typography>
                      )}
                      {pub.journal && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                          <ArticleIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="caption" color="text.secondary">
                            {pub.journal} · {pub.year}
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </MotionBox>
              </Grid>
            ))}
          </Grid>

          <Box textAlign="center" mt={4}>
            <Button
              component={Link}
              to="/publications"
              variant="outlined"
              size="large"
              endIcon={<ArrowForwardIcon />}
            >
              View All {pubData.count} Publications
            </Button>
          </Box>
        </Container>
      </Box>

      {/* ── Team Preview ── */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={sectionVariants}
          sx={{ mb: 5, textAlign: 'center' }}
        >
          <Typography variant="h3" gutterBottom>
            Our Team
          </Typography>
        </MotionBox>

        <Grid container spacing={3} justifyContent="center">
          {previewTeam.map((member, i) => (
            <Grid key={member.name} size={{ xs: 12, sm: 6, md: 4 }}>
              <MotionBox {...staggerProps(i)}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, flexShrink: 0 }}>
                      <PeopleIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h6">{member.name}</Typography>
                      <Typography variant="subtitle2" color="primary" gutterBottom>
                        {member.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {member.bio}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </MotionBox>
            </Grid>
          ))}
        </Grid>

        <Box textAlign="center" mt={4}>
          <Button
            component={Link}
            to="/people"
            variant="outlined"
            size="large"
            endIcon={<ArrowForwardIcon />}
          >
            Meet the Full Team
          </Button>
        </Box>
      </Container>

      {/* ── Contact CTA ── */}
      <Box
        sx={{
          py: 10,
          background: (t) =>
            t.palette.mode === 'light'
              ? 'linear-gradient(160deg, #eef2f5 0%, #fafaf9 100%)'
              : 'linear-gradient(160deg, #161614 0%, #111110 100%)',
        }}
      >
        <Container maxWidth="sm">
          <MotionBox
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={sectionVariants}
            sx={{ textAlign: 'center' }}
          >
            <EmailIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h3" gutterBottom>
              Get in Touch
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Interested in collaborating or joining the lab? We would love to hear from you.
            </Typography>
            <Button
              component={Link}
              to="/contact"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
            >
              Contact Us
            </Button>
          </MotionBox>
        </Container>
      </Box>
    </Box>
  );
}

export default HomePage;
