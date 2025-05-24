import React, { useEffect, useState } from "react";
import  secureLocalStorage  from  "react-secure-storage";
import {
  Autocomplete,
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  height: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EngineerProductModal = ({
  setEng,
  eng,
  setOpen,
  open,
  selectedRowIndex,
  setSelectedRowIndex,
  details,
  setDetails,
  userInfo,
}) => {
  const [serialNo, setSerialNo] = useState([]);
  const [selectedMeterSerialNo, setSelectedMeterSerialNo] = useState("");


  const handleClose = () => {
    setOpen(false);
    setSelectedRowIndex(null);
  };
  const handleChange = (e) => {
    setEng({ ...eng, [e.target.name]: e.target.value });
  };
  const Sumbit = () => {
    if (selectedRowIndex !== null) {
      const updatedDetails = [...details];
      const item = details[selectedRowIndex];
      if (userInfo.Designation === "storekeeper") {
        updatedDetails[selectedRowIndex] = {
          ...item,
          returnableSerialNo: selectedMeterSerialNo,
        };
      } else {
        updatedDetails[selectedRowIndex] = {
          ...item,
          returnableSerialNo: eng.productSrNo,
        };
      }
      updatedDetails.forEach((item) => {
        if (!item.returnableSerialNo) {
          item.returnableSerialNo = "";
        }
      });

      setDetails(updatedDetails);
      setOpen(false);
      setSelectedRowIndex(null);
    }
  };

  useEffect(() => {
    axios
      .post(
        `${window.MyApiRoute}record/get?location=inStore&category=${details[0]?.productType}`,
        userInfo
      )
      .then((res) => {
        console.log("res", res.data);
        setSerialNo(res.data?.Data);
      })
      .catch((error) => {
        console.log("err", error);
      });
  }, []);

  const handleSelect = (name, value, event) => {
    if (name === "Meter_Serial_No") {
      setSelectedMeterSerialNo(value);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            Return Other Product
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              margin: "20px 20px 20px 0",
            }}
          >
            {userInfo.Designation === "storekeeper" ? (
              ""
            ) : (
              <>
                {" "}
                <Typography sx={{ display: "flex", alignItems: "center" }}>
                  Product serial No.
                </Typography>
                <TextField
                  placeholder="Serial No."
                  name="productSrNo"
                  onChange={handleChange}
                />
              </>
            )}
          </Box>
          {userInfo.Designation === "storekeeper" && (
            <>
              <Autocomplete
                fullWidth
                freeSolo
                onChange={(e, f) => handleSelect("Meter_Serial_No", f, e)}
                options={serialNo.map((option) => option.Meter_Serial_No)}
                renderInput={(params) => (
                  <TextField
                    onChange={(e, f) =>
                      handleSelect("Meter_Serial_No", e.target.value)
                    }
                    {...params}
                    label="Product Serial No"
                  />
                )}
              />
            </>
          )}

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              margin: "50px 20px 20px 0",
            }}
          >
            <Button variant="contained" onClick={Sumbit}>
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default EngineerProductModal;
