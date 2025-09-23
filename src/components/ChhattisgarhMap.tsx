import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { MapPin, AlertTriangle, Shield } from 'lucide-react';

interface ElephantMarker {
  id: string;
  coordinates: [number, number];
  lastSeen: string;
  alertLevel: 'safe' | 'warning' | 'danger';
  herdSize: number;
  location: string;
}

const ChhattisgarhMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isTokenSet, setIsTokenSet] = useState(false);

  // Sample elephant markers for Chhattisgarh
  const elephantMarkers: ElephantMarker[] = [
    {
      id: '1',
      coordinates: [81.8661, 21.2787], // Raipur area
      lastSeen: '2 hours ago',
      alertLevel: 'warning',
      herdSize: 8,
      location: 'Near Raipur'
    },
    {
      id: '2', 
      coordinates: [83.2042, 23.2599], // Surguja area
      lastSeen: '30 minutes ago',
      alertLevel: 'danger',
      herdSize: 12,
      location: 'Surguja Forest'
    },
    {
      id: '3',
      coordinates: [81.2849, 19.0760], // Jagdalpur area
      lastSeen: '5 hours ago',
      alertLevel: 'safe',
      herdSize: 5,
      location: 'Bastar Region'
    },
    {
      id: '4',
      coordinates: [82.1409, 21.9739], // Bilaspur area
      lastSeen: '1 hour ago',
      alertLevel: 'warning',
      herdSize: 6,
      location: 'Bilaspur District'
    },
    {
      id: '5',
      coordinates: [80.9318, 20.7506], // Kondagaon area
      lastSeen: '4 hours ago',
      alertLevel: 'safe',
      herdSize: 3,
      location: 'Kondagaon Forest'
    }
  ];

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setIsTokenSet(true);
      initializeMap();
    }
  };

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [81.8661, 21.2787], // Center on Chhattisgarh
      zoom: 7,
      pitch: 0,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    map.current.on('load', () => {
      addElephantMarkers();
    });
  };

  const addElephantMarkers = () => {
    if (!map.current) return;

    elephantMarkers.forEach((marker) => {
      const el = document.createElement('div');
      el.className = 'elephant-marker';
      el.style.backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(getMarkerSVG(marker.alertLevel))}")`;
      el.style.width = '40px';
      el.style.height = '40px';
      el.style.backgroundSize = '100%';
      el.style.cursor = 'pointer';

      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-3">
          <div class="flex items-center gap-2 mb-2">
            <div class="w-3 h-3 rounded-full ${getAlertColor(marker.alertLevel)}"></div>
            <strong>${marker.location}</strong>
          </div>
          <p class="text-sm text-gray-600 mb-1">Herd Size: ${marker.herdSize} elephants</p>
          <p class="text-sm text-gray-600 mb-1">Last Seen: ${marker.lastSeen}</p>
          <p class="text-sm text-gray-600">Alert: ${marker.alertLevel.toUpperCase()}</p>
        </div>
      `);

      new mapboxgl.Marker(el)
        .setLngLat(marker.coordinates)
        .setPopup(popup)
        .addTo(map.current!);
    });
  };

  const getMarkerSVG = (alertLevel: string) => {
    const color = alertLevel === 'danger' ? '#ef4444' : alertLevel === 'warning' ? '#f59e0b' : '#22c55e';
    return `
      <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" fill="${color}" stroke="white" stroke-width="2"/>
        <text x="20" y="26" text-anchor="middle" fill="white" font-family="Arial" font-size="16" font-weight="bold">🐘</text>
      </svg>
    `;
  };

  const getAlertColor = (alertLevel: string) => {
    switch (alertLevel) {
      case 'danger': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      case 'safe': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  if (!isTokenSet) {
    return (
      <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
        <div className="text-center max-w-md p-6">
          <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-4">Enter Mapbox Token</h3>
          <p className="text-sm text-muted-foreground mb-4">
            To display the Chhattisgarh elephant tracking map, please enter your Mapbox public token.
            Get one at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">mapbox.com</a>
          </p>
          <div className="space-y-3">
            <Input
              type="password"
              placeholder="Enter Mapbox public token..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
            />
            <Button onClick={handleTokenSubmit} className="w-full">
              Load Map
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-96">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-lg" />
      
      {/* Legend */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <h4 className="font-semibold text-sm mb-2">Alert Levels</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Danger</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Warning</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
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
    </div>
  );
};

export default ChhattisgarhMap;