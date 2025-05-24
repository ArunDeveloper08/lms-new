import { Box, Button, Modal, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const AddNewTool = ({ yes, setYes, tool }) => {
  const [toolName, setToolName] = useState({
    ToolName: " ",

    remark: "",
  });
  const handleChange = (e) => {
    setToolName({ ...toolName, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    axios
      .post(`${window.MyApiRoute}mastertool/add`, toolName)
      .then((res) => {
    
        alert(res.data.message);
        setYes(!yes);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      
      });
  };
  return (
    <Modal open={yes} onClose={() => setYes(!yes)}>
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
          height: 300,
        }}
      >
        <div>
          <div className="flex justify-center">
            <TextField
              label="Add Tool Group"
              sx={{ marginTop: 3 }}
              name="ToolName"
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-center mt-[50px]">
            <Button variant="contained" onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default AddNewTool;
