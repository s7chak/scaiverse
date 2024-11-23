import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import resourceConfig from "../components/config/resourceConfig.json";
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
  prod: "https://recomapi-auoic2h3pa-uc.a.run.app",
};
let activeEnv = "prod";

export const Resources = () => {
  const [theme, setTheme] = useState("dark");
  const [width, setWidth] = useState(window.innerWidth);
  const isMobile = width <= 768;
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResources, setFilteredResources] = useState(resourceConfig);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const results = resourceConfig.filter(
      (resource) =>
        resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredResources(results);
  }, [searchTerm]);

  return (
    <div id={theme} className="resources-page">
      <MyLogoBar />
      <div className="resources-header">
        <div className="scblogheader">
          <FadeInWhenVisible>
            <span className="general-header">Resources</span>
          </FadeInWhenVisible>
        </div>
        <input
          type="text"
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="resources-search"
        />
      </div>
      <div className="resources-grid">
        {filteredResources.map((resource) => (
          <div key={resource.name} className="resource-card">
            <div className="resource-content">
              {!!resource.image && (
                <div className="resource-image-wrapper">
                  <img
                    src={resource.image}
                    alt={resource.name}
                    className="resource-image"
                  />
                </div>
              )}
              <h3 className="resource-name">{resource.name}</h3>
              <p className="resource-description">{resource.description}</p>
              <span className="resource-category">{resource.category}</span>
              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-link"
              >
                Learn More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
