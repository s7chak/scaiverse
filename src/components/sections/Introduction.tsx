import ScrollAnimation from "react-animate-on-scroll";
import { Link } from "react-scroll";
import { FaLinkedin, FaGithub, FaCloudDownloadAlt } from 'react-icons/fa';
import { motion, useMotionValue, useTransform } from "framer-motion"
import React, { useCallback, useEffect, useState } from "react";

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
								<br/><br/><br/><br/>
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
										<div className="button" style={{"width":"141px"}}>
										<a href="./files/Resume.pdf" rel="noreferrer" download="Resume_Subhayu_Chakravarty.pdf">
										<FaCloudDownloadAlt size={20} style={{ marginRight: '7px'}} /> Résumé
										</a>
										</div>
									</div>
									
									<div style={{ display: 'flex', alignItems: 'center' }}>
										{/* <Link to="https://www.linkedin.com/subhayu.chakravarty"> */}
										<div className="button" style={{"width":"141px"}}>
										<FaLinkedin size={20} style={{ marginRight: '7px' }} />
										<a href="https://www.linkedin.com/in/subhayuchakravarty" target="_blank" rel="noopener noreferrer"> LinkedIn
										</a>
										</div>
										{/* </Link> */}
									</div>
									<div style={{ display: 'flex', alignItems: 'center' }}>
										{/* <Link to="https://github.com/s7chak"> */}
										<div className="button" style={{"width":"142px"}}>
										<FaGithub size={20} style={{ marginRight: '7px' }} />
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

function multiply(no: number) {
	console.log(no.toString())
	return <motion.div className="miniball"
			animate={{ opacity:1, x: 0, y: 0, '--rotate': '60deg'} as any} 
			transition={{ease: "linear", duration: 4, delay: 1}}
			></motion.div>
}


function Playback() {
	const [isActive, setIsActive] = React.useState(false);
	const mountainCount = 24;
	const mountains = Array.from({ length: mountainCount }, (_, index) => (
		<div key={index} className="mountain" />
	));
	const [showDefinition, setShow] = useState(false);
	const divestyle = {
		zIndex: '5'
		// :hover {
		// 	filter: 'blur(1px)',
		// }
	};
	const transition = { duration: 5, yoyo: Infinity, ease: "easeIn" };

	return (
	  <section className="playback" id="play_home">
		<div className="play-container">
			{mountains}
		</div>
		<div className="play-intro-container">
			<motion.div initial={{ opacity: 0, y: -100, }} animate={{ opacity: 1, y: -100	}} transition={{ease: "linear", duration: 3, delay: 0.5}}>
				<h2 onClick={() => setShow(false)}>Welcome</h2>
			</motion.div>
			<motion.div initial={{ opacity: 0, y: -10}} animate={{ opacity: 1, y: -30}} transition={{ease: "linear", duration: 2.5, delay: 2.5}}>
				<h1 onClick={() => setShow(true)}>My name is <span className="name-text">Subhayu</span></h1>
			</motion.div>
			<motion.div initial={{ opacity: 0, y: 60	}} animate={{ opacity: 1, y: 60}} transition={{ease: "linear", duration: 2, delay: 6}}>
				<Link to="introduction" style={divestyle} smooth={true}>Let's dive in.</Link>
			</motion.div>

			<motion.div 
				// initial={{ opacity: 0, x: -80, y: -100	}}
				// animate={{ opacity:1, x: -80, y: -100, rotate: [0, 100, 200, 360, 420]}} 
				// transition={{ease: "linear", duration: 4, delay: 1}}
				initial={{ opacity: 0, x:-200, y: 0, offsetDistance: "0%" }}
        		animate={{ opacity: 1, offsetDistance: "100%"}}
				transition={transition}
				drag
				dragConstraints={{top: -50,left: -50,right: 50,bottom: 50,}}
				className="ball"
			/>


		</div>
		<div>{ showDefinition ? 
		<motion.div
				initial={{ opacity: 0, offsetDistance: "0%" }}
        		animate={{ offsetDistance: "100%"}}
				transition={transition}
				drag
				dragConstraints={{top: -50,left: -50,right: 50,bottom: 50,}}
				className="miniball"/> : null }</div>
		<div>
			{ showDefinition ? <MyDefinition /> : null }
		</div>
	  </section>
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
	const roles = ['developer','engineer','problem solver','designer','coder','artist'];
	const vowelRegex = '^[aieouAIEOU].*';
	const [newName, setnewName] = useState("");
    const shuffle = useCallback(() => {
        const index = Math.floor(Math.random() * roles.length);
		let prefix = roles[index].match(vowelRegex)?'an' : 'a';
        setnewName(prefix+' '+roles[index]);
    }, []);

    useEffect(() => {
        const intervalID = setInterval(shuffle, 3000);
        return () => clearInterval(intervalID);
    }, [shuffle])



	return <FadeInWhenVisible>
		<motion.div initial={{y:240}} transition={{ease: "linear", duration: 2}}>
			<div className="definitions">I am <span className="blue-text">{newName}</span></div>
		</motion.div>
	</FadeInWhenVisible>
  }
  
export default Introduction;
