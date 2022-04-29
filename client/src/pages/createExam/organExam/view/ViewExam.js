import React from "react";
import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import * as Function from "functions";
import * as Api from "api";
import * as Class from "Class";
import { ViewQuestion } from "pages/bankQuestion/listQuetion/view";

export const ViewExam = ({ id }) => {
  const [data, setData] = React.useState(null);
  const [questionId, setQuestionId] = React.useState(null);
  const [open, setIsOpen] = React.useState(false);

  const handleOpenNew = new Class.HandlePopup(
    setIsOpen,
    "",
    "Thêm mới thời gian làm bài"
  );
  class Func {
    async detail() {
      try {
        const res = await Api.examApi.detail(id);
        console.log(res);
        setData(res);
      } catch (error) {}
    }
    onOpenView(id) {
      setQuestionId(id);
      handleOpenNew.open();
    }
  }
  React.useEffect(() => {
    func.detail();
  }, []);

  const func = new Func();
  return (
    <Mui.Stack>
      <Ex.ExModalPoppup.ViewQuestion
        open={open}
        handleClose={() => handleOpenNew.close()}
      >
        <ViewQuestion id={questionId} />
      </Ex.ExModalPoppup.ViewQuestion>
      {data ? (
        <Mui.Grid container rowSpacing={2}>
          <Item xs={12}>
            <p>Tên câu hỏi: {data.name}</p>
          </Item>
          <Item xs={12}>
            <p>Ma trận: {data.testMatrixData.name}</p>
          </Item>
          <Item xs={6}>
            <p>Lớp: {data.testMatrixData.subjectData.classs.name}</p>
          </Item>
          <Item xs={6}>
            <p>Môn: {data.testMatrixData.subjectData.name}</p>
          </Item>

          <Item xs={12}>
            <Mui.Stack sx={{ overflowY: "hidden", height: 400 }}>
              <Eui.EuiTable dataColumn={dataColumn}>
                {data.questionData
                  ? data.questionData?.map((row, i) => (
                      <Eui.EuiTable.StyledTableRow key={i}>
                        <Eui.EuiTable.StyledTableCell align="center">
                          {i + 1}
                        </Eui.EuiTable.StyledTableCell>
                        <Eui.EuiTable.StyledTableCell align="center">
                          {row.code}
                        </Eui.EuiTable.StyledTableCell>
                        <Eui.EuiTable.StyledTableCell align="left">
                          <div
                            dangerouslySetInnerHTML={{ __html: row.question }}
                          />
                        </Eui.EuiTable.StyledTableCell>

                        {/* <Eui.EuiTable.StyledTableCell align="center">
                          <Ex.ExIconEditDelete.ViewOnly
                            onView={() => func.onOpenView(row.id)}
                          />
                        </Eui.EuiTable.StyledTableCell> */}
                      </Eui.EuiTable.StyledTableRow>
                    ))
                  : null}
              </Eui.EuiTable>
            </Mui.Stack>
          </Item>
        </Mui.Grid>
      ) : (
        "loading"
      )}
    </Mui.Stack>
  );
};

const Item = ({ children, ...rest }) => {
  return (
    <Mui.Grid item {...rest}>
      {children}
    </Mui.Grid>
  );
};

const dataColumn = [
  {
    name: "STT",
    width: 50,
  },
  {
    name: "Mã câu",
    width: 200,
  },
  {
    name: "Tên câu",
    width: 200,
  },
];
