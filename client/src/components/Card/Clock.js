import React from "react";
import * as Mui from "@mui/material";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import * as Utils from "utils";
import "react-circular-progressbar/dist/styles.css";
import * as Co from "components";

export const Clock = ({ timeSecond }) => {
  const [clockState, setClockState] = React.useState(timeSecond);

  const [percent, setPercent] = React.useState(0);

  const timeTotal = new Utils.SecondFormat(timeSecond);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setClockState(clockState - 1);

      setPercent(Utils.getPercent(clockState, timeSecond));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  React.useEffect(() => {
    setClockState(timeSecond);
  }, [timeSecond]);

  function getTime() {
    const time = new Utils.SecondFormat(timeSecond - clockState);
    return time;
  }
  return (
    <div style={{ width: 150, height: 150 }}>
      <CircularProgressbarWithChildren value={percent}>
        <Co.Text.Body.Medium>{timeTotal.getString()}</Co.Text.Body.Medium>
        <Co.Text.Body.Medium>{getTime().getString()}</Co.Text.Body.Medium>
        <div style={{ fontSize: 12, marginTop: -5 }}>
          <strong>{parseInt(percent)}%</strong>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};
