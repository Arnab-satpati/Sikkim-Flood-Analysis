import { Calendar, ArrowRight } from 'lucide-react';
import { FloodPhase } from '../types/sar';

interface TimelineControlProps {
  selectedPhase: FloodPhase;
  onSelectPhase: (phase: FloodPhase) => void;
}

const phases: { value: FloodPhase; label: string; icon: string; color: string }[] = [
  { value: 'pre_flood', label: 'Pre-Flood', icon: '◐', color: 'bg-blue-500' },
  { value: 'during_event', label: 'During Event', icon: '●', color: 'bg-red-500' },
  { value: 'post_analysis', label: 'Post-Event', icon: '◑', color: 'bg-purple-500' }
];

export default function TimelineControl({ selectedPhase, onSelectPhase }: TimelineControlProps) {
  return (
    <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
      <div className="flex items-center gap-2 text-white mb-4">
        <Calendar className="w-5 h-5" />
        <h2 className="text-lg font-bold">Timeline Phase</h2>
      </div>

      <div className="relative">
        <div className="absolute top-8 left-0 right-0 h-0.5 bg-slate-700" />

        <div className="relative flex justify-between items-center">
          {phases.map((phase, index) => (
            <div key={phase.value} className="flex items-center flex-1">
              <button
                onClick={() => onSelectPhase(phase.value)}
                className={`relative z-10 flex flex-col items-center gap-2 transition-all ${
                  selectedPhase === phase.value ? 'scale-110' : 'scale-100 opacity-60 hover:opacity-100'
                }`}
              >
                <div
                  className={`w-16 h-16 ${phase.color} rounded-full flex items-center justify-center text-white text-2xl shadow-lg ${
                    selectedPhase === phase.value ? 'ring-4 ring-white/30' : ''
                  }`}
                >
                  {phase.icon}
                </div>
                <div className={`text-center ${selectedPhase === phase.value ? 'text-white font-bold' : 'text-slate-400'}`}>
                  <div className="text-sm">{phase.label}</div>
                </div>
              </button>

              {index < phases.length - 1 && (
                <div className="flex-1 flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-slate-600" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 bg-slate-900/50 rounded-lg p-4">
        <div className="text-slate-300 text-sm">
          {selectedPhase === 'pre_flood' && (
            <>
              <strong className="text-white">Baseline Assessment:</strong> Pre-flood imagery shows normal water levels and land conditions for comparison.
            </>
          )}
          {selectedPhase === 'during_event' && (
            <>
              <strong className="text-white">Event Monitoring:</strong> Real-time SAR captures flood extent, affected areas, and emergency response needs.
            </>
          )}
          {selectedPhase === 'post_analysis' && (
            <>
              <strong className="text-white">Recovery Analysis:</strong> Post-event assessment of damage, water recession, and recovery progress.
            </>
          )}
        </div>
      </div>
    </div>
  );
}
