import React, { Fragment, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";

import { useNavigate } from "react-router-dom";
import SingleView from "./SingleView";
import axios from "axios";
import EditMeterIns from "./EditMeterIns";
import  secureLocalStorage  from  "react-secure-storage";
// import MeterEdit from "./Sim/MeterEdit";

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

export default function ViewMeterRecord() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [single, setSingle] = useState({});
  const [edit, setEdit] = useState({
    open: false,
    data: {},
  });
  const [data, setData] = useState(false);
  const a = JSON.parse(secureLocalStorage.getItem("info")).data.Employee_Id;
  console.log(a);
  const api = () =>
    axios
      .post(
        `${window.MyApiRoute}record/get?category=1-phaseMeter`,
        {
          Employee_Id: a,
        }
      )
      .then((res) => {
        setData(res.data.Data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  useEffect(() => {
    api();
  }, [a]);

  const handleClickOpen = (item) => {
    setOpen(true);
    setSingle(item);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleEdit = (data) => {
    navigate("/meteredit", { state: data });
    setEdit({
      open: true,
      data: data,
    });
  };
  console.log("data", data);
  if (!data || data.length === 0) {
    return (
      <p className=" text-3xl  flex w-[100vw] justify-center items-center h-[100vh] font-bold">
        No Data Found
      </p>
    );
  }
  return (
    <>
      <TableContainer component={Paper} sx={{ height: "72vh" }}>
        <Table
          stickyHeader
          sx={{ width: "100%" }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ paddingY: 1 }} align="center">
                Options
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 150, padding: "3px" }}
                align="center"
              >
                Meter Digital ID
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 100, padding: "3px" }}
                align="center"
              >
                Customer Unique ID
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 150, padding: "3px" }}
                align="center"
              >
                Customer Name
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 70, padding: "3px" }}
                align="center"
              >
                Flat No.
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 80, padding: "3px" }}
                align="center"
              >
                SIte Name
              </StyledTableCell>
              <StyledTableCell
                sx={{ minWidth: 90, padding: "3px" }}
                align="center"
              >
                Activity Log
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, index) => {
              // try {
              const remark = JSON.parse(row.ActivityLog);
              // } catch (error) {}
              // let remark = [1, 2, 3, 4];
              return (
                <StyledTableRow key={index}>
                  <StyledTableCell
                    align="center"
                    sx={{ padding: 1.5 }}
                    scope="row"
                  >
                    {/* {secureLocalStorage.getItem("info").isAdmin && ( */}
                    <span
                      onClick={() => handleEdit(row)}
                      className="font-medium mr-2 text-white p-2 rounded-md cursor-pointer bg-blue-500"
                    >
                      Edit
                    </span>
                    {/* )} */}
                    <span
                      onClick={() => handleClickOpen(row)}
                      className=" font-medium text-white bg-green-500 p-2 rounded-md cursor-pointer"
                    >
                      View
                    </span>
                  </StyledTableCell>
                  <StyledTableCell sx={{ padding: 0 }} align="center">
                    {row.Meter_Serial_No || "-"}
                  </StyledTableCell>
                  <StyledTableCell sx={{ padding: 0 }} align="center">
                    {row.Customer_Unique_Id || "-"}
                  </StyledTableCell>
                  <StyledTableCell sx={{ padding: 0 }} align="center">
                    {row.Customer_Name || "-"}
                  </StyledTableCell>
                  <StyledTableCell sx={{ padding: 0 }} align="center">
                    {row.Flat_No || "-"}
                  </StyledTableCell>
                  <StyledTableCell sx={{ padding: 0 }} align="center">
                    {row.Site_Name || "-"}
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ padding: 0, minWidth: 500 }}
                    // align="center"
                  >
                    <div className="grid grid-cols-2 justify-start">
                      {remark?.length
                        ? remark.map((item, ind) => {
                            let formatted = new Date(
                              item.date
                            ).toLocaleString();
                            return (
                              <Fragment key={ind}>
                                <span className="w-fit">
                                  Date:
                                  <span className="pl-2 font-medium text-blue-600">
                                    {formatted}
                                  </span>
                                </span>
                                <span>
                                  Remark:
                                  <span className="pl-2 font-medium text-blue-600">
                                    {item.remark}
                                  </span>
                                </span>
                              </Fragment>
                            );
                          })
                        : "-"}
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <MeterEdit api={api} setEdit={setEdit} edit={edit} /> */}
      {open && (
        <SingleView single={single} open={open} handleClose={handleClose} />
      )}
      {/* <EditMeterIns api={api} setEdit={setEdit} edit={edit} /> */}
    </>
  );
}
