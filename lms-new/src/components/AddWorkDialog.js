import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import  secureLocalStorage  from  "react-secure-storage";
export default function AddWorkDialog({ setOpen, open, res }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
  };
  // console.log("Data", res.data);
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          alignSelf="center"
          sx={{ fontWeight: "700" }}
          id="responsive-dialog-title"
        >
          {`Job Card No.: ${res.data.WorkOrderNo}`}
        </DialogTitle>
        <p className="text-center font-semibold text-xl"></p>
        <div className="w-[600px] px-10 pt-3">
          <div className="flex space-x-4">
            <p className="font-semibold">Engineer Name: </p>
            <p>{res.data.Engineer_Name}</p>
          </div>
          <div className="flex space-x-4">
            <p className="font-semibold">Time Alotted: </p>
            <p>{res.data.TimeLine}</p>
          </div>
          <div className="flex space-x-4">
            <p className="font-semibold">Work Given: </p>
            <p>{res.data.WorkAlloted}</p>
          </div>
          <div className="flex space-x-4">
            <p className="font-semibold">Site Name: </p>
            <p>{res.data.Site_Name}</p>
          </div>
          {/* <div className="font-semibold">
            <p>Time Alotted: </p>
            <p>Work Given: </p>
            <p>Site Name: </p>
          </div>
          <div>
            <p> {res.data.TimeLine}</p>
            <p> {res.data.WorkAlloted}</p>
            <p>{res.data.Site_Name}</p>
          </div> */}
        </div>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
