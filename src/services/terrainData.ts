// Mock ODM/WebODM Backend Service

export interface DronePath {
  id: string;
  points: [number, number, number][]; // x, y, z in R3F space
  status: 'active' | 'standby' | 'charging';
  battery: number;
}

export interface CropDataPoint {
  position: [number, number, number];
  healthIndex: number; // 0-1 (NDVI approximation)
  moisture: number; // percentage
  pestRisk: 'low' | 'medium' | 'high';
}

export const generateMockDronePaths = (): DronePath[] => [
  {
    id: 'D-Alpha-1',
    status: 'active',
    battery: 84,
    points: [
      [-10, 4, -10],
      [-5, 4, 10],
      [0, 4, -10],
      [5, 4, 10],
      [10, 4, -10],
    ],
  },
  {
    id: 'D-Beta-2',
    status: 'standby',
    battery: 100,
    points: [
      [-10, 6, 0],
      [10, 6, 0],
    ],
  },
];

export const generateMockCropData = (count: number = 50): CropDataPoint[] => {
  const data: CropDataPoint[] = [];
  for (let i = 0; i < count; i++) {
    // Spread randomly across a 20x20 grid
    const x = (Math.random() - 0.5) * 20;
    const z = (Math.random() - 0.5) * 20;
    // Terrain height approximation for mapping
    const y = Math.sin(x * 0.5) * Math.cos(z * 0.5) * 1.5; 
    
    data.push({
      position: [x, y + 0.1, z],
      healthIndex: 0.4 + Math.random() * 0.6, // 0.4 to 1.0
      moisture: 30 + Math.random() * 60,
      pestRisk: Math.random() > 0.8 ? 'high' : Math.random() > 0.5 ? 'medium' : 'low',
    });
  }
  return data;
};

export const fetchTelemetry = () => {
  return {
    totalAreaScanned: 12450.5, // hectares
    activeDrones: 2,
    anomaliesDetected: 3,
    lastSync: new Date().toISOString(),
  };
};
