import { SatelliteData } from '../components/Satellite3D';

// Mock satellite data positioned around Earth
export const mockSatellites: SatelliteData[] = [
  {
    id: 'SAT-001',
    name: 'GPS-IIF-12',
    position: [2.5, 0.5, 2.0],
    errorRate: 12.3,
    parameters: {
      clockDrift: 2.1,
      atmosphericDelay: 45,
      noise: 0.8,
      signalStrength: -142.5,
    },
  },
  {
    id: 'SAT-002', 
    name: 'GPS-III-05',
    position: [-2.0, 1.5, 2.3],
    errorRate: 67.8,
    parameters: {
      clockDrift: 15.7,
      atmosphericDelay: 89,
      noise: 2.3,
      signalStrength: -148.2,
    },
  },
  {
    id: 'SAT-003',
    name: 'NAVSTAR-65',
    position: [1.8, -0.8, -2.5],
    errorRate: 5.2,
    parameters: {
      clockDrift: 0.9,
      atmosphericDelay: 23,
      noise: 0.4,
      signalStrength: -140.1,
    },
  },
  {
    id: 'SAT-004',
    name: 'GPS-IIR-20',
    position: [-2.8, 0.3, -1.5],
    errorRate: 34.6,
    parameters: {
      clockDrift: 8.4,
      atmosphericDelay: 56,
      noise: 1.5,
      signalStrength: -145.8,
    },
  },
  {
    id: 'SAT-005',
    name: 'GPS-III-02',
    position: [1.0, 2.5, 1.8],
    errorRate: 89.1,
    parameters: {
      clockDrift: 23.6,
      atmosphericDelay: 134,
      noise: 4.2,
      signalStrength: -152.3,
    },
  },
  {
    id: 'SAT-006',
    name: 'NAVSTAR-78',
    position: [-1.5, -1.8, 2.2],
    errorRate: 18.7,
    parameters: {
      clockDrift: 4.2,
      atmosphericDelay: 38,
      noise: 1.1,
      signalStrength: -143.9,
    },
  },
  {
    id: 'SAT-007',
    name: 'GPS-IIF-08',
    position: [3.0, -0.5, 1.0],
    errorRate: 72.4,
    parameters: {
      clockDrift: 18.9,
      atmosphericDelay: 98,
      noise: 3.1,
      signalStrength: -149.6,
    },
  },
  {
    id: 'SAT-008',
    name: 'GPS-III-01',
    position: [-0.8, 2.0, -2.5],
    errorRate: 9.3,
    parameters: {
      clockDrift: 1.8,
      atmosphericDelay: 29,
      noise: 0.6,
      signalStrength: -141.7,
    },
  },
  {
    id: 'SAT-009',
    name: 'GPS-IIR-16',
    position: [0.5, -2.2, 1.5],
    errorRate: 41.7,
    parameters: {
      clockDrift: 9.2,
      atmosphericDelay: 67,
      noise: 1.8,
      signalStrength: -146.1,
    },
  },
  {
    id: 'SAT-010',
    name: 'NAVSTAR-71',
    position: [-2.2, 0.8, 2.8],
    errorRate: 15.6,
    parameters: {
      clockDrift: 3.4,
      atmosphericDelay: 41,
      noise: 0.9,
      signalStrength: -143.2,
    },
  },
  {
    id: 'SAT-011',
    name: 'GPS-III-06',
    position: [2.7, 1.2, -1.8],
    errorRate: 78.3,
    parameters: {
      clockDrift: 19.8,
      atmosphericDelay: 112,
      noise: 3.6,
      signalStrength: -150.7,
    },
  },
  {
    id: 'SAT-012',
    name: 'GPS-IIF-07',
    position: [-1.0, -2.5, -0.8],
    errorRate: 7.9,
    parameters: {
      clockDrift: 1.2,
      atmosphericDelay: 28,
      noise: 0.5,
      signalStrength: -141.3,
    },
  },
];
