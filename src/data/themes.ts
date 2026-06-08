export interface ResearchTheme {
  title: string;
  description: string;
  tags: string[];
}

export const researchThemes: ResearchTheme[] = [
  {
    title: 'Single Molecule Biophysics',
    description:
      'Understanding the fundamental mechanisms associated with how molecules assemble to form supramolecular architectures, from small molecule systems through peptides to proteins.',
    tags: ['AFM', 'Single Molecule', 'Biophysics'],
  },
  {
    title: 'Membrane Protein Interactions',
    description:
      'Studying how proteins and peptides interact with cellular membranes, which has importance for understanding how toxins work and how signaling pathways are regulated.',
    tags: ['Membranes', 'Proteins', 'Toxins'],
  },
  {
    title: 'Digital Holographic Microscopy',
    description:
      'Developing portable telecentric digital holographic microscopes for label-free quantitative phase imaging of biological specimens.',
    tags: ['DHM', 'Phase Imaging', 'Label-Free'],
  },
  {
    title: 'Selective Plane Illumination Microscopy',
    description:
      'Designing and building SPIM systems including multiview OpenSPIM, inverted iSPIM, and single objective lightsheet microscopes for 3D live cell imaging.',
    tags: ['SPIM', 'Light Sheet', '3D Imaging'],
  },
  {
    title: 'Automated Imaging Systems',
    description:
      'Creating adaptive robotic microscopes and high-throughput line scan readers for automated, large-scale biological imaging applications.',
    tags: ['Automation', 'Robotics', 'High-Throughput'],
  },
  {
    title: 'Computational Imaging',
    description:
      'Applying computational techniques including machine learning and advanced image processing to enhance microscopy data acquisition and analysis.',
    tags: ['Machine Learning', 'Image Processing', 'Data Analysis'],
  },
];
