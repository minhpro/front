import React from "react";
import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import { TimeFormat } from "utils";
import { SecondFormat } from "utils/timeFormat/secondFormat";

export const TimeWrapper = ({ setTime, label, p, preTime }) => {
  const [data, setData] = React.useState({
    hour: 0,
    minute: 0,
    second: 0,
  });

  React.useLayoutEffect(() => {
    if (preTime) {
      const time = new SecondFormat(preTime);
      setData({
        hour: time.getHour(),
        minute: time.getMinute(),
        second: time.getSecond(),
      });
    } else {
      return;
    }
    return;
  }, [preTime]);

  function onChange(e) {
    var time = parseInt(e.target.value);
    console.log(e.target.name);
    switch (e.target.name) {
      case "hour":
        if (time < 0 || time === null || isNaN(time)) {
          setData({ ...data, [e.target.name]: 0 });
        } else setData({ ...data, [e.target.name]: parseInt(e.target.value) });
        break;
      case "minute":
        if (time < 0 || time === null || time > 59 || isNaN(time)) {
          setData({ ...data, [e.target.name]: 0 });
        } else setData({ ...data, [e.target.name]: parseInt(e.target.value) });
        break;
      case "second":
        if (time < 0 || time === null || time > 59 || isNaN(time)) {
          setData({ ...data, [e.target.name]: 0 });
        } else setData({ ...data, [e.target.name]: parseInt(e.target.value) });
        break;
    }
    // const timeSecond = new TimeFormat(data.hour, data.minute, data.second);
    // setTime(timeSecond.getSecond());
  }

  React.useEffect(() => {
    const timeSecond = new TimeFormat(data.hour, data.minute, data.second);
    setTime(timeSecond.getSecond());
    const hi = new SecondFormat(timeSecond.getSecond());
    console.log(
      "hi",
      hi.getHour(),
      hi.getMinute(),
      hi.getSecond(),
      hi.getString()
    );
  }, [data]);
  console.log(data);
  //   console.log(second);
  return (
    <Mui.Stack alignItems={"flex-start"} justifyContent={"flex-start"}>
      <p>{label || "Thời gian"}</p>
      <Mui.Stack py={p || 1} />
      <Mui.Grid container columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
        <Item>
          {/* <Ex.ExInputWrapper.Time
          name={"hour"}
          label={"Giờ"}
          value={data.hour}
          onChange={onChange}
        /> */}
          <Mui.TextField
            name={"hour"}
            label={"giờ"}
            value={data.hour}
            onChange={onChange}
            type={"number"}
          />
        </Item>
        <Item>
          {/* <Ex.ExInputWrapper.Time
          name={"minute"}
          label={"Phút"}
          value={data.minute}
          onChange={onChange}
        /> */}
          <Mui.TextField
            name={"minute"}
            label={"phút"}
            value={data.minute}
            onChange={onChange}
            type={"number"}
          />
        </Item>
        <Item>
          {/* <Ex.ExInputWrapper.Time
          name={"second"}
          value={data.second}
          onChange={onChange}
        /> */}
          <Mui.TextField
            name={"second"}
            label={"giây"}
            value={data.second}
            onChange={onChange}
            type={"number"}
          />
        </Item>
      </Mui.Grid>
    </Mui.Stack>
  );
};

const Item = ({ children }) => {
  return (
    <Mui.Grid item xs={4}>
      {children}
    </Mui.Grid>
  );
};
