import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { grey } from "@mui/material/colors";
import { Stack } from "@mui/material";

export const EuiTable = ({ dataColumn, children }) => {
  return (
    <EuiTable.Wrapper>
      <EuiTable.Head>
        {dataColumn.map((column, i) => {
          return (
            <EuiTable.BodyCell
              key={i}
              width={column.width || ""}
              align="center"
            >
              {column.name}
            </EuiTable.BodyCell>
          );
        })}
      </EuiTable.Head>
      <EuiTable.Body> {children}</EuiTable.Body>
    </EuiTable.Wrapper>
  );
};

EuiTable.Wrapper = function wrapper({ mw, children }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: "100%" }} aria-label="customized table">
        {children}
      </Table>
    </TableContainer>
  );
};

EuiTable.Head = function head({ children }) {
  return (
    <TableHead px={2}>
      <TableRow>{children}</TableRow>
    </TableHead>
  );
};

EuiTable.Body = function body({ children }) {
  return <TableBody>{children}</TableBody>;
};

EuiTable.BodyCell = function body({ children, ...restProps }) {
  return (
    <EuiTable.StyledTableCell {...restProps}>
      <h4> {children}</h4>
    </EuiTable.StyledTableCell>
  );
};

EuiTable.Footer = function footer({ children }) {
  return (
    <Stack
      direction={"row"}
      alignItems="center"
      justifyContent={"flex-end"}
      width={"100%"}
      my={10}
    >
      {children}
    </Stack>
  );
};

EuiTable.StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: grey[400],
    color: theme.palette.primary.main,
    padding: "20px 0px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

EuiTable.StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
