import { RepoIcon, StarFillIcon, QuestionIcon } from "@primer/octicons-react";
import { motion } from "framer-motion";
import React, { useRef } from "react";
import { useEffect, useState } from "react";

const getRepository = (username: string, repository: string): any => {
  const [response, setResponse] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.github.com/repos/${username}/${repository}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        setResponse(await response.json());
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [repository]);

  return [response, error, loading];
};

const getLanguageIcon = (language: string): string => {
  if (!language) language = "github";

  switch (language.toLowerCase()) {
    case "shell":
      language = "bash";
      break;
    case "scss":
      language = "css3";
      break;
    case "typescript":
      language = "javascript";
      break;
  }

  return `devicon-${language.toLowerCase()}-plain`;
};

export const ProjectCardOld = ({
  username,
  repository,
}: {
  username: string;
  repository: string;
}) => {
  const [data, _hasError, loading] = getRepository(username, repository);

  if (loading)
    return (
      <div className="card">
        <div className="card-content">
          <div className="repo-description">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );

  const icon = getLanguageIcon(data.language);
  return (
    <div className="card">
      <div className="card-content">
        <div className="repo-title">
          <a href={data.html_url} target="_blank">
            <RepoIcon size={16} /> {data.name}
          </a>
        </div>
        <div className="repo-description">
          <p>{data.description}</p>
          <br />
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "3rem" }}>
              <i className={icon}></i> {data.language}
            </div>
            {/* <div style={{ marginRight: "12px" }}>
                           <QuestionIcon size={16} /> {data.archived ? "Archived" : "Maintained"}
                        </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export type Project = {
  name: string;
  type: string;
  image: string;
  description: string;
  stack: string;
  github?: string; // Optional
  demo?: string; // Optional
  show: boolean;
};

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [showDescription, setShowDescription] = useState(false);
  const toggleDescription = () => {
    setShowDescription((prev) => !prev);
  };
  const [width, setWidth] = useState<number>(window.innerWidth);
  const isMobile = width <= 768;
  return (
    <div className={`project-card ${showDescription ? "expanded" : ""}`}>
      <h3 className="project-name">{project.name}</h3>
      <div className="project-content">
        <img
          src={project.image}
          alt={project.name}
          className="project-image"
          onClick={toggleDescription}
        />
        {showDescription && (
          <div className="project-description">
            <p>{project.description}</p>
          </div>
        )}
      </div>
      {showDescription && (
        <div className="project-stack">
          <p>
            <b>Technology stack: </b>
            {project.stack}
          </p>
        </div>
      )}
      <div className="project-buttons">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="button github-button"
        >
          GitHub
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="button demo-button"
          >
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
