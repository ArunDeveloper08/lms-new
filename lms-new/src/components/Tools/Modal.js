import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { Modal } from "@mui/material";
import SendEngineerModal from "./SendEngineerModal";
import SendToRejectedModal from "./SendToRejectedModal";
import SendProductionModal from "./Production/SendProductionModal";
import MechanicalModal from "./mechanical/MechanicalModal";

const Modals = ({ opens, setOpens, checked, tool, setBadgeCount ,setChecked}) => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [yes, setYes] = useState(false);

  const handleClose = () => {
    setOpens(!opens);
  };

  const handleSubmit = () => {
    setOpen(!open);
  };
  const handleSubmit1 = () => {
    setYes(!yes);
  };

  return (
    <div>
      <Modal open={opens} onClose={handleClose}>
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
            height: 450,
          }}
        >
          <div className="flex justify-center mt-[50px]">
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ paddingX: 2 }}
            >
              Send to Engineer
            </Button>
          </div>
          <div className="flex justify-center mt-[50px]">
            <Button
              variant="contained"
              // onClick={handleSubmit}
              onClick={() => setOpen1(!open1)}
              sx={{ paddingX: 2 }}
            >
              Send to Production
            </Button>
          </div>
          <div className="flex justify-center mt-[50px]">
            <Button
              variant="contained"
              onClick={() => setOpen2(!open2)}
              sx={{ paddingX: 2 }}
            >
              Send to Mechanical
            </Button>
          </div>
          <div className="flex justify-center mt-[50px]">
            <Button variant="contained" onClick={handleSubmit1}>
              Send to Rejected
            </Button>
          </div>
        </Box>
      </Modal>

      <SendEngineerModal
        open={open}
        setOpen={setOpen}
        checked={checked}
        tool={tool}
        setBadgeCount={setBadgeCount}
        setOpens={setOpens}
        setChecked={setChecked}
      />
      <SendProductionModal
        open1={open1}
        setOpen1={setOpen1}
        checked={checked}
        tool={tool}
        setBadgeCount={setBadgeCount}
        setOpens={setOpens}
        setChecked={setChecked}
      />
      <SendToRejectedModal
        yes={yes}
        setYes={setYes}
        checked={checked}
        tool={tool}
        setBadgeCount={setBadgeCount}
        setOpens={setOpens}
        setChecked={setChecked}
      />
      <MechanicalModal
        open2={open2}
        setOpen2={setOpen2}
        checked={checked}
        tool={tool}
        setBadgeCount={setBadgeCount}
        setOpens={setOpens}
        setChecked={setChecked}
      />
    </div>
  );
};

export default Modals;
