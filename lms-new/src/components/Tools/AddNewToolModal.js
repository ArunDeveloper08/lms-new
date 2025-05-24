import { Box, Button, Modal, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import secureLocalStorage from "react-secure-storage";

const AddNewToolModal = ({ open, setOpen ,tool }) => {
  const [toolName, setToolName] = useState({
    SerialNumber:"",
    remark:""
  });

  const handleClose = () => {
    setOpen(!open);
  };
  const handleChange = (e) => {
    if (e.target.name === "SerialNumber") {
      setToolName({
        ...toolName,
        [e.target.name]: e.target.value.split(",")// Split the input by a delimiter
      });
    } else {
      setToolName({
        ...toolName,
        [e.target.name]: e.target.value
      });
    }
  };
  
 const {data}=JSON.parse(secureLocalStorage.getItem("info"))



const handleSubmit2=()=>{
 axios.post(`${window.MyApiRoute}tool/add?ToolID=${tool.id}`,{...toolName,...data})
 .then((res)=>{

  alert(res.data.message);
  setOpen(!open)
 })
 .catch((err)=>{
  console.log(err);
 })
}

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
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
            width: 500,
            height: 400,
          }}
        >
 
      <div>
          <div className="flex justify-center">
        <TextField
          label="Serial Number"
          sx={{ marginTop: 3 }}
          name="SerialNumber"
          multiline={3}
          fullWidth
          onChange={handleChange}
        />
      </div>
          <div className="flex justify-center">
        <TextField
          label="Remark"
          sx={{ marginTop: 3 }}
          name="remark"
          multiline={3}
          fullWidth
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-center mt-[30px]">
        <Button variant="contained" onClick={handleSubmit2}>
     Submit
        </Button>
      </div>
      </div>
 
     

        </Box>
      </Modal>
    </div>
  );
};

export default AddNewToolModal;
