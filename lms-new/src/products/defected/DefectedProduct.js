// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { styled } from "@mui/material/styles";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import { Button } from "@mui/material";
// import { debounce } from "lodash";
// import { useSelector } from "react-redux";
// import DefectedProductModal from "./DefectedProductModal";
// import MainModal1 from "../MainModal/MainModal1";
// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: "#b80f768f",
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));
// const DefectedProduct = () => {
//   const info = JSON.parse(secureLocalStorage.getItem("info"));
//   const [data, setData] = useState([]);
//   const { selectedItem } = useSelector((state) => state.itemReducer);
//   const [val, setVal] = useState([]);
//   const [data2, setData2] = useState([]);
//   const [filter, setFilter] = useState({});
//   const [open, setOpen] = useState({
//     open: false,
//     from: "defective",
//     to: "",
//     value: {},
//   });
//   const api = () =>
//     axios
//       .post(
//         window.MyApiRoute +
//           `record/get?category=${selectedItem}&location=defective`,
//         {
//           ...info.data,
//         }
//       )
//       .then((res) => (setVal(res.data.Data), setData(res.data.Data)))
//       .catch((err) => console.log(err));
//   useEffect(() => {
//     api();
//   }, [selectedItem]);
//   const handleRecieve = (e, v) => {
//     setOpen({
//       ...open,
//       open: true,
//       value: v,
//     });
//   };
//   const handleFilterChange = (e) => {
//     setFilter({ [e.target.name]: e.target.value });
//   };
//   useEffect(() => {
//     const debouncedFilter = debounce(() => {
//       if (filter?.Meter_Serial_No?.trim() === "") {
//         setData(val);
//       } else if (filter?.Meter_Serial_No) {
//         const newData = val.filter((item) =>
//           String(item.Meter_Serial_No)
//             .toUpperCase()
//             .includes(filter.Meter_Serial_No.trim().toUpperCase())
//         );
//         setData(newData);
//       }
//       // else if (filter?.IMEI_Number === "") {
//       //   setData2(val);
//       // } else if (filter?.IMEI_Number) {
//       //   const newData = val.filter((item) =>
//       //     String(item.IMEI).includes(filter.IMEI_Number)
//       //   );
//       //   setData2(newData);
//       // }
//       else {
//         setData(val);
//       }
//     }, 50);

//     debouncedFilter(); // Invoke the debounced function immediately after defining it
//     return () => {
//       debouncedFilter.cancel(); // Cleanup function to cancel the debounced function when the effect is cleaned up
//     };
//   }, [filter, val]);
//   return (
//     <>
//        <div
//         className={`pt-3 flex ${
//           data.Designation === "storekeeper" ? "w-1/2" : ""
//         } px-8 pb-3 flex justify-between`}
//       >
//         <input
//           name="Meter_Serial_No"
//           debounce={300}
//           onChange={(e) => handleFilterChange(e)}
//           value={filter.Meter_Serial_No ?? ""}
//           className="border-2 py-2 px-5 w-[300px] border-gray-500 rounded"
//           placeholder="Serial Number"
//         />
//         </div>
//       <TableContainer sx={{ maxHeight: "67vh", paddingY: 0 }} component={Paper}>
//         <Table aria-label="customized table">
//           <TableHead>
//             <TableRow>
//               {info.data.Designation == "storekeeper" && (
//                 <StyledTableCell sx={{ padding: 0 }} align="center">
//                   Options
//                 </StyledTableCell>
//               )}
//               <StyledTableCell sx={{ padding: 0 }} align="center">
//                 Category
//               </StyledTableCell>
//               <StyledTableCell sx={{ paddingX: 0 }} align="center">
//                 Serial No.
//               </StyledTableCell>
//               <StyledTableCell sx={{ paddingX: 0 }} align="center">
//                 ID
//               </StyledTableCell>
//               <StyledTableCell sx={{ paddingX: 0 }} align="center">
//                 Activity Log
//               </StyledTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data?.length &&
//               data?.map((item, index) => {
//                 const remark = JSON.parse(item.ActivityLog);
//                 return (
//                   <StyledTableRow key={index}>
//                     {info.data.Designation == "storekeeper" && (
//                       <StyledTableCell align="center">
//                         <Button
//                           onClick={(e) => handleRecieve(e, item)}
//                           variant="contained"
//                         >
//                           Edit
//                         </Button>
//                       </StyledTableCell>
//                     )}
//                     <StyledTableCell align="center">
//                       {item.Category ?? "-"}
//                     </StyledTableCell>
//                     <StyledTableCell align="center">
//                       {item.Meter_Serial_No ?? "-"}
//                     </StyledTableCell>
//                     {/* <StyledTableCell align="center">{ item.Sim_CreatedBy ?? "-" }</StyledTableCell>
//                             <StyledTableCell align="center">{ item.Sim_CreatedOn ?? "-" }</StyledTableCell>
//                             <StyledTableCell align="center">{ item.Dongle_Serial_Number ?? "-" }</StyledTableCell> */}
//                     <StyledTableCell align="center">
//                       {item.Meter_Id ?? "-"}
//                     </StyledTableCell>
//                     <StyledTableCell align="center">
//                       {remark.map((log) => (
//                         <p className="flex space-x-5 justify-center">
//                           <span>Date:{log.date}</span>
//                           <span>Remark:{log.remark}</span>
//                         </p>
//                       ))}
//                     </StyledTableCell>
//                   </StyledTableRow>
//                 );
//               })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <MainModal1 api={api} open={open} setOpen={setOpen} />
//     </>
//   );
// };

