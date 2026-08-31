// Helper to map Lat/Lon to a 3D sphere coordinate
export function latLonToSphere(lat: number, lon: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  return { x, y, z };
}

export type EcosystemLayer = 'ai' | 'drone' | 'cloud' | 'cyber' | 'agri';

export interface IntelligenceNode {
  id: string;
  name: string;
  lat: number;
  lon: number;
  layer: EcosystemLayer;
  status: 'active' | 'syncing' | 'monitoring';
  color: string;
}

export interface AnalyticsArc {
  id: string;
  startNodeId: string;
  endNodeId: string;
  layer: EcosystemLayer;
}

// Global Hubs
export const GLOBAL_NODES: IntelligenceNode[] = [
  // AI Systems
  { id: 'ai-1', name: 'Silicon Valley AI Nexus', lat: 37.7749, lon: -122.4194, layer: 'ai', status: 'active', color: '#60a5fa' },
  { id: 'ai-2', name: 'Tokyo Neural Core', lat: 35.6762, lon: 139.6503, layer: 'ai', status: 'active', color: '#60a5fa' },
  { id: 'ai-3', name: 'London Intelligence Hub', lat: 51.5074, lon: -0.1278, layer: 'ai', status: 'syncing', color: '#60a5fa' },
  
  // Cloud Infrastructure
  { id: 'cloud-1', name: 'Frankfurt Data Center', lat: 50.1109, lon: 8.6821, layer: 'cloud', status: 'active', color: '#2dd4bf' },
  { id: 'cloud-2', name: 'Singapore Cloud Region', lat: 1.3521, lon: 103.8198, layer: 'cloud', status: 'active', color: '#2dd4bf' },
  { id: 'cloud-3', name: 'Sydney Edge Node', lat: -33.8688, lon: 151.2093, layer: 'cloud', status: 'monitoring', color: '#2dd4bf' },
  
  // Cybersecurity
  { id: 'cyber-1', name: 'Tel Aviv Security Mesh', lat: 32.0853, lon: 34.7818, layer: 'cyber', status: 'active', color: '#c084fc' },
  { id: 'cyber-2', name: 'Washington Threat Center', lat: 38.9072, lon: -77.0369, layer: 'cyber', status: 'active', color: '#c084fc' },
  
  // Drone Networks
  { id: 'drone-1', name: 'Dubai Autonomous Fleet', lat: 25.2048, lon: 55.2708, layer: 'drone', status: 'active', color: '#f472b6' },
  { id: 'drone-2', name: 'Sao Paulo Logistics', lat: -23.5505, lon: -46.6333, layer: 'drone', status: 'syncing', color: '#f472b6' },
  
  // Smart Agriculture
  { id: 'agri-1', name: 'Midwest Yield Predictor', lat: 41.8781, lon: -87.6298, layer: 'agri', status: 'active', color: '#4ade80' },
  { id: 'agri-2', name: 'Punjab Agri-Intelligence', lat: 31.1471, lon: 75.3412, layer: 'agri', status: 'active', color: '#4ade80' },
  { id: 'agri-3', name: 'Mato Grosso Sensors', lat: -12.6819, lon: -56.9211, layer: 'agri', status: 'monitoring', color: '#4ade80' },
];

export const GLOBAL_ARCS: AnalyticsArc[] = [
  { id: 'arc-1', startNodeId: 'ai-1', endNodeId: 'cloud-1', layer: 'ai' },
  { id: 'arc-2', startNodeId: 'ai-2', endNodeId: 'cloud-2', layer: 'ai' },
  { id: 'arc-3', startNodeId: 'cyber-2', endNodeId: 'cyber-1', layer: 'cyber' },
  { id: 'arc-4', startNodeId: 'cloud-1', endNodeId: 'cloud-2', layer: 'cloud' },
  { id: 'arc-5', startNodeId: 'agri-1', endNodeId: 'ai-1', layer: 'agri' },
  { id: 'arc-6', startNodeId: 'drone-1', endNodeId: 'cloud-1', layer: 'drone' },
  { id: 'arc-7', startNodeId: 'cloud-2', endNodeId: 'ai-3', layer: 'cloud' },
];
