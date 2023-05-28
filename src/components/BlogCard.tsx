import { RepoIcon, StarFillIcon, QuestionIcon } from "@primer/octicons-react";
import { useEffect, useState } from "react";
import blogConfigData from "./blogConfig.json";

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

	if (loading)
		return (
			<div className="card">
				<div className="card-content">
					<div className="repo-description">
						<p>Loading...</p>
					</div>
				</div>
			</div>
		);

	return (
		<div className="blog-card">
			<div className="blog-card-content">
				<div className="blog-title">
					<a href={blog.url} target="_blank">
						{blog.title}
					</a>
				</div>
				<div className="blog-description">
					<p>{blog.description}</p>
					<br />
					<div style={{ display: "flex" }}>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BlogCard;
