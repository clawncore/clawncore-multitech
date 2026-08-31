export type PrototypeId = 'neural' | 'swarm' | 'quantum';

export interface PrototypeData {
  id: PrototypeId;
  title: string;
  category: string;
  status: string;
  description: string;
  metrics: { label: string; value: string }[];
  simulationDetails: string;
}

export const PROTOTYPES: Record<PrototypeId, PrototypeData> = {
  neural: {
    id: 'neural',
    title: 'Adaptive Neural Mesh',
    category: 'Artificial Intelligence',
    status: 'ACTIVE SIMULATION',
    description: 'Next-generation neural networking designed to physically restructure its own logic pathways based on incoming telemetry. This prototype tests autonomous decision-making without predefined boundaries.',
    metrics: [
      { label: 'Synaptic Links', value: '42.8 Billion' },
      { label: 'Adaptation Rate', value: '0.4ms' }
    ],
    simulationDetails: 'Running recursive logic stress test. Injecting 10M random environment variables to monitor mesh restructuring patterns.'
  },
  swarm: {
    id: 'swarm',
    title: 'Micro-Drone Hive',
    category: 'Autonomous Systems',
    status: 'FLOCKING TEST',
    description: 'Experimental swarm intelligence. Hundreds of micro-drones communicating via localized quantum entanglement to act as a single fluid entity for rapid search and mapping.',
    metrics: [
      { label: 'Active Units', value: '256' },
      { label: 'Collision Rate', value: '0.000%' }
    ],
    simulationDetails: 'Simulating complex obstacle navigation. Swarm is dynamically reorganizing formation to optimize aerodynamic efficiency.'
  },
  quantum: {
    id: 'quantum',
    title: 'Quantum Shield Emitter',
    category: 'Cybersecurity',
    status: 'STRESS TESTING',
    description: 'A physical manifestation of cryptographic defenses. Projects a multi-dimensional energy barrier capable of isolating systems from localized EMPs and unauthorized physical intrusions.',
    metrics: [
      { label: 'Energy Draw', value: '14.2 MW' },
      { label: 'Field Integrity', value: '99.99%' }
    ],
    simulationDetails: 'Bombarding shield with high-frequency directed energy pulses to measure dissipation rates across the barrier surface.'
  }
};
