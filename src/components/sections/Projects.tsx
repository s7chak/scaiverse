import { motion } from "framer-motion";
import ProjectCard from "../ProjectCard";
import { useRef } from "react";
import { useInView } from "react-intersection-observer";



function FadeInWhenVisible({ children }) {
	const [ref, inView] = useInView({
		triggerOnce: false,
	  });
	return (
		<motion.div
		ref={ref}
        initial={{ opacity: 0 , y: 30}}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20}}
        transition={{ duration: 2 }}
		>
		{children}
	  </motion.div>
	);
}

export const Projects = () => {
	return (
		<section id="projects" className="projects section is-medium">
			<div className="projects-container">
				<motion.div 
				initial={{opacity:0}}
				animate={{opacity:1}} transition={{ duration: 2 }}><h1>Projects</h1></motion.div>
				<div className="columns">
				<section id="software" className="projects section is-medium">
					<FadeInWhenVisible><div><h2>Software Engineering</h2></div></FadeInWhenVisible>
					<div>
					<FadeInWhenVisible><ProjectCard username="s7chak" repository="s7chak.github.io" /></FadeInWhenVisible>
					<FadeInWhenVisible><ProjectCard username="s7chak" repository="soccerhours_phase2_flask" /></FadeInWhenVisible>
					<FadeInWhenVisible><ProjectCard username="s7chak" repository="soccerhours_phase3_app" /></FadeInWhenVisible>
					<FadeInWhenVisible><ProjectCard username="s7chak" repository="emprewards" /></FadeInWhenVisible>
					<FadeInWhenVisible><ProjectCard username="s7chak" repository="eLiqSys" /></FadeInWhenVisible>
					</div>
					
				</section>
				<section id="machine-learning" className="projects section is-medium">
					<FadeInWhenVisible><div><h2>Machine Learning</h2></div></FadeInWhenVisible>
					<div>
						<FadeInWhenVisible><ProjectCard username="s7chak" repository="4DByD" /></FadeInWhenVisible>
						<FadeInWhenVisible><ProjectCard username="s7chak" repository="vision-api-app" /></FadeInWhenVisible>
					</div>
				</section>
				</div>
			</div><br/><br/>
		</section>
	);
};

export default Projects;
