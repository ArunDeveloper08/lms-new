import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import axios from "axios";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { debounce } from "lodash";
import secureLocalStorage from "react-secure-storage";

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
const SimHistoryEmployee = () => {
  const [all, setAll] = useState([]);
  const [data2, setData2] = useState([]);
  const [filter, setFilter] = useState({});
  const [site, setSite] = useState([]);

  const a = JSON.parse(secureLocalStorage.getItem("info")).data;
  const api = () =>
    axios
      .post(window.MyApiRoute + "sim/get?check=issuedByMe", {
        ...a,
      })
      .then((res) => {
        console.log(res.data.data);
        setAll(res.data.data);
        setData2(res.data.data);
      })
      .catch((err) => alert("Error", err.message));
  useEffect(() => {
    api();
    axios
      .get(window.MyApiRoute + "sites")
      .then((res) => {
        return setSite(res.data.data), console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    const debouncedFilter = debounce(() => {
      if (filter?.Sim_Number?.trim() === "") {
        setData2(all);
      } else if (filter?.Sim_Number) {
        const newData = all.filter((item) =>
          String(item.PhoneNumber)
            .toUpperCase()
            .includes(filter.Sim_Number.trim().toUpperCase())
        );
        setData2(newData);
      } else if (filter?.IMEI_Number === "") {
        setData2(all);
      } else if (filter?.IMEI_Number) {
        const newData = all.filter((item) =>
          String(item.IMEI).includes(filter.IMEI_Number)
        );
        setData2(newData);
      } else if (filter?.Site_Name === "") {
        setData2(all);
      } else if (filter?.Site_Name) {
        const newData = all.filter((item) =>
          String(item.Site_Name).includes(filter.Site_Name)
        );
        setData2(newData);
      }
    }, 400);
    debouncedFilter(); // Invoke the debounced function immediately after defining it
    return () => {
      debouncedFilter.cancel(); // Cleanup function to cancel the debounced function when the effect is cleaned up
    };
  }, [filter]);
  const handleFilterChange = (e) => {
    setFilter({ [e.target.name]: e.target.value });
  };
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: "200px",
      },
    },
  };
  return (
    <>
      <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 items-center justify-around py-2">
        <input
          name="Sim_Number"
          debounce={300}
          value={filter.Sim_Number ?? ""}
          onChange={(e) => handleFilterChange(e)}
          className="border-2 py-2 px-5 w-[300px] border-gray-500 rounded"
          placeholder="Sim No."
        />
        <input
          name="IMEI_Number"
          value={filter.IMEI_Number ?? ""}
          onChange={(e) => handleFilterChange(e)}
          className="border-2 py-2 px-5 w-[300px] border-gray-500 rounded"
          placeholder="IMEI No."
        />
        <Box className="w-[300px]">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Site Name</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={ data.Site_Name }
              label="Site Name"
              name="Site_Name"
              onChange={(e) => handleFilterChange(e)}
              value={filter.Site_Name ?? ""}
              MenuProps={MenuProps}>
              <MenuItem value="">Site Name</MenuItem>
              {site?.map((a, b) => {
                return (
                  <MenuItem key={b} value={a.SiteName}>
                    {a.SiteName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </div>
      <div className="w-[98vw] overflow-x-scroll h-[67vh]">
        <Table>
          <TableContainer component={Paper} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell
                  sx={{ padding: 0, minWidth: 150 }}
                  align="center">
                  Sim No.
                </StyledTableCell>
                <StyledTableCell sx={{ paddingY: 0 }} align="center">
                  IMEI No.
                </StyledTableCell>
                <StyledTableCell sx={{ paddingY: 0 }} align="center">
                  SSID
                </StyledTableCell>
                <StyledTableCell
                  sx={{ paddingY: 0, minWidth: 200 }}
                  align="center">
                  Dongle Serial No.
                </StyledTableCell>
                <StyledTableCell
                  sx={{ paddingY: 0, minWidth: 250 }}
                  align="center">
                  Site Name
                </StyledTableCell>
                <StyledTableCell
                  sx={{ paddingY: 0, minWidth: 200 }}
                  align="center">
                  Modem Mac List
                </StyledTableCell>
                <StyledTableCell sx={{ minWidth: 150 }} align="center">
                  Company Store
                </StyledTableCell>
                <StyledTableCell align="center">Production</StyledTableCell>
                <StyledTableCell align="center">Rejected</StyledTableCell>
                <StyledTableCell sx={{ minWidth: 120 }} align="center">
                  Site Store
                </StyledTableCell>
                <StyledTableCell
                  sx={{ padding: 0, minWidth: 120 }}
                  align="center">
                  Site Used
                </StyledTableCell>
                <StyledTableCell sx={{ padding: 0 }} align="center">
                  Activity Log
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data2?.map((a, b) => {
                let remarks = [
                  {
                    date: "12-12-2000",
                    remark: "Error while parsing Activity Log",
                  },
                ];
                try {
                  remarks = JSON.parse(a.ActivityLog);
                } catch (error) {
                  console.log("error", error);
                }
                return (
                  <StyledTableRow key={b}>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {a.PhoneNumber ?? "-"}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {a.IMEI ?? "-"}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {a.SSID ?? "-"}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {a.Dongle_Serial_Number ?? "-"}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {a.Site_Name ?? "-"}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {(a.ModemMacNum1 || "-") +
                        " , " +
                        (a.ModemMacNum2 || "-") +
                        " , " +
                        (a.ModemMacNum3 || "-") +
                        " , " +
                        (a.ModemMacNum4 || "-")}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {a.InStore ? 1 : 0}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {a.InProduction ? 1 : 0}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {a.Rejected ? 1 : 0}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {!a.Site_Name && a.SiteUsed ? 1 : 0}
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      {a.SiteUsed && a.Site_Name ? 1 : 0}
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{ padding: 0, minWidth: 500 }}
                      align="center">
                      {remarks?.map((log) => (
                        <p className="flex space-x-5 justify-start">
                          <span>Date:{log.date}</span>
                          <span>Remark:{log.remark}</span>
                        </p>
                      ))}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </TableContainer>
        </Table>
      </div>
    </>
  );
};

export default SimHistoryEmployee;
