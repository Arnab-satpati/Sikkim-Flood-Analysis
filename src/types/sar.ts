export type FloodPhase = 'pre_flood' | 'during_event' | 'post_analysis';

// 1.1 Specific Data Interfaces for ImageOverlay
export interface PolarizationData {
    polarization: 'VV' | 'VH';
    scale: 'Decibel' | 'Linear';
}

export interface AnalyticalData {
    area_km2?: number;
    confidence?: string;
    buildings_destroyed?: number;
    roads_damaged?: number;
    features?: string;
}

// 1.2 Union Type for all possible content inside overlayData
export type OverlayData = PolarizationData | AnalyticalData | { features: string }; 
// { features: string } handles generic overlays like 'enhanced_color'

// 1.3 Union Type for all valid overlay strings (includes file types and analytical layers)
export type OverlayType = 
  | 'enhanced_color'     // Enchanced.jpg
  | 'base_sar_reference' // SAR.jpg (for comparison)
  | 'vh_decibel'         // VH-decibel.jpg
  | 'vh_linear'          // VH-linear.jpg
  | 'vv_decibel'         // VV-decibel.jpg
  | 'vv_linear'          // VV-linear.jpg
  // | 'water_extent'       // Analytical layer (During Flood)
  // | 'change_detection';  // Analytical layer (Post Flood Damage Map)

// 1.4 Main Data Interfaces
export interface StudyArea {
  id: string;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  description: string;
}

export interface SARImage {
  id: string;
  studyAreaId: string;
  imageUrl: string;
  phase: FloodPhase;
  captureDate: string;
  satellite: string;
  metadata: Record<string, any>;
}

export interface ImageOverlay {
  id: string;
  sarImageId: string;
  overlayType: OverlayType;
  overlayData: OverlayData; // Now uses the custom union type
  imageUrl: string;
  enabled: boolean;
}

export interface FloodMetrics {
  id: string;
  studyAreaId: string;
  phase: FloodPhase;
  waterCoverageKm2: number;
  affectedPopulation: number;
  infrastructureDamage: Record<string, any>;
  analysisDate: string;
}
