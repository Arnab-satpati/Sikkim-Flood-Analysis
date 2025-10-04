import React from "react";

export function InteractiveMap() {
  const mapUrl =
    "https://www.google.com/maps/d/u/0/embed?mid=1x9DPs9bzque2GK8jhK8u0IbLWTtE0dk&ehbc=2E312F";

  return (
    <div className="relative p-6 bg-gray-900 rounded-2xl shadow-2xl max-w-6xl mx-auto">
      {/* Title */}
      <h2 className="text-2xl font-bold text-white mb-4 text-center">
        Sikkim Flood Impact Map
      </h2>

      {/* Map Container */}
      <div className="relative overflow-hidden rounded-xl shadow-lg">
        <iframe
          src="https://www.google.com/maps/d/u/0/embed?mid=1x9DPs9bzque2GK8jhK8u0IbLWTtE0dk&ehbc=2E312F"
          width="100%"
          height="700"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          className="rounded-xl"
        ></iframe>

        {/* Floating Legend */}
        <div className="absolute top-6 right-6 bg-gray-800/90 backdrop-blur-md text-white rounded-xl p-4 shadow-xl max-w-xs">
          <h3 className="font-semibold mb-2">Legend</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-blue-500 border border-white" />
              Lake
            </li>
            <li className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-red-500 border border-white" />
              Dam
            </li>
            <li className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-yellow-500 border border-white" />
              Power Station
            </li>
            <li className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-green-500 border border-white" />
              Town
            </li>
          </ul>
        </div>

        {/* Open Full Map Button */}
        <div className="absolute bottom-6 left-6">
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md text-white font-medium transition-all"
          >
            Open Full Map
          </a>
        </div>
      </div>

      {/* Context / Description */}
      <div className="mt-6 text-gray-300 text-sm text-center">
        This interactive map shows the flood-affected areas in Sikkim. Use the
        Google Maps controls to zoom, pan, and explore the terrain. The legend
        indicates key locations like lakes, dams, towns, and power stations.
      </div>
    </div>
  );
}
