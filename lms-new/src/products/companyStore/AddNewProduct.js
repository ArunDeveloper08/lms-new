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
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ProductList } from "../../constants/ProductList";
import secureLocalStorage from "react-secure-storage";
import "sweetalert2/dist/sweetalert2.min.css";

const AddNewProduct = ({ setOpenAdd, openAdd, api }) => {
  const a = JSON.parse(secureLocalStorage.getItem("info")).data;
  const { selectedItem } = useSelector((state) => state.itemReducer);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    Meter_Serial_No: "",
    Category: "A",
    product: selectedItem,
    remark: "",
    Employee_Id: a.Employee_Id,
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (isNaN(data.Meter_Serial_No)) {
      alert("Meter Serial Number Should be a Number");
      return;
    }

    if (data.Meter_Serial_No.trim().length < 3) {
      return alert("Serial Number must be Atleast 3 characters");
    }
    setLoading(true); 
    axios
      .post(window.MyApiRoute + `record/add?category=${data.product}`, data)
      .then((res) => {
        alert(res.data.message);
        api();
      })
      .catch((err) => alert(err.response.data.message))
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
        Add a New Product
      </DialogTitle>
      <DialogContent className="space-y-5">
        <TextField
          disabled={loading}
          onChange={handleChange}
          sx={{ marginTop: 3 }}
          fullWidth
          name="Meter_Serial_No"
          label="Serial Number"
        />

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
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="Category"
            disabled={loading}
            value={data.Category}
            label="Category"
            onChange={handleChange}           
          >
            <MenuItem value="A">A</MenuItem>
            <MenuItem value="B">B</MenuItem>
            <MenuItem value="C">C</MenuItem>
            <MenuItem value="D">D</MenuItem> 
          </Select>          
        </FormControl>       
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

export default AddNewProduct;
