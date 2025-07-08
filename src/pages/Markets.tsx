import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
// import Plot from "react-plotly.js";
import MyLogoBar from "../components/things/LogoNavBar";

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
  prod: "https://finapi-78191548528.us-west3.run.app",
};
let activeEnv = "prod";

export const Fin = () => {
  const [theme, setTheme] = useState("dark");
  const [width, setWidth] = useState(window.innerWidth);
  const isMobile = width <= 768;
  const [plotData, setPlotData] = useState<{ data: any[]; layout: any } | null>(
    null
  );
  const [selectedType, setSelectedType] = useState("US Equities");

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchMarketLines = async () => {
      try {
        const response = await axios.get(
          `${envs[activeEnv]}/api/market-lines`,
          { params: { type: selectedType } }
        );
        setPlotData(response.data["plot"]);
      } catch (error) {
        console.error("Error fetching market lines:", error);
      }
    };
    fetchMarketLines();
  }, [selectedType]);

  return (
    <div id={theme} className="fin-page">
      <MyLogoBar />
      <div className="fin-header">
        <FadeInWhenVisible>
          <span className="general-header">Fin</span>
        </FadeInWhenVisible>
      </div>
      <div className="fin-hero-graph">
        <div>
          <select
            className="fin-type-dropdown"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="US Equities">US Equities</option>
            {/* <option value="US Macro">US Macro</option> */}
            <option value="International Equities">
              International Equities
            </option>
            <option value="Emerging Markets">Emerging Markets</option>
            <option value="FX">Forex</option>
          </select>
        </div>
        {plotData ? (
          <></>
        ) : (
          // <Plot
          //   data={plotData.data}
          //   layout={{ ...plotData.layout }}
          //   config={{ responsive: true }}
          //   className="fin-hero-plot"
          // />
          <p>Loading market data…</p>
        )}
      </div>
    </div>
  );
};

export default Fin;
