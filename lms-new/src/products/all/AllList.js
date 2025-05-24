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
import secureLocalStorage from "react-secure-storage";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { debounce } from "lodash";
import { useSelector } from "react-redux";
import "../../App.css";
import { Link } from "react-router-dom";
import greenlight from "../../Image/greenlight.gif";
import yellowlight from "../../Image/tenor.gif";
import { mainRoute } from "../../App";

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

const AllList = () => {
  const [all, setAll] = useState([]);
  const [page, setPage] = useState("");
  const [data2, setData2] = useState([]);
  const [filter, setFilter] = useState({});
  const [siteName, setSiteName] = useState([]);
  const [input, setInput] = useState({
    dealerId: "",
    remark: "",
    // productType: selectedItem,
  });
  const { selectedItem } = useSelector((state) => state.itemReducer);
  const [editMode, setEditMode] = useState(-1);
  const [editedCategory, setEditedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedRemarks, setSelectedRemarks] = useState([]);

  const handleOpen = (remarks) => {
    setSelectedRemarks(remarks);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRemarks([]);
  };

  const info = JSON.parse(secureLocalStorage.getItem("info"))?.data;
  const api = (pageNumber = 1) =>
    axios
      .post(
        window.MyApiRoute +
          `record/get?category=${selectedItem}&location=history&page=${pageNumber}&serialNumber=${
            filter.Meter_Serial_No || ""
          }&Category=${filter.Category || ""}&SiteName=${
            input.dealerName || ""
          }`,
        {
          ...info,
        }
      )
      .then((res) => {
        setAll(res?.data?.Data);
        setData2(res?.data?.Data);
        setPage(res.data?.pages);
        setCurrentPage(pageNumber);
        setLoading(false);
      })
      .catch((err) => {
        alert("Error", err.message);
        setLoading(false);
      });

  useEffect(() => {
    api();
    axios
      .get(window.MyApiRoute + "dealer/get")
      .then((res) => {
        return (
          setSiteName(res.data.details)
       
        );
      })
      .catch((err) => console.log(err));
  }, [selectedItem, filter, input]);

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: "200px",
      },
    },
  };

  const updateApi = (obj, category) => {
    axios
      .put(
        window.MyApiRoute +
          `record/update?category=${selectedItem}&check=updateCategory`,
        {
          ...obj,
          ...info,
          Category: category,
        }
      )
      .then((res) => {
        api();
        console.log(res);
      })
      .catch((err) => alert("Error", err.message));
  };
  const handleEdit = (serialNumber) => {
    let oldData = [...data2];
    const itemIndex = oldData.findIndex((item) => item.Sr_NO === serialNumber);

    if (itemIndex !== -1) {
      if (editMode === serialNumber) {
        oldData[itemIndex].Category = editedCategory;
        updateApi(oldData[itemIndex], editedCategory);
        setData2(oldData);
        setEditMode(-1);
        setEditedCategory("");
      } else {
        setEditedCategory(oldData[itemIndex].Category?.trim()?.toUpperCase());
        setEditMode(serialNumber);
      }
    }
  };
  
  const handlePageChange = (newPage) => {
    api(newPage);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }
  const onChange = (a, b) => {
    if (a === "dealerId") {
      setInput((p) => ({ ...p, dealerId: b?.ID, dealerName: b?.name }));
      return;
    }
    setInput((p) => ({ ...p, [a]: b }));
  };

  return (
    <>
      {/* <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 items-center justify-around pb-3">
        <input
          name="Meter_Serial_No"
          debounce={300}
          value={filter.Meter_Serial_No ?? ""}
          onChange={(e) => handleFilterChange(e)}
          className="border-2 py-2 px-5 w-[300px] border-gray-500 rounded"
          placeholder="Serial Number."
        />
        <div
          className={`pt-3 flex ${
            info.Designation === "storekeeper" ? "w-1/2" : ""  
          } px-8 pb-3 flex justify-between mt-1 h-[67px]`}
        >
          <select
            name="Category"
            debounce={300}
            onChange={(e) => handleFilterChange(e)}
            value={filter?.Category ?? ""}
            className="border-2 py-2 px-5 w-[300px] border-gray-500 rounded"
            placeholder="Serial Number"
          >
            <option value="">Category</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option Value="C">C</option>
            <option value="D">D</option>
          </select>
          <h1 className="py-2 px-5">No. of Product : {data2?.length ?? 0 } </h1>
        </div>
        <Box className="w-[300px]">

          <Autocomplete
            onChange={(e, f) => onChange("dealerId", f)}
            // onClick={(e, f) => console.log(e, f)}
            className="flex-1 w-[300px]"
            // disabled={loading || !siteName.loading}
            name="selectDealer"
            options={siteName?.map((option) => option)}
            getOptionLabel={(option) =>
              `${option?.name.toUpperCase()}, ID: ${option?.ID} , GST-${
                option?.gstNumber
              }`
            }
            renderInput={(params) => (
              <TextField {...params} label="Select Dealer" />
            )}
          />
        </Box>
      </div> */}
<div className="flex flex-col md:flex-row space-y-3 md:space-y-0 items-center justify-around pb-3 px-4 gap-3">
  <input
    name="Meter_Serial_No"
    debounce={300}
    value={filter.Meter_Serial_No ?? ""}
    onChange={(e) => handleFilterChange(e)}
    className="border-2 py-2 px-5 w-full md:w-[300px] border-gray-500 rounded"
    placeholder="Serial Number."
  />

  {
    info.Designation !== "engineer" && (

  <div
    className={`pt-3 flex ${info.Designation === "storekeeper" ? "w-full md:w-1/2" : ""} justify-between mt-1 h-[67px] gap-3 px-4`}
  >
    <select
      name="Category"
      debounce={300}
      onChange={(e) => handleFilterChange(e)}
      value={filter?.Category ?? ""}
      className="border-2 py-2 px-5 w-full md:w-[300px] border-gray-500 rounded"
    >
      <option value="">Category</option>
      <option value="A">A</option>
      <option value="B">B</option>
      <option value="C">C</option>
      <option value="D">D</option>
    </select>
    <h1 className="py-2 px-5 text-center md:text-left">No. of Product: {data2?.length ?? 0}</h1>
  </div>
    )
  }

  <Box sx={{ width: { xs: "100%", md: 300 } }}>
    <Autocomplete
      onChange={(e, f) => onChange("dealerId", f)}
      className="flex-1 w-full"
      name="selectDealer"
      options={siteName?.map((option) => option)}
      getOptionLabel={(option) =>
        `${option?.name.toUpperCase()}, ID: ${option?.ID}, GST-${option?.gstNumber}`
      }
      renderInput={(params) => (
        <TextField {...params} label="Select Dealer" />
      )}
    />
  </Box>
</div>

      <div className="w-[100vw] overflow-x-scroll">
        <TableContainer sx={{ paddingY: 0, maxHeight: 350 }} component={Paper}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {info.Designation === "storekeeper" && (
                  <StyledTableCell sx={{ paddingX: 0 }} align="center">
                    Options
                  </StyledTableCell>
                )}
                <StyledTableCell sx={{ paddingX: 0 }} align="center">
                  Category
                </StyledTableCell>
               
                <StyledTableCell sx={{ paddingX: 0 }} align="center">
                  Serial No.
                </StyledTableCell>
                <StyledTableCell
                  sx={{ paddingX: 0, minWidth: 150 }}
                  align="center"
                >
                  Site Name
                </StyledTableCell>
                <StyledTableCell
                  sx={{ paddingX: 0, minWidth: 600 }}
                  align="center"
                >
                  ActivityLog
                </StyledTableCell>
                <StyledTableCell
                  sx={{ paddingX: 0, minWidth: 150 }}
                  align="center"
                >
                  Engg-Ret Challan
                </StyledTableCell>
                <StyledTableCell
                  sx={{ paddingX: 0, minWidth: 150 }}
                  align="center"
                >
                  T-P-N-R Challan
                </StyledTableCell>
                <StyledTableCell
                  sx={{ paddingX: 0, minWidth: 150 }}
                  align="center"
                >
                  T-P-R Challan
                </StyledTableCell>
                <StyledTableCell
                  sx={{ paddingX: 0, minWidth: 150 }}
                  align="center"
                >
                  Pro-Ret Challan
                </StyledTableCell>
                <StyledTableCell
                  sx={{ paddingX: 0, minWidth: 150 }}
                  align="center"
                >
                  Pro-Non-Ret Challan
                </StyledTableCell>
          
                <StyledTableCell
                  sx={{ paddingX: 0, minWidth: 100 }}
                  align="center"
                >
                  Defective
                </StyledTableCell>
                <StyledTableCell
                  sx={{ paddingX: 0, minWidth: 150 }}
                  align="center"
                >
                  In Production
                </StyledTableCell>
                <StyledTableCell
                  sx={{ paddingX: 0, minWidth: 100 }}
                  align="center"
                >
                  In Store
                </StyledTableCell>
                <StyledTableCell
                  sx={{ paddingX: 0, minWidth: 100 }}
                  align="center"
                >
                  Rejected
                </StyledTableCell>
                <StyledTableCell
                  sx={{ paddingX: 0, minWidth: 100 }}
                  align="center"
                >
                  SiteUsed
                </StyledTableCell>
                <StyledTableCell
                  sx={{ paddingX: 0, minWidth: 100 }}
                  align="center"
                >
                  Store to Rejected
                </StyledTableCell>
                <StyledTableCell
                  sx={{ paddingX: 0, minWidth: 100 }}
                  align="center"
                >
                  SiteStore
                </StyledTableCell>
                <StyledTableCell
                  sx={{ paddingX: 0, minWidth: 100 }}
                  align="center"
                >
                  Store - Def
                </StyledTableCell>
                <StyledTableCell
                  sx={{ paddingX: 0, minWidth: 100 }}
                  align="center"
                >
                  Store-Eng
                </StyledTableCell>
                <StyledTableCell
                  sx={{ paddingX: 0, minWidth: 100 }}
                  align="center"
                >
                  Store-Dealer
                </StyledTableCell>
           
                <StyledTableCell
                  sx={{ paddingX: 0, minWidth: 100 }}
                  align="center"
                >
                  Prod-Store
                </StyledTableCell>
                <StyledTableCell
                  sx={{ paddingX: 0, minWidth: 100 }}
                  align="center"
                >
                  Def-Store
                </StyledTableCell>
                <StyledTableCell
                  sx={{ paddingX: 0, minWidth: 100 }}
                  align="center"
                >
                  Engg-Store
                </StyledTableCell>
                <StyledTableCell
                  sx={{ paddingX: 0, minWidth: 100 }}
                  align="center"
                >
                  Dealer Name
                </StyledTableCell>
                {selectedItem === "m2mSim" && (
                  <>
                    <StyledTableCell
                      sx={{ paddingX: 0, minWidth: 100 }}
                      align="center"
                    >
                      Mac 1
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{ paddingX: 0, minWidth: 100 }}
                      align="center"
                    >
                      Mac 2
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{ paddingX: 0, minWidth: 100 }}
                      align="center"
                    >
                      Mac 3
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{ paddingX: 0, minWidth: 100 }}
                      align="center"
                    >
                      Mac 4
                    </StyledTableCell>
                  </>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {data2 && data2?.map((a, b) => {
              let remarks = [];
              try {
                remarks = JSON.parse(a.ActivityLog) || []; // ✅ Ensure it's always an array
              } catch (error) {
                console.log("error", error);
                remarks = []; // ✅ Default to empty array on error
              }

                return (
                  <StyledTableRow key={b}>
                    {info.Designation === "storekeeper" && (
                      <StyledTableCell align="center">
                        <Button
                          onClick={() => handleEdit(a.Sr_NO)}
                          color={!(editMode === a.Sr_NO) ? "success" : "error"}
                          variant={`contained`}
                        >
                          {editMode === a.Sr_NO ? "Save" : "Edit"}
                        </Button>
                      </StyledTableCell>
                    )}
                    <StyledTableCell align="center">
                      {editMode === a.Sr_NO ? (
                        <FormControl sx={{ width: 120 }}>
                          <InputLabel id="demo-simple-select-label">
                            Category
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="Category"
                            value={editedCategory}
                            label="Category"
                            onChange={(e) => setEditedCategory(e.target.value)}
                          >
                            <MenuItem value="A">A</MenuItem>
                            <MenuItem value="B">B</MenuItem>
                            <MenuItem value="C">C</MenuItem>
                            <MenuItem value="D">D</MenuItem>
                          </Select>
                        </FormControl>
                      ) : (
                        a.Category ?? "-"
                      )}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {a.Meter_Serial_No ?? "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {a.Site_Name ?? "-"}
                    </StyledTableCell>
       
                    <StyledTableCell key={b} sx={{ width: 400 }} align="start">
                      <p
                        className="cursor-pointer  "
                        onClick={() => handleOpen(remarks)}
                      >
                        {remarks.length > 0
                          ? `Date: ${
                              remarks[remarks.length - 1].date
                            }, Remark: ${remarks[remarks.length - 1].remark}`
                          : "No Remarks"}
                      </p>
                    </StyledTableCell>
                    <StyledTableCell sx={{ paddingX: 0 }} align="center">
                      <Button
                        disabled={a?.engiRetChallan === null}
                        size="small"
                        variant="contained"
                      >
                        <Link
                          to={`${mainRoute}/downloadengineerchallanpdf/${a?.engiRetChallan}?type=externalReturnableChallan`}
                          target="_blank"
                          className={`${
                            a?.engiRetChallan === null ? "text-black" : ""
                          }`}
                        >
                          {a?.engiRetChallan === null
                            ? "No challan"
                            : "Download"}
                        </Link>
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell sx={{ paddingX: 0 }} align="center">
                      <Button
                        disabled={a?.thirdPartyNonRetChallan === null}
                        size="small"
                        variant="contained"
                      >
                        <Link
                          to={`${mainRoute}/thirdpartychallan-non-return/${a?.thirdPartyNonRetChallan}?type=thirdPartyNonReturnableChallan`}
                          target="_blank"
                          className={`${
                            a?.thirdPartyNonRetChallan === null
                              ? "text-black"
                              : ""
                          }`}
                        >
                          {a?.thirdPartyNonRetChallan === null
                            ? "No challan"
                            : "Download"}
                        </Link>
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell sx={{ paddingX: 0 }} align="center">
                      <Button
                        disabled={a?.thirdPartyRetChallan === null}
                        size="small"
                        variant="contained"
                      >
                        <Link
                          to={`${mainRoute}/thirdpartychallanpdf/${a?.thirdPartyRetChallan}?type=thirdPartyReturnableChallan`}
                          target="_blank"
                          className={`${
                            a?.thirdPartyRetChallan === null ? "text-black" : ""
                          }`}
                        >
                          {a?.thirdPartyRetChallan === null
                            ? "No challan"
                            : "Download"}
                        </Link>
                      </Button>
                    </StyledTableCell>

                    <StyledTableCell sx={{ paddingX: 0 }} align="center">
                      <Button
                        disabled={a?.prodIntRetChallan === null}
                        size="small"
                        variant="contained"
                      >
                        <Link
                          to={`${mainRoute}/downloadchallanpdf/${a?.prodIntRetChallan}?type=internalReturnableChallan`}
                          target="_blank"
                          className={`${
                            a?.prodIntRetChallan === null ? "text-black" : ""
                          }`}
                        >
                          {a?.prodIntRetChallan === null
                            ? "No challan"
                            : "Download"}
                        </Link>
                      </Button>
                    </StyledTableCell>

                    <StyledTableCell sx={{ paddingX: 0 }} align="center">
                      <Button
                        disabled={a?.prodIntNonRetChallan === null}
                        size="small"
                        variant="contained"
                      >
                        <Link
                          to={`${mainRoute}/downloadproductionchallanpdf/${a?.prodIntNonRetChallan}?type=internalNonReturnableChallan`}
                          target="_blank"
                          className={`${
                            a?.prodIntNonRetChallan === null ? "text-black" : ""
                          }`}
                        >
                          {a?.prodIntNonRetChallan === null
                            ? "No challan"
                            : "Download"}
                        </Link>
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {a.Defective ? (
                        <img
                          src={greenlight}
                          className="h-[20px] w-[20px] rounded-full ml-5"
                          alt="gif"
                        />
                      ) : (
                        <img
                          src={yellowlight}
                          className="h-[20px] w-[20px] rounded-full ml-5"
                          alt="gif"
                        />
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {a.InProduction ? (
                        <img
                          src={greenlight}
                          className="h-[20px] w-[20px] rounded-full ml-10"
                          alt="gif"
                        />
                      ) : (
                        <img
                          src={yellowlight}
                          className="h-[20px] w-[20px] rounded-full ml-10"
                          alt="gif"
                        />
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {a.InStore ? (
                        <img
                          src={greenlight}
                          className="h-[20px] w-[20px] rounded-full ml-5"
                          alt="gif"
                        />
                      ) : (
                        <img
                          src={yellowlight}
                          className="h-[20px] w-[20px] rounded-full ml-5"
                          alt="gif"
                        />
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {a.Rejected ? (
                        <img
                          src={greenlight}
                          className="h-[20px] w-[20px] rounded-full ml-6"
                          alt="gif"
                        />
                      ) : (
                        <img
                          src={yellowlight}
                          className="h-[20px] w-[20px] rounded-full ml-6"
                          alt="gif"
                        />
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {a.SiteUsed && a.Site_Name ? (
                        <img
                          src={greenlight}
                          className="h-[20px] w-[20px] rounded-full ml-10"
                          alt="gif"
                        />
                      ) : (
                        <img
                          src={yellowlight}
                          className="h-[20px] w-[20px] rounded-full ml-5"
                          alt="gif"
                        />
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {a.storeToRejected ? (
                        <img
                          src={greenlight}
                          className="h-[20px] w-[20px] rounded-full ml-10"
                          alt="gif"
                        />
                      ) : (
                        <img
                          src={yellowlight}
                          className="h-[20px] w-[20px] rounded-full ml-5"
                          alt="gif"
                        />
                      )}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      {a.Site_Name === null && a.SiteUsed ? (
                        <img
                          src={greenlight}
                          className="h-[20px] w-[20px] rounded-full ml-5"
                          alt="gif"
                        />
                      ) : (
                        <img
                          src={yellowlight}
                          className="h-[20px] w-[20px] rounded-full ml-10"
                          alt="gif"
                        />
                      )}
                    </StyledTableCell>
                    <StyledTableCell sx={{ paddingX: 0 }} align="center">
                      {a.StoreToDefective ? (
                        <img
                          src={greenlight}
                          className="h-[20px] w-[20px] rounded-full ml-10"
                          alt="gif"
                        />
                      ) : (
                        <img
                          src={yellowlight}
                          className="h-[20px] w-[20px] rounded-full ml-10"
                          alt="gif"
                        />
                      )}
                    </StyledTableCell>
                    <StyledTableCell sx={{ paddingX: 0 }} align="center">
                      {a.storeToSite ? (
                        <img
                          src={greenlight}
                          className="h-[20px] w-[20px] rounded-full ml-10"
                          alt="gif"
                        />
                      ) : (
                        <img
                          src={yellowlight}
                          className="h-[20px] w-[20px] rounded-full ml-10"
                          alt="gif"
                        />
                      )}
                    </StyledTableCell>
                    <StyledTableCell sx={{ paddingX: 0 }} align="center">
                      {a.storeToDealer ? (
                        <img
                          src={greenlight}
                          className="h-[20px] w-[20px] rounded-full ml-10"
                          alt="gif"
                        />
                      ) : (
                        <img
                          src={yellowlight}
                          className="h-[20px] w-[20px] rounded-full ml-10"
                          alt="gif"
                        />
                      )}
                    </StyledTableCell>
                    {/* <StyledTableCell sx={{ paddingX: 0 }} align="center">
                      {a.withDealer ? (
                        <img
                          src={greenlight}
                          className="h-[20px] w-[20px] rounded-full ml-10"
                          alt="gif"
                        />
                      ) : (
                        <img
                          src={yellowlight}
                          className="h-[20px] w-[20px] rounded-full ml-10"
                          alt="gif"
                        />
                      )}
                    </StyledTableCell> */}
                    <StyledTableCell sx={{ paddingX: 0 }} align="center">
                      {a.ProductionToStore ? (
                        <img
                          src={greenlight}
                          className="h-[20px] w-[20px] rounded-full ml-10"
                          alt="gif"
                        />
                      ) : (
                        <img
                          src={yellowlight}
                          className="h-[20px] w-[20px] rounded-full ml-10"
                          alt="gif"
                        />
                      )}
                    </StyledTableCell>
                    <StyledTableCell sx={{ paddingX: 0 }} align="center">
                      {a.DefectiveToStore ? (
                        <img
                          src={greenlight}
                          className="h-[20px] w-[20px] rounded-full ml-10"
                          alt="gif"
                        />
                      ) : (
                        <img
                          src={yellowlight}
                          className="h-[20px] w-[20px] rounded-full ml-10"
                          alt="gif"
                        />
                      )}
                    </StyledTableCell>
                    <StyledTableCell sx={{ paddingX: 0 }} align="center">
                      {a.siteToStore ? (
                        <img
                          src={greenlight}
                          className="h-[20px] w-[20px] rounded-full ml-10"
                          alt="gif"
                        />
                      ) : (
                        <img
                          src={yellowlight}
                          className="h-[20px] w-[20px] rounded-full ml-10"
                          alt="gif"
                        />
                      )}
                    </StyledTableCell>
                    <StyledTableCell sx={{ paddingX: 0 }} align="center">
                      {a.dealerName ?? "-"}
                    </StyledTableCell>
                    {selectedItem === "m2mSim" && (
                      <>
                        <StyledTableCell sx={{ paddingX: 0 }} align="center">
                          {a.mac1 ?? "-"}
                        </StyledTableCell>
                        <StyledTableCell sx={{ paddingX: 0 }} align="center">
                          {a.mac2 ?? "-"}
                        </StyledTableCell>
                        <StyledTableCell sx={{ paddingX: 0 }} align="center">
                          {a.mac3 ?? "-"}
                        </StyledTableCell>
                        <StyledTableCell sx={{ paddingX: 0 }} align="center">
                          {a.mac4 ?? "-"}
                        </StyledTableCell>
                      </>
                    )}
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className=" flex  justify-center">
        <Button
          disabled={!page?.hasPreviousPage}
          onClick={() => handlePageChange(currentPage - 1)}
          variant="contained"
        >
          Previous
        </Button>
        <span className="flex items-center font-bold px-3">{currentPage}</span>
        <Button
          disabled={!page?.hasNextPage}
          onClick={() => handlePageChange(currentPage + 1)}
          variant="contained"
        >
          Next
        </Button>
      </div>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
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

export default AllList;
