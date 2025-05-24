// import React, {useEffect, useState} from "react";
// import {styled} from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, {tableCellClasses} from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import CircularProgress from "@mui/material/CircularProgress";
// // import Modal from "./Modal";
// import {useNavigate} from "react-router-dom";
// import SingleView from "./SingleView";
// import axios from "axios";
// const StyledTableCell=styled(TableCell)(({theme}) => ({
//   [ `&.${tableCellClasses.head}` ]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//   },
//   [ `&.${tableCellClasses.body}` ]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow=styled(TableRow)(({theme}) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: "#b80f768f",
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// export default function CustomizedTables() {
//   const navigate=useNavigate();
//   const [ open, setOpen ]=useState(false);
//   const [ single, setSingle ]=useState({});
//   const [ data, setData ]=useState(false);
//   const a=JSON.parse(secureLocalStorage.getItem("info")).data.Employee_Id;
//   console.log(a);
//   useEffect(() => {
//     axios
//       .post(`${window.MyApiRoute}record/get`, {
//         Employee_Id: a,
//       })
//       .then((res) => {
//         setData(res.data.Data);
//         console.log(res.data);
//       })
//       .catch((err) => console.log(err));
//   }, [ a ]);

//   const handleClickOpen=(item) => {
//     setOpen(true);
//     setSingle(item);
//   };
//   const handleClose=() => {
//     setOpen(false);
//   };
//   const handleEdit=(data) => {
//     navigate("/edit", {state: data});
//   };
//   console.log("data", data);
//   if(!data.length) {
//     return (
//       <p className=" text-3xl  flex w-[100vw] justify-center items-center h-[100vh] font-bold">
//         No Data Found
//       </p>
//     );
//   }
//   return (
//     <>
//       {data? (
//         <TableContainer component={Paper}>
//           <Table
//             stickyHeader
//             sx={{width: "1500px"}}
//             aria-label="customized table"
//           >
//             <TableHead>
//               <TableRow>
//                 <StyledTableCell sx={{paddingY: 1}} align="center">
//                   Options
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{minWidth: 150, padding: "3px"}}
//                   align="center"
//                 >
//                   Employee Name
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{minWidth: 100, padding: "3px"}}
//                   align="center"
//                 >
//                   Employee ID
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{minWidth: 150, padding: "3px"}}
//                   align="center"
//                 >
//                   Customer Unique Id
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{minWidth: 70, padding: "3px"}}
//                   align="center"
//                 >
//                   Meter Id
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{minWidth: 80, padding: "3px"}}
//                   align="center"
//                 >
//                   Modem Id
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{minWidth: 90, padding: "3px"}}
//                   align="center"
//                 >
//                   Job Card No
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{minWidth: 80, padding: "3px"}}
//                   align="center"
//                 >
//                   Site Name
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{minWidth: 120, padding: "3px"}}
//                   align="center"
//                 >
//                   Tower Name
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{minWidth: 80, padding: "3px"}}
//                   align="center"
//                 >
//                   Flat No
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{minWidth: 140, padding: "3px"}}
//                   align="center"
//                 >
//                   Basic Installation
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{minWidth: 90, padding: "3px"}}
//                   align="center"
//                 >
//                   DG Shifting
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{minWidth: 120, padding: "3px"}}
//                   align="center"
//                 >
//                   Online Status
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{minWidth: 120, padding: "3px"}}
//                   align="center"
//                 >
//                   Supported Engg.
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{minWidth: 150, padding: "3px"}}
//                   align="center"
//                 >
//                   Remarks By Engg.
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{minWidth: 100, padding: "3px"}}
//                   align="center"
//                 >
//                   Verified By
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{minWidth: 140, padding: "3px"}}
//                   align="center"
//                 >
//                   Manager Remarks
//                 </StyledTableCell>
//                 <StyledTableCell
//                   sx={{minWidth: 100, padding: "3px"}}
//                   align="center"
//                 >
//                   Record Date
//                 </StyledTableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {data.map((row, index) => (
//                 <StyledTableRow key={index}>
//                   <StyledTableCell
//                     align="center"
//                     sx={{padding: 1.5}}
//                     scope="row"
//                   >
//                     {secureLocalStorage.getItem("info").isAdmin&&(
//                       <span
//                         onClick={() => handleEdit(row)}
//                         className="pr-2 font-medium text-blue-600 dark:text-blue-500 hover:text-blue-900 cursor-pointer"
//                       >
//                         Edit
//                       </span>
//                     )}
//                     <span
//                       onClick={() => handleClickOpen(row)}
//                       className="pl-2 font-medium text-blue-600 dark:text-blue-500 hover:text-blue-900 cursor-pointer"
//                     >
//                       View
//                     </span>
//                   </StyledTableCell>
//                   <StyledTableCell sx={{padding: 0}} align="center">
//                     {row.Engineer_Name? row.Engineer_Name:"-"}
//                     {/* {row.Customer_Unique_Id ? row.Customer_Unique_Id : "-"} */}
//                   </StyledTableCell>
//                   <StyledTableCell sx={{padding: 0}} align="center">
//                     {/* {JSON.parse(secureLocalStorage.getItem("info")).data.name} */}
//                     {row.Employee_Id? row.Employee_Id:"-"}
//                   </StyledTableCell>
//                   <StyledTableCell sx={{padding: 0}} align="center">
//                     {row.Customer_Unique_Id? row.Customer_Unique_Id:"-"}
//                   </StyledTableCell>
//                   <StyledTableCell sx={{padding: 0}} align="center">
//                     {row.Meter_Id}
//                   </StyledTableCell>
//                   <StyledTableCell sx={{padding: 0}} align="center">
//                     {row.Modem_Id? row.Modem_Id:"-"}
//                   </StyledTableCell>
//                   <StyledTableCell sx={{padding: 0}} align="center">
//                     {row.Job_Card_No? row.Job_Card_No:"-"}
//                   </StyledTableCell>
//                   <StyledTableCell sx={{padding: 0}} align="center">
//                     {row.Site_Name? row.Site_Name:"-"}
//                   </StyledTableCell>
//                   <StyledTableCell sx={{padding: 0}} align="center">
//                     {row.Tower_Name? row.Tower_Name:"-"}
//                   </StyledTableCell>
//                   <StyledTableCell sx={{padding: 0}} align="center">
//                     {row.Flat_No? row.Flat_No:"-"}
//                   </StyledTableCell>
//                   <StyledTableCell sx={{padding: 0}} align="center">
//                     {row.Basic_Installation? "Done":"No"}
//                   </StyledTableCell>
//                   <StyledTableCell sx={{padding: 0}} align="center">
//                     {row.DG_Shifting? "Done":"No"}
//                   </StyledTableCell>
//                   <StyledTableCell sx={{padding: 0}} align="center">
//                     {row.Online? "Done":"No"}
//                   </StyledTableCell>
//                   <StyledTableCell sx={{padding: 0}} align="center">
//                     {row.Supported_Engineer? row.Supported_Engineer:"-"}
//                   </StyledTableCell>
//                   <StyledTableCell sx={{padding: 0}} align="center">
//                     {row.Remarks? row.Remarks:"-"}
//                   </StyledTableCell>
//                   <StyledTableCell sx={{padding: 0}} align="center">
//                     {row.WorkOrderNo? row.WorkOrderNo:"-"}
//                   </StyledTableCell>
//                   <StyledTableCell sx={{padding: 0}} align="center">
//                     {row.WorkOrderNo? row.WorkOrderNo:"-"}
//                   </StyledTableCell>
//                   <StyledTableCell sx={{padding: 0}} align="center">
//                     {row.createdAt? row.createdAt.slice(0, 10):"-"}
//                   </StyledTableCell>

