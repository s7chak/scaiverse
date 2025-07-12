import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Plot from "react-plotly.js";
import MyLogoBar from "../components/things/LogoNavBar";

let envs = {
  local: "http://127.0.0.1:8091",
  prod: "https://finapi-78191548528.us-west3.run.app",
};
let activeEnv = "prod"; // Change to 'prod' for production

export const Fin = () => {
  const [theme, setTheme] = useState("dark");
  const [width, setWidth] = useState(window.innerWidth);
  const isMobile = width <= 768;
  const [plotData, setPlotData] = useState<{ data: any[]; layout: any } | null>(
    null
  );
  const [selectedType, setSelectedType] = useState("US Equities");
  const [tickerInput, setTickerInput] = useState("");
  const [stockData, setStockData] = useState<{ [key: string]: any } | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [stockError, setStockError] = useState(null);

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

  const handleTickerChange = (e) => {
    setTickerInput(e.target.value.toUpperCase());
  };

  const handleTickerSubmit = async () => {
    if (!tickerInput.trim()) return;
    setStockError(null);
    setStockData(null);
    setLoading(true);
    try {
      const res = await axios.get(
        `${envs[activeEnv]}/api/stockanalysis-1?ticker=${tickerInput.trim()}`
      );
      setStockData(res.data);
    } catch (err: any) {
      if (err.response) {
        setStockError(err.response.data.message);
      } else {
        setStockError(err.message || "Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleTickerSubmit();
    }
  };

  return (
    <div id={theme} className="fin-page">
      <MyLogoBar />
      <div className="fin-header">
        <FadeInWhenVisible>
          <span className="general-header">Fin</span>
        </FadeInWhenVisible>
      </div>
      <div className="fin-hero-graph">
        <div className="fin-vitals">
          <h2>Vitals</h2>
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
        </div>
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
      <div className="fin-ticker-panel">
        <h2>Ticker Dive</h2>
        <div className="fin-ticker-input-group">
          <input
            type="text"
            value={tickerInput}
            onChange={handleTickerChange}
            onKeyDown={handleKeyPress}
            placeholder="Enter Ticker Symbol"
            className="fin-ticker-input"
          />
          <button
            onClick={handleTickerSubmit}
            disabled={loading}
            className="fin-ticker-btn"
          >
            {loading ? "Loading…" : "Analyze"}
          </button>
        </div>
      </div>
      <>
        {stockData && (
          <FadeInWhenVisible>
            <StockView data={stockData} />
          </FadeInWhenVisible>
        )}
        {stockError ? (
          <div className="stock-error">
            <p>{stockError}</p>
          </div>
        ) : null}
      </>
    </div>
  );
};

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

const StockView = ({ data }) => {
  if (!data) return null;

  const Row = ({ label, value }) => (
    <div className="fin-ticker-row">
      <span className="fin-ticker-label">{label}</span>
      <span className="fin-ticker-value">{value ?? "—"}</span>
    </div>
  );

  return (
    <div className="fin-ticker-details">
      <h2>Stock Overview</h2>
      <Row label="Name" value={data.company_name} />
      <Row label="Ticker" value={data.ticker} />
      <Row label="Current Price" value={`$${data.current_price}`} />
      <Row label="Market Cap" value={data.market_cap} />
      <Row label="Sector" value={data.sector} />
      <Row label="Industry" value={data.industry} />
      <Row label="P/E (TTM)" value={data.pe_ratio_ttm} />
      <Row label="EPS (TTM)" value={data.eps_ttm} />
      <Row label="52-Week High" value={data.fifty_two_week_high} />
      <Row label="52-Week Low" value={data.fifty_two_week_low} />
      <Row label="Dividend Yield" value={data.dividend_yield} />
      <Row label="Beta" value={data.beta} />

      <hr />

      <Row label="Revenue (TTM)" value={data.revenue_ttm} />
      <Row label="Net Income" value={data.net_income} />
      <Row label="Gross Margin" value={data.gross_margin} />
      <Row label="Operating Margin" value={data.operating_margin} />
      <Row label="ROE" value={data.roe} />
      <Row label="ROA" value={data.roa} />
      <Row label="Debt/Equity" value={data.debt_to_equity} />

      <hr />

      <Row label="Shares Outstanding" value={data.shares_outstanding} />
      <Row label="Enterprise Value" value={data.enterprise_value} />
      <Row label="PEG Ratio" value={data.peg_ratio} />
      <Row label="P/B Ratio" value={data.pb_ratio} />
      <Row label="P/S Ratio" value={data.ps_ratio} />
      <Row label="Earnings Date" value={JSON.stringify(data.earnings_date)} />
      <Row label="Employees" value={data.employees} />
      <Row label="1-Yr Target Estimate" value={data.one_year_target} />
      <Row label="Ex-Dividend Date" value={data.ex_dividend_date} />
    </div>
  );
};

export default Fin;
