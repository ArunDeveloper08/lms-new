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
const AllStoreList = () => {
  const [all, setAll] = useState([]);
  const [data2, setData2] = useState([]);
  const [filter, setFilter] = useState({});
  const [site, setSite] = useState([]);

  const a = JSON.parse(secureLocalStorage.getItem("info")).data;
  const api = () =>
    axios
      .post(window.MyApiRoute + "sim/get?check=allInStore", {
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
      <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 items-center justify-around pb-3">
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
      <TableContainer sx={{ maxHeight: "50vh", paddingY: 0 }} component={Paper}>
        <Table sx={{ width: "2500px" }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ padding: 0 }} align="center">
                Sim No.
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                IMEI No.
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                Issued By Store{" "}
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                Sim Created On
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                Dongle Serial No.
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                SSID
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                Activity Log
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                Dongle Date
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                Received in Store
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                Issued To Site
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                Issued On
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                Installed By Engg.
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                Challan No.
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                Approved By Crm
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                Engineer Remark
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                Verified By Crm
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                First Meter Id.
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                Last Meter Id.
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                Sim Status
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                Status Remark
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data2?.map((a, b) => {
              let logs = [
                {
                  date: "12-12-2000",
                  remark: "Error while parsing Activity Log",
                },
              ];
              try {
                logs = JSON.parse(a.ActivityLog);
              } catch (error) {
                console.log("error", error);
              }
              console.log(logs);
              return (
                <StyledTableRow>
                  <StyledTableCell align="center">
                    {a.PhoneNumber ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {a.IMEI ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {a.Sim_CreatedBy ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {a.Sim_CreatedOn ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {a.Dongle_Serial_Number ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {a.SSID ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {logs?.map((log) => (
                      <span className="flex space-x-5">
                        <span>Date:{log.date}</span>
                        <span>Remark:{log.remark}</span>
                      </span>
                    ))}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {a.Dongle_CreatedOn ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {a.Recieved_In_Store ? "Recieved" : "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {a.Site_Name ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {a.Issued_Date}
                  </StyledTableCell>
                  {/* <StyledTableCell align="center">{ a.ActivityLog }</StyledTableCell> */}
                  <StyledTableCell align="center">
                    {a.Challan_No ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {a.Challan_No ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {a.Approved_By_Crm ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {a.Engineer_Remarks ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">-</StyledTableCell>
                  <StyledTableCell align="center">
                    {a.First_Meter_Id ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {a.Last_Meter_Id ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {(() => {
                      if (a.Sim_Status === false) {
                        return "Off";
                      } else if (a.Sim_Status === true) {
                        return "On";
                      } else {
                        return "-";
                      }
                    })()}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {a.Sim_Remarks ?? "-"}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AllStoreList;
