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
				<motion.div 
						initial={{ opacity: 0 }}
						transition={{ duration: 2, delay: 2}}
						onClick={() => setIsActive(!isActive)}
						animate={{
							opacity: 1,
							rotate: !isActive ? 0 : 360
						}}>
						<img className='s7img main' src="/files/s2.png"></img>
						<img className='s7img glow' src="/files/s2.png"></img>
				</motion.div>
				<a
					onClick={() => {
						setIsActive(!isActive);
					}}
					role="button"
					className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
					aria-label="menu"
					aria-expanded="false"
					data-target="navbar-menu">
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</a>
			</div>
			<div id="navbar-menu" className={`navbar-menu ${isActive ? "is-active" : ""}`}>
				<motion.div className="navbar-start" initial={{ opacity: 0}} animate={{ opacity: 1 }} transition={{ease: "linear", duration: 1.5, delay: 3.5}}>
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
				</motion.div>
				<div className="navbar-right">
					<motion.a href="mailto:s7chak@gmail.com" className="button btn-alt" 
					initial={{ opacity: 0}} animate={{ opacity: 1 }} transition={{ease: "linear", duration: 1, delay: 4}}>
						<FaEnvelope size={18} style={{ marginRight: '0' }} />
					</motion.a>
					<motion.a href="https://www.linkedin.com/in/subhayuchakravarty" target="_blank" className="button btn-alt"
					initial={{ opacity: 0}} animate={{ opacity: 1 }} transition={{ease: "linear", duration: 1, delay: 4.5}}>
						<FaLinkedin size={18} style={{ margin: '0' }} />
					</motion.a>
					<motion.a href="https://github.com/s7chak" target="_blank" className="button btn-alt"
					initial={{ opacity: 0}} animate={{ opacity: 1 }} transition={{ease: "linear", duration: 1, delay: 5}}>
						<FaGithub size={18} style={{ marginRight: '0' }} />
					</motion.a>
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
			</div>
		</nav>
	);
};

export default Navbar;
