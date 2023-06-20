import Navbar from "../Navbar";
import BlogCard from "../BlogCard";
import Footer from "./Footer";
import React from "react";
import ScrollAnimation from "react-animate-on-scroll";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";


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
	return (
			<section id="blogging" className="blogging section is-medium">
				<div className="blogging-container">
					<motion.div whileInView={{ opacity: 1}} initial={{ opacity: 0}} animate={{ opacity: 1}} transition={{ease: "linear", duration: 1.5}}>
						<h1>Articles</h1>
					</motion.div>
					<br/>
					<motion.div initial={{ opacity: 0, scale: 0.99}} animate={{ opacity: 1, scale:1}} transition={{ease: "linear", duration: 1.5}}>
						<p className="description"><b>
							A collection of my thoughts on science, technology, AI and the world of finance.
						</b></p><br/>
					</motion.div>
					<div style={{ display: 'flex', justifyContent: 'center', width: '60vw' }}>
						<motion.div style={{ display: 'flex', alignItems: 'center' }}
							initial={{ opacity: 0, scale: 0.8}} animate={{ opacity: 1, scale:1}} transition={{ease: "linear", duration: 2}}
							>
							<div className="button">
							<a href="https://medium.com/@subhayuchakravarty7" rel="noreferrer"> Medium Blogs
							</a>
							</div>
						</motion.div>
					</div><br/><br/><br/><br/>
					<div className="columns">
						<div className="column is-multiline is-6">
						<FadeInWhenVisible>
								<BlogCard id="Wildfire_Prediction"/><br/><br/>
								<BlogCard id="Adversarial_Attack"/><br/><br/>
						</FadeInWhenVisible>
						</div>
					</div>
				</div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
			</section>
	);
};

export default Publications;