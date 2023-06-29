
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { delay, motion, useAnimation } from "framer-motion";
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
    const groupRef = useRef<THREE.Group>();

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

const VennGuffin = () => {
  const [animate, setAnimate] = useState(true);
  const circleAnimationControls = useAnimation();

  const toggleAnimation = async () => {
    setAnimate(!animate);
    if (!animate) {
      await circleAnimationControls.start({ opacity: 0 });
    }
  };

  const circleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 0.5, scale: 1 }
  }
  const vennAnimationTime = 4;
  const circleTransition = {
    // type: 'spring',
    // damping: 5,
    // stiffness: 10,
    duration: vennAnimationTime-1,
    ease: [0.3, 0.2, 0.1, 0.5]
  }
  let circDiameter = 150;
  let startAway = 100;
  let meStartAway = 150;
  let overlap = 10;
  const ylevel = -100;
  let ydiag = 70;
  let closer = 30;
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHide(true);
    }, vennAnimationTime*1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <div className={`venn-diagram ${hide ? 'hide' : ''}`} onClick={toggleAnimation}>
      <motion.div
        className="circle circle-1"
        initial={{ x: -startAway, y: ylevel, ...circleVariants.hidden }}
        animate={!hide? { x: -(circDiameter/2)-overlap+closer, y: ylevel-closer, ...circleVariants.visible }: {x: 0, scale: 1}}
        transition={circleTransition}
        whileHover={{scale: 1.1}}
        onClick={() => setHide(!hide)}>
        <span className="circle-text">Software</span>
        <div className="glow" />
      </motion.div>
      <motion.div
        className="circle circle-2"
        initial={{ x: startAway, y: ylevel, ...circleVariants.hidden }}
        animate={!hide ? {x: circDiameter/2 +overlap-closer, y: ylevel-closer, ...circleVariants.visible } : {x: 0, scale: 1} }
        transition={circleTransition}
        onClick={() => setHide(!hide)}
        whileHover={{scale: 1.1}}
        >
        <span className="circle-text">ML</span>
        <div className="glow" />
      </motion.div>

      <motion.div
        className="circle circle-1"
        initial={{ x: startAway, y: ylevel+ydiag, ...circleVariants.hidden }}
        animate={!hide ? {x: circDiameter/2 +overlap, y: ylevel+ydiag, ...circleVariants.visible } : {x: 0, scale: 1} }
        transition={circleTransition}
        onClick={() => setHide(!hide)}
        whileHover={{scale: 1.1}}
        >
        <span className="circle-text">Art</span>
        <div className="glow" />
      </motion.div>
      <motion.div
        className="circle circle-2"
        initial={{ x: -startAway, y: ylevel+ydiag, ...circleVariants.hidden }}
        animate={!hide ? {x: -(circDiameter/2+overlap), y: ylevel+ydiag, ...circleVariants.visible } : {x: 0, scale: 1} }
        transition={circleTransition}
        onClick={() => setHide(!hide)}
        whileHover={{scale: 1.1}}
        >
        <span className="circle-text">Design</span>
        <div className="glow" />
      </motion.div>


      <motion.div
        className="circle circle-3"
        initial={{ x: 0, y: ylevel+meStartAway, ...circleVariants.hidden }}
        animate={!hide?{ x: 0, y: ylevel+startAway, z:100, ...circleVariants.visible } : {x: 0, y: ylevel, scale: 1.3}}
        transition={circleTransition}
        onClick={() => setHide(!hide)}
        whileHover={{scale: 1.2}}
        >
        <span className="circle-text">Application</span>
        <div className="glow" />
      </motion.div>
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