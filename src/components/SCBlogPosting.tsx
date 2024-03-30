import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import myBlogConfigData from "./config/scaiBlogConfig.json";
import { motion } from "framer-motion";

function FadeInWhenVisible({ children, fdelay }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay: fdelay, duration: 1 }}
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 1 },
      }}
    >
      {children}
    </motion.div>
  );
}

export const SCBlogPosting = () => {
  const { id } = useParams();
  const [width, setWidth] = useState<number>(window.innerWidth);
  const isMobile = width <= 768;
  const [blogData, setBlogData] = useState(null);
  const [blogContent, setBlogContent] = useState("");
  const [loading, setLoading] = useState(true);
  const config = myBlogConfigData;
  const navigate = useNavigate();
  if (!!id) {
    const blog = config[id];
  }
  const fetchBlogContent = async () => {
    console.log("Starting fetch: ", id);
    try {
      const response = await fetch(`./${id}.html`);
      const htmlContent = await response.text();
      if (!!id) {
        setBlogData(config[id]);
      }
      setBlogContent(htmlContent);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blog content:", error);
    }
  };

  useEffect(() => {
    fetchBlogContent();
  }, [id]);
  const handleClick = () => {
    // navigate("/blogs");
    console.log("Go Back");
  };

  return (
    <>
      <div id={"dark"} className="scblogging is-medium">
        <div className={`post-container visible dark`}>
          <FadeInWhenVisible fdelay={0}>
            <div className={`scblog-post ${isMobile ? "mobile" : ""}`}>
              <div className="scblog-post-content">
                {!loading && !!blogData ? (
                  <>
                    <FadeInWhenVisible fdelay={0.2}>
                      <div className="scpost-title">{blogData["title"]}</div>
                    </FadeInWhenVisible>
                    <FadeInWhenVisible fdelay={0.8}>
                      <div className="scpost-date">{blogData["date"]}</div>
                    </FadeInWhenVisible>
                    <FadeInWhenVisible fdelay={1.4}>
                      <div
                        className="scpost-description"
                        dangerouslySetInnerHTML={{ __html: blogContent }}
                      ></div>
                    </FadeInWhenVisible>
                    <p>
                      <br />
                      <br />
                    </p>
                    <div className="scblogheader">
                      <div className="gbutton" onClick={handleClick}>
                        Back to blogs
                      </div>
                    </div>
                  </>
                ) : null}
                <br />
                <br />
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </>
  );
};

export default SCBlogPosting;
