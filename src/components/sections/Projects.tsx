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
          <div className="scblogheader">
            <span className="general-header">Projects</span>
          </div>
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
