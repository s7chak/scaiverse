import React, { RefObject } from "react";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import appConfig from "../appConfig.json";
import { motion } from "framer-motion";
import TechStack from "../things/TechStack";
import TimeLineGraph from "../things/TimeLineGraph";

export const AboutMe = () => {
	let about_text = appConfig["About"]["text"];
	return (
		<section id="about" className="about section is-medium">
			<div className="about-container container">
			<br/><br/>
				<TimeLineGraph /><br/>
				<h1 className="title">About</h1>
				{/* <div className="columns">
					<div className="column is-10"> */}
						<motion.div className="about-description"
							initial={{ opacity: 0}} animate={{ opacity: 1}} transition={{ duration: 3}}>
							<p>{about_text} </p>
							<br />I have been programming for about <span className="blue-text">8 years</span> now.
							<br />
							<span>This is my current tech stack:</span>
						</motion.div><br/>
						<TechStack />		
						<br />
			</div>
		</section>
	);
};

export default AboutMe;


// I am an Engineer at heart.<br/>
// I am a technologist and have been a system-builder all my life. As a child I enjoyed opening things up, prying open table fans, digital clocks and the first CPU I laid hands on(thankfully reassembling it). Studying technology gave me an intuition for how systems work. To start off, I developed tic-tac-toe, sudoku and my version of minesweeper on a Windows 95 machine. To dive deeper I cracked the toughest entrance exam in my country and enrolled in a Manufacturing Engineering course at India’s top institute as it had a healthy mix of traditional engineering with robotics and AI.<br/>

// Being an artist with my pencil-sketching and composing on the guitar and ukulele, I found coding in Java quite a similar endeavor. This combined with a growing passion for the stock market's ups and downs drove me toward a software engineering position at Asia's largest equities brokerage firm. This is where I explored trade-flow, capital markets, algorithmic-trading on the functional side while optimizing the data systems in their back-office, transforming legacy technologies and implementing micro-services architecture and cloud-native solutions.<br/>

// I am a problem-solver, which I feel is an obvious attribute of any engineer. But the aspect of the problems I have solved that I cherish the most is not just the elegance of the solution but their impact. I don’t just want to solve problems, I wish to help the maximum number of people in the process of doing so. <br/>

// Having graduated from a Master's course in Information Systems, I am now currently employed in an exciting role in the nexus of software engineering, machine learning and AI applied in the world of finance.<br/>
