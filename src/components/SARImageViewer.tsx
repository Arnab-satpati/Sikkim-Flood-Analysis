import { useState, useMemo } from 'react';
import { Layers, Eye, EyeOff } from 'lucide-react';
import { SARImage, ImageOverlay, FloodPhase } from '../types/sar';

interface SARImageViewerProps {
  image: SARImage;
  overlays: ImageOverlay[];
  onOverlayToggle: (overlayId: string) => void;
}

const phaseLabels: Record<FloodPhase, string> = {
  pre_flood: 'Pre-Flood Baseline',
  during_event: 'During Flood Event',
  post_analysis: 'Post-Event Analysis'
};

const phaseColors: Record<FloodPhase, string> = {
  pre_flood: 'bg-blue-500',
  during_event: 'bg-red-500',
  post_analysis: 'bg-purple-500'
};

// SARImageViewer.tsx (Updated)

// ... (Existing imports and phaseLabels/phaseColors remain the same) ...

// --- UPDATED OVERLAY TYPE LABELS ---
// This must cover ALL strings defined in your OverlayType union type
const overlayTypeLabels: Record<OverlayType, string> = {
  // File-based Overlays (Polarization and Composites)
  'enhanced_color': 'Enhanced Color Composite',
  'base_sar_reference': 'Base SAR Reference (VV+VH)',
  'vh_decibel': 'VH Decibel (Cross-Polarized)',
  'vh_linear': 'VH Linear',
  'vv_decibel': 'VV Decibel (Co-Polarized)',
  'vv_linear': 'VV Linear',
  
  // Analytical Overlays (Used for During/Post Flood only)
  // 'water_extent': 'Flood Extent Map',
  // 'change_detection': 'Damage/Change Detection'
};

// --- UPDATED OVERLAY COLORS ---
// The colors map is also missing the file-based keys and causes an error/warning.
const overlayColors: Record<OverlayType, string> = {
  // File-based colors (use subtle colors)
  'enhanced_color': '#64748b', // Slate
  'base_sar_reference': '#334155', // Slate dark
  'vh_decibel': '#facc15', // Yellow (Highlight VH for flood detection)
  'vh_linear': '#fb923c', // Orange
  'vv_decibel': '#34d399', // Emerald
  'vv_linear': '#10b981', // Emerald dark
  
  // Analytical colors (use strong, distinct colors)
  // 'water_extent': '#3b82f6', // Blue (for water)
  // 'change_detection': '#ef4444', // Red (for damage)
};



export default function SARImageViewer({ image, overlays, onOverlayToggle }: SARImageViewerProps) {
  const activeOverlay = useMemo(() => {
    return overlays.find(overlay => overlay.enabled);
  }, [overlays]);

  const displayImage = activeOverlay ? activeOverlay.imageUrl : image.imageUrl;

  return (
    <div className="relative bg-slate-800 rounded-lg overflow-hidden shadow-xl">
      <div className="relative">
        <img
          src={displayImage}
          alt={`SAR ${image.phase}`}
          className="w-full h-80 object-cover transition-all duration-500"
          key={displayImage}
        />

        <div className="absolute top-4 left-4 flex items-center gap-2">
          <div className={`${phaseColors[image.phase]} text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg`}>
            {phaseLabels[image.phase]}
          </div>
          <div className="bg-slate-900/80 text-white px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm">
            {image.satellite}
          </div>
        </div>

        {activeOverlay && (
          <div className="absolute top-4 right-4 bg-slate-900/90 text-white px-3 py-2 rounded-lg text-xs backdrop-blur-sm border border-cyan-500">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: overlayColors[activeOverlay.overlayType] }}
              />
              <span className="font-semibold">{overlayTypeLabels[activeOverlay.overlayType]} Active</span>
            </div>
          </div>
        )}

        <div className="absolute bottom-4 left-4 bg-slate-900/90 text-white px-3 py-2 rounded-lg text-xs backdrop-blur-sm">
          <div>Captured: {new Date(image.captureDate).toLocaleDateString()}</div>
          <div className="text-slate-300">
            {image.metadata.polarization} • {image.metadata.resolution}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2 text-white text-sm font-semibold mb-3">
          <Layers className="w-4 h-4" />
          <span>Analysis Layers</span>
        </div>

        <div className="space-y-2">
          {overlays.map(overlay => (
            <button
              key={overlay.id}
              onClick={() => onOverlayToggle(overlay.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all ${
                overlay.enabled
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                  : 'bg-slate-900/50 text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded ring-2 ring-slate-600"
                  style={{ backgroundColor: overlayColors[overlay.overlayType] }}
                />
                <span className="text-sm font-medium">
                  {overlayTypeLabels[overlay.overlayType]}
                </span>
              </div>
              {overlay.enabled ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
