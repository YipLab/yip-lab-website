export type Instrument = {
  name: string;
  image: string;
  summary: string;
  capabilities: string[];
  safety: string[];
  bookingNote: string;
};

export const instruments: Instrument[] = [
  {
    name: 'LLTech Full Field Optical Coherence Tomography',
    image: '/images/LLTechFFOCT.png',
    summary:
      'Full-field optical coherence tomography platform for label-free structural imaging with near-IR illumination.',
    capabilities: ['10x UPlanFl water objective', 'Broadband near-IR source', 'Micromanager control'],
    safety: [
      'Laser exposure at the objective and fiber output',
      'Keep clear of the motorized stage',
    ],
    bookingNote:
      'Best suited for samples that benefit from rapid volumetric imaging and low-label workflows.',
  },
  {
    name: 'LED Array Scan System',
    image: '/images/LEDArrayScan.png',
    summary:
      'Spinning disk confocal microscope paired with a multi-channel LED engine for flexible fluorescence imaging.',
    capabilities: [
      '5x, 10x, 20x, and 40x objectives',
      '395, 470, 532, 561, and 640 nm LED channels',
      'Camera-based acquisition and Z-stacks',
    ],
    safety: [
      'High-power LED illumination at the objective',
      'Motorized stage pinch and collision risk',
    ],
    bookingNote:
      'A strong choice for multi-channel fluorescence imaging and routine confocal-style acquisition.',
  },
  {
    name: 'Delta Vision Elite TIRF Microscope',
    image: '/images/DeltaVisionElite.png',
    summary:
      'TIRF-capable imaging system for high-contrast live-cell and near-membrane fluorescence experiments.',
    capabilities: [
      '4x, 10x, 20x, 40x, and 60x objectives',
      '405, 491, 561, and 640 nm lasers',
      'Liquid-cooled Evolve 512 camera',
    ],
    safety: [
      'Laser exposure at the objective and fiber',
      'Keep clear of the motorized stage',
    ],
    bookingNote:
      'Ideal for experiments that need TIRF or sensitive fluorescence imaging with precise illumination control.',
  },
  {
    name: 'Live Cell Epifluorescence Scope',
    image: '/images/LiveCellEpifluorescenceScope.png',
    summary:
      'Bright-field and epifluorescence microscope for live-cell observation and standard fluorescence workflows.',
    capabilities: ['5x to 40x objectives', 'X-Cite 120LED light source', 'AxioCam MRM camera'],
    safety: [
      'High-power LED illumination at the objective',
      'Motorized stage movement during acquisition',
    ],
    bookingNote:
      'Useful for quick checks, live-cell monitoring, and straightforward bright-field or fluorescence imaging.',
  },
  {
    name: 'Spinning Disk Confocal',
    image: '/images/SpinningDiskConfocal.png',
    summary:
      'Leica spinning-disk confocal system with high-magnification objectives for fast optical sectioning.',
    capabilities: [
      '5x through 100x objectives',
      '405, 491, 561, and 640 nm lasers',
      'Evolve 512 liquid-cooled camera',
    ],
    safety: [
      'Laser exposure at the objective and fiber',
      'Motorized stage and high-power illumination hazards',
    ],
    bookingNote:
      'A good fit for high-resolution fluorescence imaging and experiments requiring optical sectioning.',
  },
];
