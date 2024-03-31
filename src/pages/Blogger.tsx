import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import Footer from "../components/sections/Footer";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { SCBlogCard, SCBlogPost } from "../components/SCBlogCard";
import myBlogConfigData from "../components/config/scaiBlogConfig.json";

function FadeInWhenVisible({ children }) {
  const [ref, inView] = useInView({
    triggerOnce: false,
  });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ duration: 2 }}
    >
      {children}
    </motion.div>
  );
}

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
  return (
    <div id={theme} className="scblogging is-medium">
      <div className="main-container">
        <div className="scblogheader">
          <motion.div
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "linear", duration: 1.5 }}
          >
            <span
              className="general-header"
              onClick={() => setShowPostContainer(false)}
            >
              Insight Room
            </span>
          </motion.div>
          <br />
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ease: "linear", duration: 2.5 }}
          >
            <span className={`scblogheadertagline ${isMobile ? "mobile" : ""}`}>
              A repository of thoughts, ideas and insight.
            </span>
            <br />
            <br />
          </motion.div>
          <motion.div
            className="scblog-scbutton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: "linear", duration: 3 }}
          >
            <Link to={"/"}>
              <div className="gbutton">Scaiverse</div>
            </Link>
          </motion.div>
        </div>
      </div>
      <div className={`post-container ${showPostContainer ? "visible" : ""}`}>
        <SCBlogPost
          id={postId}
          onClick={() => {
            setShowPostContainer(false);
          }}
        />
      </div>
      <div
        className={`scblog-cards ${isMobile ? "mobile" : ""}`}
        ref={blogCardsRef}
      >
        {Object.keys(scblogcards).map((key) => (
          <>
            <Link to={`/blogs/${key}`}>
              <SCBlogCard id={key} />
            </Link>
            {/* <Link to={`/blogs/${key}`}>View Blog Post</Link>
            <SCBlogCard
              id={key}
              onClick={() => {
                setPost(key, true);
              }} 
            />*/}
          </>
        ))}
      </div>
    </div>
  );
};

export default Blogger;
