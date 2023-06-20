import { motion } from "framer-motion"
import { Children, useRef, useState } from "react";
import { FaBlog, FaCode, FaEnvelope, FaGithub, FaHome, FaLinkedin, FaMoon, FaPaperPlane, FaRobot, FaTree } from "react-icons/fa";
import { Link } from "react-scroll";

export const Navbar = (props) => {
	const [isActive, setIsActive] = useState(false);
	const delays = [2,3.5,5.5,7];
	const [width, setWidth] = useState<number>(window.innerWidth);
	const isMobile = width <= 768;
	return (
		<nav className={`navbar ${isMobile ? "mobile" : "is-fixed-top"}`} role="navigation">
			<div className={`s7logo ${isMobile ? "s7logo is-burger" : ""}`}>
				<MyLogo />
			</div>
			<div className="navbar-brand">
				<a
					onClick={() => {
						setIsActive(!isActive);
					}}
					role="button"
					className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
					aria-label="menu"
					aria-expanded="false"
					data-target="navbar-phone-menu">
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</a>
			</div>
			{isMobile && isActive &&
			<div id="navbar-phone-menu" className={`navbar-phone-menu ${isActive ? "is-active" : ""}`}>
				<motion.div className="navbar-start is-burger"
				initial={{ y: "-100%" }}
				animate={{ y: 25 , z:10}}
				transition={{ ease: "linear", duration: 0.6 }}>
					<Link to="introduction" smooth={true} className="navbar-item" onClick={() => setIsActive(false)}>
						<FaHome size={18} style={{ marginRight: '0' }}/>
					</Link>
					{/* <div>
						<FaMoon size={18} style={{ marginRight: '0' }} onClick={props.changeTheme}/>
					</div> */}
					<Link to="about" smooth={true} className="navbar-item" onClick={() => setIsActive(false)}>
						<FaRobot size={18} style={{ marginRight: '0' }}/>
					</Link>
					<Link to="projects" smooth={true} className="navbar-item" onClick={() => setIsActive(false)}>
						<FaCode size={18} style={{ marginRight: '0' }}/>
					</Link>
					<Link to="blogging" smooth={true} className="navbar-item" onClick={() => setIsActive(false)}>
						<FaPaperPlane size={18} style={{ marginRight: '0' }}/>
					</Link>
					<Link to="mailto:s7chak@gmail.com" smooth={true} className="navbar-item" onClick={() => setIsActive(false)}>
						<FaEnvelope size={18} style={{ marginRight: '0' }} /></Link>
					<Link to="https://www.linkedin.com/in/subhayuchakravarty" smooth={true} className="navbar-item">
						<FaLinkedin size={18} style={{ margin: '0' }} /></Link>
					<Link to="https://github.com/s7chak" smooth={true} className="navbar-item">
						<FaGithub size={18} style={{ marginRight: '0' }} /></Link>
				</motion.div>
			</div>}
			{!isActive && (
			<div id="navbar-menu is-fixed-top" className={`navbar-menu ${isActive ? "is-active" : ""}`}>
				<motion.div className={`navbar-start ${isActive ? "navbar-start is-burger" : ""}`} initial={{ opacity: 0}} animate={{ opacity: 1 }} transition={{ease: "linear", duration: 2, delay: 3}}>
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
						Articles
					</Link>
				</motion.div>
				<div className="navbar-right">
					{/* <motion.a  className="button btn-alt" 
					initial={{ opacity: 0}} animate={{ opacity: 1 }} transition={{ease: "linear", duration: 1, delay: 1}}>
						<FaTree size={18} style={{ marginRight: '0' }} onClick={props.changeTheme}/>
					</motion.a> */}
					<motion.a href="mailto:s7chak@gmail.com" className="button btn-alt" 
					initial={{ opacity: 0}} animate={{ opacity: 1 }} transition={{ease: "linear", duration: 1, delay: 3}}>
						<FaEnvelope size={18} style={{ marginRight: '0' }} />
					</motion.a>
					<motion.a href="https://www.linkedin.com/in/subhayuchakravarty" target="_blank" className="button btn-alt"
					initial={{ opacity: 0}} animate={{ opacity: 1 }} transition={{ease: "linear", duration: 1, delay: 3.5}}>
						<FaLinkedin size={18} style={{ margin: '0' }} />
					</motion.a>
					<motion.a href="https://github.com/s7chak" target="_blank" className="button btn-alt"
					initial={{ opacity: 0}} animate={{ opacity: 1 }} transition={{ease: "linear", duration: 1, delay: 4}}>
						<FaGithub size={18} style={{ marginRight: '0' }} />
					</motion.a>
				</div>
			</div>
			)}
		</nav>
	);
};

function buttonLift({ children }) {
	return (
	 <motion.div initial={{ opacity: 0}} animate={{ opacity: 1 }} transition={{ease: "linear", duration: 1, delay: 3}}>
		{children}
	 </motion.div>
	)
}



function MyLogo() {
	const [isPlaying, setIsPlaying] = useState(false);
	const toggleAudio = () => {
		setIsPlaying(!isPlaying);
	};
	return (
		<motion.div
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		transition={{ duration: 2, delay: 2}}>
			{isPlaying ? (
				<audio
				src="assets/storm-clouds-purpple-cat.mp3"
				autoPlay
				// controls
				onEnded={() => setIsPlaying(false)}
				/>
			) : null}
			<img className='s7img main' src="assets/files/s2.png" onClick={toggleAudio}></img>
			<img className='s7img glow' src="assets/files/s2.png"></img>
		</motion.div>
	);
}

export default Navbar;
