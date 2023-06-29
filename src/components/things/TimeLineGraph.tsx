import { Loader, OrbitControls, ScrollControls, Scroll, Text, Html, Line } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from 'three';
import timelineConfigData from "../timeLineConfig.json";



const generateCandles = (num, candleHeights) => {
  const startingPrice = 20;
  const startXPosition = -200;
  const numCandles = num;
  const candleWidth = 8;
  const candleSpacing = 2;
  let currentPrice = startingPrice;
  let prevHeight = 0;
  const [width, setWidth] = useState<number>(window.innerWidth);
	const isMobile = width <= 768;
  
  let milestones = [0, 5, 10, 18, 22, 27];
  let milestoneLabelUpDown = [0, 1, 0, 1, 0, 1];
  let milestoneTitles = Object.keys(timelineConfigData);
  let labelText=Array.from({length: numCandles});
  let labelStory = Array.from({length: numCandles});
  let labelCounter = 0;
  const candles = Array.from({ length: numCandles }, (_, i) => {
    let candleHeight =  candleHeights[i]; //Math.random() * 20 - 2;
    currentPrice += candleHeight;
    let candleColor = currentPrice >= startingPrice ? '#009666' : '#cc0022';
    // const candlePosition = [i * (candleWidth + candleSpacing) + 100 + candleWidth / 2, 450 - currentPrice - candleHeight / 2, 0];
    let z = isMobile?20 : 0;
    const candlePosition = [startXPosition+ i * (candleWidth + candleSpacing) + candleWidth / 2, prevHeight, 0];
    prevHeight = currentPrice / 2.5;
    var labelposition = [startXPosition+ i * (candleWidth + candleSpacing) + candleWidth / 2, (milestoneLabelUpDown[labelCounter]==0)?prevHeight - 40-z: prevHeight + candleHeight + 30+2*z, 0];
    
    if (milestones.includes(i)) {
      candleColor = '#00ffae';
      labelText[i] = milestoneTitles[labelCounter];
      labelStory[i] = timelineConfigData[milestoneTitles[labelCounter]];
      labelCounter++;
    }
    console.log(labelposition);
    return (
      <group>
      <mesh key={i} position={candlePosition}>
        <boxGeometry args={[candleWidth, candleHeight, 1]} />
        <meshStandardMaterial color={candleColor} />
      </mesh>
      {milestones.includes(i) && (
        <>
          <Line
              points={[candlePosition, labelposition]}
              color="white"
              lineWidth={1} id={undefined} fog={undefined} clear={undefined} add={undefined} transparent={undefined} copy={undefined} visible={undefined} name={undefined} type={undefined} format={undefined} version={undefined} translateX={undefined} translateY={undefined} translateZ={undefined} rotateX={undefined} rotateY={undefined} rotateZ={undefined} uuid={undefined} parent={undefined} modelViewMatrix={undefined} normalMatrix={undefined} matrixWorld={undefined} matrixAutoUpdate={undefined} matrixWorldAutoUpdate={undefined} matrixWorldNeedsUpdate={undefined} castShadow={undefined} receiveShadow={undefined} frustumCulled={undefined} renderOrder={undefined} animations={undefined} userData={undefined} customDepthMaterial={undefined} customDistanceMaterial={undefined} isObject3D={undefined} onBeforeRender={undefined} onAfterRender={undefined} applyMatrix4={undefined} applyQuaternion={undefined} setRotationFromAxisAngle={undefined} setRotationFromEuler={undefined} setRotationFromMatrix={undefined} setRotationFromQuaternion={undefined} rotateOnAxis={undefined} rotateOnWorldAxis={undefined} translateOnAxis={undefined} localToWorld={undefined} worldToLocal={undefined} lookAt={undefined} remove={undefined} removeFromParent={undefined} getObjectById={undefined} getObjectByName={undefined} getObjectByProperty={undefined} getObjectsByProperty={undefined} getWorldPosition={undefined} getWorldQuaternion={undefined} getWorldScale={undefined} getWorldDirection={undefined} raycast={undefined} traverse={undefined} traverseVisible={undefined} traverseAncestors={undefined} updateMatrix={undefined} updateMatrixWorld={undefined} updateWorldMatrix={undefined} toJSON={undefined} clone={undefined} addEventListener={undefined} hasEventListener={undefined} removeEventListener={undefined} dispatchEvent={undefined} blending={undefined} alphaTest={undefined} blendDst={undefined} blendDstAlpha={undefined} blendEquation={undefined} blendEquationAlpha={undefined} blendSrc={undefined} blendSrcAlpha={undefined} clipIntersection={undefined} clippingPlanes={undefined} clipShadows={undefined} colorWrite={undefined} defines={undefined} depthFunc={undefined} depthTest={undefined} depthWrite={undefined} stencilWrite={undefined} stencilFunc={undefined} stencilRef={undefined} stencilWriteMask={undefined} stencilFuncMask={undefined} stencilFail={undefined} stencilZFail={undefined} stencilZPass={undefined} isMaterial={undefined} needsUpdate={undefined} polygonOffset={undefined} polygonOffsetFactor={undefined} polygonOffsetUnits={undefined} precision={undefined} premultipliedAlpha={undefined} forceSinglePass={undefined} dithering={undefined} side={undefined} shadowSide={undefined} toneMapped={undefined} onBeforeCompile={undefined} customProgramCacheKey={undefined} setValues={undefined} morphTargetInfluences={undefined} morphTargetDictionary={undefined} isMesh={undefined} updateMorphTargets={undefined} getVertexPosition={undefined} uniforms={undefined} vertexShader={undefined} fragmentShader={undefined} wireframeLinewidth={undefined} lights={undefined} clipping={undefined} derivatives={undefined} extensions={undefined} defaultAttributeValues={undefined} index0AttributeName={undefined} uniformsNeedUpdate={undefined} glslVersion={undefined} isShaderMaterial={undefined}/>
          <Html position={labelposition}>
          <div className="milestone-container">
          <motion.div className="divebox is-mile milestone-label" animate={{ opacity:1}} initial={{opacity:0}}
            transition={{ease: "linear", duration: 1, delay: 0.5}}
            onClick={() => {
              const tooltip = document.querySelector<HTMLElement>(`.mile-tooltip-${i}`);
              if (tooltip) {
                tooltip.style.opacity = tooltip.style.opacity === "1" ? "0" : "1";
              }
            }}>
            {labelText[i]}
          </motion.div>
          <motion.div
              className={`mile-tooltip mile-tooltip-${i}`}
              initial={{ opacity: 0 }}
              transition={{ ease: "linear", duration: 1, delay: 0.5}}
            >
              {labelStory[i]}
            </motion.div>
          </div>
          </Html>
        </>
      )}
      </group>
    );
  });
  return candles;
};



