import Navbar from "../Navbar";
import BlogCard from "../BlogCard";
import Footer from "./Footer";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-scroll";


function FadeInWhenVisible({ children }) {
	const [ref, inView] = useInView({
		triggerOnce: false,
	  });
	return (
		<motion.div
		ref={ref}
        initial={{ opacity: 0 , y: 30}}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20}}
        transition={{ duration: 2 }}
		>
		{children}
	  </motion.div>
	);
}


export const Publications = () => {
	const [width, setWidth] = useState<number>(window.innerWidth);
	const isMobile = width <= 768;
	const blogCardsRef = useRef(null);
	const scrollToBlogCard = (id) => {
		const blogCard = document.getElementById(id);
		if (blogCard && blogCardsRef.current) {
			const offsetLeft = blogCard.offsetLeft;
			console.log(offsetLeft);
			// blogCardsRef.current.scrollLeft = offsetLeft;
		}
	  };
	return (
			<section id="blogging" className="blogging section is-medium">
				<div className="blogging-container">
					<motion.div whileInView={{ opacity: 1}} initial={{ opacity: 0}} animate={{ opacity: 1}} transition={{ease: "linear", duration: 1.5}}>
						<span className="general-header">Articles</span>
					</motion.div>
					<br/>
					<motion.div initial={{ opacity: 0, scale: 0.99}} animate={{ opacity: 1, scale:1}} transition={{ease: "linear", duration: 1.5}}>
						<span>
							A collection of my thoughts on technology, design and their applications.</span><br/><br/>
					</motion.div>
					<div style={{ display: 'flex', justifyContent: 'center', width: '60vw' }}>
						<motion.div style={{ display: 'flex', alignItems: 'center' }}
							initial={{ opacity: 0, scale: 0.8}} animate={{ opacity: 1, scale:1}} transition={{ease: "linear", duration: 2}}
							>
							<div className="gbutton">
							<a href="https://medium.com/@scaiverse/list/written-88aabe3d3413" target="_blank" rel="noopener noreferrer"> Medium Blogs
							</a>
							</div>
							<div className="gbutton" style={{marginRight:'1em'}}>
								<Link to={"my-blogger"} >Blogs</Link>
							</div>
						</motion.div>
						
					</div>
					<div className={`blog-cards ${isMobile ? "mobile" : ""}`} ref={blogCardsRef}>
						<div className="blog-slider snaps">
							<BlogCard id="Wildfire_Prediction" mine={false}/>
							<BlogCard id="Adversarial_Attack" mine={false}/>
							<BlogCard id="" mine={false}/>
						</div>
					</div>
				</div>
			</section>
	);
};

export default Publications;