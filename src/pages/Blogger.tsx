import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { SCBlogCard } from "../components/SCBlogCard";
import myBlogConfigData from "../components/config/scaiBlogConfig.json";

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

type BlogEntry = {
  title: string;
  description: string;
  url: string;
  img: string;
  date: string;
  others: string[];
  views: number;
};

export const Blogger = () => {
  const [theme, setTheme] = useState("dark");
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [postId, setPostId] = useState<string>("");
  const [prevPostId, setPrevPostId] = useState("");
  const isMobile = width <= 768;
  const blogCardsRef = useRef(null);
  let config = myBlogConfigData;
  const getBlogTitles = (): any => {
    let extractedData = {};
    for (const blogId in config) {
      if (Object.hasOwnProperty.call(config, blogId)) {
        const { title, img } = config[blogId];
        extractedData[blogId] = { title, img };
      }
    }
    return extractedData;
  };
  const [showPostContainer, setShowPostContainer] = useState(false);
  const scblogcards = getBlogTitles();
  const setPost = (id, on) => {
    scrollToTop();
    setShowPostContainer(on);
    setPostId(id);
  };
  const scrollToTop = () => {
    const postContainer = document.querySelector(".scblog-post");
    if (postContainer) {
      postContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const [searchQuery, setSearchQuery] = useState("");
  const filteredBlogs = Object.keys(scblogcards).filter((key) =>
    key.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const blogName = " //ScaiBlogs";
  const blogSubtext =
    "A repository of thoughts, ideas, insights and perspective";
  //"A 100% human-generated repository of words";

  const [enrichedConfig, setEnrichedConfig] = useState<
    Record<string, BlogEntry>
  >({});
  var apis = {
    local: "https://scaiblog-viewcount.s7chak.workers.dev",
    prod: "https://scaiblog-viewcount.s7chak.workers.dev",
  };
  const env = "prod";
  useEffect(() => {
    const fetchViewsAndEnrichConfig = async () => {
      try {
        const url = `${apis[env]}/api/views`;
        const res = await fetch(url);
        const viewCounts = await res.json();
        const enriched = Object.keys(myBlogConfigData).reduce((acc, blogId) => {
          acc[blogId] = {
            ...myBlogConfigData[blogId],
            views: viewCounts[blogId] || 0,
          };
          return acc;
        }, {});
        setEnrichedConfig(enriched);
      } catch (err) {
        console.error("Failed to fetch view counts", err);
        setEnrichedConfig(myBlogConfigData);
      }
    };

    fetchViewsAndEnrichConfig();
  }, []);

  const sortedBlogs = Object.entries(enrichedConfig)
    .sort(([, a], [, b]) => b.views - a.views)
    .map(([key]) => key);
  const filteredSorted = sortedBlogs.filter((key) =>
    enrichedConfig[key].title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id={theme} className="scblogging is-medium">
      <div className="main-container">
        <div className="scblogheader">
          <FadeInWhenVisible>
            <span
              className="general-header"
              onClick={() => setShowPostContainer(false)}
            >
              {blogName}
            </span>
          </FadeInWhenVisible>
          <br />
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ease: "linear", duration: 2.5 }}
          >
            <span className={`scblogheadertagline ${isMobile ? "mobile" : ""}`}>
              {/* A repository of thoughts, ideas and insight. */}
              {blogSubtext}
            </span>
            <br />
          </motion.div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>
      <div className={`scblog-cards ${isMobile ? "mobile" : ""}`}>
        {!enrichedConfig ? (
          <p className="no-results">Loading...</p>
        ) : filteredSorted.length > 0 ? (
          filteredSorted.map((key) => (
            <Link key={key} to={`/blogs/${key}`}>
              <SCBlogCard id={key} />
            </Link>
          ))
        ) : (
          <p className="no-results">No blogs found.</p>
        )}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "linear", duration: 2 }}
      >
        <Link to={"/"} className="back-buttonbar">
          <div className="nbutton scblogbutton">Scaiverse</div>
        </Link>
      </motion.div>
    </div>
  );
};

export default Blogger;
