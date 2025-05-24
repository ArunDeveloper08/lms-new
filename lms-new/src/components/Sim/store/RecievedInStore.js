import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Checkbox from "@mui/material/Checkbox";
import { Button } from "@mui/material";
import IssueDialog from "./InStoreDialog";
import axios from "axios";
import SimInStoreDialog from "./SimInStoreDialog";
import  secureLocalStorage  from  "react-secure-storage";
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

const IssueSim = () => {
  const a = JSON.parse(secureLocalStorage.getItem("info"));
  const isStoreKeeper = a.data.Designation === "storekeeper";
  const [open, setOpen] = useState({
    open: false,
    value: {},
  });
  const [apiData, setApidata] = useState([]);

  const api = () =>
    axios
      .post(
        window.MyApiRoute + "sim/get?check=allInProduction",
        { ...a.data }
      )
      .then((res) => setApidata(res.data))
      .catch((err) => console.log("err", err));
  useEffect(() => {
    api();
  }, []);
  const handleRecieve = (e, v) => {
    setOpen({
      open: true,
      value: v,
    });
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                sx={{ paddingX: 0, width: "200px" }}
                align="center"
              >
                Options
              </StyledTableCell>
              <StyledTableCell align="center" sx={{ padding: 0 }}>
                Mobile No.
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                IMEI No.
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                Dongle Serial No.
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                SSID
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                Remark
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apiData?.data &&
              apiData?.data?.map((c, b) => {
                const logs = JSON.parse(c.ActivityLog);
                return (
                  <StyledTableRow key={b}>
                    {
                      <StyledTableCell sx={{ paddingY: 1 }} align="center">
                        <Button
                          onClick={(e) => handleRecieve(e, c)}
                          variant="contained"
                        >
                          {isStoreKeeper ? "Recieve" : "Add Remark"}
                        </Button>
                      </StyledTableCell>
                    }
                    <StyledTableCell
                      sx={{ paddingY: 1 }}
                      component="th"
                      scope="row"
                    >
                      {c.PhoneNumber}
                    </StyledTableCell>
                    <StyledTableCell sx={{ paddingY: 1 }} align="center">
                      {c.IMEI}
                    </StyledTableCell>
                    <StyledTableCell sx={{ paddingY: 1 }} align="center">
                      {c.Dongle_Serial_Number}
                    </StyledTableCell>
                    <StyledTableCell sx={{ paddingY: 1 }} align="center">
                      {c.SSID}
                    </StyledTableCell>
                    <StyledTableCell sx={{ paddingY: 1 }} align="center">
                      {logs.map((log) => (
                        <p className="flex space-x-5 justify-center">
                          <span>Date:{log.date}</span>
                          <span>Remark:{log.remark}</span>
                        </p>
                      ))}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <SimInStoreDialog api={api} setOpen={setOpen} open={open} />
    </>
  );
};

export default IssueSim;
