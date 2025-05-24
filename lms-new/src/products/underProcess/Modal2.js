import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,

  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import secureLocalStorage from "react-secure-storage";

const Modal2 = ({ open, setOpen, item }) => {
  const a = JSON.parse(secureLocalStorage.getItem("info")).data;
  const { selectedItem } = useSelector((state) => state.itemReducer);
  const [loading, setLoading] = useState(false);


  const [data, setData] = useState({
    Meter_Serial_No: "",
    underProcessSerialNumber: item,
    remark: "",
    Employee_Id: a.Employee_Id,
  });
  useEffect(() => {
    setData({ ...data, underProcessSerialNumber: item });
  }, [item]);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    setLoading(true);
    if (data.Meter_Serial_No === "") {
      alert("No Serial Number Found");
      return setLoading(false);
    }
    axios
      .put(
        window.MyApiRoute +
        `record/update?category=${selectedItem}&check=underProcess`,
        data
      )
      .then((res) => {
        alert(res.data.message);

      })
      .catch((err) => {
        alert(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleClose = () => {
    if (loading) return;
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        sx={{ width: 500, textAlign: "center", fontWeight: 500 }}
        id="alert-dialog-title"
      >
        Send Product
      </DialogTitle>
      <DialogContent className="space-y-5">
        <TextField
          className="mt-2"
          onChange={handleChange}
          value={data.underProcessSerialNumber ?? " "}
          fullWidth
          name="underProcessSerialNumber"
          label="Serial No."
        />
        <TextField
          onChange={handleChange}
          disabled={loading}
          fullWidth
          name="Meter_Serial_No"
          label="Product Serial No."
        />
        <TextField
          onChange={handleChange}
          disabled={loading}
          fullWidth
          name="remark"
          label="Remark"
          multiline
          rows={3}
        />
      </DialogContent>
      <DialogActions>
        <Button
          disabled={loading}
          variant="contained"
          onClick={handleSubmit}
          color="success"
        >
          {loading ? "Submitting" : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal2;
