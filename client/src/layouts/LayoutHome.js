import * as Mui from "@mui/material";
import * as Ex from "Example";
import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import * as Api from "api";
import { EuiNavMenu } from "components/Eui";
import navRouter from "router/navRouter";
import { useDispatch } from "react-redux";
import * as Slide from "redux/slide";
import * as Func from "functions";
export const LayoutHome = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    Func.handler
      .api(() => Api.testTypeApi.search())
      .then((res) => {
        dispatch(Slide.TestTypeSlide.setTestType(res));
      })
      .catch((error) => console.log(error));
    Func.handler
      .api(() => Api.testTimeApi.search())
      .then((res) => {
        dispatch(Slide.TimeExamSlide.setTimeExam(res));
      })
      .catch((error) => console.log(error));
    Func.handler
      .api(() => Api.questionTypeApi.search())
      .then((res) => {
        dispatch(Slide.QuestionTypeSilde.setQuestionType(res));
      })
      .catch((error) => console.log(error));
    Func.handler
      .api(() => Api.otherConfigApi.all())
      .then((res) => {
        dispatch(Slide.OtherConfigSlide.setOtherConfig(res));
      })
      .catch((error) => console.log(error));
    Func.handler
      .api(() => Api.classApi.search())
      .then((res) => {
        dispatch(Slide.ClassSlide.setClassName(res));
      })
      .catch((error) => console.log(error));
  }, [dispatch]);
  return (
    <>
      <Ex.Header />
      <Style.Main className="container">
        <Mui.Stack direction={{ xs: "column", md: "row" }}>
          <Style.Nav>
            <Mui.Stack spacing={2}>
              {navRouter.data.map((data, i) => {
                return <EuiNavMenu data={data} key={i} icon={data.icon} />;
              })}
            </Mui.Stack>
          </Style.Nav>
          <Mui.Box width={"100%"}>
            <Outlet />
          </Mui.Box>
        </Mui.Stack>
      </Style.Main>
      <Ex.Footer />
    </>
  );
};

const Style = {
  Main: styled.main`
    margin: 20px 0;
    display: block;
    width: 100%;
  `,
  Nav: styled.nav`
    min-width: 300px;
  `,
};
