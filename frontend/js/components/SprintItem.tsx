import React, { useEffect, useState } from "react";
import { Badge, Heading, Text, Avatar, Stack, Tag, AvatarGroup, Tab } from "@chakra-ui/core";
import axios from "axios";

import { TableRow, TableCell } from "./Table";
import dayjs from "../utils/dayjs";
import type { Sprint } from "../sprints";
import type { Issue, Assignee } from "../issues";

const issueStatuses = [
    {
        name: "To Do",
        color: "gray",
    },
    {
        name: "In Progress",
        color: "blue",
    },
    {
        name: "Testing",
        color: "purple",
    },
    {
        name: "Done",
        color: "green",
    },
];

const SprintItem: React.FC<{ sprint: Sprint }> = ({ sprint }) => {
    const [intervalID, setIntervalID] = useState<NodeJS.Timeout>();
    const [issues, setIssues] = useState<Issue[]>([]);
    const [assignees, setAssignees] = useState<{ [id: string]: Assignee }>({});

    useEffect(() => getIssues(), []);
    useEffect(() => {
        const id = setInterval(() => getIssues(), 1000 * 60);
        setIntervalID(id);
        return () => clearInterval(intervalID);
    }, []);

    const getIssues = () => {
        axios
            .get(`/api/issues/${sprint.id}`)
            .then((response) => {
                const { results } = response.data;
                setIssues(results);
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        const newAssignees: { [id: string]: Assignee } = {};
        for (const issue of issues) {
            const { assignee } = issue.fields;
            if (assignee && issue.fields.status.name !== "Done") {
                newAssignees[assignee.accountId] = assignee;
            }
        }
        setAssignees(newAssignees);
    }, [issues]);

    const getBadgeColor = (state: string) => {
        switch (state) {
            case "closed":
                return "gray";
            case "active":
                return "green";
            case "future":
                return "blue";
        }
    };

    const getIssueCount = (status: string) => {
        return issues.reduce((accumulator, issue) => {
            if (issue.fields.status.name === status) return accumulator + 1;
            return accumulator;
        }, 0);
    };

    const DateRangeDisplay = () => {
        const startDate = dayjs(sprint.startDate);
        const endDate = dayjs(sprint.endDate);
        if (sprint.startDate && sprint.endDate) {
            return (
                <Stack isInline align="center">
                    <Text fontSize="sm">
                        {startDate.format("D-M-YYYY")} - {endDate.format("D-M-YYYY")}
                    </Text>
                    <Text fontSize="xs" fontWeight="bold" color="gray.500">
                        {endDate.from(startDate, true)}
                    </Text>
                </Stack>
            );
        }
        return null;
    };

    const CompleteDateDisplay = () => {
        if (sprint.completeDate) {
            const completeDate = dayjs(sprint.completeDate);
            return (
                <Stack isInline align="center">
                    <Text fontSize="sm">{completeDate.format("D-M-YYYY")}</Text>
                    <Text fontSize="xs" fontWeight="bold" color="gray.500">
                        {completeDate.fromNow()}
                    </Text>
                </Stack>
            );
        } else if (sprint.endDate) {
            const endDate = dayjs(sprint.endDate);
            return (
                <Stack isInline align="center">
                    <Text fontSize="sm">{endDate.format("D-M-YYYY")}</Text>
                    <Text fontSize="xs" fontWeight="bold" color="gray.500">
                        {endDate.fromNow()}
                    </Text>
                </Stack>
            );
        }
        return null;
    };

    return (
        <TableRow mb={1}>
            <TableCell collapse={true}>
                <Heading fontSize="sm">{sprint.name}</Heading>
            </TableCell>
            <TableCell collapse={true}>
                <Badge variantColor={getBadgeColor(sprint.state)}>{sprint.state}</Badge>
            </TableCell>
            <TableCell collapse={true}>
                <Stack isInline>
                    {issueStatuses.map((status) => (
                        <Tag
                            key={`status-${status.name.toLowerCase()}`}
                            variantColor={status.color}
                            rounded="full"
                            size="sm"
                        >
                            <Text fontWeight="bold">{getIssueCount(status.name)}</Text>
                        </Tag>
                    ))}
                </Stack>
            </TableCell>
            <TableCell>
                <AvatarGroup max={10} size="sm">
                    {Object.keys(assignees).map((key) => {
                        const assignee = assignees[key];
                        return (
                            <Avatar
                                key={`assignee-${assignee.accountId}`}
                                name={assignee.displayName}
                                src={assignee.avatarUrls["48x48"]}
                            />
                        );
                    })}
                </AvatarGroup>
            </TableCell>
            <TableCell>
                <DateRangeDisplay />
            </TableCell>
            <TableCell>
                <CompleteDateDisplay />
            </TableCell>
        </TableRow>
    );
};

export default SprintItem;
