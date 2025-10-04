import { StudyArea, SARImage, ImageOverlay, FloodMetrics, FloodPhase } from '../types/sar';

// --- 1. Study Areas (Your Selected Locations) ---

export const studyAreas: StudyArea[] = [
  {
    id: '1',
    name: 'Teesta Power Station V',
    location: 'Sikkim, India',
    latitude: 27.28,
    longitude: 88.46,
    description: 'A major operational hydroelectric power station on the Teesta River.'
  },
  {
    id: '2',
    name: 'Teesta Low Dam III',
    location: 'Sikkim, India',
    latitude: 27.06,
    longitude: 88.35,
    description: 'Hydroelectric project downstream on the Teesta River near the West Bengal border.'
  },
  {
    id: '3',
    name: 'Mangan',
    location: 'Sikkim, India',
    latitude: 27.82,
    longitude: 88.55,
    description: 'District HQ of North Sikkim; critical infrastructure affected by floodwaters.'
  },
  {
    id: '4',
    name: 'Lachen',
    location: 'Sikkim, India',
    latitude: 27.77,
    longitude: 88.54,
    description: 'Town in North Sikkim, often cut off by landslides and flood-related road damage.'
  },
  {
    id: '5',
    name: 'Chungthang Dam',
    location: 'Sikkim, India',
    latitude: 27.61, 
    longitude: 88.56,
    description: 'Teesta III Hydroelectric Project dam that was breached during the 2023 GLOF.'
  },
  {
    id: '6',
    name: 'Yangang',
    location: 'Sikkim, India',
    latitude: 27.18,
    longitude: 88.34,
    description: 'Town in South Sikkim near the Rangpo River junction, susceptible to flooding.'
  }
];

// --- 2. Phase-to-Folder Mapping and Path Helpers ---

// Maps the FloodPhase enum to the directory names in your Snippet folder
const phaseFolders: Record<FloodPhase, string> = {
  pre_flood: '17th May,2025',
  during_event: '1st June,2025', // Assuming this is the main flood date
  post_analysis: '4th July'
};

// Sanitizes location name to match folder names exactly
// Note: This assumes folder names match 'StudyArea.name' exactly (e.g., 'Chungthang Dam')
const sanitizeName = (name: string) => name; 

// --- 3. SAR Images (Base SAR.jpg for Pre, During, Post) ---

export const sarImages: SARImage[] = studyAreas.flatMap((area) => {
  const areaName = sanitizeName(area.name);
  
  return [
    // Pre-Flood Image
    {
      id: `img-${area.id}-pre`,
      studyAreaId: area.id,
      imageUrl: `/Snippet/${phaseFolders.pre_flood}/${areaName}/SAR.jpg`, // PATH
      phase: 'pre_flood' as FloodPhase,
      captureDate: new Date('2025-05-17').toISOString(),
      satellite: 'Sentinel-1A',
      metadata: { polarization: 'VV+VH', resolution: '10m', orbit: 'descending' }
    },
    // During-Event Image
    {
      id: `img-${area.id}-during`,
      studyAreaId: area.id,
      imageUrl: `/Snippet/${phaseFolders.during_event}/${areaName}/SAR.jpg`, // PATH
      phase: 'during_event' as FloodPhase,
      captureDate: new Date('2025-06-01').toISOString(),
      satellite: 'Sentinel-1A',
      metadata: { polarization: 'VV+VH', resolution: '10m', orbit: 'descending' }
    },
    // Post-Analysis Image
    {
      id: `img-${area.id}-post`,
      studyAreaId: area.id,
      imageUrl: `/Snippet/${phaseFolders.post_analysis}/${areaName}/SAR.jpg`, // PATH
      phase: 'post_analysis' as FloodPhase,
      captureDate: new Date('2025-07-04').toISOString(),
      satellite: 'Sentinel-1B',
      metadata: { polarization: 'VV+VH', resolution: '10m', orbit: 'ascending' }
    }
  ];
});

// --- 4. Image Overlays (The Filters: Enhanced, VV/VH, etc.) ---

