import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, Color, Vector3, useFrame, useLoader } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import * as THREE from 'three';
// import limg from "assets/files/s2.png";

type Cube = {
  position: Vector3;
  color: Color;
  rotationSpeed: number;
};

const Box = ({ color, rotationSpeed, position }: Cube) => {
  const ref = useRef<THREE.Mesh>(null!);
  const [clicked, setClicked] = useState(false);

  useFrame((_, delta) => {
      ref.current.rotation.x += delta * rotationSpeed;
      ref.current.rotation.y += delta * rotationSpeed;
  });

  return (
      <mesh
          ref={ref}
          position={position}
          scale={clicked ? 1.5 : 1}
          onClick={() => setClicked(!clicked)}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={color} />
      </mesh>
  );
};

const useGenerateRandomColor = () => {
  const [color, setColor] = useState("blue")
  const generateColor = () => {
      setColor('red');
  };
  return { color, generateColor };

};

export const RotatingCubes = () => {
  const maxSide = 10;
  const randomPosition = Math.random() * maxSide;
  const cubeNumber = 10;

  const [cubes, setCubes] = useState<Cube[]>([...Array(cubeNumber)].map<Cube>(() => ({
      position: new THREE.Vector3(randomPosition),
      color: useGenerateRandomColor(),
      rotationSpeed: Math.random()
  })));

  return (
      <div>
          <Canvas>
              <OrbitControls />
              <ambientLight intensity={0.8} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <pointLight position={[0, 0, 0]} />
              {
                  cubes.map((cube, index) => (
                      <Box {...cube} key={index} />
                  ))
              }
          </Canvas>
      </div>
  );
};

function Sphere3d(props) {
  const ref = useRef();
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  const renderer = new THREE.WebGLRenderer();
  // useFrame((state, delta) => (ref.current.rotation.x += delta))
  return (
    <mesh
    {...props}
    ref={ref}
    scale={1}
    onClick={(event) => click(!clicked)}
    onPointerOver={(event) => hover(true)}
    onPointerOut={(event) => hover(false)}
    // rotation={[6, 0, 0]}
    rotation-x={Math.PI * 0.1}
    rotation-y={Math.PI * 0.25}
    >
      <sphereGeometry attach="geometry" args={[1, 30, 30]} />
      {/* <boxGeometry args={[2, 2, 2]} /> */}
      <meshStandardMaterial
        attach="material"
        color="#6484cd"
        transparent
        roughness={0.02}
        metalness={hovered?0.3:0.6}
      />
    </mesh>
  );
}


function Logo3d(props) {
  const ref = useRef();
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  const renderer = new THREE.WebGLRenderer();
  // const img = limg;
  // const texture = useLoader(THREE.TextureLoader, img)
  return (
    <mesh
    {...props}
    ref={ref}
    scale={1}
    onClick={(event) => click(!clicked)}
    onPointerOver={(event) => hover(true)}
    onPointerOut={(event) => hover(false)}
    // rotation={[6, 0, 0]}
    rotation-x={Math.PI * 0.25} rotation-y={Math.PI * 0.25}
    >
      <planeBufferGeometry attach="geometry" args={[3, 3]} />
      {/* <meshBasicMaterial attach="material" map={texture} /> */}
    </mesh>
  );
}


function Playthree() {
  return (
      <div className="threeexp">
        <RotatingCubes />
      {/* <Canvas>
        <ambientLight intensity={0.8} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[0, 0, 0]} />
        {/* <Sphere3d position={[0, 0, 0]} /> 
        <OrbitControls />
      </Canvas> */}
      </div>
  );
}

export default Playthree;

