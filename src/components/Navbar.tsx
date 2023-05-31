import { motion } from "framer-motion"
import { useState } from "react";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-scroll";

export const Navbar = () => {
	const [isActive, setIsActive] = useState(false);
	const delays = [2,3.5,5.5,7];
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
			<motion.div id="navbar-menu" className={`navbar-menu`}
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
				{/* <div style={{alignItems: "right"}}>
					<motion.div className="row is-2"
						initial={{ opacity: 0}} animate={{ opacity: 1}}>
						<a href="https://www.linkedin.com/in/subhayuchakravarty" target="_blank" className="button btn-alt">
							<FaLinkedin size={20} style={{ marginRight: '2px' }} />
						</a>
						<a href="https://github.com/s7chak" target="_blank" className="button btn-alt">
							<FaGithub size={20} style={{ marginRight: '2px' }} />
						</a>
						<a href="mailto:s7chak@gmail.com" className="button btn-alt">
							<FaEnvelope size={20} style={{ marginRight: '2px' }} />
						</a>
					</motion.div>
				</div> */}
			</motion.div>
		</nav>
	);
};

export default Navbar;
