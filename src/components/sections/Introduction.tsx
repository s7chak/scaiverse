import ScrollAnimation from "react-animate-on-scroll";
import { Link } from "react-scroll";
import { FaLinkedin, FaGithub, FaPaperPlane, FaCloudDownloadAlt } from 'react-icons/fa';
// import ResumeFile from "./Resume_Subhayu_Chakravarty_02-21.pdf" ;

export const Introduction = () => {
	return (
		<section id="introduction" className="introduction section is-medium">
			<div className="introduction-container container">
				<div className="columns">
					<div className="column is-12">
							<div className="content" style={{ textAlign: "center" }}>
								<ScrollAnimation animateIn="animate__slideInDown" animateOnce={true}>
								<h1 className="title">
									<span className="blue-text"><b>Code Canvas</b></span>
								</h1>
								</ScrollAnimation>
								<br/>
								<ScrollAnimation animateIn="animate__slideInUp" animateOnce={true}>
									<p className="description"><b>Hi, my name is Subhayu </b><br/> </p>
									And this is a repository of some of my projects, their source code, how it works, how they were built<br/>
									<p>and the story behind them.</p>
								</ScrollAnimation>
								<br/><br/><br/>
								<div style={{ display: 'flex', justifyContent: 'center' }}>
									<div style={{ display: 'inline-block', margin: '0 8px' }}>
									<Link to="software" style={{ textDecoration: 'none' }}> 
										<button style={{fontSize: "15px", width: '300px', background: 'none', color:"#fff", border: '2px solid #111', padding: '8px 16px', borderRadius: '4px' }}>
										<p className="description">Software Engineering</p>
										</button>
										</Link>
									</div>
									<div style={{ display: 'inline-block', margin: '0 8px' }}>
									<Link to="machine-learning" style={{ textDecoration: 'none' }}> 
										<button style={{ fontSize: "15px" ,width: '300px', background: 'none', color:"#fff", border: '2px solid #111', padding: '8px 16px', borderRadius: '4px' }}>
										<p className="description">Machine Learning</p>
										</button>
									</Link>	
									</div>
								</div>
								<br/>
								<br/>
								<div style={{ display: 'flex', justifyContent: 'center' }}>
									<div style={{ display: 'flex', alignItems: 'center' }}>
										<div className="button">
										<a href="./Resume.pdf" rel="noreferrer" download="Resume_Subhayu_Chakravarty.pdf">
										<FaCloudDownloadAlt size={20} style={{ marginRight: '8px' }} /> Résumé
										</a>
										</div>
									</div>
									
									<div style={{ display: 'flex', alignItems: 'center' }}>
										{/* <Link to="https://www.linkedin.com/subhayu.chakravarty"> */}
										<div className="button">
										<FaLinkedin size={20} style={{ marginRight: '8px' }} />
										<a href="https://www.linkedin.com/in/subhayuchakravarty" target="_blank" rel="noopener noreferrer"> LinkedIn
										</a>
										</div>
										{/* </Link> */}
									</div>
									<div style={{ display: 'flex', alignItems: 'center' }}>
										{/* <Link to="https://github.com/s7chak"> */}
										<div className="button">
										<FaGithub size={20} style={{ marginRight: '8px' }} />
										<a href="https://github.com/s7chak" target="_blank" rel="noopener noreferrer">
											GitHub
										</a>
										</div>
										{/* </Link> */}
									</div>
									<div style={{ display: 'flex', alignItems: 'center' }}>
									<div className="button">
										<a href="/blogs" rel="noopener noreferrer">
										<FaPaperPlane size={20} style={{ marginRight: '8px' }} />
											Blog
										</a>
										</div>
									</div>
								</div>
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
