import { useState } from 'react';
import { SplitSquareHorizontal, Grid3x3 } from 'lucide-react';
import { SARImage, ImageOverlay, FloodPhase } from '../types/sar';
import SARImageViewer from './SARImageViewer';

interface ComparisonViewProps {
  images: SARImage[];
  overlays: ImageOverlay[];
  onOverlayToggle: (overlayId: string) => void;
}

type ViewMode = 'grid' | 'split';

export default function ComparisonView({ images, overlays, onOverlayToggle }: ComparisonViewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const phaseOrder: FloodPhase[] = ['pre_flood', 'during_event', 'post_analysis'];
  const sortedImages = [...images].sort(
    (a, b) => phaseOrder.indexOf(a.phase) - phaseOrder.indexOf(b.phase)
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-slate-800 rounded-lg p-4">
        <h2 className="text-white font-bold text-lg">Time Series Comparison</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              viewMode === 'grid'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <Grid3x3 className="w-4 h-4" />
            <span className="text-sm font-medium">Grid</span>
          </button>
          <button
            onClick={() => setViewMode('split')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              viewMode === 'split'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <SplitSquareHorizontal className="w-4 h-4" />
            <span className="text-sm font-medium">Split</span>
          </button>
        </div>
      </div>

      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 lg:grid-cols-3 gap-6'
            : 'grid grid-cols-1 gap-6'
        }
      >
        {sortedImages.map(image => {
          const imageOverlays = overlays.filter(o => o.sarImageId === image.id);
          return (
            <SARImageViewer
              key={image.id}
              image={image}
              overlays={imageOverlays}
              onOverlayToggle={onOverlayToggle}
            />
          );
        })}
      </div>
    </div>
  );
}
