import { Calendar, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  type: 'warning' | 'critical' | 'info';
}

const events: TimelineEvent[] = [
  {
    date: 'May 31, 2025',
    title: 'Onset of Torrential Rainfall',
    description: 'Pre-monsoon and early monsoon rains intensified rapidly across the region, particularly in North Sikkim, causing initial road blockades and saturation of mountain slopes.',
    type: 'info'
  },
  {
    date: 'June 1, 2025 (Morning)',
    title: 'IMD Red Alert & River Surge',
    description: 'The India Meteorological Department (IMD) issued a Red Alert for the Mangan district. The Teesta River water level rose significantly, causing disruptions along its banks.',
    type: 'warning'
  },
  {
    date: 'June 1, 2025 (Evening)',
    title: 'Catastrophic Landslides & Road Severance',
    description: 'Multiple massive landslides struck the Chaten area (Mangan district), including an army camp. Critical infrastructure, including the Sanklang suspension bridge and Phidang Bridge, collapsed, completely cutting off Chungthang, Lachen, and Lachung, trapping over 1,500 tourists.',
    type: 'critical'
  },
  {
    date: 'June 2, 2025',
    title: 'Joint Rescue Operations Begin',
    description: 'The Indian Army, Indian Air Force (IAF), NDRF, and BRO launched large-scale rescue and relief efforts, focusing on airlifting stranded personnel and tourists from isolated regions like Chaten.',
    type: 'info'
  },
  {
    date: 'June 5, 2025',
    title: 'Impact Assessment & Evacuation Complete',
    description: 'Rescue teams completed the evacuation of over 1,800 stranded tourists. Initial casualty reports confirmed 3 deaths, with search operations continuing for 6 missing individuals, including army personnel, from the Chaten landslide incident. Restoration work commenced on damaged National Highways (NH-10).',
    type: 'info'
  }
];

export function InteractiveTimeline() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'border-amber-500 bg-amber-500/20';
      case 'critical':
        return 'border-red-500 bg-red-500/20';
      default:
        return 'border-cyan-500 bg-cyan-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {events.map((event, index) => (
        <div
          key={index}
          className={`relative pl-8 border-l-4 pb-8 cursor-pointer transition-all duration-300 ${
            selectedEvent === index
              ? getTypeColor(event.type)
              : 'border-slate-600 hover:border-slate-500'
          }`}
          onClick={() => setSelectedEvent(selectedEvent === index ? null : index)}
        >
          <div className={`absolute left-0 top-0 transform -translate-x-1/2 w-4 h-4 rounded-full transition-all duration-300 ${
            selectedEvent === index
              ? event.type === 'critical' ? 'bg-red-500 ring-4 ring-red-500/30' :
                event.type === 'warning' ? 'bg-amber-500 ring-4 ring-amber-500/30' :
                'bg-cyan-500 ring-4 ring-cyan-500/30'
              : 'bg-slate-600'
          }`}></div>

          <div className="flex items-start gap-3 mb-2">
            <Calendar className={`w-5 h-5 flex-shrink-0 mt-1 ${
              selectedEvent === index
                ? event.type === 'critical' ? 'text-red-400' :
                  event.type === 'warning' ? 'text-amber-400' :
                  'text-cyan-400'
                : 'text-slate-400'
            }`} />
            <div className="flex-1">
              <p className={`text-sm font-medium mb-1 ${
                selectedEvent === index ? 'text-cyan-400' : 'text-slate-400'
              }`}>
                {event.date}
              </p>
              <h3 className={`text-xl font-bold mb-2 flex items-center gap-2 ${
                selectedEvent === index ? 'text-white' : 'text-slate-300'
              }`}>
                {event.title}
                <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${
                  selectedEvent === index ? 'rotate-90 text-cyan-400' : 'text-slate-500'
                }`} />
              </h3>
              <div className={`overflow-hidden transition-all duration-300 ${
                selectedEvent === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <p className="text-slate-300 leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
