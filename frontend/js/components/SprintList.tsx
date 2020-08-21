import React from "react";
import { Box } from "@chakra-ui/core";

import SprintItem from "./SprintItem";
import Table, { TableHeader, TableBody, TableRow, TableHeaderCell } from "./Table";

import type { Sprint } from "../sprints";

const SprintList: React.FC<{ sprints: Sprint[] }> = ({ sprints }) => (
    <Box mt={2}>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHeaderCell>Sprint title</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell>Issues</TableHeaderCell>
                    <TableHeaderCell>Assignees</TableHeaderCell>
                    <TableHeaderCell>Date range</TableHeaderCell>
                    <TableHeaderCell>Completion date</TableHeaderCell>
                </TableRow>
            </TableHeader>
            <TableBody>
                {sprints
                    .filter((sprint) => sprint.state != "closed")
                    .map((sprint) => (
                        <SprintItem key={`sprint-${sprint.id}`} sprint={sprint} />
                    ))}
            </TableBody>
        </Table>
    </Box>
);

export default SprintList;
