import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import MyLogoBar from "../components/things/LogoNavBar";
import Plot from "react-plotly.js";
import axios from "axios";

function FadeInWhenVisible({ children }) {
  const [ref, inView] = useInView({
    triggerOnce: false,
  });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 29 }}
      transition={{ duration: 1.2 }}
    >
      {children}
    </motion.div>
  );
}
let envs = {
  local: "http://127.0.0.1:8091",
  prod: "https://recomapi-auoic2h3pa-uc.a.run.app",
};
let activeEnv = "local";
//127.0.0.1:8091/api/market-lines

export const Fin = () => {
  const [theme, setTheme] = useState("dark");
  const [width, setWidth] = useState(window.innerWidth);
  const isMobile = width <= 768;
  const [plotData, setPlotData] = useState<{ data: any[]; layout: any } | null>(
    null
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchMarketLines = async () => {
      try {
        const response = await axios.get(`${envs[activeEnv]}/api/market-lines`);
        setPlotData(response.data["plot"]);
      } catch (error) {
        console.error("Error fetching market lines:", error);
      }
    };
    fetchMarketLines();
  }, []);

  return (
    <div id={theme} className="fin-page">
      <MyLogoBar />
      <div className="fin-header">
        <FadeInWhenVisible>
          <span className="general-header">Fin</span>
        </FadeInWhenVisible>
      </div>
      <div className="fin-hero-graph">
        {plotData ? (
          <Plot
            data={plotData.data}
            layout={{ ...plotData.layout }}
            config={{ responsive: true }}
            className="fin-hero-plot"
          />
        ) : (
          <p>Loading market data…</p>
        )}
      </div>
    </div>
  );
};

export default Fin;
