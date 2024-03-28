import { Link } from "react-router-dom";
import blogConfigData from "./config/blogConfig.json";
import myBlogConfigData from "./config/scaiBlogConfig.json";
import React, { useState } from "react";


export const SCBlogCard = ({ id, onClick}: { id: string; onClick: () => void; }) => {
	const [width, setWidth] = useState<number>(window.innerWidth);
	const isMobile = width <= 768;
	const blog = myBlogConfigData[id];
	const title = blog.title;
	const date = blog.date;
	const img = blog.img;
	const handleClick = () => {
        onClick();
    };
	return (
		<div className={`scblog-card ${isMobile ? "mobile" : ""}`} onClick={handleClick}>
			<div className="scblog-card-content">
				<div className='scblog-card-bar'>
					<div className="scblog-title">{title}</div>
					<div className="scblog-date">{date}</div>
				</div>
				{/* <div className="scblog-img">{img}</div> */}
				{img && <img src={img} alt={title} className="scblog-img" />}
			</div>
		</div>
	);
}

export const SCBlogPost = ({ id, onClick }: { id: string; onClick}) => {
	const config = myBlogConfigData;
	const [width, setWidth] = useState<number>(window.innerWidth);
	const isMobile = width <= 768;
	let blog = config[id];
	let blogimgs = blog? blog["blogimgs"] : [];
	if (blogimgs.length>0){
		let description = blog['description'];
		const descriptionWithImages: string = description.replace("{img}", blogimgs.map(img => `<img src="${img}">`).join("<br/>"));
		blog['description'] = descriptionWithImages;
	}
	
	return (
		<div className={`scblog-post ${isMobile ? "mobile" : ""}`}>
			<div className="scblog-post-content">
				{!!blog ? (
					<>
						<div className="scpost-title">
							{blog['title']}
						</div>
						<div className="scpost-date">
							{blog['date']}
						</div>
						<div className="scpost-description" dangerouslySetInnerHTML={{ __html: blog['description'] }}>
						</div>
						<p><br/><br/></p>
						<div className='scblogheader'>
							<div className='gbutton' onClick={onClick}>
								Back to blogs
							</div>
						</div>
					</>
					) : null
				}
				<br/><br/>
			</div>
		</div>
	);
};


export default SCBlogCard;
