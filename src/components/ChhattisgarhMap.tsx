import React, { useEffect, useRef, useState } from 'react';
import { MapPin, AlertTriangle, Shield } from 'lucide-react';

interface ElephantMarker {
  id: string;
  coordinates: [number, number]; // [x%, y%] relative to map container
  lastSeen: string;
  alertLevel: 'safe' | 'warning' | 'danger';
  herdSize: number;
  location: string;
}

const ChhattisgarhMap = () => {
  // Sample elephant markers positioned on Chhattisgarh map (percentage coordinates)
  const elephantMarkers: ElephantMarker[] = [
    {
      id: '1',
      coordinates: [45, 35], // Raipur area (center-south)
      lastSeen: '2 hours ago',
      alertLevel: 'warning',
      herdSize: 8,
      location: 'Near Raipur'
    },
    {
      id: '2', 
      coordinates: [75, 15], // Surguja area (north-east)
      lastSeen: '30 minutes ago',
      alertLevel: 'danger',
      herdSize: 12,
      location: 'Surguja Forest'
    },
    {
      id: '3',
      coordinates: [25, 75], // Jagdalpur area (south-west)
      lastSeen: '5 hours ago',
      alertLevel: 'safe',
      herdSize: 5,
      location: 'Bastar Region'
    },
    {
      id: '4',
      coordinates: [55, 25], // Bilaspur area (center-north)
      lastSeen: '1 hour ago',
      alertLevel: 'warning',
      herdSize: 6,
      location: 'Bilaspur District'
    },
    {
      id: '5',
      coordinates: [35, 65], // Kondagaon area (center-south)
      lastSeen: '4 hours ago',
      alertLevel: 'safe',
      herdSize: 3,
      location: 'Kondagaon Forest'
    },
    {
      id: '6',
      coordinates: [65, 45], // Durg area (center-east)
      lastSeen: '6 hours ago',
      alertLevel: 'warning',
      herdSize: 4,
      location: 'Durg District'
    }
  ];

  const getAlertIcon = (alertLevel: string) => {
    switch (alertLevel) {
      case 'danger': 
        return <AlertTriangle className="w-4 h-4 text-white" />;
      case 'warning': 
        return <Shield className="w-4 h-4 text-white" />;
      case 'safe': 
        return <MapPin className="w-4 h-4 text-white" />;
      default: 
        return <MapPin className="w-4 h-4 text-white" />;
    }
  };

  const getAlertColor = (alertLevel: string) => {
    switch (alertLevel) {
      case 'danger': return 'bg-red-500 border-red-600';
      case 'warning': return 'bg-yellow-500 border-yellow-600';
      case 'safe': return 'bg-green-500 border-green-600';
      default: return 'bg-gray-500 border-gray-600';
    }
  };

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-green-50 to-green-100 rounded-lg overflow-hidden">
      {/* Chhattisgarh Map Background */}
      <div className="absolute inset-0">
        <svg
          viewBox="0 0 400 300"
          className="w-full h-full"
          style={{ filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))' }}
        >
          {/* Chhattisgarh state outline */}
          <path
            d="M 80 50 L 180 40 L 280 60 L 320 100 L 350 150 L 340 200 L 300 240 L 250 260 L 180 250 L 120 230 L 80 180 L 60 130 L 70 80 Z"
            fill="rgba(34, 197, 94, 0.2)"
            stroke="rgba(34, 197, 94, 0.6)"
            strokeWidth="2"
          />
          
          {/* Forest areas */}
          <circle cx="100" cy="120" r="25" fill="rgba(22, 163, 74, 0.3)" />
          <circle cx="200" cy="80" r="30" fill="rgba(22, 163, 74, 0.3)" />
          <circle cx="270" cy="140" r="35" fill="rgba(22, 163, 74, 0.3)" />
          <circle cx="160" cy="180" r="28" fill="rgba(22, 163, 74, 0.3)" />
          <circle cx="250" cy="200" r="20" fill="rgba(22, 163, 74, 0.3)" />
          
          {/* Rivers */}
          <path
            d="M 150 60 Q 180 100 200 140 Q 220 180 240 220"
            stroke="rgba(59, 130, 246, 0.4)"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M 100 140 Q 140 160 180 180 Q 220 200 260 210"
            stroke="rgba(59, 130, 246, 0.4)"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      {/* Elephant Markers */}
      {elephantMarkers.map((marker) => (
        <div
          key={marker.id}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${getAlertColor(marker.alertLevel)} rounded-full p-2 border-2 shadow-lg cursor-pointer hover:scale-110 transition-transform group`}
          style={{
            left: `${marker.coordinates[0]}%`,
            top: `${marker.coordinates[1]}%`,
          }}
        >
          {getAlertIcon(marker.alertLevel)}
          
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
            <div className="text-sm font-semibold">{marker.location}</div>
            <div className="text-xs text-gray-600">
              Herd Size: {marker.herdSize} elephants
            </div>
            <div className="text-xs text-gray-600">
              Last Seen: {marker.lastSeen}
            </div>
            <div className="text-xs font-medium" style={{ color: marker.alertLevel === 'danger' ? '#ef4444' : marker.alertLevel === 'warning' ? '#f59e0b' : '#22c55e' }}>
              Alert: {marker.alertLevel.toUpperCase()}
            </div>
            {/* Arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white"></div>
          </div>
        </div>
      ))}

      {/* Legend */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <h4 className="font-semibold text-sm mb-2">Alert Levels</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 bg-red-500 rounded-full border border-red-600"></div>
            <span>Danger</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 bg-yellow-500 rounded-full border border-yellow-600"></div>
            <span>Warning</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 bg-green-500 rounded-full border border-green-600"></div>
            <span>Safe</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <div className="text-center">
          <div className="text-lg font-bold text-primary">{elephantMarkers.length}</div>
          <div className="text-xs text-muted-foreground">Active Herds</div>
        </div>
      </div>

      {/* Map Title */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
        <div className="text-sm font-semibold text-gray-700">Chhattisgarh</div>
        <div className="text-xs text-gray-500">Elephant Tracking</div>
      </div>
    </div>
  );
};

export default ChhattisgarhMap;