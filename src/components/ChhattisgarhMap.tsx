import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, AlertTriangle, Shield } from 'lucide-react';

interface ElephantMarker {
  id: string;
  coordinates: [number, number]; // [lat, lng]
  lastSeen: string;
  alertLevel: 'safe' | 'warning' | 'danger';
  herdSize: number;
  location: string;
}

const ChhattisgarhMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);

  // Real coordinates for Chhattisgarh elephant locations
  const elephantMarkers: ElephantMarker[] = [
    {
      id: '1',
      coordinates: [21.2787, 81.8661], // Raipur area
      lastSeen: '2 hours ago',
      alertLevel: 'warning',
      herdSize: 8,
      location: 'Near Raipur'
    },
    {
      id: '2', 
      coordinates: [23.2599, 83.2042], // Surguja area
      lastSeen: '30 minutes ago',
      alertLevel: 'danger',
      herdSize: 12,
      location: 'Surguja Forest'
    },
    {
      id: '3',
      coordinates: [19.0760, 81.2849], // Jagdalpur area
      lastSeen: '5 hours ago',
      alertLevel: 'safe',
      herdSize: 5,
      location: 'Bastar Region'
    },
    {
      id: '4',
      coordinates: [21.9739, 82.1409], // Bilaspur area
      lastSeen: '1 hour ago',
      alertLevel: 'warning',
      herdSize: 6,
      location: 'Bilaspur District'
    },
    {
      id: '5',
      coordinates: [20.7506, 80.9318], // Kondagaon area
      lastSeen: '4 hours ago',
      alertLevel: 'safe',
      herdSize: 3,
      location: 'Kondagaon Forest'
    },
    {
      id: '6',
      coordinates: [21.1938, 81.2849], // Durg area
      lastSeen: '6 hours ago',
      alertLevel: 'warning',
      herdSize: 4,
      location: 'Durg District'
    },
    {
      id: '7',
      coordinates: [22.0797, 82.1409], // Korba area
      lastSeen: '3 hours ago',
      alertLevel: 'safe',
      herdSize: 7,
      location: 'Korba Forest'
    }
  ];

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map centered on Chhattisgarh
    map.current = L.map(mapContainer.current, {
      center: [21.2787, 81.8661], // Center of Chhattisgarh
      zoom: 7,
      zoomControl: true,
    });

    // Add OpenStreetMap tiles (free, no API key required)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map.current);

    // Custom icon function
    const createCustomIcon = (alertLevel: string) => {
      const color = alertLevel === 'danger' ? '#ef4444' : alertLevel === 'warning' ? '#f59e0b' : '#22c55e';
      
      return L.divIcon({
        html: `
          <div style="
            background-color: ${color};
            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
          ">
            🐘
          </div>
        `,
        className: 'custom-elephant-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });
    };

    // Add elephant markers
    elephantMarkers.forEach((marker) => {
      const leafletMarker = L.marker(marker.coordinates, {
        icon: createCustomIcon(marker.alertLevel)
      }).addTo(map.current!);

      // Add popup with elephant information
      leafletMarker.bindPopup(`
        <div class="p-3">
          <div class="flex items-center gap-2 mb-2">
            <div class="w-3 h-3 rounded-full" style="background-color: ${
              marker.alertLevel === 'danger' ? '#ef4444' : 
              marker.alertLevel === 'warning' ? '#f59e0b' : '#22c55e'
            }"></div>
            <strong>${marker.location}</strong>
          </div>
          <p class="text-sm text-gray-600 mb-1">Herd Size: ${marker.herdSize} elephants</p>
          <p class="text-sm text-gray-600 mb-1">Last Seen: ${marker.lastSeen}</p>
          <p class="text-sm font-medium" style="color: ${
            marker.alertLevel === 'danger' ? '#ef4444' : 
            marker.alertLevel === 'warning' ? '#f59e0b' : '#22c55e'
          }">
            Alert: ${marker.alertLevel.toUpperCase()}
          </p>
        </div>
      `);
    });

    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-96">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-lg z-0" />
      
      {/* Legend */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg z-10">
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
      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg z-10">
        <div className="text-center">
          <div className="text-lg font-bold text-primary">{elephantMarkers.length}</div>
          <div className="text-xs text-muted-foreground">Active Herds</div>
        </div>
      </div>

      {/* Map Title */}
      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg z-10">
        <div className="text-sm font-semibold text-gray-700">Chhattisgarh</div>
        <div className="text-xs text-gray-500">Real-time Elephant Tracking</div>
      </div>
    </div>
  );
};

export default ChhattisgarhMap;