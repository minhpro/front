
import {
     Dialog, 
     DialogTitle, 
     DialogContent, 
     DialogActions,
     Box, 
     IconButton,
     Button,
     Typography
} from "@mui/material";

import { Close } from "@mui/icons-material";

export default function ConfirmDialog({title, detail, handleClose, handleConfirm}) {
    return (
      <Dialog open={true} maxWidth="sm" fullWidth>
        <DialogTitle>{title}</DialogTitle>
        <Box position="absolute" top={0} right={0}>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
        <DialogContent>
          <Typography>{detail}</Typography>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="contained" onClick={handleClose}>
            Hủy
          </Button>
          <Button color="secondary" variant="contained" onClick={handleConfirm}>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    );
  };