function TimeLineGraph() {
  const containerRef = useRef<HTMLInputElement>(null);
  const [numCandles, setNumCandles] = useState(1);
  const [randomCandleHeights, setRandomCandleHeights] = useState<number[]>([]);
  const [width, setWidth] = useState<number>(window.innerWidth);
	const isMobile = width <= 768;
  let widthStack = isMobile?"95vw" : "80vw";
  const candleLimit = 35;
  let cameraposition = isMobile? [-550, 350, 650] : [100, 100, 400];
  let camerafov = isMobile? 55 : 50;
  let renderstart = isMobile? 400 : 400;

  useEffect(() => {
    const initialCandles = Array.from({ length: candleLimit }, () => Math.random() * 20 - 2);
    if (initialCandles!=null){
      setRandomCandleHeights(initialCandles);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const containerElement = containerRef.current;
      if (containerElement) {
        const scrollOffset = renderstart-containerElement.getBoundingClientRect().top;
        const containerHeight = containerElement.clientHeight;
        
        const nowCandles = scrollOffset/7; //Math.floor(scrollOffset*2 / containerHeight);
        if (nowCandles > 0 && nowCandles < candleLimit) {
          setNumCandles(nowCandles);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // const randomCandleHeights = useMemo(() => {
  //   return Array.from({ length: numCandles }, () => Math.random() * 20 - 2);
  // }, [numCandles]);
  
  return (
    <div className='timeline' ref={containerRef} style={{width: widthStack, overflow: 'auto'}}>
            <Canvas camera={{ fov: camerafov, position: cameraposition}}>
              <OrbitControls 
              enablePan={false} enableZoom={false}/>
              <ambientLight intensity={0.8} />
                { generateCandles(numCandles, randomCandleHeights) }
            </Canvas>
       </div>
  )
};
  
  
  
  export default TimeLineGraph;