import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import projectConfig from "../config/projectConfig.json";
import type { Project } from "../ProjectCard";
import ProjectCard from "../ProjectCard";

function FadeInWhenVisible({ children }) {
  const [ref, inView] = useInView({
    triggerOnce: false,
  });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ duration: 2 }}
    >
      {children}
    </motion.div>
  );
}

export const ProjectsOld = () => {
  return (
    <section id="projects" className="projects section is-medium">
      <div className="projects-container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <span className="general-header">Projects</span>
          <br />
          <div className="header-container">
            <Link to={"/tools"} style={{ marginLeft: "1em" }}>
              <div className="gbutton">
                <span className="gbutton-text">Tools</span>
              </div>
            </Link>
          </div>
        </motion.div>
        <div className="columns">
          <section id="software" className="projects section is-medium">
            <FadeInWhenVisible>
              <div>
                <h2>Software Engineering</h2>
              </div>
            </FadeInWhenVisible>
            <div>
              {/* <FadeInWhenVisible>
                <ProjectCard username="s7chak" repository="s7chak.github.io" />
              </FadeInWhenVisible>
              <FadeInWhenVisible>
                <ProjectCard username="s7chak" repository="folio" />
              </FadeInWhenVisible>
              <FadeInWhenVisible>
                <ProjectCard username="s7chak" repository="folioapi" />
              </FadeInWhenVisible>
              <FadeInWhenVisible>
                <ProjectCard username="s7chak" repository="prodo" />
              </FadeInWhenVisible>
              {/* <FadeInWhenVisible><ProjectCard username="s7chak" repository="soccerhours_phase2_flask" /></FadeInWhenVisible>
              <FadeInWhenVisible>
                <ProjectCard
                  username="s7chak"
                  repository="soccerhours_phase3_app"
                />
              </FadeInWhenVisible>
              <FadeInWhenVisible>
                <ProjectCard username="s7chak" repository="eLiqSys" />
              </FadeInWhenVisible>  */}
            </div>
          </section>
          <section id="machine-learning" className="projects section is-medium">
            <FadeInWhenVisible>
              <div>
                <h2>Machine Learning</h2>
              </div>
            </FadeInWhenVisible>
            <div>
              {/* <FadeInWhenVisible>
                <ProjectCard username="s7chak" repository="quizard" />
              </FadeInWhenVisible>
              <FadeInWhenVisible>
                <ProjectCard username="s7chak" repository="vision-api-app" />
              </FadeInWhenVisible>
              <FadeInWhenVisible>
                <ProjectCard username="s7chak" repository="4DByD" />
              </FadeInWhenVisible> */}
            </div>
          </section>
        </div>
      </div>
      <br />
      <br />
    </section>
  );
};

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(projectConfig as Project[]);
  }, []);

  return (
    <section id="projects" className="projects section is-medium">
      <div className="projects-container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <span className="general-header">Projects</span>
          <div className="project-sections snaps">
            {projects
              .filter((project) => project.show)
              .map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
