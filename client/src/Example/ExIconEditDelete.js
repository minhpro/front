import { Stack } from "@mui/material";
import React from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { AddAlarmRounded } from "@mui/icons-material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
export const ExIconEditDelete = ({ onEdit, onDelete }) => {
  return (
    <Stack direction={"row"} justifyContent="center" spacing={1}>
      <ModeEditIcon onClick={onEdit} sx={{ ...style }} />
      <DeleteIcon onClick={onDelete} sx={{ ...style }} />
    </Stack>
  );
};

const style = {
  fontSize: 25,
  cursor: "pointer",
  ":hover": { color: "blue" },
};

ExIconEditDelete.View = function ({ onEdit, onDelete, onView }) {
  return (
    <Stack direction={"row"} justifyContent="center" spacing={1}>
      <VisibilityIcon onClick={onView} sx={{ ...style }} />
      <ModeEditIcon onClick={onEdit} sx={{ ...style }} />
      <DeleteIcon onClick={onDelete} sx={{ ...style }} />
    </Stack>
  );
};

ExIconEditDelete.ViewOnly = function ({ onEdit, onDelete, onView }) {
  return (
    <Stack direction={"row"} justifyContent="center" spacing={1}>
      <VisibilityIcon onClick={onView} sx={{ ...style }} />
      {/* <ModeEditIcon onClick={onEdit} sx={{ ...style }} />
      <DeleteIcon onClick={onDelete} sx={{ ...style }} /> */}
    </Stack>
  );
};

ExIconEditDelete.DeleteOnly = function ({ onDelete }) {
  return (
    <Stack direction={"row"} justifyContent="center" spacing={1}>
      <DeleteIcon onClick={onDelete} sx={{ ...style }} />
    </Stack>
  );
};

ExIconEditDelete.Gen = function ({ onGen }) {
  return (
    <Stack direction={"row"} justifyContent="center" spacing={1}>
      <AddAlarmRounded onClick={onGen} sx={{ ...style }} />
    </Stack>
  );
};

ExIconEditDelete.ViewDelete = function ({ onEdit, onDelete, onView }) {
  return (
    <Stack direction={"row"} justifyContent="center" spacing={1}>
      <VisibilityIcon onClick={onView} sx={{ ...style }} />
      {/* <ModeEditIcon onClick={onEdit} sx={{ ...style }} /> */}
      <DeleteIcon onClick={onDelete} sx={{ ...style }} />
    </Stack>
  );
};

ExIconEditDelete.Work = function ({ onWork }) {
  return (
    <Stack direction={"row"} justifyContent="center" spacing={1}>
      <AppRegistrationIcon onClick={onWork} sx={{ ...style }} />
    </Stack>
  );
};

ExIconEditDelete.Wait = function ({ onWait }) {
  return (
    <Stack direction={"row"} justifyContent="center" spacing={1}>
      <HourglassEmptyIcon onClick={onWait} sx={{ ...style }} />
    </Stack>
  );
};
