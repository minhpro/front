import React from "react";
import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import * as Contants from "assets/contants";

export const TypeScore = () => {
  return (
    <Eui.EuiTable dataColumn={dataColumn}>
      {Contants.scoreData.map((row, i) => (
        <Eui.EuiTable.StyledTableRow key={i}>
          <Eui.EuiTable.StyledTableCell align="center">
            {i + 1}
          </Eui.EuiTable.StyledTableCell>
          <Eui.EuiTable.StyledTableCell align="left">
            {row.name || "code"}
          </Eui.EuiTable.StyledTableCell>
        </Eui.EuiTable.StyledTableRow>
      ))}
    </Eui.EuiTable>
  );
};

const dataColumn = [
  {
    name: "STT",
    width: 100,
  },
  {
    name: "Cách tính điểm",
  },
];
