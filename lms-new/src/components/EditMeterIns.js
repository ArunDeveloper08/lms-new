import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import  secureLocalStorage  from  "react-secure-storage";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
const EditMeterIns = ({ edit, setEdit, api }) => {
  const [title, setTitle] = useState("");
  const a = JSON.parse(secureLocalStorage.getItem("info")).data;
  const handleClose = () => {
    setEdit({ ...edit, open: false });
  };
  const handleUpdate = () => {
    axios
      .put(window.MyApiRoute + "record/update", {
        Meter_Serial_No: edit.data.Meter_Serial_No,
        remark: title,
        ...a,
      })
      .then((res) => {
        alert(res.data.message);
        setEdit({ ...edit, open: false });
        api();
      })
      .catch((err) => alert(err.message));
  };
  return (
    <div>
      <Dialog
        fullWidth
        open={edit.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="flex flex-wrap justify-around">
          Meter Serial No:{edit.data.Meter_Serial_No}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Activity Log"
            sx={{ marginTop: 1 }}
            fullWidth
            multiline
            onChange={(e) => setTitle(e.target.value)}
            rows={5}
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" onClick={handleClose}>
            Back
          </Button>
          <Button
            color="success"
            variant="contained"
            onClick={handleUpdate}
            autoFocus
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditMeterIns;
