import React from "react";
import { Box, BoxProps } from "@chakra-ui/core";

export const Table: React.FC<BoxProps> = React.memo((props) => (
    <Box as="table" w="100%" mb={3} textAlign="left" {...props}>
        {props.children}
    </Box>
));

export const TableHeader: React.FC<BoxProps> = React.memo((props) => (
    <Box as="thead" {...props}>
        {props.children}
    </Box>
));

export const TableBody: React.FC<BoxProps> = React.memo((props) => (
    <Box as="tbody" {...props}>
        {props.children}
    </Box>
));

export const TableFooter: React.FC<BoxProps> = React.memo((props) => (
    <Box as="tfoot" {...props}>
        {props.children}
    </Box>
));

export const TableRow: React.FC<BoxProps> = React.memo((props) => (
    <Box as="tr" borderBottomWidth="1px" borderBottomColor="gray 50" {...props}>
        {props.children}
    </Box>
));

export const TableHeaderCell: React.FC<BoxProps> = React.memo((props) => (
    <Box as="th" py={2} pr={50} style={styles.cell} {...props}>
        {props.children}
    </Box>
));

export const TableCell: React.FC<BoxProps> = React.memo((props) => (
    <Box as="td" py={2} pr={50} style={styles.cell} w={props.collapse ? "1px" : "auto"} {...props}>
        {props.children}
    </Box>
));

const styles = {
    cell: {
        whiteSpace: "nowrap",
    },
};

export default Table;
