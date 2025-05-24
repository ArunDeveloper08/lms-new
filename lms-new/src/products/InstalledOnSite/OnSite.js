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
import secureLocalStorage from "react-secure-storage";

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
import OnSiteModal from "./OnSiteModal";
import { useSelector } from "react-redux";
import { debounce } from "lodash";
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
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: "200px",
    },
  },
};
const OnSite = () => {
  const info = JSON.parse(secureLocalStorage.getItem("info"));
  const { selectedItem } = useSelector((state) => state.itemReducer);
  const [data, setData] = useState([]);
  const [val, setVal] = useState([]);
 const [remarkModalOpen, setRemarkModalOpen] = useState(false);
  const [selectedRemarks, setSelectedRemarks] = useState([]);
  const [filter, setFilter] = useState({});
  const [siteName, setSiteName] = useState([]);
  const [input, setInput] = useState({
    dealerId: "",
    remark: "",
    // productType: selectedItem,
  });
  // const [site, setSite] = useState([]);
  const [modal, setModal] = useState({
    open: false,
    data: {},
  });

  const api = () =>
    axios
      .post(
        window.MyApiRoute +
        `record/get?category=${selectedItem}&location=installed&dealerName=${input?.dealerName || ""}`,
        {
          ...info.data,
        }
      )
      .then((res) => (setVal(res.data.Data), setData(res.data.Data)))
      .catch((err) => console.log(err));
  useEffect(() => {
    api();
  }, [selectedItem, input, filter]);

  const handleSend = (data) => {
    setModal({
      open: true,
      data: data,
    });
  };

  useEffect(() => {
    api();
    axios
      .get(window.MyApiRoute + "dealer/get")
      .then((res) => {
        return setSiteName(res.data.details);
        // setSite(res.data.data)
      })
      .catch((err) => console.log(err));
  }, [selectedItem]);

  const handleFilterChange = (e) => {
    setFilter({ [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const debouncedFilter = debounce(() => {
      if (filter?.Meter_Serial_No?.trim() === "") {
        setData(val);
      } else if (filter?.Meter_Serial_No) {
        const newData = val.filter((item) =>
          String(item.Meter_Serial_No)
            .toUpperCase()
            .includes(filter.Meter_Serial_No.trim().toUpperCase())
        );
        setData(newData);
      } else if (filter?.Category?.trim() === "") {
        setData(val);
      } else if (filter?.Category) {
        const newData = val.filter((item) => {
          return item.Category?.trim()
            .toUpperCase()
            ?.includes(filter.Category.trim().toUpperCase());
        });
        setData(newData);
      } else if (filter?.Site_Name === "") {
        setData(val);
      } else if (filter?.Site_Name) {
        const newData = val.filter((item) =>
          String(item.Site_Name).includes(filter.Site_Name)
        );
        setData(newData);
      }
      // else if (filter?.IMEI_Number === "") {
      //   setData2(val);
      // } else if (filter?.IMEI_Number) {
      //   const newData = val.filter((item) =>
      //     String(item.IMEI).includes(filter.IMEI_Number)
      //   );
      //   setData2(newData);
      // }
      else {
        setData(val);
      }
    }, 50);

    debouncedFilter(); // Invoke the debounced function immediately after defining it
    return () => {
      debouncedFilter.cancel(); // Cleanup function to cancel the debounced function when the effect is cleaned up
    };
  }, [filter, val]);

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
  //  console.log("SiteName",siteName); 
  return (
    <>
      {/* <div className="flex justify-around">
        <div
          className={`pt-3 flex ${info.data.Designation === "storekeeper" ? "" : ""
            } px-8 pb-3 flex justify-between`}
        >
          <input
            name="Meter_Serial_No"
            debounce={300}
            onChange={(e) => handleFilterChange(e)}
            value={filter.Meter_Serial_No ?? ""}
            className="border-2 py-2 px-5 w-[300px] border-gray-500 rounded"
            placeholder="Serial Number"
          />
        </div>
        <div
          className={`pt-3 flex ${info.data.Designation === "storekeeper" ? "" : ""
            } px-8 pb-3 flex justify-between`}
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
          <h1 className="ml-1 mr-1"> No. of Products : {data?.length ?? 0}</h1>

          <Autocomplete
            onChange={(e, f) => onChange("dealerId", f)}
           
            className="flex-1 w-[300px]"
           
            name="selectDealer"
            options={siteName?.map((option) => option)}
            getOptionLabel={(option) =>
              `${option?.name.toUpperCase()}, ID: ${option?.ID} , GST-${option?.gstNumber
              }`
            }
            renderInput={(params) => (
              <TextField {...params} label="Select Dealer" />
            )}
          />
        </div>

       


      </div>
      <TableContainer sx={{ maxHeight: "75vh", paddingY: 0 }} component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
      
              <StyledTableCell sx={{ padding: 0 }} align="center">
                Category
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                Serial Number
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                ID
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                Site Name
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                Customer Unique Id
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                Flat No
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0, width: 100 }} align="center">
                Job Card No
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                Activity Log
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data?.map((a, index) => {
  

              let logs = [];

if (a?.ActivityLog) {
  try {
    logs = JSON.parse(a.ActivityLog) || [];
  } catch (error) {
    logs = [{ date: "12-12-2023", remark: "Null" }];
  }
} else {
  logs = [{ date: "12-12-2023", remark: "Null" }];
}

const lastRemark = logs.length ? logs[logs.length - 1] : null;

           
              return (
                <StyledTableRow>

                  <StyledTableCell align="center">
                    {a.Category ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {a.Meter_Serial_No ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {a.Meter_Id ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {a.Site_Name ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {a.Customer_Unique_Id ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {a.Flat_No ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell sx={{ paddingY: 1 }} align="center">
                    {a.Job_Card_No ?? "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center"
                   className="cursor-pointer"
                   onClick={() => handleRemarkClick(logs)}
                  >
          
                      {lastRemark ? `Date: ${lastRemark.date}, Remark: ${lastRemark.remark}` : "No Remarks"}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer> */}
 <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 items-center justify-around px-4 pb-3 gap-3">
  <div className={`pt-3 flex ${info.data.Designation === "storekeeper" ? "w-full" : ""} justify-between`}>
    <input
      name="Meter_Serial_No"
      debounce={300}
      onChange={(e) => handleFilterChange(e)}
      value={filter.Meter_Serial_No ?? ""}
      className="border-2 py-2 px-5 w-full md:w-[300px] border-gray-500 rounded"
      placeholder="Serial Number"
    />
  </div>
  <div className={`pt-3 flex ${info.data.Designation === "storekeeper" ? "w-full" : ""} justify-between gap-3`}>
 {
  info.data.Designation != "engineer" && (
    <>
        <select
      name="Category"
      debounce={300}
      onChange={(e) => handleFilterChange(e)}
      value={filter.Category ?? ""}
      className="border-2 py-2 px-5 w-full md:w-[300px] border-gray-500 rounded"
    >
      <option value="">Category</option>
      <option value="A">A</option>
      <option value="B">B</option>
      <option value="C">C</option>
      <option value="D">D</option>
    </select>
    <h1 className="text-center md:text-left">No. of Products: {data?.length ?? 0}</h1>
    </>
  )
 }




    <Autocomplete
      onChange={(e, f) => onChange("dealerId", f)}
      className="flex-1 w-full md:w-[300px]"
      name="selectDealer"
      options={siteName?.map((option) => option)}
      getOptionLabel={(option) =>
        `${option?.name.toUpperCase()}, ID: ${option?.ID}, GST-${option?.gstNumber}`
      }
      renderInput={(params) => (
        <TextField {...params} label="Select Dealer" />
      )}
    />
  </div>
</div>
<TableContainer sx={{ maxHeight: "75vh", paddingY: 0 }} component={Paper}>
  <Table aria-label="customized table">
    <TableHead>
      <TableRow>
        <StyledTableCell align="center" sx={{ padding: 0, minWidth: { xs: 80, sm: 100 } }}>
          Category
        </StyledTableCell>
        <StyledTableCell sx={{ paddingX: 0, minWidth: { xs: 100, sm: 120 } }} align="center">
          Serial Number
        </StyledTableCell>
        <StyledTableCell sx={{ paddingX: 0, minWidth: { xs: 80, sm: 100 } }} align="center">
          ID
        </StyledTableCell>
        <StyledTableCell sx={{ paddingX: 0, minWidth: { xs: 100, sm: 120 } }} align="center">
          Site Name
        </StyledTableCell>
        <StyledTableCell sx={{ paddingX: 0, minWidth: { xs: 100, sm: 120 } }} align="center">
          Customer Unique Id
        </StyledTableCell>
        <StyledTableCell sx={{ paddingX: 0, minWidth: { xs: 80, sm: 100 } }} align="center">
          Flat No
        </StyledTableCell>
        <StyledTableCell sx={{ paddingX: 0, minWidth: { xs: 100, sm: 120 } }} align="center">
          Job Card No
        </StyledTableCell>
        <StyledTableCell sx={{ paddingX: 0, minWidth: { xs: 200, sm: 300 } }} align="center">
          Activity Log
        </StyledTableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data && data.length ? (
        data.map((a, index) => {
          let logs = [];
          if (a?.ActivityLog) {
            try {
              logs = JSON.parse(a.ActivityLog) || [];
            } catch (error) {
              logs = [{ date: "12-12-2023", remark: "Null" }];
            }
          } else {
            logs = [{ date: "12-12-2023", remark: "Null" }];
          }
          const lastRemark = logs.length ? logs[logs.length - 1] : null;

          return (
            <StyledTableRow key={index}>
              <StyledTableCell align="center">{a.Category ?? "-"}</StyledTableCell>
              <StyledTableCell align="center">{a.Meter_Serial_No ?? "-"}</StyledTableCell>
              <StyledTableCell align="center">{a.Meter_Id ?? "-"}</StyledTableCell>
              <StyledTableCell align="center">{a.Site_Name ?? "-"}</StyledTableCell>
              <StyledTableCell align="center">{a.Customer_Unique_Id ?? "-"}</StyledTableCell>
              <StyledTableCell align="center">{a.Flat_No ?? "-"}</StyledTableCell>
              <StyledTableCell sx={{ paddingY: 1 }} align="center">
                {a.Job_Card_No ?? "-"}
              </StyledTableCell>
              <StyledTableCell
                align="center"
                className="cursor-pointer"
                onClick={() => handleRemarkClick(logs)}
              >
                {lastRemark ? `Date: ${lastRemark.date}, Remark: ${lastRemark.remark}` : "No Remarks"}
              </StyledTableCell>
            </StyledTableRow>
          );
        })
      ) : (
        <StyledTableRow>
          <StyledTableCell colSpan={8} align="center">
            No Data Available
          </StyledTableCell>
        </StyledTableRow>
      )}
    </TableBody>
  </Table>
</TableContainer>

      <OnSiteModal api={api} setModal={setModal} modal={modal} />
         <Dialog open={remarkModalOpen} onClose={handleClose} maxWidth="sm" fullWidth>
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

export default OnSite;
