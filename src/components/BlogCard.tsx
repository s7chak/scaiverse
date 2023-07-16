import { RepoIcon, StarFillIcon, QuestionIcon } from "@primer/octicons-react";
import blogConfigData from "./blogConfig.json";
import React, { useState } from "react";

const getBlogData = (blog_id: string): any => {
	let blog = blogConfigData[blog_id];
	if (blog!=null){
		return [blog, false, false];
	}
	else {
		return [null, true, true]
	}
};


export const BlogCard = ({ id }: { id: string; }) => {
	const [blog, _hasError, loading] = getBlogData(id);
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
					<article>{blog.description}</article>
					<br />
					<div style={{ display: "flex" }}>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BlogCard;
