import { motion } from "framer-motion"
import { useState } from "react";
import { Link } from "react-scroll";

export const Navbar = () => {
	const [isActive, setIsActive] = useState(false);
	const delays = [2,3.5,5.5,6];
	return (
		<nav className="navbar is-fixed-top" role="navigation">
			<div className="navbar-brand">
				<a
					onClick={() => {
						setIsActive(!isActive);
					}}
					role="button"
					className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
					aria-label="menu"
					aria-expanded="false"
					data-target="navbar-menu"
				>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</a>
			</div>
			<motion.div id="navbar-menu" className={`navbar-menu ${isActive ? "is-active" : ""}`}
			initial={{ opacity: 0}} animate={{ opacity: 1 }} transition={{ease: "linear", duration: 1.2, delay: delays[3]}}>
				<div className="navbar-start">
					<Link to="introduction" smooth={true} className="navbar-item">
						Home
					</Link>
					<Link to="about" smooth={true} className="navbar-item">
						About
					</Link>
					<Link to="projects" smooth={true} className="navbar-item">
						Projects
					</Link>
					<Link to="blogging" smooth={true} className="navbar-item">
						Publications
					</Link>
				</div>
			</motion.div>
		</nav>
	);
};

export default Navbar;