// export default DefectedProduct;

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
import { Button, Checkbox, Badge, CircularProgress, Dialog, DialogTitle, DialogActions, DialogContent } from "@mui/material";
import { debounce } from "lodash";
import { useSelector } from "react-redux";
import DefectedProductModal from "./DefectedProductModal";
import ProductionModal from "../productionFloor/ProductionModal";
import MainModal1 from "../MainModal/MainModal1";
import SendIcon from "@mui/icons-material/Send";
import { downloadPdfApi } from "../OnHold/api";
import { useNavigate } from "react-router-dom";
import CheckedProductsDefected from "./CheckedProductsDefected";
import  secureLocalStorage  from  "react-secure-storage";
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
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#b80f768f",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const DefectedProduct = () => {
  const info = JSON.parse(secureLocalStorage.getItem("info"));
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const { selectedItem } = useSelector((state) => state.itemReducer);
  const [val, setVal] = useState([]);
  const [data2, setData2] = useState([]);
  const [filter, setFilter] = useState({});
  const [checkedItems, setCheckedItems] = useState([]);
  const [open1, setOpen1] = useState({
    open: false,
    from: "defective",
    value: {},
  });
  const [open, setOpen] = useState({
    open: false,
    from: "production",
    to: "",
  });

    const [remarkModalOpen, setRemarkModalOpen] = useState(false);
    const [selectedRemarks, setSelectedRemarks] = useState([]);
  
  const api = (order) =>
    axios
      .post(
        window.MyApiRoute +
          `record/get?category=${selectedItem}&location=defective&sort=${
            order || "DESC"
          }`,
        {
          ...info.data,
        }
      )
      .then((res) => (setVal(res.data.Data), setData(res.data.Data)))
      .catch((err) => console.log(err));
  useEffect(() => {
    api();
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
  const handleAddRemark = (e, item) => {
    setOpen1({
      open: true,
      value: item,
      from: "defective",
    });
  };

  const handleCheckboxChange = (event, item) => {
    const { checked } = event.target;
    if (checked) {
      setCheckedItems([...checkedItems, item]);
    } else {
      const newCheckedItems = checkedItems.filter(
        (checkedItem) => checkedItem !== item
      );
      setCheckedItems(newCheckedItems);
    }
  };
  const handlePdfDownload = (challanNumber) => {
    navigate(`${mainRoute}/downloadchallanpdf/${challanNumber}`);
  };
  const handleSubmit = () => {
    setOpen((p) => ({ ...p, open: true }));
  };
  const handleRemarkClick = (remarks) => {
    setSelectedRemarks(remarks);
    setRemarkModalOpen(true);
  };
  const handleClose = () => {
    setRemarkModalOpen(false);
  };

  return (
    <>
      {/* <div
        className={`pt-3 flex ${
          info.data.Designation === "storekeeper" ? "w-1/1" : ""
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
        <h1> No. of Products : {data?.length ?? 0}</h1>
        <select
          onChange={(e) => api(e.target.value)}
          className="border-2 w-[200px]"
        >
          <option value="DESC">New to Old</option>
          <option value="ASC">Old to New</option>
        </select>
      </div>
      <TableContainer sx={{ maxHeight: 350, paddingY: 0 }} component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {info.data.Designation == "production" && (
                <StyledTableCell sx={{ padding: 0 }} align="center">
                  Options
                </StyledTableCell>
              )}
              <StyledTableCell sx={{ padding: 0 }} align="center">
                Category
              </StyledTableCell>
              <StyledTableCell
                sx={{ paddingX: 0, minWidth: 110 }}
                align="center"
              >
                Serial No.
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                Challan Number
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0, width: 150 }} align="center">
                Job Card No
              </StyledTableCell>
              <StyledTableCell sx={{ paddingX: 0 }} align="center">
                Activity Log
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.length &&
              data?.map((item, index) => {
              
                const remarks = JSON.parse(item?.ActivityLog) || [];
                const lastRemark = remarks.length ? remarks[remarks.length - 1] : null;
                const isChecked = checkedItems.includes(item);
                return (
                  <StyledTableRow key={index}>
                  
                    {info.data.Designation == "production" && (
                      <StyledTableCell
                        sx={{
                          paddingY: 1,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                        align="center"
                      >
                        <Button
                          onClick={(e) => handleAddRemark(e, item)}
                          variant="contained"
                        >
                          Add Remark
                        </Button>
                        <Checkbox
                          {...label}
                          checked={isChecked}
                          onChange={(e) => handleCheckboxChange(e, item)}
                        />
                        <Button
                          onClick={(e) => handlePdfDownload(item.challanNumber)}
                          variant="contained"
                          color="success"
                        >
                          Download Pdf
                        </Button>
                      </StyledTableCell>
                    )}
                    <StyledTableCell align="center">
                      {item.Category ?? "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {item.Meter_Serial_No ?? "-"}
                    </StyledTableCell>
                   
                    <StyledTableCell align="center">
                      {item.challanNumber ?? "-"}
                    </StyledTableCell>
                    <StyledTableCell sx={{ paddingY: 1 }} align="center">
                      {item.Job_Card_No ?? "-"}
                    </StyledTableCell>
                    <StyledTableCell align="center"
                      className="cursor-pointer text-blue-600 underline"
                      onClick={() => handleRemarkClick(remarks)}
                    >
             
                       {lastRemark ? `Date: ${lastRemark.date}, Remark: ${lastRemark.remark}` : "No Remarks"}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer> */}
      <div
  className={`pt-3 flex flex-col sm:flex-row sm:items-center gap-3 px-4 pb-3 sm:justify-between ${
    info.data.Designation === "storekeeper" ? "w-full" : ""
  }`}
>
  <input
    name="Meter_Serial_No"
    debounce={300}
    onChange={(e) => handleFilterChange(e)}
    value={filter.Meter_Serial_No ?? ""}
    className="border-2 py-2 px-5 w-full sm:w-[300px] border-gray-500 rounded"
    placeholder="Serial Number"
  />
  <h1 className="text-center sm:text-left">No. of Products: {data?.length ?? 0}</h1>
  <select
    onChange={(e) => api(e.target.value)}
    className="border-2 w-full sm:w-[200px] rounded py-2 px-5 border-gray-500"
  >
    <option value="DESC">New to Old</option>
    <option value="ASC">Old to New</option>
  </select>
</div>
<TableContainer sx={{ maxHeight: 350, paddingY: 0 }} component={Paper}>
  <Table stickyHeader aria-label="sticky table">
    <TableHead>
      <TableRow>
        {info.data.Designation === "production" && (
          <StyledTableCell
            sx={{ padding: 0, minWidth: { xs: 150, sm: 200 }, display: { xs: "none", sm: "table-cell" } }}
            align="center"
          >
            Options
          </StyledTableCell>
        )}
        <StyledTableCell align="center" sx={{ padding: 0, minWidth: { xs: 80, sm: 100 } }}>
          Category
        </StyledTableCell>
        <StyledTableCell sx={{ paddingX: 0, minWidth: { xs: 100, sm: 110 } }} align="center">
          Serial No.
        </StyledTableCell>
        <StyledTableCell sx={{ paddingX: 0, minWidth: { xs: 100, sm: 120 } }} align="center">
          Challan Number
        </StyledTableCell>
        <StyledTableCell sx={{ paddingX: 0, minWidth: { xs: 100, sm: 150 } }} align="center">
          Job Card No
        </StyledTableCell>
        <StyledTableCell sx={{ paddingX: 0, minWidth: { xs: 200, sm: 300 } }} align="center">
          Activity Log
        </StyledTableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {data?.length ? (
        data.map((item, index) => {
          const remarks = JSON.parse(item?.ActivityLog) || [];
          const lastRemark = remarks.length ? remarks[remarks.length - 1] : null;
          const isChecked = checkedItems.includes(item);
          return (
            <StyledTableRow key={index}>
              {info.data.Designation === "production" && (
                <StyledTableCell
                  sx={{
                    paddingY: 1,
                    display: { xs: "none", sm: "flex" },
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  align="center"
                >
                  <Button
                    onClick={(e) => handleAddRemark(e, item)}
                    variant="contained"
                  >
                    Add Remark
                  </Button>
                  <Checkbox
                    {...label}
                    checked={isChecked}
                    onChange={(e) => handleCheckboxChange(e, item)}
                  />
                  <Button
                    onClick={(e) => handlePdfDownload(item.challanNumber)}
                    variant="contained"
                    color="success"
                  >
                    Download Pdf
                  </Button>
                </StyledTableCell>
              )}
              <StyledTableCell align="center">{item.Category ?? "-"}</StyledTableCell>
              <StyledTableCell align="center">{item.Meter_Serial_No ?? "-"}</StyledTableCell>
              <StyledTableCell align="center">{item.challanNumber ?? "-"}</StyledTableCell>
              <StyledTableCell sx={{ paddingY: 1 }} align="center">
                {item.Job_Card_No ?? "-"}
              </StyledTableCell>
              <StyledTableCell
                align="center"
                className="cursor-pointer text-blue-600 underline"
                onClick={() => handleRemarkClick(remarks)}
              >
                {lastRemark ? `Date: ${lastRemark.date}, Remark: ${lastRemark.remark}` : "No Remarks"}
              </StyledTableCell>
            </StyledTableRow>
          );
        })
      ) : (
        <StyledTableRow>
          <StyledTableCell colSpan={info.data.Designation === "production" ? 6 : 5} align="center">
            No Data Available
          </StyledTableCell>
        </StyledTableRow>
      )}
    </TableBody>
  </Table>
</TableContainer>
      {checkedItems?.length ? (
        <Badge
          color="primary"
          badgeContent={checkedItems?.length}
          sx={{ position: "fixed", bottom: 10, right: 20 }}
        >
          <SendIcon
            sx={{ color: "#1976d2", fontSize: 40, marginTop: "5px" }}
            onClick={handleSubmit}
          />
        </Badge>
      ) : (
        ""
      )}
      <ProductionModal
        selectedItem={selectedItem}
        api={api}
        setOpen1={setOpen1}
        open1={open1}
      />
      <CheckedProductsDefected
        api={api}
        open={open}
        setOpen={setOpen}
        setCheckedItems={setCheckedItems}
        checkedItems={checkedItems}
      />
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

export default DefectedProduct;
