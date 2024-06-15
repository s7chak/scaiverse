import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import Footer from "../components/sections/Footer";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { SCBlogCard, SCBlogPost } from "../components/SCBlogCard";
import myBlogConfigData from "../components/config/scaiBlogConfig.json";
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
  local: "http://127.0.0.1:5000",
  prod: "https://recomapi-auoic2h3pa-uc.a.run.app",
};
let activeEnv = "prod";

export const Recoms = () => {
  const [theme, setTheme] = useState("dark");
  const [width, setWidth] = useState(window.innerWidth);
  const isMobile = width <= 768;
  const [type, setType] = useState("books");
  const [keywords, setKeywords] = useState("");
  const [people, setPeople] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchDone, setSearchDone] = useState(false);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index); // Toggle expanded state
  };
  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(envs[activeEnv] + `/search`, {
        params: {
          type: type,
          keywords: keywords,
          people: people,
        },
      });
      setRecommendations(response.data);
      setSearchDone(true);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id={theme} className="scblogging is-medium">
      <div className="main-container">
        <div className="scblogheader">
          <FadeInWhenVisible>
            <span className="general-header">Recoms</span>
          </FadeInWhenVisible>
          <br />
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ease: "linear", duration: 2.5 }}
          >
            <span className={`scblogheadertagline ${isMobile ? "mobile" : ""}`}>
              What's your next book?
            </span>
            <br />
          </motion.div>
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "linear", duration: 3 }}
          >
            <Link to={"/"}>
              <div className="gbutton scblogbutton">Scaiverse</div>
            </Link>
          </motion.div> */}
        </div>
      </div>

      <div className="recompanel">
        <select
          className="recomselect"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="books">Books</option>
          <option value="movies" disabled>
            Movies
          </option>
          <option value="tvshows" disabled>
            TV Shows
          </option>
        </select>
        <div className="recomsearchpanel">
          <input
            type="text"
            placeholder="Enter keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="recominput"
          />
          <input
            type="text"
            placeholder="Enter author/people"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="recominput"
          />
        </div>
        <div className="recombuttonpanel">
          <button className="gbutton" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <div
        className="recom-count"
        style={{ textAlign: "center", margin: "20px 0" }}
      >
        {recommendations.length > 0 && <h2>Books: {recommendations.length}</h2>}
      </div>
      <div className="recompanel">
        {loading ? (
          <div className="loading-indicator">...Loading...</div>
        ) : recommendations.length > 0 ? (
          recommendations.map((rec, index) => (
            <div
              key={index}
              className="recom-card"
              onClick={() => toggleExpand(index)}
            >
              <h3>{rec["Title"]}</h3>
              <h4>{rec["People"]}</h4>
              <small>{rec["Date"]}</small>
              {expandedIndex === index && (
                <div className="description">
                  <p>{rec["Summary"]}</p>
                </div>
              )}
            </div>
          ))
        ) : searchDone ? (
          <p>No recommendations found.</p>
        ) : (
          <p>...</p>
        )}
      </div>
    </div>
  );
};

export default Recoms;
