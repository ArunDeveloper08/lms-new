import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Button, DialogActions, DialogTitle, TextField } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import  secureLocalStorage  from  "react-secure-storage";
const ProductionRemarkModal = ({ setOpen, api, open }) => {
  const [title, setTitle] = useState("");
  const { selectedItem } = useSelector((state) => state.itemReducer);

  const handleClose = () => {
    setOpen((prev) => ({ ...prev, open: false }));
  };
  const handleSubmit = () => {
    const info = JSON.parse(secureLocalStorage.getItem("info")).data;
    axios
      .put(
        window.MyApiRoute +
          "record/update?category=" +
          selectedItem +
          "&check=" +
          open.to,
        { sim: [open.value], remark: title, ...info }
      )
      .then((res) => {
        console.log(res.data);
        api();
        alert(res.data.message);
      })
      .catch((err) => alert("Error", err));
    setOpen((prev) => ({ ...prev, open: false }));
  };
  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  return (
    <Dialog
      open={open.open}
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

export default ProductionRemarkModal;
