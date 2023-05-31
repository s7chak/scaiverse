import ProjectCard from "../ProjectCard";

export const Projects = () => {
	return (
		<section id="projects" className="projects section is-medium">
			<div className="projects-container">
				<h1>Projects</h1>
				<div className="columns">
				<section id="software" className="projects section is-medium">
					<div><h2>Software Engineering</h2></div>
					<div className="column is-multiline is-20">
						<ProjectCard username="s7chak" repository="s7chak.github.io" />
						<ProjectCard username="s7chak" repository="soccerhours_phase2_flask" />
						<ProjectCard username="s7chak" repository="soccerhours_phase3_app" />
						<ProjectCard username="s7chak" repository="emprewards" />
						<ProjectCard username="s7chak" repository="eLiqSys" />
					</div>
				</section>
				<section id="machine-learning" className="projects section is-medium">
					<div><h2>Machine Learning</h2></div>
					<div className="column is-multiline is-20">
						<ProjectCard username="s7chak" repository="4DByD" />
						<ProjectCard username="s7chak" repository="vision-api-app" />
					</div>
				</section>
				</div>
			</div>
		</section>
	);
};

export default Projects;
