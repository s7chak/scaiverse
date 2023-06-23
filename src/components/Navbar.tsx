import { motion } from "framer-motion"
import { Children, useRef, useState } from "react";
import { FaBars, FaBlog, FaCode, FaEnvelope, FaGithub, FaHome, FaICursor, FaInfo, FaLinkedin, FaMoon, FaNewspaper, FaPaperPlane, FaRobot, FaTree } from "react-icons/fa";
import { Link } from "react-scroll";
import { GrMenu } from 'react-icons/gr';

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
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 2, delay: 4}} className="navbar-brand">
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
			</motion.div>
			{isMobile && isActive &&
			<div id="navbar-phone-menu" className={`navbar-phone-menu ${isActive ? "is-active" : ""}`}>
				<motion.div className="navbar-start is-burger"
				initial={{ y: "50%", opacity: 0, z:0}}
				animate={{ y: "50%" , opacity: 1}}
				transition={{ ease: "linear", duration: 0.6 }}>
					<Link to="introduction" smooth={true} className="navbar-item" onClick={() => setIsActive(false)}>
						<FaHome size={18} style={{ marginRight: '0' }}/>
					</Link>
					{/* <div>
						<FaMoon size={18} style={{ marginRight: '0' }} onClick={props.changeTheme}/>
					</div> */}
					<Link to="about" smooth={true} className="navbar-item" onClick={() => setIsActive(false)}>
						<FaInfo size={18} style={{ marginRight: '0' }}/>
					</Link>
					<Link to="projects" duration={1000} smooth={true} className="navbar-item" onClick={() => setIsActive(false)}>
						<FaCode size={18} style={{ marginRight: '0' }}/>
					</Link>
					<Link to="blogging" smooth={true} duration={1500} className="navbar-item" onClick={() => setIsActive(false)}>
						<FaNewspaper size={18} style={{ margin: '0' }} /></Link>
					<Link to="https://www.linkedin.com/in/subhayuchakravarty" smooth={true} className="navbar-item">
						<FaLinkedin size={18} style={{ margin: '0' }} /></Link>
					<Link to="https://github.com/s7chak" smooth={true} className="navbar-item">
						<FaGithub size={18} style={{ marginRight: '0' }} /></Link>
					<Link to="messaging" smooth={true} duration={2000} className="navbar-item" onClick={() => setIsActive(false)}>
						<FaPaperPlane size={18} style={{ marginRight: '0' }}/>
					</Link>
				</motion.div>
			</div>}
			{!isMobile && (
			<div id="navbar-menu is-fixed-top" className={'navbar-menu'}>
				<motion.div className={"navbar-start"} initial={{ opacity: 0}} animate={{ opacity: 1 }} transition={{ease: "linear", duration: 1, delay: 3}}>
					<Link to="introduction" smooth={true} className="navbar-item">
						Home
					</Link>
					<Link to="about" smooth={true} className="navbar-item">
						About
					</Link>
					<Link to="projects" smooth={true} duration={1000} className="navbar-item">
						Projects
					</Link>
					<Link to="blogging" smooth={true} duration={1500} className="navbar-item">
						Articles
					</Link>
				</motion.div>
				<motion.div className="navbar-right"
					initial={{ y: "10%", opacity: 0}}
					animate={{ y: 5, x: 2, opacity: 0.9}}
					transition={{ ease: "linear", duration: 2, delay: 4  }}>
					<FaBars style={{color: '#efefef'}} onClick={() => {
							setIsActive(!isActive);}} data-target="navbar-my-menu">
					</FaBars>
				</motion.div>
				<motion.div id="navbar-my-menu" className={`navbar-my-menu ${isActive ? "is-active" : ""}`}
					initial={{ y: "5%", opacity: 0}}
					animate={{ y: "5%" , opacity: isActive? 1 : 0}}
					transition={{ ease: "linear", duration: 1.5 }}>
					<Link to="introduction" smooth={true} className="navbar-item" onClick={() => setIsActive(false)}>
						<FaHome size={18} style={{ marginRight: '0' }}/>
					</Link>
					<div>
						<FaMoon size={18} style={{ marginRight: '0' }} onClick={props.changeTheme}/>
					</div>
					<Link to="about" smooth={true} className="navbar-item" onClick={() => setIsActive(false)}>
						<FaInfo size={18} style={{ marginRight: '0' }}/>
					</Link>
					<Link to="projects" smooth={true} duration={1000} className="navbar-item" onClick={() => setIsActive(false)}>
						<FaCode size={18} style={{ marginRight: '0' }}/>
					</Link>
					<Link to="blogging" duration={1500} smooth={true} className="navbar-item" onClick={() => setIsActive(false)}>
						<FaNewspaper size={18} style={{ margin: '0' }} /></Link>
					<Link to="https://www.linkedin.com/in/subhayuchakravarty" smooth={true} className="navbar-item">
						<FaLinkedin size={18} style={{ margin: '0' }} /></Link>
					<Link to="https://github.com/s7chak" smooth={true} className="navbar-item">
						<FaGithub size={18} style={{ marginRight: '0' }} /></Link>
					<Link to="messaging" duration={2000} smooth={true} className="navbar-item" onClick={() => setIsActive(false)}>
						<FaPaperPlane size={18} style={{ marginRight: '0' }}/>
					</Link>
				</motion.div>
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
		transition={{ duration: 2, delay: 4}}>
			{isPlaying ? (
				<audio
				src="assets/storm-clouds-purpple-cat.mp3"
				autoPlay
				// controls
				onEnded={() => setIsPlaying(false)}
				/>
			) : null}
			<img className='s7img main' src="assets/files/s2.png" onClick={toggleAudio}></img>
			<img className='s7img glow' src="assets/files/s2.png" onClick={toggleAudio}></img>
		</motion.div>
	);
}

export default Navbar;
