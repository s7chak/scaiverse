import React, { Component } from 'react';
import { Canvas } from '@react-three/fiber';
import { Dodecahedron, OrbitControls, Tetrahedron } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface State {
  particlePositions: [number, number, number][];
}

class Particloid extends Component<{}, State> {
  constructor(props) {
    super(props);

    this.state = {
      particlePositions: [],
    };
  }

  componentDidMount() {
    const particlePositions = this.calculateStickParticlePositions();
    this.setState({ particlePositions });
  }

  calculateStickParticlePositions = () => {
    const radius = 1; // Radius of the dodecahedron
    const numParticles = 500; // Number of particles

    const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio

    const vertices = [
      [1, 1, 1],
      [1, 1, -1],
      [1, -1, 1],
      [1, -1, -1],
      [-1, 1, 1],
      [-1, 1, -1],
      [-1, -1, 1],
      [-1, -1, -1],
      [0, 1 / phi, phi],
      [0, 1 / phi, -phi],
      [0, -1 / phi, phi],
      [0, -1 / phi, -phi],
      [1 / phi, phi, 0],
      [1 / phi, -phi, 0],
      [-1 / phi, phi, 0],
      [-1 / phi, -phi, 0],
      [phi, 0, 1 / phi],
      [phi, 0, -1 / phi],
      [-phi, 0, 1 / phi],
      [-phi, 0, -1 / phi],
    ];

    let positions : [number, number, number][]= [];

    for (let i = 0; i < numParticles; i++) {
      const randomVertex = vertices[Math.floor(Math.random() * vertices.length)];
      const [x, y, z] = randomVertex.map((coord) => coord * radius);
      positions.push([x, y, z]);
    }

    return positions;
  };

  calculateParticlePositions = () => {
    const radius = 1; // Radius of the dodecahedron
    const numParticles = 500; // Number of particles

    let positions: [number, number, number][] = [];

    for (let i = 0; i < numParticles; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions.push([x, y, z]);
    }

    return positions;
  };

  render() {
    const { particlePositions } = this.state;
    return (
      <Canvas>
        <OrbitControls enablePan={false} enableZoom={false} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 0]} />
        <Dodecahedron args={[Math.sqrt(3)/1.5, 0]} 
        castShadow={true} 
          position={[0, 0, 0]} key={undefined} onClick={undefined} onPointerMissed={undefined} material={undefined} quaternion={undefined} attach={undefined} onUpdate={undefined} up={undefined} scale={undefined} rotation={undefined} matrix={undefined} layers={undefined} dispose={undefined} onContextMenu={undefined} onDoubleClick={undefined} onPointerUp={undefined} onPointerDown={undefined} onPointerOver={undefined} onPointerOut={undefined} onPointerEnter={undefined} onPointerLeave={undefined} onPointerMove={undefined} onPointerCancel={undefined} onWheel={undefined} visible={undefined} type={undefined} id={undefined} uuid={undefined} name={undefined} parent={undefined} modelViewMatrix={undefined} normalMatrix={undefined} matrixWorld={undefined} matrixAutoUpdate={undefined} matrixWorldAutoUpdate={undefined} matrixWorldNeedsUpdate={undefined} receiveShadow={undefined} frustumCulled={undefined} renderOrder={undefined} animations={undefined} userData={undefined} customDepthMaterial={undefined} customDistanceMaterial={undefined} isObject3D={undefined} onBeforeRender={undefined} onAfterRender={undefined} applyMatrix4={undefined} applyQuaternion={undefined} setRotationFromAxisAngle={undefined} setRotationFromEuler={undefined} setRotationFromMatrix={undefined} setRotationFromQuaternion={undefined} rotateOnAxis={undefined} rotateOnWorldAxis={undefined} rotateX={undefined} rotateY={undefined} rotateZ={undefined} translateOnAxis={undefined} translateX={undefined} translateY={undefined} translateZ={undefined} localToWorld={undefined} worldToLocal={undefined} lookAt={undefined} add={undefined} remove={undefined} removeFromParent={undefined} clear={undefined} getObjectById={undefined} getObjectByName={undefined} getObjectByProperty={undefined} getObjectsByProperty={undefined} getWorldPosition={undefined} getWorldQuaternion={undefined} getWorldScale={undefined} getWorldDirection={undefined} raycast={undefined} traverse={undefined} traverseVisible={undefined} traverseAncestors={undefined} updateMatrix={undefined} updateMatrixWorld={undefined} updateWorldMatrix={undefined} toJSON={undefined} clone={undefined} copy={undefined} addEventListener={undefined} hasEventListener={undefined} removeEventListener={undefined} dispatchEvent={undefined} geometry={undefined} morphTargetInfluences={undefined} morphTargetDictionary={undefined} isMesh={undefined} updateMorphTargets={undefined} getVertexPosition={undefined}>
          <meshStandardMaterial color="grey" />
          {particlePositions.map((position, index) => (
            <Particle key={index} position={position} onClick={undefined} />
          ))}
        </Dodecahedron>
      </Canvas>
    );
  }
}




const Particle = ({ position, onClick }) => {
  const meshRef = React.useRef<THREE.Mesh>();
  const [isHovered, setIsHovered] = React.useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.1;
      meshRef.current.rotation.y += 0.1;
      const scaleFactor = isHovered ? 1.2 : 1;
      meshRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor);
    }
  });
  let size = 0.03; //Math.random()*0.08;
  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={onClick}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
};

export default Particloid;
