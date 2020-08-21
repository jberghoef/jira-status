import React, { useEffect, useState } from "react";
import { Avatar, Box, Flex, Heading, Text, Image } from "@chakra-ui/core";
import axios from "axios";

import VersionList from "./VersionList";
import SprintList from "./SprintList";
import type { Project } from "../projects";
import type { Board } from "../boards";

const ProjectItem: React.FC<{ project: Project }> = ({ project }) => {
    const [boards, setBoards] = useState<Board[]>([]);
    const [sprints, setSprints] = useState<any[]>([]);

    useEffect(() => getBoards(), []);
    useEffect(() => {
        setInterval(() => getBoards(), 1000 * 60);
    }, []);

    const getBoards = () => {
        axios
            .get(`/api/boards/${project.key}`)
            .then((response) => {
                const { results } = response.data;
                setBoards(results);
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        getSprints();
    }, [boards]);
    useEffect(() => {
        setInterval(() => getSprints(), 1000 * 60);
    }, [boards]);

    const getSprints = async () => {
        Promise.all(
            boards.map((board) => axios.get(`/api/sprints/${board.id}`))
        ).then((responses) => responses.map((response) => setSprints(response.data.results)));
    };

    return (
        <Box p={5} mb={3} shadow="md" borderWidth="1px" rounded="md">
            <Flex justify="space-between">
                <Flex align="center">
                    <Box rounded="md" w={10} h={10} overflow="hidden">
                        <Image src={project.avatarUrls["24x24"]} alt={project.name} />
                    </Box>
                    <Flex ml={3} direction="column">
                        <Text fontWeight="semibold" letterSpacing="wide" fontSize="xs">
                            {project.key} board
                        </Text>
                        <Heading fontSize="xl">{project.name}</Heading>
                    </Flex>
                </Flex>
                <Avatar
                    size="sm"
                    name={project.lead.displayName}
                    src={project.lead.avatarUrls["32x32"]}
                />
            </Flex>
            {project.versions && <VersionList versions={project.versions} />}
            {sprints.length > 0 && <SprintList sprints={sprints} />}
        </Box>
    );
};

export default ProjectItem;
