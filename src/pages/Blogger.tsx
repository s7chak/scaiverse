import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import Footer from "../components/sections/Footer";
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
	const [theme, setTheme] = useState("dark");
	const [width, setWidth] = useState<number>(window.innerWidth);
	const isMobile = width <= 768;
	const blogCardsRef = useRef(null);
	return (
			<div id={theme} className="blogging section is-medium">
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
						<div className="post-window">
							<BlogCard id="Learner_Manifesto" mine={true}/>
						</div>
					</div>
				</div>
			</div>
	);
};

export default Blogger;