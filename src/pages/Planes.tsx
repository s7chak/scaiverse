import React, { useState, useRef, useEffect } from "react";
import BoidCanvas from "../components/things/Visualization";
import McGuffin from "../components/things/Octahedron";

export const VisualPlanes = () => {
  const [theme, setTheme] = useState("dark");
  const [width, setWidth] = useState(window.innerWidth);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedViz, setSelectedViz] = useState("particles"); // default
  const [musicEnabled, setMusicEnabled] = useState(false);
  const isMobile = width <= 768;

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const clickY = e.clientY;
    const height = window.innerHeight;
    if (clickY > height * 0.92) {
      setShowSettings((prev) => !prev);
    }
  };

  const renderVisualization = () => {
    switch (selectedViz) {
      case "boids":
        return <BoidCanvas musicEnabled={musicEnabled} />;
      case "other":
        return <McGuffin />;
      default:
        return <BoidCanvas musicEnabled={musicEnabled} />;
    }
  };

  return (
    <div
      id={theme}
      className="scvisualize is-medium"
      style={{ position: "relative", width: "100vw", height: "100vh" }}
      onClick={handleClick}
    >
      {renderVisualization()}
      {showSettings && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "30%",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            borderTop: "1px solid rgba(255,255,255,0.2)",
            padding: "1rem",
            color: "white",
            zIndex: 10,
          }}
        >
          <h3 style={{ marginBottom: "0.5rem" }}>Settings Panel</h3>
          <div>
            <label style={{ marginRight: "0.5rem" }}>Visualization:</label>
            <select
              value={selectedViz}
              onChange={(e) => setSelectedViz(e.target.value)}
            >
              <option value="boids">Boid Ground</option>
              {/* <option value="other">Other Visualization</option> */}
              {/* Add more options here */}
            </select>
          </div>
          <div>
            <label style={{ marginRight: "0.5rem" }}>Music:</label>
            <input
              type="checkbox"
              checked={musicEnabled}
              onChange={(e) => setMusicEnabled(e.target.checked)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualPlanes;
