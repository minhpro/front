import { Stack } from "@mui/material";
import React from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

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
