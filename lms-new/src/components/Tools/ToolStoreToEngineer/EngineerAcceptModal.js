import { Box, Button, Modal, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { getTotalToolsCountAsync } from "../../../redux/actions";
import { useDispatch } from "react-redux";

const EngineerAcceptModal = ({
  modalProps,
  setSelectedRows,
  api,
  setModalProps,
  tool,
  selectedRows
  
}) => {
  const [remark, setRemark] = useState({
    remark: "",
  });
  const dispatch = useDispatch();
  const handleClose = () => {
    setModalProps({ ...modalProps, open: false });
  };

  const challanNumber = modalProps.data.map(item => item.challanNumber)
    
 
  const handleSubmit = () => {
    const SerialNumber = modalProps.data.map(item => item.SerialNumber);

    axios
      .put(
        // 'heh'
        `${window.MyApiRoute}tool/update?${modalProps?.check}`,
        { ...modalProps.userInfo.data, remark,SerialNumber ,"ToolID":tool?.id , "challanNumber":challanNumber[0]}
      )
      .then((res) => {
        
        alert(res?.data?.message);
       
        setModalProps({ ...modalProps, open: false });
      })
      .catch((err) => {
        // console.log(err);
      }).finally(()=>{
        api();
        dispatch(getTotalToolsCountAsync(tool?.id));
      }
      );
  };

  return (
    <div>
      <Modal open={modalProps.open} onClose={handleClose}>
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
                label="Remark"
                sx={{ marginTop: 3 }}
                name="remark"
                multiline={3}
                fullWidth
                onChange={(e) => setRemark(e.target.value)}
              />
            </div>

            <div className="flex justify-center mt-[50px]">
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default EngineerAcceptModal;
