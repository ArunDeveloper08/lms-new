import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import  secureLocalStorage  from  "react-secure-storage";
import { mainRoute } from "../App";

const DealerForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: " ",
    gstNumber: " ",
    panCard: " ",
    mobileNo: " ",
    contactPersonName: "",
    email: "",
    bankAccountNumber: "",
    city: "",
    ifscCode: "",
    bankName: "",
    address: "",
    state: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    await axios
      .post(window.MyApiRoute + "dealer/add", user)
      .then((res) => {
        // console.log("response is ", res);
        navigate(`${mainRoute}/dealer`);
      })
      .catch((error) => {
        alert("Error", error.message);
        // console.log("error", error);
      });
  };
  return (
    <>
      <Typography
        variant="h4"
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 5,
          marginBottom: 2,
        }}
      >
        Add Dealer
      </Typography>
      <Box className="grid grid-cols-3 gap-5 w-[80%] m-auto gap-y-10">
        <TextField label="Name" onChange={handleChange} name="name" />
        <TextField label="GST No." onChange={handleChange} name="gstNumber" />
        <TextField label="Pancard" onChange={handleChange} name="panCard" />
        <TextField label="Mobile No." onChange={handleChange} name="mobileNo" />
        <TextField
          label="Contact person Name"
          onChange={handleChange}
          name="contactPersonName"
        />
        <TextField label="Email" onChange={handleChange} name="email" />
        <TextField
          label="Bank Account Number"
          onChange={handleChange}
          name="bankAccountNumber"
        />
        <TextField label="ISFC Code" onChange={handleChange} name="ifscCode" />
        <TextField label="Bank Name" onChange={handleChange} name="bankName" />
        <TextField label="city" onChange={handleChange} name="city" />
        <TextField label="State" onChange={handleChange} name="state" />
        <FormControl className="col-span-3">
          <TextField
            multiline
            rows={2}
            label="Address"
            onChange={handleChange}
            name="address"
          />
        </FormControl>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
        <Button variant="contained" onClick={handleSubmit}>
          Add Dealer
        </Button>
      </Box>
    </>
  );
};

export default DealerForm;
