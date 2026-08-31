import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PrototypeId } from '../../services/prototypes';

interface Props {
  activePrototype: PrototypeId;
  isSimulating: boolean;
}

export function PrototypeModules({ activePrototype, isSimulating }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Neural Mesh Refs
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  const linksRef = useRef<THREE.LineSegments>(null);
  
  // Swarm Refs
  const swarmRef = useRef<THREE.InstancedMesh>(null);
  
  // Quantum Shield Refs
  const shieldRef = useRef<THREE.Mesh>(null);

  // Setup Neural Mesh Data
  const neuralData = useMemo(() => {
    const nodeCount = 50;
    const positions = new Float32Array(nodeCount * 3);
    const velocities = [];
    for (let i = 0; i < nodeCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      velocities.push(new THREE.Vector3((Math.random()-0.5)*0.02, (Math.random()-0.5)*0.02, (Math.random()-0.5)*0.02));
    }
    
    // Create initial links (fully connected graph placeholder)
    const linkPositions = new Float32Array(nodeCount * nodeCount * 3);
    const linkGeo = new THREE.BufferGeometry();
    linkGeo.setAttribute('position', new THREE.BufferAttribute(linkPositions, 3));
    
    return { positions, velocities, linkGeo, nodeCount };
  }, []);

  // Setup Swarm Data
  const swarmData = useMemo(() => {
    const count = 100;
    const positions = [];
    const velocities = [];
    for (let i = 0; i < count; i++) {
      positions.push(new THREE.Vector3((Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5));
      velocities.push(new THREE.Vector3((Math.random()-0.5)*0.05, (Math.random()-0.5)*0.05, (Math.random()-0.5)*0.05));
    }
    return { count, positions, velocities };
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const speedMultiplier = isSimulating ? 3 : 1;

    // Bob the entire group
    if (groupRef.current) {
      groupRef.current.position.y = 3 + Math.sin(time) * 0.2;
      groupRef.current.rotation.y = time * 0.1;
    }

    if (activePrototype === 'neural') {
      // Animate Neural Nodes
      if (nodesRef.current && linksRef.current) {
        const dummy = new THREE.Object3D();
        const positions = (linksRef.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
        let linkIdx = 0;

        for (let i = 0; i < neuralData.nodeCount; i++) {
          // Update position
          neuralData.positions[i*3] += neuralData.velocities[i].x * speedMultiplier;
          neuralData.positions[i*3+1] += neuralData.velocities[i].y * speedMultiplier;
          neuralData.positions[i*3+2] += neuralData.velocities[i].z * speedMultiplier;
          
          // Bounce off bounds
          if (Math.abs(neuralData.positions[i*3]) > 2) neuralData.velocities[i].x *= -1;
          if (Math.abs(neuralData.positions[i*3+1]) > 2) neuralData.velocities[i].y *= -1;
          if (Math.abs(neuralData.positions[i*3+2]) > 2) neuralData.velocities[i].z *= -1;

          dummy.position.set(neuralData.positions[i*3], neuralData.positions[i*3+1], neuralData.positions[i*3+2]);
          dummy.updateMatrix();
          nodesRef.current.setMatrixAt(i, dummy.matrix);

          // Update links (connect to nearby nodes)
          for (let j = i + 1; j < neuralData.nodeCount; j++) {
            const dx = neuralData.positions[i*3] - neuralData.positions[j*3];
            const dy = neuralData.positions[i*3+1] - neuralData.positions[j*3+1];
            const dz = neuralData.positions[i*3+2] - neuralData.positions[j*3+2];
            const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);

            if (dist < 1.5) {
              positions[linkIdx++] = neuralData.positions[i*3];
              positions[linkIdx++] = neuralData.positions[i*3+1];
              positions[linkIdx++] = neuralData.positions[i*3+2];
              positions[linkIdx++] = neuralData.positions[j*3];
              positions[linkIdx++] = neuralData.positions[j*3+1];
              positions[linkIdx++] = neuralData.positions[j*3+2];
            }
          }
        }
        
        // Hide unused links
        for (let i = linkIdx; i < positions.length; i++) {
          positions[i] = 0;
        }

        nodesRef.current.instanceMatrix.needsUpdate = true;
        linksRef.current.geometry.attributes.position.needsUpdate = true;
      }
    } else if (activePrototype === 'swarm') {
      // Animate Swarm
      if (swarmRef.current) {
        const dummy = new THREE.Object3D();
        const center = new THREE.Vector3(0, 0, 0);
        
        for (let i = 0; i < swarmData.count; i++) {
          const pos = swarmData.positions[i];
          const vel = swarmData.velocities[i];
          
          // Flock towards center
          const dirToCenter = center.clone().sub(pos).normalize().multiplyScalar(0.001 * speedMultiplier);
          vel.add(dirToCenter);
          
          // Move
          pos.add(vel.clone().multiplyScalar(speedMultiplier));
          
          // Add some noise
          vel.add(new THREE.Vector3((Math.random()-0.5)*0.01, (Math.random()-0.5)*0.01, (Math.random()-0.5)*0.01));
          vel.clampLength(0, 0.05 * speedMultiplier);

          dummy.position.copy(pos);
          dummy.lookAt(pos.clone().add(vel)); // Look in direction of travel
          dummy.updateMatrix();
          swarmRef.current.setMatrixAt(i, dummy.matrix);
        }
        swarmRef.current.instanceMatrix.needsUpdate = true;
      }
    } else if (activePrototype === 'quantum') {
      // Animate Quantum Shield
      if (shieldRef.current) {
        shieldRef.current.rotation.x = time * 0.5 * speedMultiplier;
        shieldRef.current.rotation.y = time * 0.3 * speedMultiplier;
        
        // Pulse scale
        const scale = 1 + Math.sin(time * 5 * speedMultiplier) * 0.05;
        shieldRef.current.scale.set(scale, scale, scale);
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Neural Mesh Prototype */}
      {activePrototype === 'neural' && (
        <group>
          <instancedMesh ref={nodesRef} args={[new THREE.SphereGeometry(0.05, 16, 16), new THREE.MeshStandardMaterial({ color: '#2563eb', roughness: 0.2 }), neuralData.nodeCount]}>
          </instancedMesh>
          <lineSegments ref={linksRef} geometry={neuralData.linkGeo}>
            <lineBasicMaterial color="#38bdf8" transparent opacity={isSimulating ? 0.6 : 0.2} />
          </lineSegments>
        </group>
      )}

      {/* Drone Swarm Prototype */}
      {activePrototype === 'swarm' && (
        <instancedMesh ref={swarmRef} args={[undefined, undefined, swarmData.count]}>
          <coneGeometry args={[0.05, 0.15, 4]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
        </instancedMesh>
      )}

      {/* Quantum Shield Prototype */}
      {activePrototype === 'quantum' && (
        <group>
          <mesh ref={shieldRef}>
            <icosahedronGeometry args={[2, 1]} />
            <meshStandardMaterial 
              color="#38bdf8" 
              wireframe 
              transparent 
              opacity={0.8}
            />
          </mesh>
          {/* Inner core */}
          <mesh>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#0f172a" metalness={1} roughness={0} />
          </mesh>
        </group>
      )}
      
      {/* Simulation Box Hologram */}
      {isSimulating && (
        <mesh>
          <boxGeometry args={[6, 6, 6]} />
          <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.05} />
        </mesh>
      )}
    </group>
  );
}