//                   {/* <StyledTableCell sx={{ paddingY: 2 }} align="center">{row.price}</StyledTableCell> */}
//                 </StyledTableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       ):(
//         <Box
//           sx={{
//             display: "flex",
//             width: "100%",
//             justifyContent: "center",
//             height: "100vh",
//             alignItems: "center",
//           }}
//         >
//           <CircularProgress thickness={1} size={150} disableShrink />
//         </Box>
//       )}
//       {open&&(
//         <SingleView single={single} open={open} handleClose={handleClose} />
//       )}
//     </>
//   );
// }
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Autocomplete, TextField } from "@mui/material";
import  secureLocalStorage  from  "react-secure-storage";
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#ffdbac",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#b80f768f",
  },
  "&:last-child td, &:last-child th": {
    border: 2,
  },
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

function View() {
  const [data, setData] = useState([]);
  const [site, setSite] = useState([]);
  const [row, setRow] = useState({
    WorkAllocated: "",
    WorkDone: "",
    WorkPending: "",
    WorkOrderNumber: "",
  });
  const info = JSON.parse(secureLocalStorage.getItem("info"));
  useEffect(() => {
    axios
      .post(`${window.MyApiRoute}activity/get`, {
        Employee_Id: info.data.Employee_Id,
      })
      .then((res) => {
        console.log("data1", res.data.message);
        setData(res.data.message);
      })
      .catch((err) => console.log(err));
  }, []);
  
  const sites = () =>
    axios
      .get(window.MyApiRoute + "sites")
      .then((res) => {
        return setSite(res.data.data), console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  useEffect(() => {
    sites();
  }, []);
  const handleSelect = (a, b) => {
    setRow({ ...row, [a]: b });
  };
  return (
    <>
      {/* <div className="w-[20%] mx-auto mb-5">
        <Autocomplete
          onChange={(e, f) => handleSelect("SiteName", f)}
          fullWidth
          className="pt-3"
          name="SiteName"
          options={site?.map((option) => option?.SiteName)}
          renderInput={(params) => <TextField {...params} label="Site" />}
        />
      </div> */}
      {data?.length ? (
        <TableContainer
          sx={{ maxHeight: "73vh", paddingY: 0 }}
          component={Paper}
        >
          <Table
            stickyHeader
            // sx={{ maxWidth : "2500px" }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ padding: 0 }} align="center">
                  Ticket No.
                </StyledTableCell>
                <StyledTableCell
                  sx={{ paddingX: 0, width: 200 }}
                  align="center"
                >
                  Date & Time
                </StyledTableCell>
                {info.data.Designation === "CEO" && (
                  <>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      Employee ID
                    </StyledTableCell>
                    <StyledTableCell sx={{ padding: 0 }} align="center">
                      Employee Name
                    </StyledTableCell>
                  </>
                )}
                <StyledTableCell sx={{ paddingX: 0 }} align="center">
                  Site Name
                </StyledTableCell>
                <StyledTableCell sx={{ paddingX: 0 }} align="center">
                  Work Order No.
                </StyledTableCell>
                <StyledTableCell sx={{ paddingX: 0 }} align="center">
                  Work Allocated
                </StyledTableCell>
                <StyledTableCell sx={{ paddingX: 0 }} align="center">
                  Work Done
                </StyledTableCell>
                <StyledTableCell sx={{ paddingX: 0 }} align="center">
                  Work Pending
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.length &&
                data.map((item, index) => {
                  const date = new Date(item.createdAt).toLocaleString();
                  return (
                    <StyledTableRow>
                      <StyledTableCell
                        sx={{ padding: 0 }}
                        className="w-[70px]"
                        align="center"
                      >
                        {item.TicketNo}
                      </StyledTableCell>
                      <StyledTableCell sx={{ padding: 0 }} align="center">
                        {date}
                      </StyledTableCell>
                      {info.data.Designation === "CEO" && (
                        <>
                          <StyledTableCell align="center">
                            {item.EmployeeID}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {item.EmployeeName}
                          </StyledTableCell>
                        </>
                      )}
                      <StyledTableCell align="center">
                        {item.SiteName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {item.WorkOrderNumber}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{ paddingY: 0, width: 250 }}
                        align="center"
                      >
                        {item.WorkAllocated}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{ paddingY: 0, width: 250 }}
                        align="center"
                      >
                        {item.WorkDone}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{ paddingY: 0, width: 250 }}
                        align="center"
                      >
                        {item.WorkPending}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className="h-[60vh] font-bold text-3xl grid place-items-center">
          No Data To display
        </div>
      )}
    </>
  );
}
export default View;
