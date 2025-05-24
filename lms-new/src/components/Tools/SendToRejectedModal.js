import { Autocomplete, Box, Button, Modal, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";

const SendToRejectedModal = ({ yes, setYes, checked, tool,  setBadgeCount ,setOpens ,setChecked}) => {
  const userInfo = JSON.parse(secureLocalStorage.getItem("info")).data;
  const [moreDetails, setMoreDetails] = useState({
   
    remark: "",
    SerialNumber: checked,
  });
  
  const handleSelect = (a, b) => {
    setMoreDetails((p) => ({ ...p, [a]: b }));
  };

  

  useEffect(() => {
    setMoreDetails((prevDetails) => ({
      ...prevDetails,
      SerialNumber: checked,
    }));
  }, [checked]);

  const handleSubmit = () => {
    axios
      .put(`${window.MyApiRoute}tool/update?location=storeToRejected`, {
        ...moreDetails,
        "ToolID":tool?.id,
        ...userInfo,
      })
      .then((res) => {
        
        alert(res.data.message);
        setBadgeCount(0);
        setChecked([]);
        setYes(!yes);
        setOpens(false);
      })
      .catch((err) => console.log({ err }));
  };
 
  return (
    <div>
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
            width: 400,
            height: 400,
          }}
        >
          

          <div className="flex justify-center mt-[50px]">
            <TextField
              label="Remark"
              sx={{ marginTop: 3 }}
              name="remark"
              multiline={3}
              fullWidth
              onChange={(e, f) => handleSelect("remark", e.target.value)}
           
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
         
        </Box>
      </Modal>
    </div>
  );
};

export default SendToRejectedModal;
