import React, { useState, useEffect, useTransition } from "react";
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
const ProductHistoryEmployee = () => {
  const [all, setAll] = useState([]);
  const [data2, setData2] = useState([]);
  const [filter, setFilter] = useState({});
  const [loading, startTransanction] = useTransition();
  const [site, setSite] = useState([]);
  const [currentProduct, setCurrentProduct] = useState("3-phaseMeter");

  const info = JSON.parse(secureLocalStorage.getItem("info")).data;

  const api = () =>
    axios
      .post(
        window.MyApiRoute +
          `record/get?category=${currentProduct}&location=history`,
        {
          ...info,
        }
      )
      .then((res) => {
        console.log(res.data.Data);
        setAll(res.data.Data);
        setData2(res.data.Data);
      })
      .catch((err) => alert("Error", err.message));
  useEffect(() => {
    api();
    if (site.length === 0) {
      axios
        .get(window.MyApiRoute + "sites")
        .then((res) => {
          return setSite(res.data.data), console.log(res.data.data);
        })
        .catch((err) => console.log(err));
    }
  }, [currentProduct]);
  useEffect(() => {
    const debouncedFilter = debounce(() => {
      if (filter?.Meter_Serial_No?.trim() === "") {
        setData2(all);
      } else if (filter?.Meter_Serial_No) {
        const newData = all.filter((item) =>
          String(item.Meter_Serial_No)
            .toUpperCase()
            .includes(filter.Meter_Serial_No.trim().toUpperCase())
        );
        setData2(newData);
      } else if (filter?.IMEI_Number === "") {
        setData2(all);
      } else if (filter?.Category === "") {
        setData2(all);
      } else if (filter?.Category) {
        const newData = all.filter((item) =>
          String(item.Category)
            .toUpperCase()
            .includes(filter.Category.trim().toUpperCase())
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
  const handleChangeProduct = (e) => {
    setCurrentProduct(e.target.value);
  };
  return (
    <>
      <div className="grid grid-cols-1 space-y-2 items-center md:space-y-0 md:grid-cols-5 gap-x-10 px-5 py-2">
        <div className="md:col-span-2">
          <FormControl sx={{ width: "50%" }} fullWidth>
            <InputLabel id="demo-simple-select-label">Product</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currentProduct}
              name="product"
              label="Product"
              onChange={handleChangeProduct}>
              <MenuItem value="3-phaseMeter">Three Phase Meter</MenuItem>
              <MenuItem value="modem">Modem </MenuItem>
              <MenuItem value="1-phaseMeter">One Phase Meter</MenuItem>
              <MenuItem value="homeDisplayunit">Home Display Unit</MenuItem>
              <MenuItem value="DGIndicator">DG Indicator</MenuItem>
              <MenuItem value="DTRH">DTRH</MenuItem>
              <MenuItem value="wifiDongle">Wifi Dongle</MenuItem>
            </Select>
          </FormControl>
        </div>
        <input
          name="Meter_Serial_No"
          debounce={300}
          value={filter.Meter_Serial_No ?? ""}
          onChange={(e) => handleFilterChange(e)}
          className="border-2 h-fit py-2 px-5 w-[200px] border-gray-500 rounded"
          placeholder="Serial Number."
        />
        <div
          className={`pt-3 flex ${
            data2.Designation === "storekeeper" ? "w-1/2" : ""
          } px-8 pb-3 flex justify-between mt-1 h-[67px]`}>
          <select
            name="Category"
            debounce={300}
            onChange={(e) => handleFilterChange(e)}
            value={filter.Category ?? ""}
            className="border-2 py-2 px-5 w-[200px] border-gray-500 rounded"
            placeholder="Serial Number">
            <option value="">Category</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option Value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>
        <Box className="w-[200px]">
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
      <div className="w-[100vw] mx-auto overflow-x-scroll h-[68vh]">
        <TableContainer
          sx={{ paddingY: 0, minWidth: "2500px" }}
          component={Paper}>
          <Table aria-label="customized table">
            <TableHead
              style={{
                position: "sticky",
                top: 0,
                zIndex: 100,
              }}>
              <TableRow>
                <StyledTableCell sx={{ paddingX: 0 }} align="center">
                  Category
                </StyledTableCell>
                <StyledTableCell sx={{ paddingX: 0 }} align="center">
                  Serial No.
                </StyledTableCell>
                <StyledTableCell sx={{ padding: 0 }} align="center">
                  Customer Name
                </StyledTableCell>
                <StyledTableCell sx={{ padding: 0 }} align="center">
                  Site Name
                </StyledTableCell>
                <StyledTableCell sx={{ paddingX: 0 }} align="center">
                  Customer Unique ID
                </StyledTableCell>
                <StyledTableCell sx={{ paddingX: 0 }} align="center">
                  Defective
                </StyledTableCell>
                <StyledTableCell sx={{ paddingX: 0 }} align="center">
                  In Production
                </StyledTableCell>
                <StyledTableCell sx={{ paddingX: 0 }} align="center">
                  In Store
                </StyledTableCell>
                <StyledTableCell sx={{ paddingX: 0 }} align="center">
                  Rejected
                </StyledTableCell>
                <StyledTableCell sx={{ paddingX: 0 }} align="center">
                  SiteUsed
                </StyledTableCell>
                <StyledTableCell sx={{ paddingX: 0 }} align="center">
                  ActivityLog
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
                    <StyledTableCell align="center">
                      {a.Category ?? "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {a.Meter_Serial_No ?? "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {a.Customer_Name ?? "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {a.Site_Name ?? "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {a.Customer_Unique_Id ?? "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {a.Defective ? 1 : 0}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {a.InProduction ? 1 : 0}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {a.InStore ? 1 : 0}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {a.Rejected ? 1 : 0}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {a.SiteUsed ? 1 : 0}
                    </StyledTableCell>
                    <StyledTableCell sx={{ width: 400 }} align="center">
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
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default ProductHistoryEmployee;
