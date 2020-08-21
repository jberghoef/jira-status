import React, { useEffect, useState } from "react";
import { Stack } from "@chakra-ui/core";
import axios from "axios";

import ProjectItem from "./ProjectItem";

import type { Project } from "../projects";

const ProjectList: React.FC<{ keys: string[] }> = ({ keys }) => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => getProjects(keys), []);
    useEffect(() => {
        setInterval(() => getProjects(keys), 1000 * 60);
    }, []);

    const getProjects = (keys: string[]) => {
        axios
            .get("/api/projects", {
                params: { projects: keys.join(",") },
            })
            .then((response) => {
                const { results } = response.data;
                setProjects(results);
            })
            .catch((error) => console.error(error));
    };

    return (
        <Stack my={5}>
            {projects.map((project) => (
                <ProjectItem key={`project-${project.id}`} project={project} />
            ))}
        </Stack>
    );
};

export default ProjectList;
