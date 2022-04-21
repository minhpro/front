import React from "react";
import { alpha, styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import * as Mui from "@mui/material";

export function Select({ data, ...rest }) {
  return (
    <Mui.FormControl sx={{ m: 1, minWidth: 120 }}>
      <Mui.Select
        sx={{
          "& .MuiInputBase-input": {
            fontSize: 16,
            padding: "10px 12px",
            justifyContent: "center",
            alignItems: "center",
          },
        }}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        {...rest}
      >
        <Mui.MenuItem value={null}>
          <em>Chưa chọn</em>
        </Mui.MenuItem>
        {data
          ? data.map((data, i) => {
              return (
                <Mui.MenuItem key={i} value={data.id}>
                  {data.name}
                </Mui.MenuItem>
              );
            })
          : null}
      </Mui.Select>
      {/* <Mui.FormHelperText>Without label</Mui.FormHelperText> */}
    </Mui.FormControl>
  );
}
