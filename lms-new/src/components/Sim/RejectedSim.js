import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { Button } from "@mui/material";
import RejectedModal from "./RejectedModal";
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
const RejectedSim = () => {
  const info = JSON.parse(secureLocalStorage.getItem("info"));
  const [data, setData] = useState([]);
  const [modal, setModal] = useState({
    open: false,
    data: {},
  });
  const api = () =>
    axios
      .post(window.MyApiRoute + "sim/get?check=rejected", {
        ...info.data,
      })
      .then((res) => (console.log(res.data), setData(res.data.data)))
      .catch((err) => console.log(err));
  useEffect(() => {
    api();
  }, []);
  const handleClick = (item) => {
    setModal({
      open: true,
      data: item,
    });
  };
  return (
    <>
      <TableContainer sx={{ maxHeight: "67vh", paddingY: 0 }} component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              {info.data.Designation == "storekeeper" && (
                <StyledTableCell sx={{ padding: 0 }} align="center">
                  Options
                </StyledTableCell>
              )}
              <StyledTableCell sx={{ padding: 0 }} align="center">
                Sim No.
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                IMEI No.
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                SSID
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                Activity Log
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.length &&
              data?.map((item, index) => {
                const remark = JSON.parse(item.ActivityLog);
                return (
                  <StyledTableRow key={index}>
                    {info.data.Designation == "storekeeper" && (
                      <StyledTableCell align="center">
                        <Button
                          onClick={() => handleClick(item)}
                          variant="contained"
                        >
                          Back To Store
                        </Button>
                      </StyledTableCell>
                    )}
                    <StyledTableCell align="center">
                      {item.PhoneNumber ?? "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.IMEI ?? "-"}
                    </StyledTableCell>
                    {/* <StyledTableCell align="center">{ item.Sim_CreatedBy ?? "-" }</StyledTableCell>
                            <StyledTableCell align="center">{ item.Sim_CreatedOn ?? "-" }</StyledTableCell>
                            <StyledTableCell align="center">{ item.Dongle_Serial_Number ?? "-" }</StyledTableCell> */}
                    <StyledTableCell align="center">
                      {item.SSID ?? "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {remark.map((log) => (
                        <p className="flex space-x-5 justify-center">
                          <span>Date:{log.date}</span>
                          <span>Remark:{log.remark}</span>
                        </p>
                      ))}
                    </StyledTableCell>
                    {/* <StyledTableCell align="center">{ item.Dongle_CreatedBy ?? "-" }</StyledTableCell>
                            <StyledTableCell align="center">{ item.Dongle_CreatedOn ?? "-" }</StyledTableCell> */}
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <RejectedModal api={api} setModal={setModal} modal={modal} />
    </>
  );
};

export default RejectedSim;
