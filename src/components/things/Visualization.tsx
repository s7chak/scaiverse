import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type Particle = {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  color: THREE.Color;
  size: number;
};

type Boid = {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  acceleration: THREE.Vector3;
  color: THREE.Color;
  size: number;
  neighbors?: Boid[]; // For performance, you can store or pass this in update
};

const BoidField = ({ count }: { count: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const scale = 0.034;
  const BOUNDS_X = screenWidth * scale;
  const BOUNDS_Y = screenHeight * scale;
  const BOUNDS_Z = 1;
  type Boid = {
    position: THREE.Vector3;
    velocity: THREE.Vector3;
    acceleration: THREE.Vector3;
    color: THREE.Color;
    size: number;
  };
  const boidsRef = useRef<Boid[]>(
    Array.from({ length: count }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 1
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5,
        0.01
      ),
      acceleration: new THREE.Vector3(),
      color: new THREE.Color().setHSL(Math.random(), 1, 0.5),
      // color: new THREE.Color().setHSL(1, 1, 1),
      size: Math.random() * 0.1 + 0.05,
    }))
  );

  const SEPARATION_DIST = 2; //2;
  const ALIGNMENT_DIST = 3;
  const COHESION_DIST = 1;

  const MAX_SPEED = 0.5;
  const MAX_FORCE = 0.03;

  const BOUNDS = 25;

  // Helper functions for Boid behaviors
  const getNeighbors = (boid: Boid, others: Boid[], radius: number) => {
    return others.filter(
      (other) =>
        other !== boid && boid.position.distanceTo(other.position) < radius
    );
  };

  const limitVector = (v: THREE.Vector3, max: number) => {
    if (v.length() > max) {
      v.setLength(max);
    }
  };

  const applySeparation = (boid: Boid, neighbors: Boid[]) => {
    const steer = new THREE.Vector3();
    for (let other of neighbors) {
      const diff = boid.position.clone().sub(other.position);
      const d = diff.length();
      if (d > 0) {
        diff.normalize().divideScalar(d);
        steer.add(diff);
      }
    }
    if (neighbors.length > 0) {
      steer.divideScalar(neighbors.length);
      limitVector(steer, MAX_FORCE);
    }
    return steer;
  };

  const applyAlignment = (boid: Boid, neighbors: Boid[]) => {
    const avgVel = new THREE.Vector3();
    for (let other of neighbors) {
      avgVel.add(other.velocity);
    }
    if (neighbors.length > 0) {
      avgVel.divideScalar(neighbors.length);
      avgVel.sub(boid.velocity);
      limitVector(avgVel, MAX_FORCE);
    }
    return avgVel;
  };

  const applyCohesion = (boid: Boid, neighbors: Boid[]) => {
    const center = new THREE.Vector3();
    for (let other of neighbors) {
      center.add(other.position);
    }
    if (neighbors.length > 0) {
      center.divideScalar(neighbors.length);
      const steer = center.sub(boid.position);
      limitVector(steer, MAX_FORCE);
      return steer;
    }
    return new THREE.Vector3();
  };

  useFrame(() => {
    if (!groupRef.current) return;
    const boids = boidsRef.current;
    for (let boid of boids) {
      const separation = applySeparation(
        boid,
        getNeighbors(boid, boids, SEPARATION_DIST)
      );
      const alignment = applyAlignment(
        boid,
        getNeighbors(boid, boids, ALIGNMENT_DIST)
      );
      const cohesion = applyCohesion(
        boid,
        getNeighbors(boid, boids, COHESION_DIST)
      );
      boid.acceleration.set(0, 0, 0);
      boid.acceleration.add(separation);
      boid.acceleration.add(alignment);
      boid.acceleration.add(cohesion);

      boid.velocity.add(boid.acceleration);
      limitVector(boid.velocity, MAX_SPEED);
      boid.position.add(boid.velocity);

      // Reflect off the bounding cube walls
      if (boid.position.x > BOUNDS_X) {
        boid.position.x = BOUNDS_X;
        boid.velocity.x *= -1;
      } else if (boid.position.x < -BOUNDS_X) {
        boid.position.x = -BOUNDS_X;
        boid.velocity.x *= -1;
      }

      if (boid.position.y > BOUNDS_Y) {
        boid.position.y = BOUNDS_Y;
        boid.velocity.y *= -1;
      } else if (boid.position.y < -BOUNDS_Y) {
        boid.position.y = -BOUNDS_Y;
        boid.velocity.y *= -1;
      }
      if (boid.position.z > BOUNDS_Z) {
        boid.position.z = BOUNDS_Z;
        boid.velocity.z *= -1;
      } else if (boid.position.z < -BOUNDS_Z) {
        boid.position.z = -BOUNDS_Z;
        boid.velocity.z *= -1;
      }
    }

    boids.forEach((boid, i) => {
      const mesh = groupRef.current!.children[i] as THREE.Mesh;
      if (mesh) {
        mesh.position.copy(boid.position);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {boidsRef.current.map((boid, i) => (
        <mesh key={i} position={boid.position}>
          <sphereGeometry args={[boid.size, 8, 8]} />
          <meshBasicMaterial color={boid.color} />
        </mesh>
      ))}
    </group>
  );
};

const ParticleField = ({ count }: { count: number }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Store particles in a ref so we can mutate them
  const particlesRef = useRef(
    Array.from({ length: count }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.2
      ),
    }))
  );

  useFrame(() => {
    if (!groupRef.current) return;

    particlesRef.current.forEach((p, i) => {
      p.position.add(p.velocity);

      const mesh = groupRef.current!.children[i] as THREE.Mesh;
      if (mesh) {
        mesh.position.copy(p.position);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {particlesRef.current.map((p, i) => (
        <mesh key={i} position={p.position.clone()}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="white" />
        </mesh>
      ))}
    </group>
  );
};

const BoidCanvas = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 100], fov: 30 }} // 15, 75
      style={{ background: "black", width: "100vw", height: "100vh" }}
    >
      <ambientLight intensity={0.3} />
      <BoidField count={1000} />
    </Canvas>
  );
};

export default BoidCanvas;
