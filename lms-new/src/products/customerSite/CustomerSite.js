import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import * as XLSX from "xlsx";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { debounce } from "lodash";
// import InStoreModal from "./InStoreModal";
import { useSelector } from "react-redux";
import CustomerSiteModal from "./CustomerSiteModal";
import MainModal1 from "../MainModal/MainModal1";

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

const CustomerSite = () => {
  const [all, setAll] = useState([]);
  const [data2, setData2] = useState([]);
  const [filter, setFilter] = useState({});
  const [site, setSite] = useState([]);
  const [loading, setLoading] = useState(false);
  const { selectedItem } = useSelector((state) => state.itemReducer);
  const [remarkModalOpen, setRemarkModalOpen] = useState(false);
  const [selectedRemarks, setSelectedRemarks] = useState([]);
  const [open, setOpen] = useState({
    open: false,
    from: "siteStore",
    to: "",
    value: {},
  });
  const [modal, setModal] = useState({
    open: false,
    data: {},
    type: "",
  });
  const [siteName, setSitename] = useState({
    loading: false,
    data: [],
    error: "",
  });
  const [input, setInput] = useState({
    dealerId: "",
    remark: "",
    productType: selectedItem,
  });

  const a = JSON.parse(secureLocalStorage.getItem("info"))?.data;
  const api = () =>
    axios
      .post(
        window.MyApiRoute +
          `record/get?category=${selectedItem}&location=onSite&dealerName=${
            input.dealerName || ""
          }`,
        {
          ...a,
        }
      )
      .then((res) => {
        setAll(res.data.Data);
        setData2(res.data.Data);
      })
      .catch((err) => alert("Error", err.message));
  const getSitesandDealers = async () => {
    const { data } = await axios.get(window.MyApiRoute + "dealer/get");
    // console.log(data);
    setSitename((p) => ({ ...p, loading: true, data: data.details }));
  };
  useEffect(() => {
    api();
    getSitesandDealers();
   
  }, [selectedItem, input]);

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
      } else if (filter?.Category?.trim() === "") {
        setData2(all);
      } else if (filter?.Category) {
        const newData = all.filter((item) => {
          return item.Category?.trim()
            .toUpperCase()
            ?.includes(filter.Category.trim().toUpperCase());
        });
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
  
  const reject = (item) => {
    setModal({
      open: true,
      data: item,
      type: "reject",
    });
  };
  const recieve = (item) => {
    setModal({
      open: true,
      data: item,
      type: "recieve",
    });
  };
  const handleRecieve = (e, v) => {
    setOpen({
      ...open,
      open: true,
      value: v,
    });
  };
  const onChange = (a, b) => {
    if (a === "dealerId") {
      setInput((p) => ({ ...p, dealerId: b?.ID, dealerName: b?.name }));
      return;
    }
    setInput((p) => ({ ...p, [a]: b }));
  };

  const handleRemarkClick = (remarks) => {
    setSelectedRemarks(remarks);
    setRemarkModalOpen(true);
  };
  const handleClose = () => {
    setRemarkModalOpen(false);
  };

    const excelData =
    data2 &&
    data2?.map((item) => {
      return {
        Product_Sr_No: item.Meter_Serial_No,
        Created_At: item.createdAt,
        Category: item.Category,
        Job_Card_No: item.Job_Card_No,
      };
    });

      const downloadExcel = (excelData) => {
        var wb = XLSX.utils.book_new(),
          ws = XLSX.utils.json_to_sheet(excelData);
    
        XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
        XLSX.writeFile(
          wb,
          `Customer-site-Excel-${new Date().toDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}.xlsx`
        );
      };

  return (
    <>
      <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 items-center justify-around pb-3">
        <input
          name="Meter_Serial_No"
          debounce={300}
          value={filter.Meter_Serial_No ?? ""}
          onChange={(e) => handleFilterChange(e)}
          className="border-2 py-2 px-5 w-[300px] border-gray-500 rounded"
          placeholder="Serial Number"
        />
        {a.Designation === "Engineer" && (
          <>
            <div
              className={`pt-3 flex ${
                a.Designation === "storekeeper" ? "w-1/1" : ""
              } px-8 pb-3 flex justify-between mt-1 h-[67px]`}
            >
              <select
                name="Category"
                debounce={300}
                onChange={(e) => handleFilterChange(e)}
                value={filter.Category ?? ""}
                className="border-2 py-2 px-5 w-[300px] border-gray-500 rounded"
                placeholder="Serial Number"
              >
                <option value="">Category</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option Value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
            <h1> No. of Products : {data2?.length ?? 0}</h1>
          </>
        )}

            {(a?.Designation === "storekeeper" || a?.Designation === "CEO" ) && (
              <Button
                variant="contained"
                onClick={() => downloadExcel(excelData)}
                sx={{ width: { xs: "100%", sm: "auto" } }}
              >
                Excel
              </Button>
            )}
{/*                                                 
        <Box sx={{ width: 300 }}>
          <Autocomplete                                    
            onChange={(e, f) => onChange("dealerId", f)}
            className="flex-1"
            disabled={loading || !siteName?.loading}
            name="selectDealer"
            options={["All sites", ...siteName?.data.map((option) => option)]}
            getOptionLabel={(option) =>
              option === "All sites"
                ? "All sites"
                : `${option?.name.toUpperCase()}`
            }
            renderInput={(params) => (
              <TextField {...params} label="Select Dealer" />
            )}
          />
        </Box> */}
      </div>
      <TableContainer sx={{ maxHeight: 350, paddingY: 0 }} component={Paper}>
        <Table stickyHeader aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ padding: 0 }} align="center">
                Category
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                Serial No.
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                ID
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0, width: 100 }} align="center">
                Job Card No
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                Activity Log
              </StyledTableCell>{" "}
            </TableRow>
          </TableHead>
          <TableBody>
            {data2 &&
              data2?.map((item, b) => {
                // const logs = JSON.parse(item.ActivityLog);
                const remarks = JSON.parse(item?.ActivityLog) || [];
                const lastRemark = remarks.length
                  ? remarks[remarks.length - 1]
                  : null;
                // console.log(logs);
                return (
                  <StyledTableRow key={b}>
                    {/* {a.Designation === "storekeeper" && (
                    <StyledTableCell align="center">
                      <div className="flex flex-col gap-y-2">
                        <Button
                          onClick={(e) => handleRecieve(e, item)}
                          variant="contained"
                        >
                          Edit
                        </Button>
                      </div>
                    </StyledTableCell>
                  )} */}
                    <StyledTableCell align="center">
                      {item.Category ?? "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.Meter_Serial_No ?? "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.Meter_Id ?? "-"}
                    </StyledTableCell>
                    <StyledTableCell sx={{ paddingY: 1 }} align="center">
                      {item.Job_Card_No ?? "-"}
                    </StyledTableCell>
                    <StyledTableCell
                      align="center"
                      onClick={() => handleRemarkClick(remarks)}
                      className="cursor-pointer"
                    >
                      {/* {logs?.map((log, ind) => (
                      <p key={ind} className="flex space-x-5">
                        <span>Date:{log.date}</span>
                        <span>Remark:{log.remark}</span>
                      </p>
                    ))} */}
                      {lastRemark
                        ? `Date: ${lastRemark.date}, Remark: ${lastRemark.remark}`
                        : "No Remarks"}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <MainModal1 api={api} open={open} setOpen={setOpen} />

      <CustomerSiteModal api={api} setModal={setModal} modal={modal} />
      <Dialog
        open={remarkModalOpen}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>All Remarks</DialogTitle>
        <DialogContent>
          {selectedRemarks?.map((log, index) => (
            <p key={index} className="mt-2">
              <strong>Date:</strong> {log.date} <br />
              <strong>Remark:</strong> {log.remark}
            </p>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CustomerSite;
