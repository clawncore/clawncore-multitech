import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { DepartmentId } from '../../services/careersData';

interface Props {
  hoveredDept: DepartmentId | null;
}

const DEPARTMENTS: { id: DepartmentId; position: [number, number, number]; color: string }[] = [
  { id: 'ai', position: [0, 2, 0], color: '#3b82f6' }, // blue
  { id: 'drone', position: [-3, -1, 1], color: '#0ea5e9' }, // sky
  { id: 'cyber', position: [3, -1, 1], color: '#10b981' }, // emerald
  { id: 'cloud', position: [-2, 2.5, -2], color: '#6366f1' }, // indigo
  { id: 'analytics', position: [2, 2.5, -2], color: '#8b5cf6' }, // violet (subtle)
];

export function TalentNetwork({ hoveredDept }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Group>(null);
  const linksRef = useRef<THREE.LineSegments>(null);

  // Generate links between all departments
  const linkGeo = useMemo(() => {
    const positions = [];
    for (let i = 0; i < DEPARTMENTS.length; i++) {
      for (let j = i + 1; j < DEPARTMENTS.length; j++) {
        positions.push(...DEPARTMENTS[i].position);
        positions.push(...DEPARTMENTS[j].position);
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.1) * 0.2;
      groupRef.current.rotation.x = Math.cos(time * 0.15) * 0.1;
    }

    if (nodesRef.current) {
      nodesRef.current.children.forEach((node: any, idx) => {
        // Individual node bobbing
        node.position.y = DEPARTMENTS[idx].position[1] + Math.sin(time * 2 + idx) * 0.1;
        
        // Scale pulse if hovered
        const isHovered = hoveredDept === DEPARTMENTS[idx].id;
        const targetScale = isHovered ? 1.5 : 1;
        node.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        
        // Opacity transition
        const material = node.children[0].material as THREE.MeshStandardMaterial;
        const targetOpacity = hoveredDept ? (isHovered ? 1 : 0.2) : 0.8;
        material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, 0.1);
      });
    }

    if (linksRef.current) {
      const material = linksRef.current.material as THREE.LineBasicMaterial;
      material.opacity = hoveredDept ? 0.1 : 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Network Links */}
      <lineSegments ref={linksRef} geometry={linkGeo}>
        <lineBasicMaterial color="#cbd5e1" transparent opacity={0.3} />
      </lineSegments>

      {/* Department Nodes */}
      <group ref={nodesRef}>
        {DEPARTMENTS.map((dept) => (
          <group key={dept.id} position={new THREE.Vector3(...dept.position)}>
            {/* Core */}
            <mesh>
              <sphereGeometry args={[0.3, 32, 32]} />
              <meshStandardMaterial 
                color={dept.color} 
                transparent 
                opacity={0.8}
                metalness={0.5}
                roughness={0.2}
              />
            </mesh>
            
            {/* Outer Ring */}
            <mesh rotation={[Math.PI/2, 0, 0]}>
              <ringGeometry args={[0.4, 0.42, 32]} />
              <meshBasicMaterial 
                color={dept.color} 
                transparent 
                opacity={0.5}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
