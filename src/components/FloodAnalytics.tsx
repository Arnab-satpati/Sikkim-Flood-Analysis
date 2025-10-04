import { TrendingUp, Users, AlertTriangle, Droplets } from 'lucide-react';
import { FloodMetrics, FloodPhase } from '../types/sar';

interface FloodAnalyticsProps {
  metrics: FloodMetrics[];
  currentPhase: FloodPhase;
}

export default function FloodAnalytics({ metrics, currentPhase }: FloodAnalyticsProps) {
  const currentMetric = metrics.find(m => m.phase === currentPhase);
  const preFloodMetric = metrics.find(m => m.phase === 'pre_flood');

  if (!currentMetric || !preFloodMetric) return null;

  const waterIncrease = currentMetric.waterCoverageKm2 - preFloodMetric.waterCoverageKm2;
  const waterIncreasePercent = ((waterIncrease / preFloodMetric.waterCoverageKm2) * 100).toFixed(1);

  return (
    <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
      <div className="flex items-center gap-2 text-white mb-4">
        <TrendingUp className="w-5 h-5" />
        <h2 className="text-lg font-bold">Flood Analytics</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="w-5 h-5" />
            <span className="text-sm font-medium opacity-90">Water Coverage</span>
          </div>
          <div className="text-3xl font-bold">{currentMetric.waterCoverageKm2.toFixed(1)}</div>
          <div className="text-sm opacity-75 mt-1">km²</div>
        </div>

        <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-lg p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-sm font-medium opacity-90">Change</span>
          </div>
          <div className="text-3xl font-bold">
            {waterIncrease > 0 ? '+' : ''}{waterIncrease.toFixed(1)}
          </div>
          <div className="text-sm opacity-75 mt-1">
            {waterIncreasePercent > 0 ? '+' : ''}{waterIncreasePercent}% from baseline
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-lg p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5" />
            <span className="text-sm font-medium opacity-90">Affected Population</span>
          </div>
          <div className="text-3xl font-bold">
            {currentMetric.affectedPopulation.toLocaleString()}
          </div>
          <div className="text-sm opacity-75 mt-1">people</div>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium opacity-90">Status</span>
          </div>
          <div className="text-2xl font-bold">
            {currentPhase === 'pre_flood' && 'Normal'}
            {currentPhase === 'during_event' && 'Critical'}
            {currentPhase === 'post_analysis' && 'Recovery'}
          </div>
          <div className="text-sm opacity-75 mt-1">
            {new Date(currentMetric.analysisDate).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="mt-4 bg-slate-900/50 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-3 text-sm">Infrastructure Impact</h3>
        <div className="space-y-2 text-sm">
          {currentPhase === 'pre_flood' && (
            <div className="flex justify-between text-slate-300">
              <span>Status:</span>
              <span className="font-semibold text-green-400">
                {currentMetric.infrastructureDamage.status}
              </span>
            </div>
          )}
          {currentPhase === 'during_event' && (
            <>
              <div className="flex justify-between text-slate-300">
                <span>Roads Affected:</span>
                <span className="font-semibold text-orange-400">
                  {currentMetric.infrastructureDamage.roads_affected}
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Buildings Damaged:</span>
                <span className="font-semibold text-red-400">
                  {currentMetric.infrastructureDamage.buildings_damaged}
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Estimated Cost:</span>
                <span className="font-semibold text-yellow-400">
                  ${(currentMetric.infrastructureDamage.estimated_cost_usd / 1000000).toFixed(1)}M
                </span>
              </div>
            </>
          )}
          {currentPhase === 'post_analysis' && (
            <>
              <div className="flex justify-between text-slate-300">
                <span>Recovery Rate:</span>
                <span className="font-semibold text-green-400">
                  {(currentMetric.infrastructureDamage.recovery_rate * 100).toFixed(0)}%
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Ongoing Repairs:</span>
                <span className="font-semibold text-blue-400">
                  {currentMetric.infrastructureDamage.ongoing_repairs}
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Est. Recovery Time:</span>
                <span className="font-semibold text-purple-400">
                  {currentMetric.infrastructureDamage.estimated_recovery_days} days
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
