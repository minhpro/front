import * as Mui from "@mui/material";
import React from "react";

export const ViewUnit = ({ data }) => {
  return (
    <Mui.Grid container>
      <Mui.Grid item xs={12} pb={4}>
        <p>Thông tin đơn vị kiến thức:</p>
      </Mui.Grid>
      <Item xs={12} bgcolor={"grey.600"}>
        <h3 style={{ color: "primary.main" }}>Tên: {data?.name}</h3>
      </Item>
      <Item xs={4}>
        <p>Lớp: {data?.chapterData?.subjectData?.classs?.name}</p>
      </Item>
      <Item xs={4}>
        <p>Mon: {data?.chapterData?.subjectData?.name}</p>
      </Item>
      <Item xs={4}>
        <p>Code: {data?.code}</p>
      </Item>
      <Item xs={12}>
        <p>Tên: {data?.chapterData?.name}</p>
      </Item>
      {/* <p>Yêu cầu kiến thức:</p> */}
      <Mui.Grid item xs={12} py={2}>
        <p>Yêu cầu kiến thức:</p>
      </Mui.Grid>
      <Item xs={2} bgcolor={"grey.400"}>
        Code
      </Item>
      <Item xs={10} bgcolor={"grey.400"}>
        Tên
      </Item>

      {data.requirementData.length > 0
        ? data.requirementData?.map((data, i) => {
            return (
              <>
                <Item xs={2}>{data.code}</Item>
                <Item xs={10}>{data.name}</Item>
              </>
            );
          })
        : null}
    </Mui.Grid>
  );
};

const Item = ({ children, ...rest }) => {
  return (
    <Mui.Grid item {...rest} p={1} border={"solid 1px"}>
      {children}
    </Mui.Grid>
  );
};
