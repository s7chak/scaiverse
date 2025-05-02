import { Link } from "react-router-dom";
import blogConfigData from "./config/blogConfig.json";
import myBlogConfigData from "./config/scaiBlogConfig.json";
import React, { useState } from "react";

export const SCBlogCard = ({
  id,
}: // onClick,
{
  id: string;
  //   onClick: () => void;
}) => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const isMobile = width <= 768;
  const blog = myBlogConfigData[id];
  const title = blog.title;
  const date = blog.date;
  const img = blog.img;
  // const handleClick = () => {
  //   onClick();
  // };
  const handleCardClick = async () => {
    try {
      const url = `${apis[env]}/api/views/${id}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log(`View count for blog ${id} incremented.`);
      } else {
        console.error(`Failed to increment view count for blog ${id}`);
      }
    } catch (error) {
      console.error("Error updating view count:", error);
    }
  };

  return (
    <div
      className={`scblog-card ${isMobile ? "mobile" : ""}`}
      // onClick={handleClick}
      onClick={handleCardClick}
    >
      <div className="scblog-card-content">
        <div className="scblog-card-bar">
          <div className="scblog-title">{title}</div>
          <div className="scblog-description">{blog.description}</div>
          {/* <div className="scblog-date">{date}</div> */}
        </div>
        {img && <img src={img} alt={title} className="scblog-img" />}
      </div>
    </div>
  );
};

export const SCBlogPost = ({ id, onClick }: { id: string; onClick }) => {
  const config = myBlogConfigData;
  const [width, setWidth] = useState<number>(window.innerWidth);
  const isMobile = width <= 768;
  let blog = config[id];
  // if (!!blog) {
  // 	fetch(`../config/${id}.html`)
  // 	  .then((response) => response.text())
  // 	  .then((html) => {
  // 		blog.description = html;
  // 		console.log(id, blog.description);
  // 	  })
  // 	  .catch((error) => {
  // 		blog.description = "<p>Apologies, we'll be back soon.</p>";
  // 		console.error("Error fetching HTML:", error);
  // 	  });
  //   }
  let blogimgs = blog ? blog["blogimgs"] : [];
  if (blogimgs.length > 0) {
    let description = blog["description"];
    const descriptionWithImages: string = description.replace(
      "{img}",
      blogimgs
        .map((img) => `<img className='scpost-img' src="${img}">`)
        .join("<br/>")
    );
    blog["description"] = descriptionWithImages;
  }

  return (
    <div className={`scblog-post ${isMobile ? "mobile" : ""}`}>
      <div className="scblog-post-content">
        {!!blog ? (
          <>
            <div className="scpost-title">{blog["title"]}</div>
            <div className="scpost-date">{blog["date"]}</div>
            <div
              className="scpost-description"
              dangerouslySetInnerHTML={{ __html: blog["description"] }}
            ></div>
            <p>
              <br />
              <br />
            </p>
            <div className="scblogheader">
              <div className="gbutton" onClick={onClick}>
                Back to blogs
              </div>
            </div>
          </>
        ) : null}
        <br />
        <br />
      </div>
    </div>
  );
};
var apis = {
  local: "https://scaiblog-viewcount.s7chak.workers.dev",
  prod: "https://scaiblog-viewcount.s7chak.workers.dev",
};
const env = "prod";
export default SCBlogCard;
