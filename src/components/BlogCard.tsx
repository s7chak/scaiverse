import blogConfigData from "./blogConfig.json";
import myBlogConfigData from "./scaiBlogConfig.json";
import React, { useState } from "react";

const getBlogData = (blog_id: string, mine: boolean): any => {

	let config = mine? myBlogConfigData: blogConfigData;
	let blog = config[blog_id];
	if (blog!=null){
		return [blog, false, false];
	}
	else {
		return [null, true, true]
	}
};


export const BlogCard = ({ id, mine}: { id: string; mine: boolean}) => {
	const [blog, _hasError, loading] = getBlogData(id, mine);
	const [width, setWidth] = useState<number>(window.innerWidth);
	const isMobile = width <= 768;
	if (loading)
		return (
			<div className={`blog-card ${isMobile ? "mobile" : ""}`}>
				<div className="blog-card-content">
					<div className="blog-description">
						<p>Hi there!</p>
						<p>That is all I have for now. </p>
						<p>Thanks for reading and do revisit to view more articles and projects<br/>as my journey is always a work in progress.</p>
					</div>
				</div>
			</div>
		);
	return (
		<div className={`blog-card ${isMobile ? "mobile" : ""}`}>
			<div className="blog-card-content">
				<div className="blog-title">
					<a href={blog.url} target="_blank">
						{blog.title}
					</a>
				</div><br/>
				<div className="blog-description">
					<article dangerouslySetInnerHTML={{ __html: blog.description }}></article>
					<br />
					<div style={{ display: "flex" }}>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BlogCard;
