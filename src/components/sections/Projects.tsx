import ProjectCard from "../ProjectCard";

export const Projects = () => {
	return (
		<section id="projects" className="projects section is-medium">
			<div className="projects-container">
				<h1>Projects</h1>
				<div className="rows">
				<section id="software" className="software section is-medium">
					<h2>Software Engineering</h2>
					<div className="row is-multiline is-6">
						<ProjectCard username="s7chak" repository="s7chak.github.io" />
						<ProjectCard username="s7chak" repository="soccerhours_phase2_flask" />
						<ProjectCard username="s7chak" repository="soccerhours_phase3_app" />
						<ProjectCard username="s7chak" repository="emprewards" />
						<ProjectCard username="s7chak" repository="eLiqSys" />
					</div>
				</section>
				<section id="machine-learning" className="machine-learning section is-medium">
					<h2>Machine Learning</h2>
					<div className="row is-multiline is-6">
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
