import * as Mui from "@mui/material";
import * as Eui from "components/Eui";
import * as Ex from "Example";
import React from "react";
import * as Views from "views";
import * as Class from "Class";
import * as Function from "functions";
import * as Api from "api";

const Create = () => {
  const [pages, setPages] = React.useState({
    data: null,
    page: 1,
    total: 10,
    limit: 32,
  });

  const [search, setSearch] = React.useState({
    examTypeId: null,
    classId: null,
    subjectId: null,
    testName: "",
    matrixId: null,
    testCode: "",
    testId: null,
  });

  const [kits, setKits] = React.useState(null);

  const [add, setAdd] = React.useState({
    name: "",

    numberOfQuestions: 1,
    numberOfTests: 1,
    start: "2022-03-27T15:54:52.780966",
    end: "2022-03-27T15:54:52.780966",
    testMethod: "ONLINE",
    target: "EXAM",
    timeCalculationType: "BY_TEST",
    candidateIds: [],
    // kits: [],
  });

  const [isOpen, setIsOpen] = React.useState(false);
  const [exam, setExam] = React.useState({
    name: null,
    id: null,
  });

  const [snack, setSnack] = React.useState({
    isOpen: false,
    message: "",
    severity: null,
  });

  // class

  const handleSnack = new Class.HandleSnack(setSnack);
  handleSnack.setMessage(
    "Đã thêm bộ đề mới",
    "Đã trộn bộ đề",
    "Lỗi hệ thống, chưa thể thêm đề thi mới"
  );

  const handleOpenNew = new Class.HandlePopup(
    setIsOpen,
    "",
    "Thêm mới thời gian làm bài"
  );

  //   function
  class Func {
    handlePagination(event, value) {
      console.log(value);
      setPages({ ...pages, page: value });
    }

    handleChange = (e) => {
      setSearch({ ...search, [e.target.name]: e.target.value });
      console.log(search);
    };

    handleChangeAdd = (e) => {
      setAdd({ ...add, [e.target.name]: e.target.value });
      console.log(search);
    };

    onOpenGen() {
      if (search.testId) {
        handleOpenNew.open();
      }
    }

    async handleGen() {
      try {
        const res = await Api.testKitApi.generate(
          search.testId,
          add.numberOfQuestions,
          add.numberOfTests
        );
        console.log(res);

        setKits(res);
        handleSnack.delete("");
      } catch (error) {
        console.log(error);
      }
    }

    async handleAdd(e) {
      e.preventDefault();

      if (kits === null) {
        return;
      }
      let body = {
        ...add,
        testId: search.testId,
        kits: [],
      };

      kits.forEach((item) => {
        body.kits.push({ code: item.code, questionIds: [] });
      });

      for (let i = 0; i < kits.length; i++) {
        body.kits.push({ code: kits[i].code, questionIds: [] });

        for (let j = 0; j < kits[i].questions.length; j++) {
          body.kits[i].questionIds.push(kits[i].questions[j].id);
        }
      }

      console.log(body);

      try {
        const res = await Api.testKitApi.add(body);
        console.log(res);
        handleSnack.add("");
        handleOpenNew.close();
      } catch (error) {
        console.log(error);
      }
    }

    handleSearch = () => {
      Function.handler
        .api(() =>
          Api.examApi.search(
            search.testName,
            search.examTypeId,
            search.matrixId,
            search.classId,
            search.subjectId,
            pages.page,
            pages.limit
          )
        )
        .then((res) => {
          console.log(res);
          setPages({
            ...pages,
            data: res.data,
            total: Function.formatNumber.getTotalPage(res.total, pages.limit),
          });
        })
        .catch((error) => console.log(error));
    };
  }

  const func = new Func();
  React.useEffect(() => {
    func.handleSearch();
  }, []);

  React.useEffect(() => {
    setSearch({ ...search, subjectId: null });
  }, [search.classId]);
  React.useEffect(() => {
    setSearch({ ...search, matrixId: null });
  }, [search.subjectId]);

  React.useEffect(() => {
    func.handleSearch();
  }, [search.subjectId]);

  return (
    <>
      {/* poppup */}
      {/* thong bao */}
      <Eui.EuiSnackbar
        open={snack.isOpen}
        handleClose={() => handleSnack.close()}
        message={snack.message}
        severity={snack.severity}
      />

      <Eui.EuiModal.Title
        title={"Trộn đề thi: " + exam.name}
        open={isOpen}
        handleClose={() => handleOpenNew.close()}
        w={600}
      >
        <Mui.Stack
          component={"form"}
          sx={{ height: "70vh" }}
          onSubmit={func.handleAdd}
        >
          {/* noi dung */}
          <Mui.Stack sx={{ maxHeight: "70%", overflowY: "scroll" }}>
            <Mui.Grid container>
              <Mui.Grid item xs={12}>
                <Ex.ExInputWrapper.Basic
                  label={"Ten bo de thi:"}
                  required
                  name={"name"}
                  value={add.name}
                  onChange={func.handleChangeAdd}
                />
              </Mui.Grid>
              <Mui.Grid item xs={6}>
                <Ex.ExInputWrapper.Basic
                  label={"Số lượng câu hỏi:"}
                  required
                  type={"number"}
                  name={"numberOfQuestions"}
                  value={parseInt(add.numberOfQuestions)}
                  onChange={func.handleChangeAdd}
                />
              </Mui.Grid>
              <Mui.Grid item xs={6}>
                <Ex.ExInputWrapper.Basic
                  label={"Số đề thi:"}
                  required
                  type={"number"}
                  name={"numberOfTests"}
                  value={add.numberOfTests}
                  onChange={func.handleChangeAdd}
                />
              </Mui.Grid>
              {/* gen */}
              <Mui.Grid item xs={12}>
                {kits ? (
                  <Eui.EuiTable dataColumn={dataColumn2}>
                    {kits.map((row, i) => (
                      <Eui.EuiTable.StyledTableRow key={i}>
                        <Eui.EuiTable.StyledTableCell align="center">
                          {i + 1}
                        </Eui.EuiTable.StyledTableCell>
                        <Eui.EuiTable.StyledTableCell align="center">
                          {row.code}
                        </Eui.EuiTable.StyledTableCell>

                        <Eui.EuiTable.StyledTableCell align="center">
                          <Ex.ExIconEditDelete.Gen
                            onGen={() => func.onOpenGen(row.id, row.name)}
                          />
                        </Eui.EuiTable.StyledTableCell>
                      </Eui.EuiTable.StyledTableRow>
                    ))}
                  </Eui.EuiTable>
                ) : null}
              </Mui.Grid>
            </Mui.Grid>
          </Mui.Stack>

          {/* button */}
          <Mui.Stack
            direction={"row"}
            justifyContent={"flex-end"}
            mt={10}
            spacing={2}
          >
            <Eui.EuiButton.AddNew component={"button"} />
            <Eui.EuiButton.AddType
              name={"Trộn bộ đề"}
              onClick={func.handleGen}
            />
            <Eui.EuiButton.Cancel onClick={() => handleOpenNew.close()} />
          </Mui.Stack>
        </Mui.Stack>
      </Eui.EuiModal.Title>

      {/* tim kiem */}
      <Views.ViewContent title={"Tạo mới khảo thí"}>
        <Views.ViewBoard>
          <Mui.Grid container columnSpacing={5} rowSpacing={2} py={2}>
            <Item>
              <Mui.Grid container columnSpacing={5}>
                <Mui.Grid item xs={6}>
                  <Ex.ExDataSelect.Class
                    onChange={func.handleChange}
                    value={search.classId || ""}
                  />
                </Mui.Grid>
                <Mui.Grid item xs={6}>
                  <Ex.ExDataSelect.Subject
                    id={search.classId}
                    onChange={func.handleChange}
                    value={search.subjectId || ""}
                  />
                </Mui.Grid>
              </Mui.Grid>
            </Item>
            <Item>
              <Ex.ExDataSelect.Matrix
                id={search.subjectId}
                onChange={func.handleChange}
                value={search.matrixId || ""}
              />
            </Item>
            <Item>
              <Mui.Grid container columnSpacing={5}>
                <Mui.Grid item xs={6}>
                  <Ex.ExDataSelect.ExamType value={search.examTypeId || ""} />
                </Mui.Grid>
                <Mui.Grid item xs={6}>
                  <Ex.ExInputWrapper.Select
                    label={"Đề thi:"}
                    name={"testId"}
                    onChange={func.handleChange}
                    data={pages?.data}
                    value={search.testId || ""}
                    required
                  />
                </Mui.Grid>
              </Mui.Grid>
            </Item>
          </Mui.Grid>
          <Mui.Stack
            direction={"row"}
            spacing={2}
            pt={2}
            borderTop={"solid 1px"}
            borderColor={"red"}
          >
            <Eui.EuiButton.AddType
              onClick={func.onOpenGen}
              name={"Trộn câu hỏi"}
            />
          </Mui.Stack>
        </Views.ViewBoard>
      </Views.ViewContent>
    </>
  );
};

export default Create;

const Item = ({ children }) => {
  return (
    <Mui.Grid item xs={12} lg={6}>
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
    name: "Mã đề",
    width: 200,
  },
  {
    name: "Tên đề",
    width: 200,
  },
  {
    name: "Ma trận đề thi",
    width: 200,
  },
  {
    name: "Lớp",
    width: 200,
  },
  {
    name: "Môn",
    width: 200,
  },
  {
    name: "Thao tác",
    width: 200,
  },
];

const dataColumn2 = [
  {
    name: "STT",
    width: 50,
  },
  {
    name: "Mã đề",
  },

  {
    name: "Thao tác",
    width: 100,
  },
];
