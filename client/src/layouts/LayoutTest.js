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

import { useLocation } from "react-router-dom";
export const LayoutTest = () => {
  const dispatch = useDispatch();

  const [exam, setExam] = React.useState({
    id: null,
    start: null,
    end: null,
  });

  function set(e) {
    let data = JSON.parse(e.data);
    if (exam.id === null) {
      // setExam({ ...exam, id: data.id });
    } else return;
  }

  React.useEffect(() => {
    var source = new EventSource("http://18.179.5.86:8080/api/event/register");

    if (!exam.id) {
      source.addEventListener("upComingTest", set, false);
    } else {
      console.log("remove");
      source.removeEventListener("upComingTest", set);
    }

    return () => source.removeEventListener("upComingTest", set);
  }, []);

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
      {/* {exam.id ? <Co.Notification.Exam open={true} id={exam.id} /> : null} */}
      {/* <ThongBao /> */}
      <Ex.Header.Nav c={"white"} />
      <Ex.Header />
      <Style.Main className="container">
        <Mui.Stack direction={{ xs: "column", md: "row" }}>
          <Style.Nav>
            <Nav />
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

const Nav = () => {
  const auth = useSelector((s) => s.reduxAuth);
  return (
    <Mui.Stack spacing={2}>
      {navRouter.data.map((data, i) => {
        if (auth.auth.roles[0] === data.role) {
          return <EuiNavMenu data={data} key={i} icon={data.icon} />;
        } else {
          return null;
        }
      })}
    </Mui.Stack>
  );
};

const ThongBao = () => {
  const [exam, setExam] = React.useState({
    open: false,
    id: null,
    start: null,
    end: null,
  });

  const location = useLocation().pathname;
  const pathnames = location.split("/").filter((x) => x);
  console.log(pathnames);
  function set(e) {
    let data = JSON.parse(e.data);
    if (exam.id === null) {
      console.log(data);

      setExam({ ...exam, id: data.id });
    }
    if (pathnames[0] === "lam-bai") {
      console.log("lambai");
      setExam({ ...exam, id: null });
    }
  }

  React.useEffect(() => {
    var source = new EventSource("http://18.179.5.86:8080/api/event/register");

    if (!exam.id) {
      source.addEventListener("upComingTest", set, false);
    } else {
      console.log("remove");
      source.removeEventListener("upComingTest", function () {
        console.log("fdfdfdfd");
      });
    }

    return () =>
      source.removeEventListener("upComingTest", function () {
        console.log("ads");
      });
  }, []);

  return (
    <>
      <Co.Notification.Exam open={exam.open} id={exam.id} />{" "}
    </>
  );
};
