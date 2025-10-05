import { useState } from 'react';
import { ChevronDown, MapPin, Calendar, AlertTriangle, Satellite, Layers, FileText, Settings, TrendingUp } from 'lucide-react';
import { ImageUpload, UploadedImage } from './components/ImageUpload';
import { InteractiveTimeline } from './components/InteractiveTimeline';
import { InteractiveMap } from './components/InteractiveMap';
import { FloodPhase, ImageOverlay } from './types/sar';
import { studyAreas, sarImages, imageOverlays, floodMetrics } from './data/mockSARData';
import StudyAreaSelector from './components/StudyAreaSelector';
import TimelineControl from './components/TimelineControl';
import ComparisonView from './components/ComparisonView';
import FloodAnalytics from './components/FloodAnalytics';

function App() {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [activeTab, setActiveTab] = useState<'sar' | 'methodology'>('sar');
  const [expandedFinding, setExpandedFinding] = useState<number | null>(null);

  const [selectedAreaId, setSelectedAreaId] = useState(studyAreas[0].id);
  const [selectedPhase, setSelectedPhase] = useState<FloodPhase>('pre_flood');
  const [overlayStates, setOverlayStates] = useState<ImageOverlay[]>(imageOverlays);

  const handleOverlayToggle = (overlayId: string) => {
    setOverlayStates(prev => {
      const clickedOverlay = prev.find(o => o.id === overlayId);
      if (!clickedOverlay) return prev;

      return prev.map(overlay => {
        if (overlay.sarImageId === clickedOverlay.sarImageId) {
          return {
            ...overlay,
            enabled: overlay.id === overlayId ? !overlay.enabled : false
          };
        }
        return overlay;
      });
    });
  };

  const filteredImages = sarImages.filter(img => img.studyAreaId === selectedAreaId);
  const filteredOverlays = overlayStates.filter(overlay =>
    filteredImages.some(img => img.id === overlay.sarImageId)
  );
  const filteredMetrics = floodMetrics.filter(m => m.studyAreaId === selectedAreaId);

  const oldSarImages = [
    {
      id: 1,
      title: 'Pre-Flood SAR Image',
      date: 'May 17, 2025',
      description: 'Baseline synthetic aperture radar imagery showing normal water levels and terrain stability.',
      imageUrl: 'Snippet/17th May,2025/Mangan/SAR.jpg'
    },
    {
      id: 2,
      title: 'During Flood Event',
      date: 'June 1, 2025',
      description: 'SAR imagery captured during the catastrophic flood event showing significant water accumulation and displacement.',
      imageUrl: 'Snippet/1st June,2025/Mangan/SAR.jpg'
    },
    {
      id: 3,
      title: 'Post-Flood Analysis',
      date: 'July 4, 2025',
      description: 'Post-event analysis revealing altered terrain patterns and residual flood impact zones.',
      imageUrl: 'Snippet/4th July/Mangan/SAR.jpg'
    }
  ];

  const findings = [
    {
      id: 1,
      title: 'Lake Expansion Detected',
      summary: 'SAR analysis revealed a 35% increase in South Lhonak Lake surface area over the past decade.',
      details: 'Using multi-temporal SAR imagery analysis, we observed systematic expansion of the glacial lake boundaries. The lake area increased from approximately 60 hectares to 81 hectares between 2013 and 2023, indicating accelerated glacial melt and increased flood risk. This expansion rate correlates with regional temperature increase data.',
      metric: '35%',
      metricLabel: 'Area Increase'
    },
    {
      id: 2,
      title: 'Terrain Deformation Patterns',
      summary: 'Interferometric SAR data shows subsidence patterns in the moraine dam structure.',
      details: 'InSAR analysis detected progressive subsidence of up to 15cm in the moraine dam structure over 18 months preceding the event. This deformation pattern, combined with increased pore water pressure indicators, suggested structural weakening that ultimately led to catastrophic failure.',
      metric: '15cm',
      metricLabel: 'Subsidence Detected'
    },
    {
      id: 3,
      title: 'Flood Impact Mapping',
      summary: 'Post-event imagery confirms flood waters traveled over 100 km downstream.',
      details: 'SAR-based flood extent mapping revealed that the flood waters affected over 350 square kilometers of terrain along the Teesta River corridor. The analysis identified 23 critical infrastructure points damaged, including bridges, roads, and hydroelectric facilities. Peak flood velocity was estimated at 15-20 m/s in narrow valley sections.',
      metric: '350 km²',
      metricLabel: 'Affected Area'
    },
    {
      id: 4,
      title: 'Climate Change Correlation',
      summary: 'Long-term SAR monitoring data correlates with regional temperature increases.',
      details: 'Analysis of 15 years of SAR data shows a clear correlation between rising average temperatures (1.5°C increase) and glacial lake expansion rates. The frequency of GLOF events in the region has increased by 300% since 2000, with South Lhonak Lake identified as a high-risk site since 2016.',
      metric: '+1.5°C',
      metricLabel: 'Temperature Rise'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1903702/pexels-photo-1903702.jpeg?auto=compress&cs=tinysrgb&w=1920)',
            filter: 'grayscale(30%)'
          }}
        ></div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          {/* <div className="inline-flex items-center gap-2 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-full px-4 py-2 mb-6 animate-pulse">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-red-300 text-sm font-medium">Critical Analysis</span>
          </div> */}

          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fadeIn">
            Sikkim Flood 2025
            <span className="block text-4xl md:text-5xl text-cyan-400 mt-4">Hypothesis & Analysis</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            A comprehensive investigation using synthetic aperture radar imagery to understand the catastrophic flood event
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => document.getElementById('hypothesis')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-cyan-500/50 transform hover:-translate-y-1"
            >
              View Hypothesis
            </button>
            <button
              onClick={() => document.getElementById('sar-platform')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 border border-slate-600"
            >
              Explore Time Series
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white opacity-70" />
        </div>
      </header>

      <section className="py-20 px-6 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-8 border border-slate-600 hover:border-cyan-500 transition-all duration-300 hover:scale-105 cursor-pointer group">
              <MapPin className="w-12 h-12 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-white mb-3">Location</h3>
              <p className="text-slate-300 leading-relaxed">Sikkim, India - South Lhonak Lake glacial region</p>
            </div>

            <div className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-8 border border-slate-600 hover:border-cyan-500 transition-all duration-300 hover:scale-105 cursor-pointer group">
              <Calendar className="w-12 h-12 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-white mb-3">Event Date</h3>
              <p className="text-slate-300 leading-relaxed">October 4, 2023 - Catastrophic flash flood</p>
            </div>

            <div className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-8 border border-slate-600 hover:border-cyan-500 transition-all duration-300 hover:scale-105 cursor-pointer group">
              <Satellite className="w-12 h-12 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-white mb-3">Analysis Method</h3>
              <p className="text-slate-300 leading-relaxed">Synthetic Aperture Radar (SAR) imaging technology</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-slate-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-full px-4 py-2 mb-4">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-300 text-sm font-medium">Event Timeline</span>
            </div>
            <h2 className="text-5xl font-bold text-white mb-6">Interactive Event Timeline</h2>
            <p className="text-xl text-slate-300">Click on timeline events to explore details</p>
          </div>
          <InteractiveTimeline />
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-full px-4 py-2 mb-4">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-300 text-sm font-medium">Geographic Analysis</span>
            </div>
            <h2 className="text-5xl font-bold text-white mb-6">Affected Region Map</h2>
            <p className="text-xl text-slate-300">Click on markers to view location details</p>
          </div>
          <InteractiveMap />
        </div>
      </section>

      <section id="hypothesis" className="py-24 px-6 bg-slate-800/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-full px-4 py-2 mb-4">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-300 text-sm font-medium">Research Hypothesis</span>
            </div>
            <h2 className="text-5xl font-bold text-white mb-6">Primary Hypothesis</h2>
          </div>

          <div className="bg-gradient-to-br from-slate-700/80 to-slate-800/80 backdrop-blur-sm rounded-2xl p-10 border border-slate-600 shadow-2xl">
            <div className="prose prose-invert prose-lg max-w-none">
              <h3 className="text-3xl font-bold text-cyan-400 mb-6">Glacial Lake Outburst Flood (GLOF) Trigger Mechanism</h3>

              <p className="text-slate-200 leading-relaxed mb-6">
                The catastrophic flood event in Sikkim on October 4, 2023, was primarily triggered by a Glacial Lake Outburst Flood (GLOF) from South Lhonak Lake, resulting from:
              </p>

              <div className="bg-slate-800/80 rounded-lg p-6 mb-6 border-l-4 border-cyan-500">
                <ul className="space-y-4 text-slate-200">
                  <li className="flex items-start gap-3">
                    <span className="bg-cyan-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1 font-semibold text-sm">1</span>
                    <span><strong className="text-white">Accelerated Glacial Melting:</strong> Rising temperatures caused rapid ice melt, expanding the glacial lake beyond critical thresholds.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-cyan-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1 font-semibold text-sm">2</span>
                    <span><strong className="text-white">Moraine Dam Failure:</strong> The natural moraine dam containing the lake became structurally compromised due to increased hydrostatic pressure and seepage.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="bg-cyan-500 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1 font-semibold text-sm">3</span>
                    <span><strong className="text-white">Cascading Impact:</strong> The sudden release of lake water created a destructive cascade effect, amplified by the Teesta River system and subsequent dam breaches.</span>
                  </li>
                </ul>
              </div>

              <p className="text-slate-200 leading-relaxed mb-4">
                <strong className="text-white">Supporting Evidence:</strong> Synthetic Aperture Radar (SAR) imagery provides crucial all-weather, day-and-night capability to detect changes in surface water extent, terrain deformation, and structural displacement that preceded and followed the event.
              </p>

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6">
                <p className="text-amber-200 mb-0">
                  <strong className="text-amber-300">Key Implication:</strong> This event underscores the urgent need for enhanced glacial lake monitoring systems and early warning infrastructure in vulnerable Himalayan regions facing climate change impacts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="evidence" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-full px-4 py-2 mb-4">
              <Settings className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-300 text-sm font-medium">Methodology</span>
            </div>
            <h2 className="text-5xl font-bold text-white mb-6">Analysis Methods & Evidence</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive multi-temporal SAR analysis and custom methodology
            </p>
          </div>

          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab('sar')}
              className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'sar'
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 border border-slate-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5" />
                <span>SAR Evidence</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('methodology')}
              className={`px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'methodology'
                  ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 border border-slate-600'
              }`}
            >
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                <span>Custom Methodology</span>
              </div>
            </button>
          </div>

          {activeTab === 'sar' && (
            <div className="grid md:grid-cols-3 gap-8 animate-fadeIn">
              {oldSarImages.map((image, index) => (
                <div
                  key={image.id}
                  className="group bg-slate-700/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-600 hover:border-cyan-500 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 transform hover:-translate-y-2"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={image.imageUrl}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                    <div className="absolute top-4 left-4 bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Image {index + 1}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                      {image.title}
                    </h3>
                    <p className="text-sm text-cyan-400 mb-4 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {image.date}
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                      {image.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'methodology' && (
            <div className="animate-fadeIn space-y-8">
              <div className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-8 border border-slate-600">
                <h3 className="text-2xl font-bold text-white mb-6">Custom Analysis Methodology</h3>
                <div className="prose prose-invert max-w-none">
                  <p className="text-slate-300 leading-relaxed mb-6">
                    Our analysis methodology combines multi-temporal SAR imagery with advanced interferometric techniques, change detection algorithms, and machine learning-based classification to provide comprehensive flood event analysis.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-600">
                      <h4 className="text-lg font-bold text-cyan-400 mb-3">Interferometric SAR (InSAR)</h4>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        Used for detecting terrain deformation and subsidence patterns in the moraine dam structure with millimeter-level precision.
                      </p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-600">
                      <h4 className="text-lg font-bold text-cyan-400 mb-3">Change Detection Analysis</h4>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        Multi-temporal comparison of SAR backscatter values to identify water extent changes and flood progression patterns.
                      </p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-600">
                      <h4 className="text-lg font-bold text-cyan-400 mb-3">Polarimetric Decomposition</h4>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        Analysis of dual-polarization SAR data to distinguish between surface water, vegetation, and urban structures.
                      </p>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-600">
                      <h4 className="text-lg font-bold text-cyan-400 mb-3">Machine Learning Classification</h4>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        Random Forest classifier trained on labeled SAR imagery for automated flood extent mapping and damage assessment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-700/80 to-slate-800/80 backdrop-blur-sm rounded-xl p-8 border border-cyan-500/50">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Layers className="w-6 h-6 text-cyan-400" />
                  Upload Your Analysis Images
                </h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Add your own SAR imagery, methodology diagrams, or analysis results to support the research findings.
                </p>
                <ImageUpload images={uploadedImages} onImagesChange={setUploadedImages} />
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="sar-platform" className="py-24 px-6 bg-slate-900/50">
        <div className="max-w-[1800px] mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-full px-4 py-2 mb-4">
              <Satellite className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-300 text-sm font-medium">Interactive Platform</span>
            </div>
            <h2 className="text-5xl font-bold text-white mb-6">Multi-Temporal SAR Analysis Platform</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Explore time series SAR imagery across 5 flood-prone regions with interactive overlays and analytics
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <StudyAreaSelector
              areas={studyAreas}
              selectedAreaId={selectedAreaId}
              onSelectArea={setSelectedAreaId}
            />
            <TimelineControl
              selectedPhase={selectedPhase}
              onSelectPhase={setSelectedPhase}
            />
            <FloodAnalytics
              metrics={filteredMetrics}
              currentPhase={selectedPhase}
            />
          </div>

          <div>
            <ComparisonView
              images={filteredImages}
              overlays={filteredOverlays}
              onOverlayToggle={handleOverlayToggle}
            />
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-slate-800/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">Key Findings</h2>
            <p className="text-xl text-slate-300">Analysis conclusions based on SAR imagery and field data</p>
          </div>

          <div className="space-y-6">
            {findings.map((finding) => (
              <div
                key={finding.id}
                className="bg-slate-700/50 backdrop-blur-sm rounded-xl border-l-4 border-cyan-500 hover:bg-slate-700/70 transition-all duration-300 cursor-pointer overflow-hidden"
                onClick={() => setExpandedFinding(expandedFinding === finding.id ? null : finding.id)}
              >
                <div className="p-8">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">{finding.id}. {finding.title}</h3>
                      <p className="text-slate-300 leading-relaxed">
                        {finding.summary}
                      </p>
                    </div>
                    <div className="text-center bg-cyan-500/20 rounded-lg px-6 py-4 border border-cyan-500/30 flex-shrink-0">
                      <div className="text-3xl font-bold text-cyan-400">{finding.metric}</div>
                      <div className="text-sm text-cyan-300 mt-1">{finding.metricLabel}</div>
                    </div>
                  </div>

                  <div className={`transition-all duration-500 overflow-hidden ${
                    expandedFinding === finding.id ? 'max-h-96 mt-6 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-600">
                      <h4 className="text-lg font-bold text-cyan-400 mb-3">Detailed Analysis</h4>
                      <p className="text-slate-300 leading-relaxed">
                        {finding.details}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 bg-slate-900 border-t border-slate-700">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-400">
            This analysis is based on synthetic aperture radar imagery and scientific research. For official reports and updates, please consult relevant governmental and scientific institutions.
          </p>
          <p className="text-slate-500 mt-4">
            2025 Sikkim Flood Research Initiative
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
