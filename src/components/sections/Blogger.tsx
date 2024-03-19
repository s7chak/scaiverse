import Navbar from "../Navbar";
import BlogCard from "../BlogCard";
import Footer from "./Footer";
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";


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


export const Blogger = () => {
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
			<section id="my-blogger" className="blogging section is-medium">
				<div className="blogging-container">
					<motion.div whileInView={{ opacity: 1}} initial={{ opacity: 0}} animate={{ opacity: 1}} transition={{ease: "linear", duration: 1.5}}>
						<span className="general-header">Thought Tank</span>
					</motion.div>
					<br/>
					<motion.div initial={{ opacity: 0, scale: 0.99}} animate={{ opacity: 1, scale:1}} transition={{ease: "linear", duration: 1.5}}>
						<span>
							A collection of my thoughts on anything that piques my interest</span><br/><br/>
					</motion.div>
					<div className={`my-blog-cards ${isMobile ? "mobile" : ""}`} ref={blogCardsRef}>
						<div className="blog-slider snaps">
							<BlogCard id="Learner_Manifesto" mine={true}/>
							<BlogCard id="" mine={true}/>
						</div>
					</div>
				</div>
			</section>
	);
};

export default Blogger;