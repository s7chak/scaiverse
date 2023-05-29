import ScrollAnimation from "react-animate-on-scroll";
import { Link } from "react-scroll";
import { FaLinkedin, FaGithub, FaCloudDownloadAlt } from 'react-icons/fa';
import { motion, useMotionValue, useTransform } from "framer-motion"

export const Introduction = () => {
	// const x = useMotionValue(0)
	// const opacity = useTransform(x, [-100, 0, 100], [0, 1, 0])
	const delays = [2,3.5,5.5,6];
	return (
		<section id="introduction" className="introduction section is-medium">
			<div className="introduction-container container">
				<div className="columns">
					<div className="column is-12">
							<div className="content" style={{ textAlign: "center" }}>
								<motion.div initial={{ opacity: 0, scale: 0.9}} animate={{ opacity: 1, scale: 1 }} transition={{ease: "linear", duration: delays[0]}}
									whileHover={{scale: 1.2, transition: { duration: 2 },}}>
								<h1 className="title">
									<span className="blue-text"><b>Code Canvas</b></span>
								</h1>
								</motion.div>
								<br/>
								<motion.div initial={{ opacity: 0, y: 10}} animate={{ opacity: 1, y: 0 }} transition={{ease: "linear", duration: delays[1] - delays[0], delay: delays[0]}}>
									<p className="name-description"><b>Hi, my name is <span className="blue-text">Subhayu</span></b><br/><br/></p>
								</motion.div>
								<motion.div initial={{ opacity: 0, y: 10}} animate={{ opacity: 1, y: 0}} transition={{ease: "linear", duration: delays[2] - delays[1], delay: delays[1]}}>
									And this is a repository of some of my projects, their source code, how it works, how they were built<br/>
									<p>and the story behind them.</p>
								</motion.div>
								<br/><br/><br/><br/>
								<motion.div style={{ display: 'flex', justifyContent: 'center' }}
									initial={{ opacity: 0}} animate={{ opacity: 1}} transition={{ease: "linear", duration: delays[3] - delays[2], delay: delays[3]}}>
									<div style={{ display: 'inline-block', margin: '0 8px' }}>
									<Link to="software" style={{ textDecoration: 'none' }}> 
										<div className="button">
											<p className="reg-text">Software Engineering</p>
										</div>
										</Link>
									</div>
									<div style={{ display: 'inline-block', margin: '0 8px' }}>
									<Link to="machine-learning" style={{ textDecoration: 'none' }}> 
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
	);
};

export default Introduction;
