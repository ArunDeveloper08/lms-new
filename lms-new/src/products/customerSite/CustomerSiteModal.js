import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import  secureLocalStorage  from  "react-secure-storage";
import {
  Button,
  DialogActions,
  // DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
const CustomerSiteModal = ({ modal, setModal, api }) => {
  const [remark, setRemark] = useState("");
  const { selectedItem } = useSelector((state) => state.itemReducer);

  const handleClose = () => {
    setModal({ ...modal, open: false });
  };
  const handleSubmit = () => {
    const info = JSON.parse(secureLocalStorage.getItem("info")).data;
    if (modal.type === "reject") {
      axios
        .put(
          window.MyApiRoute +
            `record/update?category=${selectedItem}&check=rejected`,
          {
            sim: [{ ...modal.data }],
            remark,
            ...info,
          }
        )
        .then((res) => ( api(), alert(res.data.message)))
        .catch((err) => alert("Error", err.message));
    }
    if (modal.type === "recieve") {
      axios
        .put(
          window.MyApiRoute +
            `record/update?category=${selectedItem}&check=toRecieve`,
          {
            ...modal.data,
            remark,
            ...info,
          }
        )
        .then((res) => (console.log(res.data), api(), alert(res.data.message)))
        .catch((err) => alert("Error", err.message));
    }
  };
  const handleChange = (e) => {
    setRemark(e.target.value);
  };
  return (
    <Dialog
      open={modal.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        sx={{ width: 500, textAlign: "center", fontWeight: 500 }}
        id="alert-dialog-title"
      >
        {modal.type === "reject" && "Send To Reject"}
        {modal.type === "recieve" && "Send To Store"}
      </DialogTitle>
      <DialogContent>
        <TextField
          onChange={handleChange}
          sx={{ marginTop: 3 }}
          fullWidth
          multiline
          rows={4}
          label="Add Your Remark"
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomerSiteModal;
