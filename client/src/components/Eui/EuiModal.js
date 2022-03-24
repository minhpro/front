import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Stack } from "@mui/material";

export const EuiModal = ({ open, handleClose, w, mw, children }) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style} width={w || 400} maxWidth={mw || null}>
          {children}
        </Box>
      </Fade>
    </Modal>
  );
};

EuiModal.Title = function ({ children, title, ...rest }) {
  return (
    <EuiModal {...rest}>
      <Stack direction={"column"} white={"100%"}>
        <Stack py={1} width={"100%"} bgcolor={"grey.400"} alignItems={"center"}>
          <p>{title || "title"}</p>
        </Stack>
        <Box width={"100%"} p={2}>
          {children}
        </Box>
      </Stack>
    </EuiModal>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  borderRadius: 5,
  overflow: "hidden",
  transform: "translate(-50%, -50%)",
  //   width: 400,
  bgcolor: "background.paper",
  maxHeight: 600,
  // overflowY: "scroll",
  //   border: "2px solid #000",
  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.4)",
  //   p: 4,
};
