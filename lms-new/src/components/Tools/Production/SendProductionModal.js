import { Autocomplete, Box, Button, Modal, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";

const  SendProductionModal = ({ open1, setOpen1, checked, tool ,  setBadgeCount ,setOpens ,setChecked}) => {
  const userInfo = JSON.parse(secureLocalStorage.getItem("info")).data;
  const [moreDetails, setMoreDetails] = useState({
    EmployeeId: "",
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
          (employee) => employee?.Designation === "production"
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

  // const handleSubmit = () => {
  //   axios
  //     .put(`${window.MyApiRoute}tool/update?location=engineer`, {
  //       ...moreDetails,
  //       ToolID: tool?.id,
  //       ...userInfo,
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       alert(res.data.message);
  //       setOpen1(!open1);
  //     })
  //     .catch((err) => console.log({ err }));
  // };
  
  const handleSubmits = () => {
    axios
      .put(`${window.MyApiRoute}tool/update?location=production`, {
        ...moreDetails,
        ToolID:tool?.id,
       ...userInfo,
       
      })
      .then((res) => {
        // console.log(res.data);
        alert(res.data.message);
        setBadgeCount(0);
        setChecked([]);
        setOpen1(!open1);
        setOpens(false);
        
      })
      .catch((err) => console.log({ err }));
  };






  return (
    <div>
      <Modal open={open1} onClose={() => setOpen1(!open1)}>
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
         
            <div className="flex justify-center mt-[10px]">
              <Autocomplete
                onChange={(e, selectedOption) =>
                  handleSelect("EmployeeId", selectedOption?.Employee_Id)
                }
                className="flex-1"
                name="IssueForEngineer"
                options={engineer}
                getOptionLabel={(option) => option?.Name}
                renderInput={(params) => (
                  <TextField {...params} label="Select  Name" />
                )}
              />
            </div>
       

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

       
            <div className="flex justify-center mt-[55px]">
              <Button
                variant="contained"
                onClick={handleSubmits}
                sx={{ paddingX: 2 }}
              >
                Submit
              </Button>
            </div>
       
        </Box>
      </Modal>
    </div>
  );
};

export default SendProductionModal;
