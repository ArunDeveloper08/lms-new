import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { useNavigate } from "react-router-dom";
import  secureLocalStorage  from  "react-secure-storage";
import { mainRoute } from "../App";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#b80f768f",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
export default function DialogModal({ open, setOpen }) {
  // const obj = secureLocalStorage.getItem("Employee_Id");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  // const handleChange = (e) => {
  // setMeter({ ...meter, [e.target.name]: e.target.value });
  // };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const a = JSON.parse(secureLocalStorage.getItem("info"));
    axios
      .post(`${window.MyApiRoute}employee/jobcardfetch`, {
        Employee_Id: a.data.Employee_Id,
      })
      .then((res) => {
        // console.log("res", res.data.data);
        setData(res.data.data);
      })
      .catch((err) => console.log({ err }));
  }, []);
  // console.log("Employee_Id", obj.data.Employee_Id);
  // console.log("Meter_Id", meter);
  // const handleProceed = () => {
  // axios
  //   .post(`${window.MyApiRoute}/record/get`, meter)
  //   .then((res) => {
  //     console.log("res", res.data);
  //     secureLocalStorage.setItem("ID", meter.Meter_Id);
  //     navigate("/add", { state: { ...res.data, ...meter } });
  //   })
  //   .catch((err) => console.log("err", err));
  // };
  const handleSelect = (item) => {
    navigate(`${mainRoute}/add`, { state: item });
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog
        open={open}
        PaperProps={{ style: { width: "700px" } }}
        onClose={handleClose}
      >
        <DialogTitle textAlign="center">Work </DialogTitle>
        <DialogContent>
          {data.length ? (
            <TableContainer component={Paper}>
              <Table
                stickyHeader
                sx={{ width: "100%" }}
                aria-label="customized table"
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell sx={{ paddingY: 1 }} align="center">
                      Job Card No
                    </StyledTableCell>
                    {/* <StyledTableCell sx={{ paddingY: 1 }} align="center">
                    Name
                  </StyledTableCell> */}
                    <StyledTableCell sx={{ paddingY: 1 }} align="center">
                      Site Name
                    </StyledTableCell>
                    <StyledTableCell sx={{ paddingY: 1 }} align="center">
                      TimeLine
                    </StyledTableCell>
                    <StyledTableCell sx={{ paddingY: 1 }} align="center">
                      WorkAlloted
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.length &&
                    data.map((item, index) => (
                      <StyledTableRow
                        onClick={() => handleSelect(item)}
                        sx={{ cursor: "pointer" }}
                        key={index}
                      >
                        <StyledTableCell sx={{ padding: 1 }} align="center">
                          {item.WorkOrderNo}
                        </StyledTableCell>
                        {/* <StyledTableCell sx={{ paddingY: 1 }} align="center">
                        {item.Engineer_Name}
                      </StyledTableCell> */}
                        <StyledTableCell sx={{ padding: 0 }} align="center">
                          {item.Site_Name}
                        </StyledTableCell>
                        <StyledTableCell sx={{ padding: 0 }} align="center">
                          {item.TimeLine}
                        </StyledTableCell>
                        <StyledTableCell sx={{ padding: 0 }} align="center">
                          {item.WorkAlloted}
                        </StyledTableCell>

                        {/* <StyledTableCell sx={{ paddingY: 2 }} align="center">{row.price}</StyledTableCell> */}
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <p className="text-center text-xl">No Data To Display</p>
          )}
          {/* <div className="flex ">
            {data.length ? (
              data?.map((item, index) => {
                return (
                  <div key={index}>
                    <p>{item.Engineer_Name}</p>
                    <p>{item.Site_Name}</p>
                    <p>{item.TimeLine}</p>
                    <p>{item.WorkAlloted}</p>
                    <p>{item.WorkOrderNo}</p>
                    {/* <p>{item.WorkOrderStatus}</p> */}
          {/* </div>
                );
              })
            ) : (
              <p>Loading...</p>
            )}
          </div> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Okay </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
