import React from "react";
import { Box } from "@chakra-ui/core";

import VersionItem from "./VersionItem";
import Table, { TableHeader, TableBody, TableRow, TableHeaderCell } from "./Table";
import type { Version } from "../projects";

const VersionList: React.FC<{ versions: Version[] }> = ({ versions }) => (
    <Box mt={2}>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHeaderCell>Version title</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell>Progress</TableHeaderCell>
                    <TableHeaderCell>Description</TableHeaderCell>
                    <TableHeaderCell>Release date</TableHeaderCell>
                </TableRow>
            </TableHeader>
            <TableBody>
                {versions
                    .filter((version) => !version.archived)
                    .map((version) => (
                        <VersionItem key={`version-${version.id}`} version={version} />
                    ))}
            </TableBody>
        </Table>
    </Box>
);

export default VersionList;
