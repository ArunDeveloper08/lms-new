import { Autocomplete, Box, Button, Modal, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";

const SendEngineerModal = ({
  open,
  setOpen,
  checked,
  tool,
  challanNumber,
  setBadgeCount,
  setOpens,
  setChecked
}) => {
  const userInfo = JSON.parse(secureLocalStorage.getItem("info")).data;
  const [moreDetails, setMoreDetails] = useState({
    EngineerID: "",
    remark: "",
    SerialNumber: checked,
  });

  const [engineer, setEngineer] = useState([]);
  const handleSelect = (a, b) => {
    setMoreDetails((p) => ({ ...p, [a]: b }));
  };

  useEffect(() => {
    axios
      .get(`${window.MyApiRoute}employee/names`)
      .then((res) => {
        const engineerData = res.data?.data.filter(
          (employee) => employee?.Designation === "engineer"
        );
        setEngineer(engineerData);
      })
      .catch((err) => console.log({ err }));
  }, []);

  useEffect(() => {
    setMoreDetails((prevDetails) => ({
      ...prevDetails,
      SerialNumber: checked,
    }));
  }, [checked]);

  const handleSubmit = () => {
    axios
      .put(`${window.MyApiRoute}tool/update?location=engineer`, {
        ...moreDetails,
        ToolID: tool?.id,
        challanNumber: challanNumber,

        ...userInfo,
      })
      .then((res) => {
    
        alert(res.data.message);
        setBadgeCount(0);
        setChecked([])
        setOpen(!open);
        setOpens(false)
      
      })
      .catch((err) => console.log({ err }))
      
  };

  const handleSubmits = () => {
    axios
      .put(`${window.MyApiRoute}tool/update?location=return`, {
        ...moreDetails,
        ToolID: tool?.id,
        challanNumber: challanNumber,
        ...userInfo,
      })
      .then((res) => {
     
        alert(res.data.message);
        setBadgeCount(0);
        setOpen(!open);
     
      })
      .catch((err) => console.log({ err }))
      
  };

  return (
    <div>
      <Modal open={open} onClose={() => setOpen(!open)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            width: 400,
            height: 400,
          }}
        >
          {userInfo.Designation === "storekeeper" && (
            <div className="flex justify-center mt-[10px]">
              <Autocomplete
                onChange={(e, selectedOption) =>
                  handleSelect("EngineerID", selectedOption?.Employee_Id)
                }
                className="flex-1"
                name="IssueForEngineer"
                options={engineer}
                getOptionLabel={(option) => option?.Name}
                renderInput={(params) => (
                  <TextField {...params} label="Select Engineer Name" />
                )}
              />
            </div>
          )}

          <div className="flex justify-center mt-[50px]">
            <TextField
              label="Remark"
              sx={{ marginTop: 3 }}
              name="remark"
              multiline={3}
              fullWidth
              onChange={(e, f) => handleSelect("remark", e.target.value)}
              //   onChange={handleChange}
            />
          </div>
          {userInfo.Designation === "storekeeper" && (
            <div className="flex justify-center mt-[55px]">
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ paddingX: 2 }}
              >
                Send
              </Button>
            </div>
          )}
          {(userInfo.Designation === "engineer" ||
            userInfo.Designation === "production" ||
            userInfo.Designation === "Mechanical") && (
            <div className="flex justify-center mt-[55px]">
              <Button
                variant="contained"
                onClick={handleSubmits}
                sx={{ paddingX: 2 }}
              >
                Submit
              </Button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default SendEngineerModal;
