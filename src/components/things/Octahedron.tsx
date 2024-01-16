
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { delay, motion, spring, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type Cube = {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  color: THREE.Color;
  rotationSpeed: number;
  size: number;
};

type Particle = {
  position: THREE.Vector3;
  orbitRadius: number;
  orbitSpeed: number;
  color: THREE.Color;
  size: number;
};

const RotatingTechs = () => {
  const cubeNumber = 10;
  const [cubes, setCubes] = useState<Cube[]>(() =>
    Array.from({ length: cubeNumber }, () => ({
      position: new THREE.Vector3().random().multiplyScalar(3),
      rotation: new THREE.Euler(),
      color: new THREE.Color("#6484cd"),
      rotationSpeed: Math.max(Math.random(), 0.8),
      size: Math.random() * 2,
    }))
  );

  const [particles, setParticles] = useState<Particle[]>([]);
  const handleClickCube = (index: number) => {
    const cube = cubes[index];
    let factor = 20;
    let away = (Math.random() - 0.5)*factor;
    const particle: Particle = {
      position: cube.position.clone().add(new THREE.Vector3().setFromSphericalCoords(away, away * Math.PI * 2 / factor, away * Math.PI * 2 / factor)),
      orbitRadius: 5,
      orbitSpeed: Math.random() * 2,
      size: Math.random() * 0.2 + 0.1,
      color: new THREE.Color().setHSL(Math.random(), 1, 0.5),
    };
    setParticles((prevParticles) => [...prevParticles, particle]);
  };

  const Particles = () => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
      if (groupRef.current) {
        const time = state.clock.getElapsedTime();
        groupRef.current.rotation.y = time * 0.5;
      }
    });

    return (
      <group ref={groupRef}>
        {particles.map((particle, index) => (
          <mesh position={particle.position} key={index}>
            <sphereGeometry args={[particle.size, 16, 16]} />
            <meshBasicMaterial color={particle.color} />
          </mesh>
        ))}
      </group>
    );
  };

  return (
      <Canvas camera={{ fov: 50, position: [-40, 30, 50] }}>
        <OrbitControls enablePan={false} enableZoom={false} rotateSpeed={0.8} />
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={0.8} />
        <pointLight position={[10, 10, 10]} />
        <group name="cubesGroup">
          {cubes.map((cube, index) => (
            <mesh
              position={cube.position}
              rotation={cube.rotation}
              key={index}
              onClick={() => handleClickCube(index)}
            >
              <boxGeometry args={[cube.size, cube.size, cube.size]} />
              <meshPhongMaterial color={cube.color} />
            </mesh>
          ))}
        </group>
        <Particles />
      </Canvas>
  );
};

const Circle = ({ className, hide, text, onClick, animated}) => {
  const handleClick = () => {
    onClick()
  }

  return (
  <div className={`circle ${className} ${hide ? ' reverse' : ''}`} 
    onClick={handleClick}>
      <span className="circle-text">{text}</span>
    <div className="glow" />
  </div>);
}

const VennGuffin = () => {
  const [animate, setAnimate] = useState(true);
  const circleAnimationControls = useAnimation();

  const circleVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 0.6, scale: 1 }
  }
  const vennAnimationTime = 4;
  const circleTransition = {
    // type: 'spring',
    // damping: 5,
    // stiffness: 10,
    duration: vennAnimationTime-2,
    ease: [0.3, 0.2, 0.1, 0.5]
  }
  let circDiameter = 150;
  let startAway = 100;
  let meStartAway = 150;
  let overlap = 10;
  const ylevel = -50;
  let ydiag = 70;
  let closer = 30;
  const [hide, setHide] = useState(false);

  return (
    <div className={`venn-diagram`} onClick={() => setAnimate(true)}>
      <Circle className="circle-1" hide={hide} text="Software" onClick={() => setHide(!hide)} animated={animate}/>
      <Circle className="circle-2" hide={hide} text="ML" onClick={() => setHide(!hide)} animated={animate}/>
      <Circle className="circle-4" hide={hide} text="Art" onClick={() => setHide(!hide)} animated={animate}/>
      <Circle className="circle-5" hide={hide} text="Design" onClick={() => setHide(!hide)} animated={animate}/>
      <Circle className="circle-3" hide={hide} text="Application" onClick={() => setHide(!hide)} animated={animate}/>

      {/* <motion.div
        className="circle circle-3"
        initial={{ x: 0, y: ylevel-startAway, ...circleVariants.hidden }}
        animate={!hide?{ x: 0, y: ylevel-startAway+closer, z:100, ...circleVariants.visible } : {x: 0, y: ylevel, scale: 1.3}}
        transition={circleTransition}
        onClick={() => setHide(!hide)}
        whileHover={{scale: 1.2}}
        >
        <span className="circle-text">Application</span>
        <div className="glow" />
      </motion.div> */}
    </div>
  )
}

function McGuffin() {
  return (
      <div className="mcguffin">
        <VennGuffin />
      </div>
  );
}

export default McGuffin;