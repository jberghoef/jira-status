import React, { useEffect, useState } from "react";
import { Badge, Heading, Text, Progress, Stack } from "@chakra-ui/core";
import axios from "axios";

import { TableRow, TableCell } from "./Table";
import dayjs from "../utils/dayjs";
import type { Version } from "../projects";
import type { VersionUnresolvedIssuesCount } from "../versions";

const ProjectItem: React.FC<{ version: Version }> = ({ version }) => {
    const [issueUnresolved, setIssueUnresolved] = useState<VersionUnresolvedIssuesCount | null>(
        null
    );

    useEffect(() => getUnresolved(), []);
    useEffect(() => {
        setInterval(() => getUnresolved(), 1000 * 60);
    }, []);

    const getUnresolved = () => {
        axios
            .get(`/api/version/${version.id}/unresolved`)
            .then((response) => {
                const { result } = response.data;
                setIssueUnresolved(result);
            })
            .catch((error) => console.error(error));
    };

    const VersionProgress = () => {
        if (!issueUnresolved) return null;
        const { issuesUnresolvedCount, issuesCount } = issueUnresolved;
        const progress = (100 / issuesCount) * issuesUnresolvedCount;
        const color = progress < 100 ? "blue" : "green";
        return <Progress size="sm" color={color} value={progress} />;
    };

    return (
        <TableRow mb={1}>
            <TableCell>
                <Heading fontSize="sm">{version.name}</Heading>
            </TableCell>
            <TableCell>
                <Badge variantColor={version.released ? "green" : "blue"}>
                    {version.released ? "Released" : "Unreleased"}
                </Badge>
            </TableCell>
            <TableCell w="100%">
                <VersionProgress />
            </TableCell>
            <TableCell>
                <Text>{version.description}</Text>
            </TableCell>
            {version.releaseDate && (
                <TableCell>
                    <Stack isInline align="center">
                        <Text fontSize="sm">{dayjs(version.releaseDate).format("D-M-YYYY")}</Text>
                        <Text fontSize="xs" fontWeight="bold" color="gray.500">
                            {dayjs(version.releaseDate).fromNow()}
                        </Text>
                    </Stack>
                </TableCell>
            )}
        </TableRow>
    );
};

export default ProjectItem;
