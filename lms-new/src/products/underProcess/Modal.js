import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ProductList } from "../../constants/ProductList";
import secureLocalStorage from "react-secure-storage";
import toast, { Toaster } from 'react-hot-toast';

const Modal = ({ setOpenAdd, openAdd }) => {
  const a = JSON.parse(secureLocalStorage.getItem("info")).data;
  const { selectedItem } = useSelector((state) => state.itemReducer);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    ProductCount: "",
    product: selectedItem,
    remark: "",
    Employee_Id: a.Employee_Id,
    Job_Card: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    if (data.Job_Card === "") {
      return toast.error("Enter Job card No.");
    }
    if (data.ProductCount === "") {
      return toast.error("Enter Job Product Quantity");
    }
    setLoading(true);
    axios
      .post(
        window.MyApiRoute +
          `record/add?category=${data.product}&underProcess=true`,
        data
      )
      .then((res) => {
        alert(res.data.message);
        setOpenAdd(false);
      })
      .catch((err) => alert("Error", err.message))
      .finally(() => {
        setLoading(false);
      });
  };
  const handleClose = () => {
    if (loading) return;
    setOpenAdd(false);
  };

  return ( 
    <Dialog
      open={openAdd}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        sx={{ width: 500, textAlign: "center", fontWeight: 500 }}
        id="alert-dialog-title"
      >
        Add Product
      </DialogTitle>
      <DialogContent className="space-y-5">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Product</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            disabled={loading}
            value={data.product}
            name="product"
            label="Product"
            onChange={handleChange}
          >
            {ProductList.map((item) => (
              <MenuItem value={item[1]}>{item[0]}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          type="number"
          onChange={handleChange}
          disabled={loading}
          value={data.ProductCount}
          fullWidth
          name="ProductCount"
          label="Raw material issue for qty:-"
        />
        <TextField
          onChange={handleChange}
          disabled={loading}
          fullWidth
          name="Job_Card"
          label="Job Card No."
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
      <Toaster />
    </Dialog>
  );
};

export default Modal;
