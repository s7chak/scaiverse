import ScrollAnimation from "react-animate-on-scroll";
import { Link } from "react-scroll";
import { FaLinkedin, FaGithub, FaCloudDownloadAlt } from 'react-icons/fa';
import { motion, useMotionValue, useTransform } from "framer-motion"
import React, { useState } from "react";

export const Introduction = () => {
	// const x = useMotionValue(0)
	// const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0])
	const delays = [2,3.5,5.5,6];
	return (
		<div>
			<Playback />
			<section id="introduction" className="introduction section is-medium">
				<div className="introduction-container container">
					<div className="columns">
						<div className="column is-12">
							<div className="content" style={{ textAlign: "center" }}>
								<motion.div 
									// initial={{ opacity: 0, scale: 0.9}} animate={{ opacity: 1, scale: 1 }} 
									transition={{ease: "linear", duration: delays[0]}}
									whileHover={{scale: 1.3, transition: { duration: 2 },}}
									initial="hidden"
      								whileInView={{scale: 1.1, transition: { duration: 2 },}}
      								viewport={{ once: true }}>
								<h2 className="title">
									<span className="blue-text"><b>This is my digital canvas</b></span>
								</h2>
								</motion.div>
								<br/>
								<motion.div initial={{ opacity: 0, y: 10}} animate={{ opacity: 1, y: 0}} transition={{ease: "linear", duration: delays[2] - delays[1], delay: delays[1]}}>
									A repository of some of my projects, their source code, how it works, how they were built<br/>
									<p>and the story behind them.</p>
								</motion.div>
								<br/><br/><br/><br/>
								<motion.div style={{ display: 'flex', justifyContent: 'center' }}
									initial={{ opacity: 0}} animate={{ opacity: 1}} transition={{ease: "linear", duration: delays[3] - delays[2], delay: delays[3]}}>
									<div style={{ display: 'inline-block', margin: '0 8px' }}>
									<Link to="software" smooth={true} style={{ textDecoration: 'none' }}> 
										<div className="button">
											<p className="reg-text">Software Engineering</p>
										</div>
										</Link>
									</div>
									<div style={{ display: 'inline-block', margin: '0 8px' }}>
									<Link to="machine-learning" smooth={true} style={{ textDecoration: 'none' }}> 
										<div className="button">
											<p className="reg-text">Machine Learning</p>
										</div>
									</Link>	
									</div>
								</motion.div>
								<br/><br/>
								<motion.div style={{ display: 'flex', justifyContent: 'center' }}
									initial={{ opacity: 0}} animate={{ opacity: 1}} transition={{ease: "linear", duration: delays[3] - delays[2], delay: delays[3]}}>
									<div style={{ display: 'flex', alignItems: 'center' }}>
										<div className="button" style={{"width":"150px"}}>
										<a href="./files/Resume.pdf" rel="noreferrer" download="Resume_Subhayu_Chakravarty.pdf">
										<FaCloudDownloadAlt size={20} style={{ marginRight: '8px'}} /> Résumé
										</a>
										</div>
									</div>
									
									<div style={{ display: 'flex', alignItems: 'center' }}>
										{/* <Link to="https://www.linkedin.com/subhayu.chakravarty"> */}
										<div className="button" style={{"width":"150px"}}>
										<FaLinkedin size={20} style={{ marginRight: '8px' }} />
										<a href="https://www.linkedin.com/in/subhayuchakravarty" target="_blank" rel="noopener noreferrer"> LinkedIn
										</a>
										</div>
										{/* </Link> */}
									</div>
									<div style={{ display: 'flex', alignItems: 'center' }}>
										{/* <Link to="https://github.com/s7chak"> */}
										<div className="button" style={{"width":"150px"}}>
										<FaGithub size={20} style={{ marginRight: '8px' }} />
										<a href="https://github.com/s7chak" rel="noopener noreferrer">
											GitHub
										</a>
										</div>
										{/* </Link> */}
									</div>
									{/* <div style={{ display: 'flex', alignItems: 'center' }}>
									<div className="button" style={{"width":"150px"}}>
										<a href={publicationURL} rel="noopener noreferrer">
										<Link to='/publications'>
										<FaRobot size={20} style={{ marginRight: '8px' }} />
											Blog
										</Link>
										</a>
										</div>
									</div> */}

								</motion.div>
								{/* <Link to="about" smooth={true} className="button">
									<span>Go</span>
								</Link> */}
								<br/><br/><br/><br/><br/><br/><br/>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};


function Playback() {
	const [isActive, setIsActive] = React.useState(false);
	const mountainCount = 24;
	const mountains = Array.from({ length: mountainCount }, (_, index) => (
		<div key={index} className="mountain" />
	));
	const [showDefinition, setShow] = useState(false);
	return (
	  <div className="playback">
		<motion.div initial={{ opacity: 0, y: 680, }} animate={{ opacity: 0.95, y: 680	}} transition={{ease: "linear", duration: 3, delay: 0.4}}>
			<h2 onClick={() => setShow(!showDefinition)}>Welcome</h2>
		</motion.div>
		<motion.div initial={{ opacity: 0, y: 760	}} animate={{ opacity: 0.9, y: 700	}} transition={{ease: "linear", duration: 2.5, delay: 3}}>
			<h1 onClick={() => setShow(!showDefinition)}>My name is <span className="blue-text">Subhayu</span></h1>
		</motion.div>
		<div className="play-container">
			{mountains}
		</div>
		<br/><br/><br/><br/>
		<motion.div className="reg-text" initial={{ opacity: 0, y: -800	}} animate={{ opacity: 1, y: -800}} transition={{ease: "linear", duration: 2, delay: 6}}>
				<p>
				<Link to="introduction" smooth={true} style={{ textDecoration: 'none' }}>Let's dive in.</Link>
				</p>
		</motion.div>
		<div>
			{ showDefinition ? <MyDefinition /> : null }
		</div>
	  </div>
	);
  }

  function FadeInWhenVisible({ children }) {
	return (
	  <motion.div
		initial="hidden"
		whileInView="visible"
		viewport={{ once: true }}
		transition={{ duration: 2 }}
		variants={{
		  visible: { opacity: 1, scale: 1 },
		  hidden: { opacity: 0, scale: 1 }
		}}
	  >
		{children}
	  </motion.div>
	);
  }


  function MyDefinition() {
	return <FadeInWhenVisible>
		<span className="definitions">I am a <span className="blue-text">coder</span></span>
	</FadeInWhenVisible>
  }
  
export default Introduction;
