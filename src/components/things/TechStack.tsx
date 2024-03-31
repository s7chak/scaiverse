import {
  FlyControls,
  Loader,
  OrbitControls,
  PerspectiveCamera,
  RoundedBox,
} from "@react-three/drei";
import {
  Canvas,
  Color,
  Vector3,
  useFrame,
  useLoader,
  extend,
} from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import codeFont from "./code_font.json";
import { FaJsSquare } from "react-icons/fa";

extend({ TextGeometry });

let techImages = {
  Python: "assets/files/pylogo.png",
  Java: "assets/files/java.png",
  "C#": "assets/files/c.png",
  "Node.js": "assets/files/node.png",
  TypeScript: "assets/files/ts.png",
  React: "assets/files/react.png",
  MSSQL: "assets/files/db.png",
  PostgreSQL: "assets/files/pgsql.png",
  GoogleCloud: "assets/files/gcloud.png",
};

type Cube = {
  position: Vector3;
  color: Color;
  rotationSpeed: number;
  leng: number;
};

type TechImg = {
  techname: string;
  position: Vector3;
  xrad: number;
  zrad: number;
  rotationSpeed: number;
  leng: number;
};

const JustBox = ({
  techname,
  position,
  xrad,
  zrad,
  rotationSpeed,
  leng,
}: TechImg) => {
  const ref = useRef<THREE.Mesh>(null!);
  const [clicked, setClicked] = useState(false);
  const [hovered, hover] = useState(false);
  useFrame((_, delta) => {
    ref.current.rotation.x += (delta * rotationSpeed) / 5;
    ref.current.rotation.z += (delta * rotationSpeed) / 5;
  });

  let filename = techImages[techname];
  // const texture = useLoader(THREE.TextureLoader, filename);
  const [texture] = useLoader(THREE.TextureLoader, [filename]);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const x = xrad * Math.sin(t * rotationSpeed);
    const z = -zrad * Math.cos(t * rotationSpeed);
    ref.current.position.x = 0;
    ref.current.position.y = x;
    ref.current.position.z = z;
  });
  let boxSize = leng * 1.3;
  return (
    <mesh
      ref={ref}
      position={position}
      scale={hovered ? 1.3 : 1}
      onClick={() => setClicked(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
      castShadow={true}
    >
      {/* <boxGeometry attach="geometry" args={[leng/2]}/> */}
      {/* <boxGeometry attach="geometry" args={[leng, leng]} /> */}
      <RoundedBox
        rotation={[0, 0, 0]}
        scale={[1, 1, 1]}
        args={[boxSize, boxSize, boxSize]}
        radius={0.1}
        smoothness={2}
        key={techname}
      >
        <meshBasicMaterial
          attach="material"
          map={texture}
          // color={'#6484cd'} metalness={clicked? 0.5+rotationSpeed : 0.6+rotationSpeed}
        />
      </RoundedBox>
    </mesh>
  );
};

const Box = ({ position, color, rotationSpeed, leng }: Cube) => {
  const ref = useRef<THREE.Mesh>(null!);
  const [clicked, setClicked] = useState(false);
  const [hovered, hover] = useState(false);
  useFrame((_, delta) => {
    ref.current.rotation.x += delta * rotationSpeed;
    ref.current.rotation.y += delta * rotationSpeed;
  });
  return (
    <mesh
      ref={ref}
      position={position}
      scale={clicked ? 1.1 : 1}
      onClick={() => setClicked(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[leng, 1, 1]} />
      <meshStandardMaterial
        color={color}
        transparent
        roughness={rotationSpeed}
        metalness={clicked ? 0.1 + rotationSpeed : 0.2 + rotationSpeed}
      />
    </mesh>
  );
};

const TechBox = ({
  techname,
  position,
  xrad,
  zrad,
  rotationSpeed,
  leng,
}: TechImg) => {
  const ref = useRef<THREE.Mesh>(null!);
  const [clicked, setClicked] = useState(false);
  const [hovered, hover] = useState(false);
  const [geometry, setGeometry] = useState(null);
  // useFrame((_, delta) => {
  //     ref.current.rotation.x += delta * rotationSpeed/20;
  // });
  // const texture = useLoader(THREE.TextureLoader, pyimg);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const x = xrad * Math.sin(t * rotationSpeed);
    const z = zrad * Math.cos(t * rotationSpeed);
    ref.current.position.x = x;
    ref.current.position.z = z;
  });
  let fontFile = "./code_font.json";
  const loader = new FontLoader();
  loader.load(fontFile, (font) => {
    const textOptions = {
      font: font,
      size: 0.8 * leng,
      height: 0.2,
    };
    setGeometry(new TextGeometry(techname, textOptions));
  });
  return (
    <mesh
      ref={ref}
      position={position}
      scale={1.1}
      onClick={() => setClicked(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
      castShadow={true}
      geometry={geometry}
    >
      <meshBasicMaterial
        attach="material"
        color={"#6484cd"}
        // metalness={clicked? 0.5+rotationSpeed : 0.6+rotationSpeed}
      />
    </mesh>
  );
};

export const RotatingTechs = () => {
  const technames = Object.keys(techImages);
  const cubeNumber = technames.length;
  const [width, setWidth] = useState<number>(window.innerWidth);
  const isMobile = width <= 768;

  function randompos(num) {
    return Math.random() * num, Math.random() * num, Math.random() * num;
  }
  function randomorbitrad(num) {
    let _random = Math.floor(Math.random() * 2) - 1;
    return Math.random() * num;
  }
  function randomorbitpos(num) {
    return (
      Math.max(Math.random() * num, num),
      Math.max(Math.random() * num, num),
      Math.max(Math.random() * num, num)
    );
  }
  const [cubes, setCubes] = useState<Cube[]>(
    [...Array(cubeNumber)].map<Cube>(() => ({
      position: new THREE.Vector3(randompos(3)),
      color: "#6484cd",
      rotationSpeed: Math.min(Math.random(), 0.8),
      leng: Math.random() * 2,
    }))
  );
  let i = 0;
  const [techs, setTechs] = useState<TechImg[]>(
    [...Array(cubeNumber)].map<TechImg>(() => ({
      techname: technames[i++],
      position: new THREE.Vector3(randomorbitpos(8)),
      xrad: 10,
      zrad: 8,
      // rotationSpeed: Math.min(Math.random()/3, 0.3),
      rotationSpeed: 0.02 * i,
      leng: 1,
    }))
  );
  console.log(isMobile, width);
  let widthStack = isMobile ? "90vw" : "80vw";
  return (
    <div style={{ height: "95vh", width: widthStack, marginLeft: 0 }}>
      <Suspense fallback={<Loader />}>
        <Canvas camera={{ fov: 50, position: [15, 10, 25] }}>
          <OrbitControls
            target={[0, 0, 0]}
            enablePan={false}
            enableZoom={false}
            rotateSpeed={0.8}
          />
          <ambientLight intensity={0.7} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={0.6} />
          <pointLight position={[10, 10, 10]} />
          {cubes.map((cube, index) => (
            <Box {...cube} key={index} />
          ))}
          <group>
            {!isMobile
              ? techs.map((techimg, index) => (
                  <TechBox {...techimg} key={index} />
                ))
              : ""}
            {techs.map((techimg, index) => (
              <JustBox {...techimg} key={index} />
            ))}
          </group>
        </Canvas>
      </Suspense>
    </div>
  );
};

function TechStack() {
  return (
    <div className="techstack">
      <RotatingTechs />
    </div>
  );
}

export default TechStack;
