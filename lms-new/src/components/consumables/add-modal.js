import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";

const AddModal = ({ modal, setModal }) => {
  return (
    <Dialog
      open={modal.open}
      PaperProps={{ style: { width: "700px" } }}
      onClose={() => setModal((p) => ({ ...p, open: false }))}>
      <DialogTitle textAlign="center">Add Product Modal </DialogTitle>
      <DialogContent>Modal Body</DialogContent>
      <DialogActions>
        <Button variant="contained" color="success" onClick={() => {}}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddModal;
