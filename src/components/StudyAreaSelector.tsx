import { MapPin, ChevronDown } from 'lucide-react';
import { StudyArea } from '../types/sar';

interface StudyAreaSelectorProps {
  areas: StudyArea[];
  selectedAreaId: string;
  onSelectArea: (areaId: string) => void;
}

export default function StudyAreaSelector({ areas, selectedAreaId, onSelectArea }: StudyAreaSelectorProps) {
  const selectedArea = areas.find(a => a.id === selectedAreaId);

  return (
    <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
      <div className="flex items-center gap-2 text-white mb-4">
        <MapPin className="w-5 h-5" />
        <h2 className="text-lg font-bold">Study Area</h2>
      </div>

      <div className="relative">
        <select
          value={selectedAreaId}
          onChange={(e) => onSelectArea(e.target.value)}
          className="w-full appearance-none bg-slate-900 text-white px-4 py-3 pr-10 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
        >
          {areas.map(area => (
            <option key={area.id} value={area.id}>
              {area.name} - {area.location}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
      </div>

      {selectedArea && (
        <div className="mt-4 space-y-3">
          <div className="bg-slate-900/50 rounded-lg p-4">
            <p className="text-slate-300 text-sm leading-relaxed">
              {selectedArea.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-900/50 rounded-lg p-3">
              <div className="text-slate-400 text-xs mb-1">Latitude</div>
              <div className="text-white font-semibold">
                {selectedArea.latitude.toFixed(4)}°
              </div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3">
              <div className="text-slate-400 text-xs mb-1">Longitude</div>
              <div className="text-white font-semibold">
                {selectedArea.longitude.toFixed(4)}°
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
