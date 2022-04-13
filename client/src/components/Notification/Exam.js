import React from "react";
import * as Mui from "@mui/material";
import * as Co from "components";
import { EuiButton } from "components/Eui";
import { Link } from "react-router-dom";
import { apiNofi } from "assets/contants/apiContant";

import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setNofi } from "redux/slide/nofiSlide";

export const Exam = ({ open, handleClose, severity, id }) => {
  const [exam, setExam] = React.useState(12);
  const dispatch = useDispatch();
  const data = useSelector((s) => s.reduxNofi);
  // const location = useLocation().pathname;
  // const pathnames = location.split("/").filter((x) => x);

  // React.useEffect(() => {
  //   var source = new EventSource(apiNofi);
  //   console.log("khao");
  //   // if (!exam.id) {
  //   //   source.addEventListener("upComingTest", set, false);
  //   // } else {
  //   //   console.log("remove");
  //   //   source.removeEventListener("upComingTest", function () {
  //   //     console.log("fdfdfdfd");
  //   //   });
  //   // }
  //   source.addEventListener("upComingTest", set, false);

  //   return () =>
  //     source.removeEventListener("upComingTest", function () {
  //       console.log("ads");
  //     });
  // }, []);

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     await fetchEventSource(apiNofi, {
  //       method: "GET",
  //       headers: {
  //         Accept: "text/event-stream",
  //       },
  //       onopen(res) {
  //         if (res.ok && res.status === 200) {
  //           console.log("Connection made ", res);
  //         } else if (
  //           res.status >= 400 &&
  //           res.status < 500 &&
  //           res.status !== 429
  //         ) {
  //           console.log("Client side error ", res);
  //         }
  //       },
  //       onmessage(event) {
  //         const parsedData = JSON.parse(event.data);
  //         setExam(parsedData);
  //         dispatch(setNofi(parsedData));
  //         console.log(data);
  //       },
  //       onclose() {
  //         console.log("Connection closed by the server");
  //       },
  //       onerror(err) {
  //         console.log("There was an error from server", err);
  //       },
  //     });
  //   };
  //   fetchData();
  // }, []);
  return (
    <Mui.Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Mui.Alert
        onClose={handleClose}
        severity={severity || "success"}
        sx={{ width: "100%" }}
      >
        <Mui.Stack spacing={2}>
          <Co.Text.Body.Medium>Bạn có bài thi sắp diễn ra</Co.Text.Body.Medium>
          <Co.Text.Body.Medium>
            <Link to={`lam-bai/${id}`}>
              <EuiButton.AddType name={"Vào làm bài thi"} />
            </Link>
          </Co.Text.Body.Medium>
        </Mui.Stack>
      </Mui.Alert>
    </Mui.Snackbar>
  );
};
