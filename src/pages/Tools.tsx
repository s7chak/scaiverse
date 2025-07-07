import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import toolsConfig from "../components/config/toolsConfig.json";
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

export const Tools = () => {
  const [theme, setTheme] = useState("dark");
  const [width, setWidth] = useState(window.innerWidth);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedTool, setExpandedTool] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = width <= 768;

  const filteredTools = (toolsConfig as Tool[])
    .filter(
      (tool) =>
        tool.status.toLowerCase().includes("out") &&
        (tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tool.category.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => a.category.localeCompare(b.category));

  return (
    <div id={theme} className="tools-page">
      <MyLogoBar />
      <div className="tools-header">
        <div className="scblogheader">
          <FadeInWhenVisible>
            <span className="general-header">Tools</span>
          </FadeInWhenVisible>
        </div>
        <input
          type="text"
          placeholder="Search tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="resources-search"
        />
      </div>
      <div className="tools-grid">
        {filteredTools.map((tool) => (
          <div
            key={tool.name}
            className={`tool-card ${
              expandedTool === tool.name ? "expanded" : ""
            }`}
            onClick={() =>
              setExpandedTool(expandedTool === tool.name ? null : tool.name)
            }
          >
            <div className="tool-content">
              <h3 className="tool-name">{tool.name}</h3>
              {!!tool.image && (
                <img src={tool.image} alt={tool.name} className="tool-image" />
              )}
              {!!tool.description && expandedTool != tool.name && (
                <span className="tool-description">{tool.description}</span>
              )}
              {expandedTool === tool.name && (
                <>
                  <p className="tool-description">{tool.description}</p>
                  <span className="tool-category">{tool.category}</span>
                  <p className="tool-setup">{tool.setup_instruction}</p>
                  {tool.github_url && (
                    <a
                      href={tool.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tool-link"
                    >
                      GitHub
                    </a>
                  )}
                  {tool.link && (
                    <a
                      href={tool.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tool-link"
                    >
                      Live Demo
                    </a>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export interface Tool {
  name: string;
  description: string;
  category: string;
  setup_instruction: string;
  status: string;
  github_url?: string;
  link?: string;
  image: string;
}

export default Tools;
