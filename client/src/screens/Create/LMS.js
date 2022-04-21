import React from "react";
import * as Sui from "components";
import { titleData } from "assets/contants";
import * as Ex from "Example";
import { HandleInput } from "Class";

import * as Api from "api";
import * as Class from "Class";
import { Box, Stack } from "@mui/material";
export const LMS = () => {
  return <div>LMS</div>;
};

LMS.Chapter = function Chapter({ onClose, ...rest }) {
  // state
  const [create, setCreate] = React.useState({
    chapterName: "",
    classId: null,
    subjectId: null,
    code: "",
  });
  // class
  const handleInput = new HandleInput(setCreate, create);

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
      onClose();
    } else {
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
            value={create.classId}
          />
          <Ex.SelectLMS.Basic.Subject
            required
            id={create.classId}
            onChange={handleChange}
            value={create.subjectId}
          />
          <Sui.Input.Label.Text
            label={titleData.LMS.Code}
            name={"code"}
            required
            onChange={handleChange}
            placeholder={titleData.LMS.TypeCode}
          />
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
};