export const imageOverlays: ImageOverlay[] = sarImages.flatMap(image => {
  const area = studyAreas.find(a => a.id === image.studyAreaId)!;
  const areaName = sanitizeName(area.name);
  const phaseFolder = phaseFolders[image.phase];
  const basePath = `/Snippet/${phaseFolder}/${areaName}`;
  
  // Custom random data generation based on image.id for differentiation
  const baseValue = parseInt(image.studyAreaId) * 10;
  const rand = Math.random();

  const baseOverlays: ImageOverlay[] = [
    // 1. Enhanced/Composite Filter
    {
      id: `overlay-${image.id}-enhanced`,
      sarImageId: image.id,
      overlayType: 'enhanced_color',
      overlayData: { features: 'Color composite for visual clarity' },
      imageUrl: `${basePath}/Enhanced.jpg`, 
      enabled: true // Default starting overlay
    },
    // 2. Base SAR Image (often needed for reference/comparison)
    {
        id: `overlay-${image.id}-sar`,
        sarImageId: image.id,
        overlayType: 'base_sar_reference',
        overlayData: { features: 'Single-band SAR reference' },
        imageUrl: `${basePath}/SAR.jpg`, 
        enabled: false 
    },
    // 3. VH Decibel Polarization
    {
      id: `overlay-${image.id}-vh-db`,
      sarImageId: image.id,
      overlayType: 'vh_decibel',
      overlayData: { polarization: 'VH', scale: 'Decibel' },
      imageUrl: `${basePath}/VH-decibel.jpg`, 
      enabled: false
    },
    // 4. VH Linear Polarization
    {
      id: `overlay-${image.id}-vh-linear`,
      sarImageId: image.id,
      overlayType: 'vh_linear',
      overlayData: { polarization: 'VH', scale: 'Linear' },
      imageUrl: `${basePath}/VH-linear.jpg`, 
      enabled: false
    },
    // 5. VV Decibel Polarization
    {
      id: `overlay-${image.id}-vv-db`,
      sarImageId: image.id,
      overlayType: 'vv_decibel',
      overlayData: { polarization: 'VV', scale: 'Decibel' },
      imageUrl: `${basePath}/VV-decibel.jpg`, 
      enabled: false
    },
    // 6. VV Linear Polarization
    {
      id: `overlay-${image.id}-vv-linear`,
      sarImageId: image.id,
      overlayType: 'vv_linear',
      overlayData: { polarization: 'VV', scale: 'Linear' },
      imageUrl: `${basePath}/VV-linear.jpg`, 
      enabled: false
    },
  ];

  // Add flood-specific analytical overlays only for the relevant phases
  // if (image.phase === 'during_event') {
  //     baseOverlays.push(
  //         {
  //             id: `overlay-${image.id}-flood-extent`,
  //             sarImageId: image.id,
  //             overlayType: 'water_extent',
  //             overlayData: { area_km2: baseValue * 3 + rand * 10, confidence: 'High' },
  //             imageUrl: `${basePath}/Enchanced.jpg`, // Placeholder/Indicator file
  //             enabled: true
  //         }
  //     );
  // } else if (image.phase === 'post_analysis') {
  //     baseOverlays.push(
  //         {
  //             id: `overlay-${image.id}-damage-map`,
  //             sarImageId: image.id,
  //             overlayType: 'change_detection',
  //             overlayData: { buildings_destroyed: 5 + Math.floor(rand * 10), roads_damaged: 10 + Math.floor(rand * 5) },
  //             imageUrl: `${basePath}/Enchanced.jpg`, // Placeholder/Indicator file
  //             enabled: true
  //         }
  //     );
  // }

  return baseOverlays;
});

// --- 5. Flood Metrics (Quantitative Data) ---

export const floodMetrics: FloodMetrics[] = studyAreas.flatMap(area => {
    const baseAreaKm2 = parseInt(area.id) * 10;
    
    return [
        {
            id: `metric-${area.id}-pre`,
            studyAreaId: area.id,
            phase: 'pre_flood' as FloodPhase,
            waterCoverageKm2: baseAreaKm2 + Math.random() * 5,
            affectedPopulation: 0,
            infrastructureDamage: { status: 'normal', risk_level: 'low' },
            analysisDate: new Date('2025-05-17').toISOString()
        },
        {
            id: `metric-${area.id}-during`,
            studyAreaId: area.id,
            phase: 'during_event' as FloodPhase,
            waterCoverageKm2: baseAreaKm2 * 3 + Math.random() * 10,
            affectedPopulation: 30000 + parseInt(area.id) * 5000 + Math.floor(Math.random() * 10000),
            infrastructureDamage: {
                roads_affected: 20 + parseInt(area.id),
                buildings_damaged: 100 + parseInt(area.id) * 15,
                estimated_cost_usd: 10000000 + parseInt(area.id) * 5000000
            },
            analysisDate: new Date('2025-06-01').toISOString()
        },
        {
            id: `metric-${area.id}-post`,
            studyAreaId: area.id,
            phase: 'post_analysis' as FloodPhase,
            waterCoverageKm2: baseAreaKm2 + Math.random() * 3,
            affectedPopulation: 5000 + parseInt(area.id) * 1000 + Math.floor(Math.random() * 2000),
            infrastructureDamage: {
                recovery_rate: 0.60 + Math.random() * 0.30,
                ongoing_repairs: 20 + parseInt(area.id) * 5,
                estimated_recovery_days: 30 + parseInt(area.id) * 15
            },
            analysisDate: new Date('2025-07-04').toISOString()
        }
    ];
});