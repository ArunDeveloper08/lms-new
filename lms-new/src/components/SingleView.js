import React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import  secureLocalStorage  from  "react-secure-storage";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function SingleView({ handleClose, open, single }) {
  
  const date = new Date(single?.Record_DateTime);
  const formattedDate = date.toLocaleDateString("en-GB"); // '08/04/2023'
  const a = JSON.parse(single.ActivityLog);
  console.log("a", a);
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        fullWidth
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <p
            className="font-semibold text-xl text-center text-gray-700"
            style={{}}
          >
            Meter Serial No: {single?.Meter_Serial_No}
          </p>
        </BootstrapDialogTitle>
        <DialogContent dividers className="space-y-2">
          <div>
            {single?.Employee_Id && (
              <div className="flex space-x-8  ">
                <p className="w-[150px] font-bold">Employee Id :</p>
                <p className="font-semibold"> {single?.Employee_Id}</p>
              </div>
            )}
            {single?.Meter_Id && (
              <div className="flex space-x-8  ">
                <p className="w-[150px] font-bold">Meter Id :</p>
                <p className="font-semibold"> {single?.Meter_Id}</p>
              </div>
            )}
            {single?.Flat_No && (
              <div className="flex space-x-8  ">
                <p className="w-[150px] font-bold">Flat No. </p>
                <p className="font-semibold"> {single?.Flat_No}</p>
              </div>
            )}
            {single?.Site_Name && (
              <div className="flex space-x-8  ">
                <p className="w-[150px] font-bold">Site Name :</p>
                <p className="font-semibold"> {single?.Site_Name}</p>
              </div>
            )}
            {single?.Meter_Serial_No && (
              <div className="flex space-x-8  ">
                <p className="w-[150px] font-bold">Meter Serial No. :</p>
                <p className="font-semibold"> {single?.Meter_Serial_No}</p>
              </div>
            )}
            {single?.Customer_Unique_Id && (
              <div className="flex space-x-8  ">
                <p className="w-[150px] font-bold">Customer Unique ID </p>
                <p className="font-semibold"> {single?.Customer_Unique_Id}</p>
              </div>
            )}
          </div>
          {single.ActivityLog && (
            <div className="mx-auto flex">
              <p className="w-[180px] font-bold pb-1"> Activity Log:</p>
              <div className="font-semibold flex-1">
                {a.map((a, b) => {
                  return (
                    <>
                      <Typography id="modal-modal-title" component="h2">
                        <div className="flex">
                          <p className="font-semibold">
                            Date:{a.date.slice(0, 10)}{" "}
                          </p>
                          &nbsp; &nbsp;
                          {<p className=" font-semibold">Remark: {a.remark}</p>}
                        </div>
                      </Typography>
                    </>
                  );
                })}
              </div>
            </div>
          )}
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
