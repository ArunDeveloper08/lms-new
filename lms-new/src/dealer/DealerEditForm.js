import React from "react";

import { Box, Button, FormControl, TextField, Typography } from "@mui/material";

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { mainRoute } from "../App";

const DealerEditForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(location.state);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    axios
      .put(window.MyApiRoute + "dealer/update", user)
      .then((res) => {
        // console.log(res);
        navigate(`${mainRoute}/dealer`);
      })
      .catch((error) => {
        console.log("error while updating", error);
      });
  };
  return (
    <div>
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
          Edit Dealer
        </Typography>

        <Box className="grid grid-cols-3 gap-5 w-[80%] m-auto gap-y-10">
          <TextField
            value={user.name}
            label="Name"
            onChange={handleChange}
            name="name"
          />
          <TextField
            value={user.gstNumber}
            label="GST No."
            onChange={handleChange}
            name="gstNumber"
          />
          <TextField
            value={user.panCard}
            label="Pancard"
            onChange={handleChange}
            name="panCard"
          />
          <TextField
            value={user.mobileNo}
            label="Mobile No."
            onChange={handleChange}
            name="mobileNo"
          />
          <TextField
            value={user.contactPersonName}
            label="Contact person Name"
            onChange={handleChange}
            name="contactPersonName"
          />
          <TextField
            value={user.email}
            label="Email"
            onChange={handleChange}
            name="email"
          />
          <TextField
            value={user.bankAccountNumber}
            label="Bank Account Number"
            onChange={handleChange}
            name="bankAccountNumber"
          />
          <TextField
            value={user.ifscCode}
            label="ISFC Code"
            onChange={handleChange}
            name="ifscCode"
          />
          <TextField
            value={user.bankName}
            label="Bank Name"
            onChange={handleChange}
            name="bankName"
          />
          <TextField
            value={user.city}
            label="city"
            onChange={handleChange}
            name="city"
          />
          <TextField
            value={user.state}
            label="State"
            onChange={handleChange}
            name="state"
          />
          <FormControl className="col-span-3">
            <TextField
              multiline
              value={user.address}
              rows={2}
              label="Address"
              onChange={handleChange}
              name="address"
            />
          </FormControl>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </>
    </div>
  );
};

export default DealerEditForm;
