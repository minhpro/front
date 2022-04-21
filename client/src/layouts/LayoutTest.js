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
import * as Co from "components";
import { useSelector } from "react-redux";
import { apiNofi } from "assets/contants/apiContant";

import { useLocation } from "react-router-dom";
export const LayoutTest = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    Func.handler
      .api(() => Api.testTypeApi.search())
      .then((res) => {
        dispatch(Slide.TestTypeSlide.setTestType(res));
      });

    Func.handler
      .api(() => Api.scoreCalculationTypeApi.all())
      .then((res) => {
        dispatch(Slide.ScoreSlide.setScore(res));
        console.log("hi", res);
      });

    Func.handler
      .api(() => Api.testTimeApi.search())
      .then((res) => {
        dispatch(Slide.TimeExamSlide.setTimeExam(res));
      });

    Func.handler
      .api(() => Api.questionTypeApi.search())
      .then((res) => {
        dispatch(Slide.QuestionTypeSilde.setQuestionType(res));
      });

    Func.handler
      .api(() => Api.otherConfigApi.all())
      .then((res) => {
        dispatch(Slide.OtherConfigSlide.setOtherConfig(res));
      });

    Func.handler
      .api(() => Api.classApi.search())
      .then((res) => {
        dispatch(Slide.ClassSlide.setClassName(res));
      });
  }, [dispatch]);

  return (
    <>
      {/* <ThongBao /> */}
      {/* <Co.Notification.Exam /> */}
      <Co.Notification.Snackbar />
      <Ex.Header.Nav c={"white"} />
      <Ex.Header />
      <Style.Main className="container">
        <Mui.Stack direction={{ xs: "column", md: "row" }}>
          <Style.Nav>
            <Nav />
          </Style.Nav>
          <Mui.Box width={"100%"}>
            <Mui.Stack>breadcrumb</Mui.Stack>
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

const Nav = () => {
  const auth = useSelector((s) => s.reduxAuth.auth);
  return (
    <Mui.Stack spacing={2}>
      {navRouter.data.map((data, i) => {
        if (auth?.roles?.find((role) => data.role?.includes(role))) {
          return <EuiNavMenu data={data} key={i} icon={data.icon} />;
        } else {
          return null;
        }
      })}
    </Mui.Stack>
  );
};
