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

  // React.useEffect(() => {
  //   if (!!window.EventSource) {
  //     var source = new EventSource(
  //       "http://18.179.5.86:8080/api/event/register"
  //     );

  //     source.addEventListener(
  //       "upComingTest",
  //       function (e) {
  //         console.log(e);
  //       },
  //       false
  //     );

  //     source.addEventListener(
  //       "open",
  //       function (e) {
  //         console.log(e);
  //       },
  //       false
  //     );

  //     source.addEventListener(
  //       "error",
  //       function (e) {
  //         const id_state = document.getElementById("state");
  //         if (e.eventPhase == EventSource.CLOSED) source.close();
  //         if (e.target.readyState == EventSource.CLOSED) {
  //           id_state.innerHTML = "Disconnected";
  //         } else if (e.target.readyState == EventSource.CONNECTING) {
  //           id_state.innerHTML = "Connecting...";
  //         }
  //       },
  //       false
  //     );
  //   } else {
  //     console.log("Your browser doesn't support SSE");
  //   }
  // }, []);

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
