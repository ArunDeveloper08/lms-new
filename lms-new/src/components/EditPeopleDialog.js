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

const EditPeopleDialog = ({ open, setOpen, api1 }) => {
  // const [ data, setData ]=useState(open.data)
  // console.log("item", open);

  const handleClose = () => {
    setOpen({ ...open, value: false });
  };
  const handleChange = (e) => {
    // console.log(e.target.checked)
    setOpen({
      ...open,
      data: { ...open.data, [e.target.name]: e.target.value },
    });
  };
  const handleCheckboxChange = (e) => {
    setOpen({
      ...open,
      data: { ...open.data, [e.target.name]: e.target.checked },
    });
  };
  const api = () => {
    axios
      .put(window.MyApiRoute + "employee/edit", { ...open.data })
      .then((res) => {
        api1();
        // setUsers(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  };
  const handleUpdate = () => {
    api();
    setOpen({ ...open, value: false });
  };
  return (
    <div>
      <Dialog
        fullWidth
        open={open.value}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="flex flex-wrap justify-around">
          <p>Name:&nbsp;{open.data.Name}</p>
          <p>Id:&nbsp;{open.data.Employee_Id}</p>
        </DialogTitle>
        <DialogContent>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-10 pt-3">
            <TextField
              id="outlined-basic"
              label="Mobile No"
              variant="outlined"
              value={open.data.MobileNo}
              onChange={handleChange}
              name="MobileNo"
            />
            {/* <TextField id="outlined-basic" label="Designation" variant="outlined" value={open.data.Designation} onChange={handleChange} name="Designation" /> */}
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              value={open.data.Password}
              onChange={handleChange}
              name="Password"
            />
            <FormControl>
              <InputLabel>Designation</InputLabel>
              <Select
                fullWidth
                label="Designation"
                name="Designation"
                variant="filled"
                value={open.data.Designation}
                // MenuProps={MenuProps}
                onChange={handleChange}
                sx={{ paddingY: 0, marginBottom: 1.5 }}
              >
                <MenuItem value="storekeeper">Store</MenuItem>
                <MenuItem value="production">Production</MenuItem>
                <MenuItem value="engineer">Field Engineer</MenuItem>
                <MenuItem value="CRM">CRM</MenuItem>
              </Select>
            </FormControl>
            <p className="hidden md:block"></p>
            <FormControlLabel
              control={<Checkbox checked={open.data.isAdmin} />}
              label="Admin"
              onChange={handleCheckboxChange}
              name="isAdmin"
            />
            <FormControlLabel
              control={<Checkbox checked={open.data.Employee_Active_Status} />}
              label="Employee Active Status"
              onChange={handleCheckboxChange}
              name="Employee_Active_Status"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleUpdate} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditPeopleDialog;
