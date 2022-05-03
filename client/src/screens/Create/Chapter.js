import React from "react";
import * as Sui from "components";
import { titleData } from "assets/contants";
import * as Ex from "Example";
import { HandleInput } from "Class";

import * as Api from "api";
import * as Class from "Class";
import { Box, Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import * as Slide from "redux/slide";

export function Chapter({ onClose, ...rest }) {
  // state
  const [create, setCreate] = React.useState({
    chapterName: "",
    classId: null,
    subjectId: null,
    code: "",
  });
  // class
  const handleInput = new HandleInput(setCreate, create);

  const dispatch = useDispatch();

  //   function

  function handleChange(e) {
    handleInput.change(e);
    console.log("sad");
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (create.chapterName && create.subjectId) {
      try {
        const res = await Api.chapterApi.add(
          create.subjectId,
          create.chapterName,
          create.code,
          []
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
      setCreate({
        chapterName: "",
        classId: null,
        subjectId: null,
        code: "",
      });
      dispatch(Slide.snackbarSlide.open({ message: "Đã tạo chủ đề mới" }));
      onClose();
    } else {
      dispatch(
        Slide.snackbarSlide.open({
          message: "Đã tạo chủ đề mới",
          severity: "warning",
        })
      );
    }
  }

  return (
    <Sui.Modal.BasicModal.Title
      title={titleData.LMS.AddChapter}
      handleClose={onClose}
      {...rest}
    >
      <Box component={"form"} onSubmit={handleAdd}>
        <Stack>
          <Ex.SelectLMS.Basic.Class
            required
            onChange={handleChange}
            value={create.classId || ""}
          />
          <Ex.SelectLMS.Basic.Subject
            required
            id={create.classId}
            onChange={handleChange}
            value={create.subjectId || ""}
          />
          {/* <Sui.Input.Label.Text
            label={titleData.LMS.Code}
            name={"code"}
            required
            onChange={handleChange}
            placeholder={titleData.LMS.TypeCode}
          /> */}
          <Sui.Input.Label.Text
            label={titleData.LMS.Chapter}
            name={"chapterName"}
            required
            onChange={handleChange}
            placeholder={titleData.LMS.TypeChapter}
          />
        </Stack>
        <Stack direction={"row"} justifyContent={"center"} spacing={5} pt={5}>
          <Sui.Button.Basic.Cancel onClick={onClose} />
          <Sui.Button.Basic.Create component={"button"} />
        </Stack>
      </Box>
    </Sui.Modal.BasicModal.Title>
  );
}

Chapter.Update = function Update({ onClose, id, ...rest }) {
  const [data, setData] = React.useState({
    name: "",
    code: null,
    unitData: [],
  });

  const handleInput = new HandleInput(setData, data);

  function handleChange(e) {
    handleInput.change(e);
  }

  const dispatch = useDispatch();

  async function getData() {
    try {
      const res = await Api.chapterApi.detail(id);
      console.log(res);
      setData(res);
    } catch (error) {
      console.error(error);
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const res = await Api.chapterApi.update(id, data.name);
      console.log(res);

      dispatch(
        Slide.snackbarSlide.open({ message: titleData.LMS.UpdateChapter })
      );
    } catch (error) {
      console.error(error);
    }
    onClose();
  }

  React.useEffect(() => {
    getData();
  }, [id]);

  return (
    <Sui.Modal.BasicModal.Title
      title={"Cập nhật chủ đề"}
      handleClose={onClose}
      {...rest}
    >
      <Box component={"form"} onSubmit={onSubmit}>
        <Stack>
          <Sui.Input.Label.Text
            label={titleData.LMS.Chapter}
            name={"name"}
            required
            onChange={handleChange}
            placeholder={titleData.LMS.TypeChapter}
            value={data.name || ""}
          />
          <Sui.Input.Label.Text
            label={titleData.LMS.Code}
            name={"code"}
            required
            disabled
            value={data.code || ""}
            onChange={handleChange}
            placeholder={titleData.LMS.TypeCode}
          />
        </Stack>
        <Stack direction={"row"} justifyContent={"center"} spacing={5} pt={5}>
          <Sui.Button.Basic.Cancel onClick={onClose} />
          <Sui.Button.Basic.Update component={"button"} />
        </Stack>
      </Box>
    </Sui.Modal.BasicModal.Title>
  );
};
