import Navbar from "../Navbar";
import BlogCard from "../BlogCard";
import Footer from "./Footer";
import React from "react";
import ScrollAnimation from "react-animate-on-scroll";
import { motion } from "framer-motion";


export const Publications = () => {
	return (
			<section id="blogging" className="blogging section is-medium">
				<div className="blogging-container">
					<motion.div whileInView={{ opacity: 1}} initial={{ opacity: 0}} animate={{ opacity: 1}} transition={{ease: "linear", duration: 1.5}}>
						<h1>Publications</h1>
					</motion.div>
					<br/>
					<motion.div initial={{ opacity: 0, scale: 0.99}} animate={{ opacity: 1, scale:1}} transition={{ease: "linear", duration: 1.5}}>
						<p className="description"><b>
							A collection of my thoughts on science, technology, AI and the world of finance.
						</b></p><br/>
					</motion.div>
					<div style={{ display: 'flex', justifyContent: 'center', width: '60vw' }}>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<div className="button">
							<a href="https://medium.com/@subhayuchakravarty7" rel="noreferrer"> Medium Blogs
							</a>
							</div>
						</div>
					</div><br/><br/><br/><br/>
					<div className="columns">
						<div className="column is-multiline is-6">
							<motion.div
							initial={{ opacity: 0.7}} animate={{ opacity: 1}} transition={{ease: "linear", duration: 2.5, delay: 6}}>
								<BlogCard id="Wildfire_Prediction"/><br/><br/>
								<BlogCard id="Adversarial_Attack"/><br/><br/>
							</motion.div>
						</div>
					</div>
				</div>
			</section>
	);
};

export default Publications;