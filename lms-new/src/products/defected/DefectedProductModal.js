import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import {
  Button,
  DialogActions,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import  secureLocalStorage  from  "react-secure-storage";
import axios from "axios";
const DefectedProductModal = ({ open, setOpen, api, selectedItem }) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const info = JSON.parse(secureLocalStorage.getItem("info")).data;
  const isStoreKeeper = info.Designation === "storekeeper";
  const handleClose = () => {
    setOpen({ ...open, open: false });
  };
  const handleSubmit = () => {
    if (isStoreKeeper) {
     
      setLoading(true);
      axios
        .put(
          window.MyApiRoute +
            "record/update?category=" +
            selectedItem +
            "&check=toRecieve",
          {
            remark: title,
            ...open.data,
            ...info,
          }
        )
        .then((res) => ( api(), alert(res.data.message)))
        .catch((err) => alert("Error", err.message))
        .finally(() => {
          setLoading(false);
          setOpen({ ...open, open: false });
        });
    } else {
      axios
        .put(
          window.MyApiRoute +
            selectedItem +
            "sim/update?check=toRecieve",
          { remark: title, ...info, sim: [{ ...open.data }] }
        )
        .then((res) => (console.log(res.data), api(), alert(res.data.message)))
        .catch((err) => alert("Error", err.message))
        .finally(() => {
          setLoading(false);
          setOpen({ ...open, open: false });
        });
    }
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
        {isStoreKeeper ? "Recieve In Store " : "Add Remark"}
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

export default DefectedProductModal;
