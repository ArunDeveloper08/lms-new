import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Button, DialogActions, DialogTitle, TextField } from "@mui/material";
import axios from "axios";
import  secureLocalStorage  from  "react-secure-storage";
import { useSelector } from "react-redux";
const RemarkModal1 = ({ modal, setModal, api, open }) => {
  const [title, setTitle] = useState("");
  const { selectedItem } = useSelector((state) => state.itemReducer);
  console.log({ open });
  const handleClose = () => {
    setModal(false);
  };
  const handleSubmit = () => {
    const info = JSON.parse(secureLocalStorage.getItem("info")).data;
    console.log(open);
    axios
      .put(
        window.MyApiRoute +
          "record/update?category=" +
          selectedItem +
          "&check=" +
          open.to,
        { sim: [open.value], remark: title, ...info }
      )
      .then((res) => (api(), alert(res.data.message)))
      .catch((err) => alert("Error", err));
    setModal(false);
  };
  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  return (
    <Dialog
      open={modal}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        sx={{ width: 500, textAlign: "center", fontWeight: 500 }}
        id="alert-dialog-title"
      >
        {`Send To
        ${open.to === "toProduction" ? "Production" : ""}
        ${open.to === "toRecieve" ? "Store" : ""}
        ${open.to === "defective" ? "Defected" : ""}
        ${open.to === "toSite" ? "Site Store" : ""}
        ${open.to === "rejected" ? "Rejected" : ""}`}
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

export default RemarkModal1;
