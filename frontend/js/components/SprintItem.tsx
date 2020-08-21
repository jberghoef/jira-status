import React, { useEffect, useState } from "react";
import { Badge, Heading, Text, Avatar, Stack, Tag, AvatarGroup } from "@chakra-ui/core";
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
    const [issues, setIssues] = useState<Issue[]>([]);
    const [assignees, setAssignees] = useState<{ [id: string]: Assignee }>({});

    useEffect(() => getIssues(), []);
    useEffect(() => {
        setInterval(() => getIssues(), 1000 * 60);
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

    const DateDisplay = () => {
        if (sprint.completeDate) {
            return <Text fontSize="sm">{dayjs(sprint.completeDate).format("D-M-YYYY")}</Text>;
        } else if (sprint.startDate && sprint.endDate) {
            return (
                <Text fontSize="sm">
                    {dayjs(sprint.startDate).format("D-M-YYYY")} -{" "}
                    {dayjs(sprint.endDate).format("D-M-YYYY")}
                </Text>
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
                <DateDisplay />
            </TableCell>
        </TableRow>
    );
};

export default SprintItem;
